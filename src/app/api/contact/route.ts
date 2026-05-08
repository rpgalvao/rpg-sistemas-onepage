import { NextResponse } from 'next/server';
import { Resend } from 'resend';

// Inicializamos o Resend pegando a chave secreta lá do nosso cofre (.env.local)
const resend = new Resend(process.env.RESEND_API_KEY);

// Criamos uma função POST (que é o padrão para receber dados de formulários)
export async function POST(request: Request) {
    try {
        // 1. Pegamos o "pacote" de dados que o formulário da página vai nos enviar
        const body = await request.json();
        const { name, email, brief } = body;

        // 2. Mandamos o Resend montar e disparar o e-mail
        const data = await resend.emails.send({
            from: 'RPG Sistemas <onboarding@resend.dev>', // E-mail padrão de teste do Resend
            to: ['renatopgalvao@gmail.com'], // Coloque AQUI o seu e-mail real onde você quer receber as mensagens
            subject: `[RPG Sistemas] Novo projeto de: ${name}`,
            html: `
        <h2>Nova solicitação de projeto - Terminal @rpg Sistemas</h2>
        <p><strong>Nome:</strong> ${name}</p>
        <p><strong>E-mail de contato:</strong> ${email}</p>
        <p><strong>Briefing/Resumo:</strong></p>
        <p>${brief}</p>
      `,
        });

        // 3. Se deu tudo certo, devolvemos um sinal de [OK] para a tela
        return NextResponse.json({ success: true, data });

    } catch (error) {
        // Se der erro (ex: sem internet, chave inválida), avisamos a tela
        return NextResponse.json({ error: 'Erro ao processar o comando.' }, { status: 500 });
    }
}