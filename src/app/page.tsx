"use client";
import { useState, useEffect } from "react";

export default function Home() {
	const services = [
		{
			name: "API Engineering",
			tech: "(Node/TypeScript)",
			desc: "Arquitetura sólida aplicando DDD e princípios SOLID.",
		},
		{
			name: "Cloud & Infra",
			tech: "(Docker/Render)",
			desc: "Containers, deploy automatizado e alta disponibilidade.",
		},
		{
			name: "MVP Development",
			tech: "(Fullstack)",
			desc: "Desenvolvimento ágil para validação rápida de ideias.",
		},
	];

	// O nosso novo projeto em destaque (CRM em Laravel)
	const featuredProject = {
		name: "RPG_CRM_SYSTEM",
		framework: "Laravel 11 / PHP 8.3",
		database: "PostgreSQL",
		status: "PRODUCTION_READY",
		modules: [
			"Gestão de Clientes",
			"Controle de Ordens de Serviço (G.O.S)",
			"Faturamento Automatizado",
		],
	};

	// --- COMANDOS QUE SERÃO DIGITADOS EM SEQUÊNCIA ---
	const cmd1 = "./start_here.sh";
	const cmd2 = "ls -la /servicos";
	const cmd3 = "./ver_projetos.sh";
	const cmd4 = "./request_quote.sh";

	// --- MEMÓRIAS DE TEXTO PARA CADA PROMPT ---
	const [text1, setText1] = useState("");
	const [text2, setText2] = useState("");
	const [text3, setText3] = useState("");
	const [text4, setText4] = useState("");

	// --- A MÁQUINA DE ESTADOS (O Roteiro Sequencial) ---
	// 0: Digitando cmd1 | 1: Mostra logo, aguarda | 2: Digitando cmd2 | 3: Mostra serviços, aguarda
	// 4: Digitando cmd3 | 5: Mostra projetos, aguarda | 6: Digitando cmd4 | 7: Mostra formulário final
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
		const sleep = (ms: number) =>
			new Promise((resolve) => setTimeout(resolve, ms));

		const runSequence = async () => {
			setText1("");
			setText2("");
			setText3("");
			setText4("");
			setStage(0);
			await sleep(800);

			// 1. Digita o Comando 1 (Boot)
			for (let i = 1; i <= cmd1.length; i++) {
				setText1(cmd1.slice(0, i));
				await sleep(70);
			}
			setStage(1);
			await sleep(1800); // Pausa para leitura da logo

			// 2. Digita o Comando 2 (Serviços)
			setStage(2);
			for (let i = 1; i <= cmd2.length; i++) {
				setText2(cmd2.slice(0, i));
				await sleep(70);
			}
			setStage(3);
			await sleep(1800); // Pausa para leitura dos serviços

			// 3. NOVO: Digita o Comando 3 (Projetos/CRM)
			setStage(4);
			for (let i = 1; i <= cmd3.length; i++) {
				setText3(cmd3.slice(0, i));
				await sleep(70);
			}
			setStage(5);
			await sleep(2200); // Pausa um pouco maior porque tem mais texto no projeto

			// 4. Digita o Comando 4 (Contato)
			setStage(6);
			for (let i = 1; i <= cmd4.length; i++) {
				setText4(cmd4.slice(0, i));
				await sleep(70);
			}
			setStage(7);
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
				{/* BLOCO 1: BOOT & LOGO */}
				<div className="mb-12">
					<div className="mb-6 text-lg">
						<span className="text-green-700">
							root@rpg-sistemas:~$
						</span>
						<span className="ml-2 text-green-400">{text1}</span>
						{stage === 0 && (
							<span className="animate-pulse ml-1">_</span>
						)}
					</div>

					{stage >= 1 && (
						<div>
							<div className="mt-4 mb-12">
								<h1 className="text-5xl md:text-7xl font-bold tracking-widest mb-4 drop-shadow-[0_0_8px_rgba(34,197,94,0.8)]">
									@rpg Sistemas
								</h1>
								<h2 className="text-5xl md:text-7xl font-bold text-green-400">
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

				{/* BLOCO 2: SERVIÇOS */}
				{stage >= 1 && (
					<div className="mb-12">
						<div className="mb-6 text-lg">
							<span className="text-green-700">
								root@rpg-sistemas:~$
							</span>
							<span className="ml-2 text-green-400">{text2}</span>
							{(stage === 1 || stage === 2) && (
								<span className="animate-pulse ml-1">_</span>
							)}
						</div>

						{stage >= 3 && (
							<ul className="space-y-4">
								{services.map((service, index) => (
									<li
										key={index}
										className="flex flex-col md:flex-row md:items-center gap-2 hover:bg-green-900/20 p-2 rounded transition-colors duration-300"
									>
										<span className="font-bold text-green-700 w-24 flex-shrink-0">
											⚙️ [SVC]
										</span>
										<span className="font-semibold text-lg text-green-300">
											{service.name}
										</span>
										<span className="text-green-600">
											{service.tech}
										</span>
										<span className="text-green-700 text-sm hidden md:block">
											— {service.desc}
										</span>
									</li>
								))}
							</ul>
						)}
					</div>
				)}

				{/* BLOCO 3: NOVO - DETALHAMENTO DE PROJETOS (CRM) */}
				{stage >= 3 && (
					<div className="mb-12">
						<div className="mb-6 text-lg">
							<span className="text-green-700">
								root@rpg-sistemas:~$
							</span>
							<span className="ml-2 text-green-400">{text3}</span>
							{(stage === 3 || stage === 4) && (
								<span className="animate-pulse ml-1">_</span>
							)}
						</div>

						{stage >= 5 && (
							<div className="border border-green-900/60 bg-green-950/10 p-6 rounded">
								<div className="flex justify-between items-center mb-4 border-b border-green-900/40 pb-2">
									<span className="text-xl font-bold text-green-400">
										🚀 {featuredProject.name}
									</span>
									<span className="text-xs bg-green-900/40 text-green-300 px-2 py-0.5 rounded animate-pulse">
										{featuredProject.status}
									</span>
								</div>

								<div className="space-y-2 text-sm">
									<p>
										<span className="text-green-700">
											| Core Stack :
										</span>{" "}
										{featuredProject.framework}
									</p>
									<p>
										<span className="text-green-700">
											| Database :
										</span>{" "}
										{featuredProject.database}
									</p>
									<div>
										<span className="text-green-700">
											| Modules Active:
										</span>
										<ul className="list-disc list-inside ml-4 mt-1 text-green-400/90 space-y-1">
											{featuredProject.modules.map(
												(mod, i) => (
													<li key={i}>{mod}</li>
												),
											)}
										</ul>
									</div>
								</div>
								<p className="text-xs text-green-800 mt-4">
									// Enterprise-grade architecture initialized
									successfully.
								</p>
							</div>
						)}
					</div>
				)}

				{/* BLOCO 4: CONTATO & RODAPÉ */}
				{stage >= 5 && (
					<div>
						<div className="mb-6 text-lg">
							<span className="text-green-700">
								root@rpg-sistemas:~$
							</span>
							<span className="ml-2 text-green-400">{text4}</span>
							{(stage === 5 || stage === 6) && (
								<span className="animate-pulse ml-1">_</span>
							)}
						</div>

						{stage >= 7 && (
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
