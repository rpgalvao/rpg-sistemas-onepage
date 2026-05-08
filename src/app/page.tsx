"use client";
import { useState, useEffect } from "react";

export default function Home() {
	const services = [
		{
			name: "MVP Development",
			tech: "(Node/Next.js)",
			desc: "Desenvolvimento ágil para validação de ideias.",
		},
		{
			name: "API Engineering",
			tech: "(TypeScript)",
			desc: "Arquitetura sólida aplicando DDD e SOLID.",
		},
		{
			name: "G.O.S. Systems",
			tech: "(Integração)",
			desc: "Gestão completa de Ordens de Serviço.",
		},
		{
			name: "Cloud & Infra",
			tech: "(Docker/Render)",
			desc: "Containers e deploy automatizado.",
		},
	];

	// --- COMANDOS QUE SERÃO DIGITADOS ---
	const cmd1 = "./start_here.sh";
	const cmd2 = "ls -la /servicos";
	const cmd3 = "./fale_conosco.sh";

	// --- MEMÓRIAS DE TEXTO PARA CADA COMANDO ---
	const [text1, setText1] = useState("");
	const [text2, setText2] = useState("");
	const [text3, setText3] = useState("");

	// --- A MÁQUINA DE ESTADOS (O Roteiro) ---
	// 0: Digitando cmd1 | 1: Mostra logo, aguarda | 2: Digitando cmd2
	// 3: Mostra serviços, aguarda | 4: Digitando cmd3 | 5: Mostra form
	const [stage, setStage] = useState(0);

	// Estados do formulário
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		brief: "",
	});
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [formStatus, setFormStatus] = useState<"idle" | "success" | "error">(
		"idle",
	);

	useEffect(() => {
		// A nossa função mágica que pausa a execução por "X" milissegundos
		const sleep = (ms: number) =>
			new Promise((resolve) => setTimeout(resolve, ms));

		const runSequence = async () => {
			// Garante que tudo começa vazio
			setText1("");
			setText2("");
			setText3("");
			setStage(0);

			await sleep(1000); // 1. Pausa inicial da tela preta

			// 2. Digita o Comando 1
			for (let i = 1; i <= cmd1.length; i++) {
				setText1(cmd1.slice(0, i));
				await sleep(90);
			}
			setStage(1); // 3. Libera a Logo e o próximo prompt

			await sleep(2000); // 4. Pausa dramática de 2 segundos lendo a tela

			// 5. Digita o Comando 2
			setStage(2);
			for (let i = 1; i <= cmd2.length; i++) {
				setText2(cmd2.slice(0, i));
				await sleep(90);
			}
			setStage(3); // 6. Libera os Serviços e o próximo prompt

			await sleep(2000); // 7. Pausa dramática de 2 segundos lendo os serviços

			// 8. Digita o Comando 3
			setStage(4);
			for (let i = 1; i <= cmd3.length; i++) {
				setText3(cmd3.slice(0, i));
				await sleep(90);
			}
			setStage(5); // 9. Libera o Formulário e o Rodapé
		};

		runSequence();
	}, []);

	const handleFormSubmit = async () => {
		if (!formData.name || !formData.email || !formData.brief) {
			setFormStatus("error");
			return;
		}
		setIsSubmitting(true);
		setFormStatus("idle");

		try {
			const response = await fetch("/api/contact", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(formData),
			});

			if (response.ok) {
				setFormStatus("success");
				setFormData({ name: "", email: "", brief: "" });
			} else {
				setFormStatus("error");
			}
		} catch (error) {
			setFormStatus("error");
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<main className="min-h-screen bg-black text-green-500 font-mono p-8 md:p-16 flex flex-col pt-20">
			<div className="max-w-3xl mx-auto w-full">
				{/* ========================================== */}
				{/* BLOCO 1: BOOT & LOGO */}
				<div className="mb-12">
					{/* O Prompt do Comando 1 */}
					<div className="mb-6 text-lg">
						<span className="text-green-700">
							root@rpg-sistemas:~$
						</span>
						<span className="ml-2 text-green-400">{text1}</span>
						{/* O cursor pisca aqui apenas enquanto não passamos para o próximo estágio */}
						{stage === 0 && (
							<span className="animate-pulse ml-1">_</span>
						)}
					</div>

					{/* A Saída do Comando 1 */}
					{stage >= 1 && (
						<div>
							<div className="mt-4 mb-12">
								<h1 className="text-5xl md:text-7xl font-bold tracking-widest mb-4 drop-shadow-[0_0_8px_rgba(34,197,94,0.8)]">
									@rpg Sistemas
								</h1>
								<h2 className="text-5xl md:text-7xl font-bold">
									&lt;@rpg /&gt;
								</h2>
							</div>
							<p className="text-green-800 opacity-80 mt-8 text-sm">
								[SYSTEM_READY] // Desenvolvendo fronteiras
								digitais...
							</p>
						</div>
					)}
				</div>

				{/* ========================================== */}
				{/* BLOCO 2: SERVIÇOS */}
				{stage >= 1 && (
					<div className="mb-12">
						{/* O Prompt do Comando 2 */}
						<div className="mb-6 text-lg">
							<span className="text-green-700">
								root@rpg-sistemas:~$
							</span>
							<span className="ml-2 text-green-400">{text2}</span>
							{/* O cursor pisca aqui enquanto aguarda (1) ou digita (2) */}
							{(stage === 1 || stage === 2) && (
								<span className="animate-pulse ml-1">_</span>
							)}
						</div>

						{/* A Saída do Comando 2 */}
						{stage >= 3 && (
							<ul className="space-y-4">
								{services.map((service, index) => (
									<li
										key={index}
										className="flex flex-col md:flex-row md:items-center gap-2 hover:bg-green-900/30 p-2 rounded transition-colors duration-300"
									>
										<span className="font-bold text-green-400 w-24 shrink-0">
											&lt;@rpg /&gt;
										</span>
										<span className="font-semibold text-lg">
											{service.name}
										</span>
										<span className="text-green-700">
											{service.tech}
										</span>
										<span className="text-green-600/60 text-sm hidden md:block">
											--&gt; {service.desc}
										</span>
									</li>
								))}
							</ul>
						)}
					</div>
				)}

				{/* ========================================== */}
				{/* BLOCO 3: CONTATO & RODAPÉ */}
				{stage >= 3 && (
					<div>
						{/* O Prompt do Comando 3 */}
						<div className="mb-6 text-lg">
							<span className="text-green-700">
								root@rpg-sistemas:~$
							</span>
							<span className="ml-2 text-green-400">{text3}</span>
							{/* O cursor pisca aqui enquanto aguarda (3) ou digita (4) */}
							{(stage === 3 || stage === 4) && (
								<span className="animate-pulse ml-1">_</span>
							)}
						</div>

						{/* A Saída do Comando 3 (O Formulário) */}
						{stage >= 5 && (
							<div>
								<form className="space-y-4 max-w-lg">
									<div className="flex items-center">
										<span className="text-green-700 mr-2 w-16">
											Name:
										</span>
										<input
											type="text"
											value={formData.name}
											onChange={(e) =>
												setFormData({
													...formData,
													name: e.target.value,
												})
											}
											className="bg-transparent border-none outline-none focus:ring-0 text-green-400 w-full placeholder-green-900"
											placeholder="_"
											disabled={isSubmitting}
										/>
									</div>
									<div className="flex items-center">
										<span className="text-green-700 mr-2 w-16">
											Email:
										</span>
										<input
											type="email"
											value={formData.email}
											onChange={(e) =>
												setFormData({
													...formData,
													email: e.target.value,
												})
											}
											className="bg-transparent border-none outline-none focus:ring-0 text-green-400 w-full placeholder-green-900"
											placeholder="_"
											disabled={isSubmitting}
										/>
									</div>
									<div className="flex items-center">
										<span className="text-green-700 mr-2 w-16">
											Brief:
										</span>
										<input
											type="text"
											value={formData.brief}
											onChange={(e) =>
												setFormData({
													...formData,
													brief: e.target.value,
												})
											}
											className="bg-transparent border-none outline-none focus:ring-0 text-green-400 w-full placeholder-green-900"
											placeholder="_"
											disabled={isSubmitting}
										/>
									</div>

									<button
										type="button"
										onClick={handleFormSubmit}
										disabled={isSubmitting}
										className="mt-8 bg-green-500 text-black px-4 py-2 font-bold hover:bg-green-400 transition-colors duration-300 disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed"
									>
										{isSubmitting
											? "[ TRANSMITTING... ]"
											: "[ SUBMIT_PROJECT ]"}
									</button>

									{formStatus === "success" && (
										<p className="mt-4 text-green-400">
											&gt; [OK] DATA TRANSMITTED
											SUCCESSFULLY. WE WILL RESPOND SOON.
										</p>
									)}
									{formStatus === "error" && (
										<p className="mt-4 text-red-500">
											&gt; [ERROR] FAILED TO TRANSMIT OR
											MISSING DATA. PLEASE VERIFY AND
											RETRY.
										</p>
									)}
								</form>

								{/* RODAPÉ E PROMPT FINAL */}
								<div className="mt-24 pt-8 border-t border-green-900/40 text-sm flex flex-col items-center opacity-60">
									<p className="text-green-700">
										Connection to @rpg-sistemas closed.
									</p>
									<p className="text-green-800 mt-2">
										© 2026 RPG SISTEMAS E ASSESSORIA
										ADMINISTRATIVA LTDA.
									</p>
									<div className="mt-8 text-green-700 flex items-center">
										<span>root@rpg-sistemas:~$</span>
										<span className="animate-pulse ml-2 w-2 h-4 bg-green-500 inline-block"></span>
									</div>
								</div>
							</div>
						)}
					</div>
				)}
			</div>
		</main>
	);
}
