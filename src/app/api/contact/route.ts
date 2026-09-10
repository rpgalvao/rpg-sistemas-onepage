import { NextResponse } from "next/server";
import { Resend } from "resend";

const resendApiKey = process.env.RESEND_API_KEY;
const resend = resendApiKey ? new Resend(resendApiKey) : null;

export async function POST(request: Request) {
	try {
		const body = await request.json();
		const { name, email, phone, service, brief, website_hp } = body;

		// 1. Honeypot check: se o campo invisível estiver preenchido, é um bot
		if (website_hp) {
			return NextResponse.json(
				{ success: true, message: "Mensagem recebida com sucesso." },
				{ status: 200 }
			);
		}

		// 2. Validação simples e robusta dos dados obrigatórios
		if (!name || typeof name !== "string" || name.trim().length < 2) {
			return NextResponse.json(
				{ error: "Por favor, informe um nome válido (mínimo 2 caracteres)." },
				{ status: 400 }
			);
		}

		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!email || typeof email !== "string" || !emailRegex.test(email.trim())) {
			return NextResponse.json(
				{ error: "Por favor, informe um endereço de e-mail válido." },
				{ status: 400 }
			);
		}

		if (!brief || typeof brief !== "string" || brief.trim().length < 10) {
			return NextResponse.json(
				{ error: "Por favor, detalhe um pouco mais o seu projeto (mínimo 10 caracteres)." },
				{ status: 400 }
			);
		}

		const recipientEmail = process.env.CONTACT_RECIPIENT_EMAIL || "renatopgalvao@gmail.com";
		const fromEmail = process.env.RESEND_FROM_EMAIL || "RPG Sistemas <onboarding@resend.dev>";

		if (!resend) {
			console.warn("RESEND_API_KEY não configurada. Simulando envio de e-mail com sucesso no log.");
			console.log("Dados do contato:", { name, email, phone, service, brief });
			return NextResponse.json({
				success: true,
				simulated: true,
				message: "Contato registrado com sucesso (Modo de desenvolvimento).",
			});
		}

		// 3. Disparo formatado via Resend
		const result = await resend.emails.send({
			from: fromEmail,
			to: [recipientEmail],
			subject: `[RPG Sistemas] Novo contato de: ${name.trim()}`,
			html: `
				<!DOCTYPE html>
				<html>
				<head>
					<meta charset="utf-8">
					<style>
						body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f8fafc; color: #0f172a; padding: 24px; }
						.card { background-color: #ffffff; border: 1px solid #e2e8f0; border-radius: 12px; max-width: 600px; margin: 0 auto; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05); }
						.header { background: linear-gradient(135deg, #090d16 0%, #111827 100%); color: #ffffff; padding: 28px; border-bottom: 2px solid #10b981; }
						.header h1 { margin: 0; font-size: 20px; font-weight: 700; letter-spacing: -0.5px; }
						.header p { margin: 6px 0 0; font-size: 13px; color: #94a3b8; }
						.content { padding: 28px; }
						.field { margin-bottom: 20px; }
						.label { font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.8px; color: #64748b; margin-bottom: 6px; }
						.value { font-size: 15px; color: #1e293b; background-color: #f8fafc; padding: 12px 14px; border-radius: 8px; border: 1px solid #f1f5f9; }
						.brief { white-space: pre-wrap; font-size: 14px; line-height: 1.6; }
						.footer { background-color: #f8fafc; padding: 16px 28px; border-top: 1px solid #e2e8f0; font-size: 12px; color: #94a3b8; text-align: center; }
					</style>
				</head>
				<body>
					<div class="card">
						<div class="header">
							<h1>@rpg Sistemas &bull; Nova Solicitação de Briefing</h1>
							<p>Recebido diretamente através da landing page institucional</p>
						</div>
						<div class="content">
							<div class="field">
								<div class="label">Nome do Solicitante</div>
								<div class="value">${name.trim()}</div>
							</div>
							<div class="field">
								<div class="label">E-mail de Contato</div>
								<div class="value"><a href="mailto:${email.trim()}" style="color: #059669; text-decoration: none; font-weight: 600;">${email.trim()}</a></div>
							</div>
							${
								phone
									? `<div class="field">
								<div class="label">Telefone / WhatsApp</div>
								<div class="value"><a href="https://wa.me/55${phone.replace(/\D/g, "")}" style="color: #059669; text-decoration: none;">${phone.trim()}</a></div>
							</div>`
									: ""
							}
							${
								service
									? `<div class="field">
								<div class="label">Interesse / Serviço Selecionado</div>
								<div class="value">${service}</div>
							</div>`
									: ""
							}
							<div class="field">
								<div class="label">Briefing / Descrição do Projeto</div>
								<div class="value brief">${brief.trim()}</div>
							</div>
						</div>
						<div class="footer">
							&copy; 2026 RPG SISTEMAS E ASSESSORIA ADMINISTRATIVA LTDA &bull; Disparado via Resend API
						</div>
					</div>
				</body>
				</html>
			`,
		});

		if (result.error) {
			console.error("Resend API error:", result.error);
			return NextResponse.json(
				{ error: "Erro ao despachar o e-mail via API de mensageria. Por favor, utilize o botão de WhatsApp ao lado para falar conosco diretamente." },
				{ status: 502 }
			);
		}

		return NextResponse.json({ success: true, data: result.data });
	} catch (error) {
		console.error("Erro no processamento do contato:", error);
		return NextResponse.json(
			{ error: "Ocorreu um erro interno ao processar a mensagem. Tente novamente ou entre em contato pelo WhatsApp." },
			{ status: 500 }
		);
	}
}