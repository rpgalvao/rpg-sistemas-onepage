"use client";

import { useState } from "react";
import {
	Layers,
	Cpu,
	Sparkles,
	ArrowRight,
	ExternalLink,
	MessageCircle,
	Mail,
	CheckCircle2,
	Clock,
	Smartphone,
	Server,
	Code2,
	Check,
	ChevronRight,
	ShieldCheck,
	Workflow,
	Menu,
	X,
	Boxes,
	Gauge,
} from "lucide-react";

export default function Home() {
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
	const [activeProjectTab, setActiveProjectTab] = useState<number>(0);

	// Form states
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		phone: "",
		service: "Sistema de Gestão Sob Medida",
		brief: "",
		website_hp: "", // Honeypot antispam
	});
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [formStatus, setFormStatus] = useState<"idle" | "success" | "error">(
		"idle",
	);
	const [errorMessage, setErrorMessage] = useState("");

	// WhatsApp direct URL (Replace with your actual commercial WhatsApp number)
	const whatsappNumber = "5541991453839";
	const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
		"Olá! Gostaria de conversar com a equipe da RPG Sistemas sobre um projeto de software sob medida.",
	)}`;

	const services = [
		{
			icon: <Layers className="w-6 h-6 text-emerald-400" />,
			title: "Sistemas Corporativos & Portais Web",
			subtitle: "Fullstack Architecture",
			desc: "Desenvolvimento de plataformas web seguras, com controle refinado de permissões (RBAC), dashboards de gestão e fluxos operacionais completos.",
			tags: ["React", "TypeScript", "Next.js", "Tailwind CSS"],
		},
		{
			icon: <Server className="w-6 h-6 text-emerald-400" />,
			title: "Engenharia de APIs & Microsserviços",
			subtitle: "Resilient Backends",
			desc: "Arquitetura sólida em camadas (Controllers, Services, Repositories), validação estrita com Zod, alta disponibilidade e bancos relacionais.",
			tags: ["Node.js", "Express", "Prisma ORM", "PostgreSQL"],
		},
		{
			icon: <Cpu className="w-6 h-6 text-emerald-400" />,
			title: "Desenvolvimento Ágil de MVPs",
			subtitle: "Speed to Market",
			desc: "Do conceito à versão operacional em tempo recorde para validar teses de negócio com clientes reais, sem acumular débito técnico.",
			tags: ["Laravel 13", "PHP", "Vue.js", "Fast Prototyping"],
		},
		{
			icon: <Smartphone className="w-6 h-6 text-emerald-400" />,
			title: "Aplicações Mobile-First & Campo",
			subtitle: "Offline & Field Operations",
			desc: "Interfaces ultra-rápidas para equipes de campo, credenciamento e captação tática de leads em eventos corporativos e feiras de negócios.",
			tags: ["Mobile-First", "Vite", "Glassmorphism", "OpenAPI"],
		},
	];

	const featuredProjects = [
		{
			id: "gos",
			tag: "SISTEMA OPERACIONAL",
			name: "RPG G.O.S",
			headline: "Gestão Completa de Ordens de Serviço & Suporte Técnico",
			summary:
				"Sistema robusto projetado para controlar todo o ciclo de vida de atendimentos, suporte técnico e manutenções. Gerencia laudos técnicos, alocação de equipes, controle de peças e documentação fotográfica.",
			status: "Em Produção / Ativo",
			statusColor: "emerald",
			stack: [
				"Node.js",
				"TypeScript",
				"Express",
				"Prisma ORM",
				"PostgreSQL",
				"Docker",
				"Zod Validation",
				"Multer & Sharp",
				"React",
				"Tailwind CSS",
			],
			highlights: [
				"Arquitetura em camadas desacopladas (Controllers, Services, Repositories).",
				"Validação estrita de contratos e schemas com Zod.",
				"Processamento e otimização de imagens de laudos com Multer e Sharp.",
				"Persistência em PostgreSQL conteinerizado com migrações automatizadas via Prisma.",
				"Painel de controle com interface limpa, pesquisa em tempo real e visualização de status.",
			],
			codeSnippet: `// Arquitetura em Camadas (Controller -> Service -> Repository)
export class OrdemServicoService {
  constructor(private osRepo: IOSRepository) {}

  async criarOS(dados: CriarOSDTO) {
    const validado = osSchema.parse(dados);
    return await this.osRepo.salvarComHistorico(validado);
  }
}`,
		},
		{
			id: "crm",
			tag: "SALES & PIPELINE",
			name: "RPG CRM PROSPECT",
			headline: "CRM Comercial & Inteligência de Funil de Vendas",
			summary:
				"Aplicação moderna focada em gestão de relacionamento comercial, acompanhamento de oportunidades, qualificação de leads e métricas de conversão para times de prospecção B2B.",
			status: "MVP em Validação",
			statusColor: "amber",
			stack: [
				"Laravel 13",
				"PHP 8.3+",
				"Vue.js",
				"Tailwind CSS",
				"MVC Architecture",
				"MySQL / PostgreSQL",
			],
			highlights: [
				"Arquitetura MVC robusta com separação limpa de domínios e regras de negócio.",
				"Visualização dinâmica de funil comercial com arrastar-e-soltar e estágios personalizados.",
				"Histórico unificado de interações, propostas enviadas e follow-ups agendados.",
				"Métricas automáticas de tempo de conversão e taxa de sucesso por operador.",
			],
			codeSnippet: `// Pipeline de Oportunidades & Negociação
