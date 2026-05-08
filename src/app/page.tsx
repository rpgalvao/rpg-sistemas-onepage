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

	const textToType = "./start_here.sh";
	const [displayedText, setDisplayedText] = useState("");
	const [bootStage, setBootStage] = useState(0);

	// --- NOVO: ESTADOS DO FORMULÁRIO ---
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
		setDisplayedText("");
		setBootStage(0);
		let currentIndex = 0;
		const initialDelay = setTimeout(() => {
			const intervalId = setInterval(() => {
				if (currentIndex < textToType.length) {
					setDisplayedText(
						(prev) => prev + textToType.charAt(currentIndex),
					);
					currentIndex++;
				} else {
					clearInterval(intervalId);
					setTimeout(() => setBootStage(1), 400);
					setTimeout(() => setBootStage(2), 1200);
					setTimeout(() => setBootStage(3), 2000);
				}
			}, 90);
		}, 1200);
		return () => clearTimeout(initialDelay);
	}, []);

	// --- NOVO: FUNÇÃO DE ENVIO PARA O BACKEND ---
	const handleFormSubmit = async () => {
		// Validação básica para não enviar vazio
		if (!formData.name || !formData.email || !formData.brief) {
			setFormStatus("error");
			return;
		}

		setIsSubmitting(true);
		setFormStatus("idle");

		try {
			// O "fetch" bate na nossa rota da API que criamos
			const response = await fetch("/api/contact", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(formData), // Empacotamos os dados!
			});

			if (response.ok) {
				setFormStatus("success");
				setFormData({ name: "", email: "", brief: "" }); // Limpa o form
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
				{/* --- LINHA DE COMANDO --- */}
				<div className="mb-10 text-lg">
					<span className="text-green-700">root@rpg-sistemas:~$</span>
					<span className="ml-2 text-green-400">{displayedText}</span>
					{bootStage < 3 && (
						<span className="animate-pulse ml-1">_</span>
					)}
				</div>

				<div className="space-y-16">
					{/* SEÇÃO 1: LOGO */}
					{bootStage >= 1 && (
						<div>
							<div className="mt-8 mb-12">
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

					{/* SEÇÃO 2: SERVIÇOS */}
					{bootStage >= 2 && (
						<div>
							<p className="mb-6 text-lg">
								<span className="text-green-700">
									root@rpg-sistemas:~$
								</span>{" "}
								ls -la /servicos
							</p>
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
						</div>
					)}

					{/* SEÇÃO 3: CONTATO */}
					{bootStage >= 3 && (
						<div>
							<p className="mb-6 text-lg">
								<span className="text-green-700">
									root@rpg-sistemas:~$
								</span>{" "}
								./fale_conosco.sh
							</p>

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

								{/* --- MENSAGENS DE FEEDBACK NO ESTILO TERMINAL --- */}
								{formStatus === "success" && (
									<p className="mt-4 text-green-400">
										&gt; [OK] DATA TRANSMITTED SUCCESSFULLY.
										WE WILL RESPOND SOON.
									</p>
								)}
								{formStatus === "error" && (
									<p className="mt-4 text-red-500">
										&gt; [ERROR] FAILED TO TRANSMIT OR
										MISSING DATA. PLEASE VERIFY AND RETRY.
									</p>
								)}
							</form>
						</div>
					)}

					{/* RODAPÉ */}
					{bootStage >= 3 && (
						<div className="mt-24 pt-8 border-t border-green-900/40 text-sm flex flex-col items-center opacity-60">
							<p className="text-green-700">
								Connection to @rpg-sistemas closed.
							</p>
							<p className="text-green-800 mt-2">
								© 2026 RPG SISTEMAS E ASSESSORIA ADMINISTRATIVA
								LTDA.
							</p>
							<div className="mt-8 text-green-700 flex items-center">
								<span>root@rpg-sistemas:~$</span>
								<span className="animate-pulse ml-2 w-2 h-4 bg-green-500 inline-block"></span>
							</div>
						</div>
					)}
				</div>
			</div>
		</main>
	);
}