class OportunidadeController extends Controller 
{
    public function atualizarEtapa(Request $request, Oportunidade $os) {
        $etapa = $request->validate(['etapa' => 'required|string']);
        $os->transicionarEtapa($etapa);
        return response()->json(['status' => 'updated']);
    }
}`,
		},
		{
			id: "leads",
			tag: "FIELD MARKETING & EVENTOS",
			name: "RPG EVENT LEADS",
			headline: "Coletor Tático de Leads para Feiras & Convenções",
			summary:
				"Aplicação mobile-first desenvolvida para estandes e feiras corporativas. Elimina a perda de cartões de visita ao permitir captura ágil de dados, fotos de crachás e dossiê qualificado em poucos segundos.",
			status: "Pronto para Campo",
			statusColor: "emerald",
			stack: [
				"React (Vite)",
				"Node.js (TS)",
				"Prisma ORM",
				"PostgreSQL",
				"Docker",
				"Swagger OpenAPI",
				"JWT (RBAC)",
				"Glassmorphism UI",
			],
			highlights: [
				"Design Mobile-First com tema escuro e Glassmorphism, otimizado para operação rápida sob iluminação de estande.",
				"Dossiê fotográfico do lead com anotação imediata de interesse e urgência de compra.",
				"Controle de acesso baseado em funções (RBAC) com autenticação segura via JWT.",
				"Documentação viva da API com Swagger OpenAPI 3.0 para fácil integração com CRMs.",
			],
			codeSnippet: `// Swagger OpenAPI + JWT RBAC
@Security('BearerAuth')
@Route('/api/v1/leads')
export class LeadsController {
  @Post('/')
  async registrarLead(@Body() dados: LeadDTO) {
    return await this.leadService.capturarLeadComDossie(dados);
  }
}`,
		},
	];

	const handleFormSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!formData.name.trim() || !formData.email.trim() || !formData.brief.trim()) {
			setErrorMessage("Por favor, preencha todos os campos obrigatórios (*).");
			setFormStatus("error");
			return;
		}

		setIsSubmitting(true);
		setFormStatus("idle");
		setErrorMessage("");

		try {
			const response = await fetch("/api/contact", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(formData),
			});

			const data = await response.json();

			if (response.ok && data.success) {
				setFormStatus("success");
				setFormData({
					name: "",
					email: "",
					phone: "",
					service: "Sistema de Gestão Sob Medida",
					brief: "",
					website_hp: "",
				});
			} else {
				setErrorMessage(data.error || "Ocorreu um erro ao enviar. Tente pelo WhatsApp.");
				setFormStatus("error");
			}
		} catch {
			setErrorMessage("Falha na conexão. Por favor, utilize o botão do WhatsApp.");
			setFormStatus("error");
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<div className="relative min-h-screen bg-[#080a0f] text-slate-100 overflow-x-hidden">
			{/* Ambient background glow & grid */}
			<div className="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none" />
			<div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[450px] bg-emerald-500/10 blur-[130px] rounded-full pointer-events-none" />

			{/* ================= HEADER / NAVBAR ================= */}
			<header className="sticky top-0 z-50 backdrop-blur-md bg-[#080a0f]/80 border-b border-white/5 transition-all">
				<div className="max-w-6xl mx-auto px-6 h-18 flex items-center justify-between">
					{/* Logo & Brand */}
					<a href="#" className="flex items-center gap-3 group">
						<div className="w-9 h-9 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 font-mono font-bold text-sm shadow-[0_0_15px_rgba(16,185,129,0.2)] group-hover:border-emerald-400/60 transition-colors">
							&lt;/&gt;
						</div>
						<div className="flex flex-col">
							<span className="font-bold tracking-tight text-white group-hover:text-emerald-300 transition-colors">
								@rpg <span className="text-emerald-400 font-normal">Sistemas</span>
							</span>
							<span className="text-[10px] text-slate-400 tracking-wider uppercase font-mono">
								Software Engineering
							</span>
						</div>
					</a>

					{/* Desktop Navigation */}
					<nav className="hidden md:flex items-center gap-8 text-sm text-slate-300 font-medium">
						<a
							href="#servicos"
							className="hover:text-emerald-400 transition-colors"
						>
							Soluções
						</a>
						<a
							href="#projetos"
							className="hover:text-emerald-400 transition-colors"
						>
							Cases & Sistemas
						</a>
						<a
							href="#engenharia"
							className="hover:text-emerald-400 transition-colors"
						>
							Engenharia
						</a>
						<a
							href="#contato"
							className="hover:text-emerald-400 transition-colors"
						>
							Contato
						</a>
					</nav>

					{/* Status badge & CTA Button */}
					<div className="hidden lg:flex items-center gap-4">
						<div className="flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/40 border border-emerald-800/40 text-xs font-mono text-emerald-300">
							<span className="relative flex h-2 w-2">
								<span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
								<span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
							</span>
							Disponível para Projetos
						</div>
						<a
							href="#contato"
							className="px-4 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-semibold text-xs tracking-wide transition-all shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:shadow-[0_0_25px_rgba(16,185,129,0.5)]"
						>
							Solicitar Briefing
						</a>
					</div>

					{/* Mobile Menu Button */}
					<button
						type="button"
						onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
						className="md:hidden p-2 text-slate-400 hover:text-white"
						aria-label="Abrir menu"
					>
						{mobileMenuOpen ? (
							<X className="w-6 h-6" />
						) : (
							<Menu className="w-6 h-6" />
						)}
					</button>
				</div>

				{/* Mobile Drawer */}
				{mobileMenuOpen && (
					<div className="md:hidden border-b border-white/10 bg-[#0c1018] px-6 py-6 flex flex-col gap-4">
						<a
							href="#servicos"
							onClick={() => setMobileMenuOpen(false)}
							className="text-slate-200 py-2 border-b border-white/5"
						>
							Soluções
						</a>
						<a
							href="#projetos"
							onClick={() => setMobileMenuOpen(false)}
							className="text-slate-200 py-2 border-b border-white/5"
						>
							Cases & Sistemas
						</a>
						<a
							href="#engenharia"
							onClick={() => setMobileMenuOpen(false)}
							className="text-slate-200 py-2 border-b border-white/5"
						>
							Engenharia
						</a>
						<a
							href="#contato"
							onClick={() => setMobileMenuOpen(false)}
							className="text-slate-200 py-2"
						>
							Contato
						</a>
						<div className="pt-2 flex flex-col gap-3">
							<a
								href="#contato"
								onClick={() => setMobileMenuOpen(false)}
								className="text-center py-2.5 rounded-lg bg-emerald-500 text-slate-950 font-bold text-sm"
							>
								Solicitar Briefing
							</a>
							<a
								href={whatsappUrl}
								target="_blank"
								rel="noopener noreferrer"
								className="text-center py-2.5 rounded-lg border border-emerald-500/40 text-emerald-400 font-semibold text-sm flex items-center justify-center gap-2"
							>
								<MessageCircle className="w-4 h-4" /> Conversar no WhatsApp
							</a>
						</div>
					</div>
				)}
			</header>

			<main className="relative z-10">
				{/* ================= HERO SECTION ================= */}
				<section className="pt-20 pb-24 md:pt-28 md:pb-32 px-6 max-w-6xl mx-auto">
					<div className="flex flex-col items-center text-center">
						{/* Eyebrow Pill */}
						<div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-950/40 border border-emerald-500/20 text-emerald-300 text-xs font-medium mb-8 backdrop-blur-sm">
							<Sparkles className="w-3.5 h-3.5 text-emerald-400" />
							<span>ENGENHARIA DE SOFTWARE & DESENVOLVIMENTO SOB MEDIDA</span>
						</div>

						{/* Main Heading */}
						<h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight max-w-4xl text-white leading-[1.1]">
							Transformamos regras complexas em{" "}
							<span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-emerald-200 bg-clip-text text-transparent">
								software de alta performance.
							</span>
						</h1>

						{/* Subtitle */}
						<p className="mt-6 text-lg sm:text-xl text-slate-300 max-w-2xl font-normal leading-relaxed">
							Desenvolvemos sistemas corporativos, CRMs sob medida e aplicações
							web com arquitetura resiliente, tipagem estrita e foco direto nos
							resultados da sua operação.
						</p>

						{/* Action Buttons */}
						<div className="mt-10 flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
							<a
								href="#contato"
								className="w-full sm:w-auto px-8 py-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-base flex items-center justify-center gap-2.5 transition-all shadow-[0_0_30px_rgba(16,185,129,0.35)] hover:shadow-[0_0_40px_rgba(16,185,129,0.5)] cursor-pointer"
							>
								<span>Iniciar Proposta de Projeto</span>
								<ArrowRight className="w-4 h-4" />
							</a>

							<a
								href={whatsappUrl}
								target="_blank"
								rel="noopener noreferrer"
								className="w-full sm:w-auto px-7 py-4 rounded-xl bg-slate-900/80 hover:bg-slate-800/90 text-slate-200 hover:text-white border border-white/10 font-semibold text-base flex items-center justify-center gap-2.5 transition-all backdrop-blur-sm"
							>
								<MessageCircle className="w-5 h-5 text-emerald-400" />
								<span>Falar no WhatsApp</span>
							</a>
						</div>

						{/* Engineering Trust Badges */}
						<div className="mt-16 pt-8 border-t border-white/5 grid grid-cols-2 md:grid-cols-4 gap-6 text-left w-full max-w-4xl">
							<div className="flex flex-col">
								<span className="text-2xl font-bold text-white font-mono">
									100%
								</span>
								<span className="text-xs text-slate-400 mt-1">
									Código tipado & arquitetura em camadas
								</span>
							</div>
							<div className="flex flex-col">
								<span className="text-2xl font-bold text-emerald-400 font-mono">
									Docker
								</span>
								<span className="text-xs text-slate-400 mt-1">
									Ambientes padronizados & reproduzíveis
								</span>
							</div>
							<div className="flex flex-col">
								<span className="text-2xl font-bold text-white font-mono">
									Zod & Prisma
								</span>
								<span className="text-xs text-slate-400 mt-1">
									Validação de schemas & integridade
								</span>
							</div>
							<div className="flex flex-col">
								<span className="text-2xl font-bold text-emerald-400 font-mono">
									&lt;24h
								</span>
								<span className="text-xs text-slate-400 mt-1">
									SLA de resposta para novos briefings
								</span>
							</div>
						</div>

						{/* ================= TECH TERMINAL PREVIEW WIDGET ================= */}
						{/* A modern Raycast/VS Code style terminal celebrating engineering roots */}
						<div className="mt-16 w-full max-w-4xl rounded-2xl border border-white/10 bg-[#0d121d]/90 shadow-2xl overflow-hidden text-left backdrop-blur-md">
							{/* Terminal Window Header */}
							<div className="px-4 py-3 bg-[#0a0e17] border-b border-white/5 flex items-center justify-between">
								<div className="flex items-center gap-2">
									<div className="w-3 h-3 rounded-full bg-rose-500/80" />
									<div className="w-3 h-3 rounded-full bg-amber-500/80" />
									<div className="w-3 h-3 rounded-full bg-emerald-500/80" />
									<span className="ml-2 text-xs font-mono text-slate-400">
										{"rpg-sistemas-core // architecture.ts"}
									</span>
								</div>
								<div className="flex items-center gap-2 text-xs font-mono text-emerald-400">
									<span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
									BUILD_STABLE
								</div>
							</div>

							{/* Terminal Code Canvas */}
							<div className="p-6 font-mono text-xs sm:text-sm text-slate-300 leading-relaxed overflow-x-auto">
								<p className="text-slate-500">{"// RPG Sistemas Engineering Blueprint"}</p>
								<p className="mt-1">
									<span className="text-purple-400">import</span> &#123;{" "}
									<span className="text-emerald-300">CleanArchitecture</span>,{" "}
									<span className="text-emerald-300">TypeSafePipeline</span> &#125;{" "}
									<span className="text-purple-400">from</span>{" "}
									<span className="text-amber-300">&quot;@rpg/core&quot;</span>;
								</p>
								<p className="mt-3 text-slate-400">
									<span className="text-blue-400">const</span>{" "}
									<span className="text-yellow-200">companyCapabilities</span> = &#123;
								</p>
								<p className="ml-4">
									<span className="text-slate-400">operationalSystems:</span> [
									<span className="text-emerald-300">&quot;RPG_G.O.S (Node/React/Prisma)&quot;</span>,{" "}
									<span className="text-emerald-300">&quot;CRM_PROSPECT (Laravel/Vue)&quot;</span>],
								</p>
								<p className="ml-4">
									<span className="text-slate-400">leadGeneration:</span>{" "}
									<span className="text-emerald-300">&quot;EVENT_LEADS (Mobile-First / Vite)&quot;</span>,
								</p>
								<p className="ml-4">
									<span className="text-slate-400">infrastructure:</span> [
									<span className="text-amber-300">&quot;Docker&quot;</span>,{" "}
									<span className="text-amber-300">&quot;PostgreSQL&quot;</span>,{" "}
									<span className="text-amber-300">&quot;CI/CD&quot;</span>],
								</p>
								<p className="ml-4 text-emerald-400">
									status: <span className="text-emerald-300">&quot;READY_FOR_DEPLOYMENT&quot;</span>
								</p>
								<p className="text-slate-400">&#125;;</p>
								<div className="mt-4 pt-4 border-t border-white/5 flex items-center gap-2 text-emerald-400">
									<span className="text-slate-500">root@rpg-sistemas:~$</span>
									<span>./deliver_production_ready_software.sh --precision</span>
									<span className="w-2 h-4 bg-emerald-400 inline-block animate-pulse ml-1" />
								</div>
							</div>
						</div>
					</div>
				</section>

				{/* ================= SERVICES SECTION ================= */}
				<section id="servicos" className="py-24 px-6 border-t border-white/5 bg-[#0a0d14]/60">
					<div className="max-w-6xl mx-auto">
						<div className="text-center max-w-2xl mx-auto mb-16">
							<div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/40 border border-emerald-500/20 text-emerald-300 text-xs font-mono mb-4">
								<Boxes className="w-3.5 h-3.5 text-emerald-400" />
								CAPACIDADES & SERVIÇOS
							</div>
							<h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
								Soluções de software desenvolvidas para durar.
							</h2>
							<p className="mt-4 text-slate-400 text-base">
								Eliminamos gambiarras e retrabalho. Do back-end robusto à experiência
								visual de ponta a ponta.
							</p>
						</div>

						<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
							{services.map((svc, index) => (
								<div
									key={index}
									className="group p-8 rounded-2xl bg-[#0e1320]/70 border border-white/5 hover:border-emerald-500/40 transition-all duration-300 hover:shadow-[0_0_30px_rgba(16,185,129,0.1)] flex flex-col justify-between"
								>
									<div>
										<div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
											{svc.icon}
										</div>
										<span className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-semibold">
											{svc.subtitle}
										</span>
										<h3 className="text-xl font-bold text-white mt-1 mb-3">
											{svc.title}
										</h3>
										<p className="text-slate-300 text-sm leading-relaxed mb-6">
											{svc.desc}
										</p>
									</div>

									<div className="flex flex-wrap gap-2 pt-4 border-t border-white/5">
										{svc.tags.map((tag, i) => (
											<span
												key={i}
												className="px-2.5 py-1 rounded-md bg-white/5 border border-white/5 text-[11px] font-mono text-slate-300"
											>
												{tag}
											</span>
										))}
									</div>
								</div>
							))}
						</div>
					</div>
				</section>

				{/* ================= FEATURED PROJECTS SHOWCASE ================= */}
				<section id="projetos" className="py-28 px-6 max-w-6xl mx-auto">
					<div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
						<div>
							<div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/40 border border-emerald-500/20 text-emerald-300 text-xs font-mono mb-4">
								<Workflow className="w-3.5 h-3.5 text-emerald-400" />
								NOSSO PORTFÓLIO DE SISTEMAS
							</div>
							<h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
								Projetos & Tecnologias em Produção
							</h2>
							<p className="mt-3 text-slate-400 max-w-xl text-base">
								Aplicações ativas desenvolvidas pela RPG Sistemas com diferentes
								stacks, sempre priorizando escalabilidade e segurança.
							</p>
						</div>

						{/* Project Tabs Switcher */}
						<div className="flex p-1 rounded-xl bg-slate-900 border border-white/10 self-start md:self-auto overflow-x-auto">
							{featuredProjects.map((proj, idx) => (
								<button
									key={proj.id}
									type="button"
									onClick={() => setActiveProjectTab(idx)}
									className={`px-4 py-2 rounded-lg text-xs font-mono font-medium transition-all cursor-pointer whitespace-nowrap ${activeProjectTab === idx
											? "bg-emerald-500 text-slate-950 font-bold shadow-[0_0_15px_rgba(16,185,129,0.3)]"
											: "text-slate-400 hover:text-white"
										}`}
								>
									{proj.name}
								</button>
							))}
						</div>
					</div>

					{/* Active Project Detailed Card */}
					{featuredProjects.map((proj, idx) => {
						if (idx !== activeProjectTab) return null;

						return (
							<div
								key={proj.id}
								className="rounded-2xl border border-emerald-500/30 bg-[#0d121c] p-8 md:p-12 shadow-2xl relative overflow-hidden transition-all duration-300"
							>
								{/* Subtle glow orb */}
								<div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 blur-[100px] pointer-events-none" />

								<div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
									{/* Left Column: Details */}
									<div className="lg:col-span-7 flex flex-col justify-between">
										<div>
											<div className="flex flex-wrap items-center gap-3 mb-4">
												<span className="px-3 py-1 rounded-full bg-emerald-950/60 border border-emerald-500/30 text-xs font-mono text-emerald-300 font-semibold">
													{proj.tag}
												</span>
												<span className="flex items-center gap-1.5 text-xs font-mono text-slate-400">
													<span className="w-2 h-2 rounded-full bg-emerald-400" />
													{proj.status}
												</span>
											</div>

											<h3 className="text-3xl font-extrabold text-white tracking-tight">
												{proj.name}
											</h3>
											<p className="text-lg text-emerald-400 font-medium mt-1 mb-4">
												{proj.headline}
											</p>
											<p className="text-slate-300 text-base leading-relaxed mb-8">
												{proj.summary}
											</p>

											<div className="space-y-3 mb-8">
												<h4 className="text-xs uppercase font-mono text-slate-400 tracking-wider font-semibold">
													Destaques de Engenharia:
												</h4>
												<ul className="space-y-2.5">
													{proj.highlights.map((item, i) => (
														<li key={i} className="flex items-start gap-3 text-sm text-slate-200">
															<CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
															<span>{item}</span>
														</li>
													))}
												</ul>
											</div>
										</div>

										<div>
											<h4 className="text-xs uppercase font-mono text-slate-400 tracking-wider font-semibold mb-3">
												Core Stack:
											</h4>
											<div className="flex flex-wrap gap-2">
												{proj.stack.map((st, i) => (
													<span
														key={i}
														className="px-3 py-1 rounded-lg bg-emerald-950/30 border border-emerald-800/40 text-xs font-mono text-emerald-300"
													>
														{st}
													</span>
												))}
											</div>
										</div>
									</div>

									{/* Right Column: Code Window / Architecture Snippet */}
									<div className="lg:col-span-5 flex flex-col justify-center">
										<div className="rounded-xl border border-white/10 bg-[#090d14] overflow-hidden shadow-xl">
											<div className="px-4 py-2.5 bg-[#06080e] border-b border-white/5 flex items-center justify-between text-xs font-mono text-slate-400">
												<div className="flex items-center gap-2">
													<Code2 className="w-3.5 h-3.5 text-emerald-400" />
													<span>Snippet de Arquitetura</span>
												</div>
												<span className="text-[10px] text-slate-500">Read-only</span>
											</div>
											<pre className="p-5 font-mono text-xs text-slate-300 overflow-x-auto leading-relaxed">
												<code>{proj.codeSnippet}</code>
											</pre>
										</div>

										<div className="mt-6 p-4 rounded-xl bg-white/[0.02] border border-white/5 flex items-center justify-between">
											<div className="flex items-center gap-3">
												<ShieldCheck className="w-5 h-5 text-emerald-400" />
												<div className="text-xs">
													<p className="font-semibold text-white">
														Validação & Segurança
													</p>
													<p className="text-slate-400">
														Padrões corporativos de código
													</p>
												</div>
											</div>
											<a
												href="#contato"
												className="text-xs font-mono font-semibold text-emerald-400 hover:text-emerald-300 flex items-center gap-1"
											>
												Consultar este modelo <ChevronRight className="w-3.5 h-3.5" />
											</a>
										</div>
									</div>
								</div>
							</div>
						);
					})}
				</section>

				{/* ================= ENGINEERING STANDARDS ================= */}
				<section id="engenharia" className="py-24 px-6 border-t border-white/5 bg-[#090c14]/80">
					<div className="max-w-6xl mx-auto">
						<div className="text-center max-w-2xl mx-auto mb-16">
							<div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/40 border border-emerald-500/20 text-emerald-300 text-xs font-mono mb-4">
								<Gauge className="w-3.5 h-3.5 text-emerald-400" />
								PADRÕES DE DESENVOLVIMENTO
							</div>
							<h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
								Por que confiar seu projeto à RPG Sistemas?
							</h2>
							<p className="mt-4 text-slate-400 text-base">
								Entregamos software com o mesmo nível de rigor de grandes produtos
								tecnológicos.
							</p>
						</div>

						<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
							<div className="p-8 rounded-2xl bg-[#0c101a] border border-white/5 hover:border-emerald-500/30 transition-all">
								<div className="w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 font-mono font-bold text-sm mb-6">
									01
								</div>
								<h3 className="text-lg font-bold text-white mb-2">
									Arquitetura Desacoplada (DDD & SOLID)
								</h3>
								<p className="text-slate-400 text-sm leading-relaxed">
									Regras de negócio isoladas de frameworks e bibliotecas. Se a sua
									empresa crescer ou precisar trocar de infraestrutura, o núcleo do
									sistema permanece protegido.
								</p>
							</div>

							<div className="p-8 rounded-2xl bg-[#0c101a] border border-white/5 hover:border-emerald-500/30 transition-all">
								<div className="w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 font-mono font-bold text-sm mb-6">
									02
								</div>
								<h3 className="text-lg font-bold text-white mb-2">
									Tipagem Estrita & Schemas com Zod
								</h3>
								<p className="text-slate-400 text-sm leading-relaxed">
									Zero tolerância a erros em tempo de execução causados por dados
									inválidos. Todas as entradas de APIs passam por contratos
									estritamente tipados.
								</p>
							</div>

							<div className="p-8 rounded-2xl bg-[#0c101a] border border-white/5 hover:border-emerald-500/30 transition-all">
								<div className="w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 font-mono font-bold text-sm mb-6">
									03
								</div>
								<h3 className="text-lg font-bold text-white mb-2">
									Docker & Ambientes Reprodutíveis
								</h3>
								<p className="text-slate-400 text-sm leading-relaxed">
									Chega do clássico &quot;na minha máquina funciona&quot;. Bancos de
									dados, filas e aplicações rodam em containers configurados para
									deploys consistentes em nuvem.
								</p>
							</div>
						</div>
					</div>
				</section>

				{/* ================= CONTACT & BRIEFING SECTION ================= */}
				<section id="contato" className="py-28 px-6 max-w-6xl mx-auto">
					<div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
						{/* Left Column: Direct channels & Value */}
						<div className="lg:col-span-5">
							<div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/40 border border-emerald-500/20 text-emerald-300 text-xs font-mono mb-6">
								<MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
								INICIE UMA CONVERSA
							</div>
							<h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
								Pronto para transformar sua ideia em software real?
							</h2>
							<p className="mt-4 text-slate-300 text-base leading-relaxed">
								Preencha o formulário ao lado para solicitar uma avaliação técnica e
								comercial. Se preferir agilidade total, chame-nos diretamente no WhatsApp.
							</p>

							{/* Fast WhatsApp Callout Card */}
							<div className="mt-8 p-6 rounded-2xl bg-emerald-950/20 border border-emerald-500/30 flex flex-col gap-4">
								<div className="flex items-center gap-3">
									<div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center text-emerald-400">
										<MessageCircle className="w-5 h-5" />
									</div>
									<div>
										<p className="text-sm font-bold text-white">
											Atendimento Imediato via WhatsApp
										</p>
										<p className="text-xs text-slate-400">
											Canal direto com o time de engenharia
										</p>
									</div>
								</div>
								<a
									href={whatsappUrl}
									target="_blank"
									rel="noopener noreferrer"
									className="w-full py-3 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm flex items-center justify-center gap-2 transition-colors"
								>
									<span>Abrir Conversa no WhatsApp</span>
									<ExternalLink className="w-4 h-4" />
								</a>
							</div>

							{/* Contact Information */}
							<div className="mt-8 space-y-4 text-sm text-slate-300">
								<div className="flex items-center gap-3">
									<Mail className="w-4 h-4 text-emerald-400" />
									<span>contato@rpgsistemas.com.br</span>
								</div>
								<div className="flex items-center gap-3">
									<Clock className="w-4 h-4 text-emerald-400" />
									<span>Retorno em até 24 horas úteis</span>
								</div>
							</div>

							{/* Corporate details */}
							<div className="mt-10 pt-6 border-t border-white/5 text-xs text-slate-500 space-y-1">
								<p className="font-mono text-slate-400">
									RPG SISTEMAS E ASSESSORIA ADMINISTRATIVA LTDA
								</p>
								<p>Curitiba - PR &bull; Atendimento em Todo o Brasil</p>
							</div>
						</div>

						{/* Right Column: Modern Glass Form */}
						<div className="lg:col-span-7">
							<div className="rounded-2xl border border-white/10 bg-[#0d121c]/90 p-8 sm:p-10 shadow-2xl backdrop-blur-md">
								<h3 className="text-xl font-bold text-white mb-2">
									Formulário de Briefing
								</h3>
								<p className="text-sm text-slate-400 mb-8">
									Conte-nos brevemente o escopo ou problema que você precisa resolver.
								</p>

								<form onSubmit={handleFormSubmit} className="space-y-5">
									{/* Anti-spam Honeypot Field (Invisible to real users) */}
									<div className="hidden" aria-hidden="true">
										<label htmlFor="website_hp">Não preencha este campo</label>
										<input
											id="website_hp"
											type="text"
											tabIndex={-1}
											autoComplete="off"
											value={formData.website_hp}
											onChange={(e) =>
												setFormData({ ...formData, website_hp: e.target.value })
											}
										/>
									</div>

									{/* Name field */}
									<div>
										<label
											htmlFor="form-name"
											className="block text-xs font-mono uppercase text-slate-400 mb-2 font-semibold"
										>
											Seu Nome ou Empresa *
										</label>
										<input
											id="form-name"
											type="text"
											required
											disabled={isSubmitting}
											value={formData.name}
											onChange={(e) =>
												setFormData({ ...formData, name: e.target.value })
											}
											placeholder="Ex: João da Silva ou Empresa X"
											className="w-full px-4 py-3 rounded-xl bg-slate-900/80 border border-white/10 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 text-white placeholder-slate-500 text-sm outline-none transition-all"
										/>
									</div>

									{/* Email & Phone fields */}
									<div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
										<div>
											<label
												htmlFor="form-email"
												className="block text-xs font-mono uppercase text-slate-400 mb-2 font-semibold"
											>
												Seu E-mail Profissional *
											</label>
											<input
												id="form-email"
												type="email"
												required
												disabled={isSubmitting}
												value={formData.email}
												onChange={(e) =>
													setFormData({ ...formData, email: e.target.value })
												}
												placeholder="voce@empresa.com.br"
												className="w-full px-4 py-3 rounded-xl bg-slate-900/80 border border-white/10 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 text-white placeholder-slate-500 text-sm outline-none transition-all"
											/>
										</div>

										<div>
											<label
												htmlFor="form-phone"
												className="block text-xs font-mono uppercase text-slate-400 mb-2 font-semibold"
											>
												WhatsApp / Telefone
											</label>
											<input
												id="form-phone"
												type="tel"
												disabled={isSubmitting}
												value={formData.phone}
												onChange={(e) =>
													setFormData({ ...formData, phone: e.target.value })
												}
												placeholder="(11) 99999-9999"
												className="w-full px-4 py-3 rounded-xl bg-slate-900/80 border border-white/10 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 text-white placeholder-slate-500 text-sm outline-none transition-all"
											/>
										</div>
									</div>

									{/* Service Selector */}
									<div>
										<label
											htmlFor="form-service"
											className="block text-xs font-mono uppercase text-slate-400 mb-2 font-semibold"
										>
											Tipo de Solução Desejada
										</label>
										<select
											id="form-service"
											disabled={isSubmitting}
											value={formData.service}
											onChange={(e) =>
												setFormData({ ...formData, service: e.target.value })
											}
											className="w-full px-4 py-3 rounded-xl bg-slate-900/80 border border-white/10 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 text-white text-sm outline-none transition-all"
										>
											<option value="Sistema de Gestão / Ordem de Serviço (G.O.S)">
												Sistema de Gestão / Ordem de Serviço (G.O.S)
											</option>
											<option value="CRM & Pipeline de Vendas Sob Medida">
												CRM & Pipeline de Vendas Sob Medida
											</option>
											<option value="Coletor Mobile para Feiras & Eventos">
												Coletor Mobile para Feiras & Eventos
											</option>
											<option value="Desenvolvimento de API & Backend">
												Desenvolvimento de API & Backend
											</option>
											<option value="Outro / Projeto Específico">
												Outro / Projeto Específico
											</option>
										</select>
									</div>

									{/* Briefing Textarea */}
									<div>
										<label
											htmlFor="form-brief"
											className="block text-xs font-mono uppercase text-slate-400 mb-2 font-semibold"
										>
											Breve Descrição do Projeto *
										</label>
										<textarea
											id="form-brief"
											rows={4}
											required
											disabled={isSubmitting}
											value={formData.brief}
											onChange={(e) =>
												setFormData({ ...formData, brief: e.target.value })
											}
											placeholder="Conte sobre o seu objetivo, funcionalidades necessárias ou prazo estimado..."
											className="w-full px-4 py-3 rounded-xl bg-slate-900/80 border border-white/10 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 text-white placeholder-slate-500 text-sm outline-none transition-all resize-none"
										/>
									</div>

									{/* Submit Button */}
									<button
										type="submit"
										disabled={isSubmitting}
										className="w-full py-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm tracking-wide transition-all shadow-[0_0_25px_rgba(16,185,129,0.3)] hover:shadow-[0_0_35px_rgba(16,185,129,0.5)] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer"
									>
										{isSubmitting ? (
											<>
												<span className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
												<span>Enviando proposta...</span>
											</>
										) : (
											<>
												<span>Enviar Solicitação de Briefing</span>
												<ArrowRight className="w-4 h-4" />
											</>
										)}
									</button>

									{/* Feedback status */}
									{formStatus === "success" && (
										<div className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-500/40 text-emerald-300 text-sm flex items-start gap-3">
											<Check className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
											<div>
												<p className="font-bold">Mensagem enviada com sucesso!</p>
												<p className="text-xs text-emerald-400/80 mt-1">
													Nossa equipe técnica analisará o briefing e entrará em
													contato em até 24 horas úteis.
												</p>
											</div>
										</div>
									)}

									{formStatus === "error" && (
										<div className="p-4 rounded-xl bg-rose-950/40 border border-rose-500/40 text-rose-300 text-sm">
											<p className="font-bold">Não foi possível enviar a mensagem</p>
											<p className="text-xs text-rose-400/80 mt-1">
												{errorMessage || "Verifique os dados e tente novamente ou clique no botão do WhatsApp."}
											</p>
										</div>
									)}
								</form>
							</div>
						</div>
					</div>
				</section>
			</main>

			{/* ================= FOOTER ================= */}
			<footer className="border-t border-white/5 bg-[#06080e] py-12 px-6">
				<div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
					<div className="flex items-center gap-3">
						<div className="w-7 h-7 rounded-md bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 font-mono font-bold text-xs">
							&lt;/&gt;
						</div>
						<div className="text-xs text-slate-400">
							<span className="text-white font-semibold">@rpg Sistemas</span> &bull; ©{" "}
							{new Date().getFullYear()} Todos os direitos reservados.
						</div>
					</div>

					<div className="flex items-center gap-6 text-xs text-slate-400">
						<a href="#servicos" className="hover:text-emerald-400 transition-colors">
							Soluções
						</a>
						<a href="#projetos" className="hover:text-emerald-400 transition-colors">
							Projetos
						</a>
						<a href="#contato" className="hover:text-emerald-400 transition-colors">
							Contato
						</a>
						<a
							href={whatsappUrl}
							target="_blank"
							rel="noopener noreferrer"
							className="text-emerald-400 hover:text-emerald-300 transition-colors font-medium flex items-center gap-1"
						>
							WhatsApp <ExternalLink className="w-3 h-3" />
						</a>
					</div>
				</div>
			</footer>
		</div>
	);
}
