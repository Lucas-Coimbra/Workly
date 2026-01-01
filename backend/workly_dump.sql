--
-- PostgreSQL database dump
--

\restrict mydvxsXEdPSEjEcd1EeC6MC0A7qQWShb40kSOGOBN18spsejlt9TiZdcQnu9tah

-- Dumped from database version 15.15 (Debian 15.15-1.pgdg13+1)
-- Dumped by pg_dump version 15.15 (Debian 15.15-1.pgdg13+1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: public; Type: SCHEMA; Schema: -; Owner: postgres
--

-- *not* creating schema, since initdb creates it


ALTER SCHEMA public OWNER TO postgres;

--
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: postgres
--

COMMENT ON SCHEMA public IS '';


--
-- Name: OwnerType; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."OwnerType" AS ENUM (
    'individual',
    'company'
);


ALTER TYPE public."OwnerType" OWNER TO postgres;

--
-- Name: PaymentType; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."PaymentType" AS ENUM (
    'HOURLY',
    'DAILY',
    'MONTHLY'
);


ALTER TYPE public."PaymentType" OWNER TO postgres;

--
-- Name: ReservationMode; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."ReservationMode" AS ENUM (
    'HOURLY',
    'DAILY',
    'MONTHLY'
);


ALTER TYPE public."ReservationMode" OWNER TO postgres;

--
-- Name: ReservationStatus; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."ReservationStatus" AS ENUM (
    'PENDING',
    'CONFIRMED',
    'CANCELED'
);


ALTER TYPE public."ReservationStatus" OWNER TO postgres;

--
-- Name: Role; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."Role" AS ENUM (
    'MEMBER',
    'ADMIN',
    'SUPPORT'
);


ALTER TYPE public."Role" OWNER TO postgres;

--
-- Name: SpaceRequestStatus; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."SpaceRequestStatus" AS ENUM (
    'PENDING',
    'APPROVED',
    'REJECTED'
);


ALTER TYPE public."SpaceRequestStatus" OWNER TO postgres;

--
-- Name: SupportPriority; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."SupportPriority" AS ENUM (
    'low',
    'medium',
    'high'
);


ALTER TYPE public."SupportPriority" OWNER TO postgres;

--
-- Name: SupportTicketStatus; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."SupportTicketStatus" AS ENUM (
    'open',
    'progress',
    'resolved'
);


ALTER TYPE public."SupportTicketStatus" OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: Notification; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Notification" (
    id integer NOT NULL,
    title text NOT NULL,
    message text NOT NULL,
    type text DEFAULT 'INFO'::text NOT NULL,
    "userId" integer NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "deletedAt" timestamp(3) without time zone,
    "readAt" timestamp(3) without time zone
);


ALTER TABLE public."Notification" OWNER TO postgres;

--
-- Name: Notification_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Notification_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Notification_id_seq" OWNER TO postgres;

--
-- Name: Notification_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Notification_id_seq" OWNED BY public."Notification".id;


--
-- Name: PasswordResetToken; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."PasswordResetToken" (
    id integer NOT NULL,
    token text NOT NULL,
    "userId" integer NOT NULL,
    used boolean DEFAULT false NOT NULL,
    "expiresAt" timestamp(3) without time zone NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public."PasswordResetToken" OWNER TO postgres;

--
-- Name: PasswordResetToken_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."PasswordResetToken_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."PasswordResetToken_id_seq" OWNER TO postgres;

--
-- Name: PasswordResetToken_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."PasswordResetToken_id_seq" OWNED BY public."PasswordResetToken".id;


--
-- Name: Plan; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Plan" (
    id integer NOT NULL,
    name text NOT NULL,
    price double precision NOT NULL,
    "monthlyHours" integer NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public."Plan" OWNER TO postgres;

--
-- Name: Plan_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Plan_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Plan_id_seq" OWNER TO postgres;

--
-- Name: Plan_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Plan_id_seq" OWNED BY public."Plan".id;


--
-- Name: Reservation; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Reservation" (
    id integer NOT NULL,
    date timestamp(3) without time zone NOT NULL,
    "startTime" timestamp(3) without time zone,
    "endTime" timestamp(3) without time zone,
    "userId" integer NOT NULL,
    paid boolean DEFAULT false NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "endDate" timestamp(3) without time zone,
    total double precision NOT NULL,
    "workspaceId" integer NOT NULL,
    "canceledAt" timestamp(3) without time zone,
    status public."ReservationStatus" DEFAULT 'PENDING'::public."ReservationStatus" NOT NULL,
    mode public."ReservationMode" NOT NULL
);


ALTER TABLE public."Reservation" OWNER TO postgres;

--
-- Name: Reservation_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Reservation_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Reservation_id_seq" OWNER TO postgres;

--
-- Name: Reservation_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Reservation_id_seq" OWNED BY public."Reservation".id;


--
-- Name: Room; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Room" (
    id integer NOT NULL,
    name text NOT NULL,
    capacity integer NOT NULL,
    "workspaceId" integer NOT NULL
);


ALTER TABLE public."Room" OWNER TO postgres;

--
-- Name: Room_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Room_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Room_id_seq" OWNER TO postgres;

--
-- Name: Room_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Room_id_seq" OWNED BY public."Room".id;


--
-- Name: SpaceRequest; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."SpaceRequest" (
    id integer NOT NULL,
    "ownerName" text NOT NULL,
    "ownerDocument" text NOT NULL,
    "ownerEmail" text NOT NULL,
    "ownerPhone" text NOT NULL,
    "spaceName" text NOT NULL,
    "spaceType" text NOT NULL,
    "spaceDescription" text NOT NULL,
    "zipCode" text NOT NULL,
    street text NOT NULL,
    number text NOT NULL,
    complement text,
    neighborhood text NOT NULL,
    city text NOT NULL,
    state text NOT NULL,
    "totalArea" integer,
    capacity integer,
    rooms integer,
    "pricePerHour" double precision,
    "pricePerDay" double precision,
    "pricePerMonth" double precision,
    "minimumBooking" integer,
    "additionalInfo" text,
    amenities text[],
    images text[],
    status public."SpaceRequestStatus" DEFAULT 'PENDING'::public."SpaceRequestStatus" NOT NULL,
    "reviewedById" integer,
    "reviewedAt" timestamp(3) without time zone,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "ownerType" public."OwnerType" NOT NULL
);


ALTER TABLE public."SpaceRequest" OWNER TO postgres;

--
-- Name: SpaceRequest_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."SpaceRequest_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."SpaceRequest_id_seq" OWNER TO postgres;

--
-- Name: SpaceRequest_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."SpaceRequest_id_seq" OWNED BY public."SpaceRequest".id;


--
-- Name: SupportMessage; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."SupportMessage" (
    id integer NOT NULL,
    message text NOT NULL,
    "isSupport" boolean DEFAULT false NOT NULL,
    "ticketId" integer NOT NULL,
    "authorId" integer,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public."SupportMessage" OWNER TO postgres;

--
-- Name: SupportMessage_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."SupportMessage_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."SupportMessage_id_seq" OWNER TO postgres;

--
-- Name: SupportMessage_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."SupportMessage_id_seq" OWNED BY public."SupportMessage".id;


--
-- Name: SupportTicket; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."SupportTicket" (
    id integer NOT NULL,
    title text NOT NULL,
    description text NOT NULL,
    category text NOT NULL,
    priority public."SupportPriority" NOT NULL,
    status public."SupportTicketStatus" DEFAULT 'open'::public."SupportTicketStatus" NOT NULL,
    "userId" integer NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    "resolvedAt" timestamp(3) without time zone
);


ALTER TABLE public."SupportTicket" OWNER TO postgres;

--
-- Name: SupportTicket_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."SupportTicket_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."SupportTicket_id_seq" OWNER TO postgres;

--
-- Name: SupportTicket_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."SupportTicket_id_seq" OWNED BY public."SupportTicket".id;


--
-- Name: User; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."User" (
    id integer NOT NULL,
    name text NOT NULL,
    email text NOT NULL,
    phone text,
    password text NOT NULL,
    role public."Role" DEFAULT 'MEMBER'::public."Role" NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    "planId" integer
);


ALTER TABLE public."User" OWNER TO postgres;

--
-- Name: UserSettings; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."UserSettings" (
    id integer NOT NULL,
    "userId" integer NOT NULL,
    "emailNotifications" boolean DEFAULT true NOT NULL,
    "smsNotifications" boolean DEFAULT false NOT NULL,
    "reservationReminders" boolean DEFAULT true NOT NULL,
    "promotionalEmails" boolean DEFAULT true NOT NULL,
    "weeklyReport" boolean DEFAULT false NOT NULL,
    language text DEFAULT 'pt-BR'::text NOT NULL,
    timezone text DEFAULT 'America/Sao_Paulo'::text NOT NULL,
    currency text DEFAULT 'BRL'::text NOT NULL,
    "twoFactorAuth" boolean DEFAULT false NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    "twoFactorExpiresAt" timestamp(3) without time zone,
    "twoFactorTempCode" text
);


ALTER TABLE public."UserSettings" OWNER TO postgres;

--
-- Name: UserSettings_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."UserSettings_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."UserSettings_id_seq" OWNER TO postgres;

--
-- Name: UserSettings_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."UserSettings_id_seq" OWNED BY public."UserSettings".id;


--
-- Name: User_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."User_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."User_id_seq" OWNER TO postgres;

--
-- Name: User_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."User_id_seq" OWNED BY public."User".id;


--
-- Name: Workspace; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Workspace" (
    id integer NOT NULL,
    name text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    address text NOT NULL,
    "approvedFromRequestId" integer,
    description text,
    email text NOT NULL,
    phone text,
    "additionalInfo" text,
    amenities text[],
    capacity integer,
    city text,
    complement text,
    images text[],
    "minimumBooking" integer,
    neighborhood text,
    number text,
    "pricePerDay" double precision,
    "pricePerHour" double precision,
    "pricePerMonth" double precision,
    state text,
    street text,
    "totalArea" integer,
    "totalRooms" integer,
    "zipCode" text,
    "spaceType" text NOT NULL
);


ALTER TABLE public."Workspace" OWNER TO postgres;

--
-- Name: Workspace_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Workspace_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Workspace_id_seq" OWNER TO postgres;

--
-- Name: Workspace_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Workspace_id_seq" OWNED BY public."Workspace".id;


--
-- Name: _prisma_migrations; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public._prisma_migrations (
    id character varying(36) NOT NULL,
    checksum character varying(64) NOT NULL,
    finished_at timestamp with time zone,
    migration_name character varying(255) NOT NULL,
    logs text,
    rolled_back_at timestamp with time zone,
    started_at timestamp with time zone DEFAULT now() NOT NULL,
    applied_steps_count integer DEFAULT 0 NOT NULL
);


ALTER TABLE public._prisma_migrations OWNER TO postgres;

--
-- Name: Notification id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Notification" ALTER COLUMN id SET DEFAULT nextval('public."Notification_id_seq"'::regclass);


--
-- Name: PasswordResetToken id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."PasswordResetToken" ALTER COLUMN id SET DEFAULT nextval('public."PasswordResetToken_id_seq"'::regclass);


--
-- Name: Plan id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Plan" ALTER COLUMN id SET DEFAULT nextval('public."Plan_id_seq"'::regclass);


--
-- Name: Reservation id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Reservation" ALTER COLUMN id SET DEFAULT nextval('public."Reservation_id_seq"'::regclass);


--
-- Name: Room id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Room" ALTER COLUMN id SET DEFAULT nextval('public."Room_id_seq"'::regclass);


--
-- Name: SpaceRequest id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."SpaceRequest" ALTER COLUMN id SET DEFAULT nextval('public."SpaceRequest_id_seq"'::regclass);


--
-- Name: SupportMessage id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."SupportMessage" ALTER COLUMN id SET DEFAULT nextval('public."SupportMessage_id_seq"'::regclass);


--
-- Name: SupportTicket id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."SupportTicket" ALTER COLUMN id SET DEFAULT nextval('public."SupportTicket_id_seq"'::regclass);


--
-- Name: User id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."User" ALTER COLUMN id SET DEFAULT nextval('public."User_id_seq"'::regclass);


--
-- Name: UserSettings id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserSettings" ALTER COLUMN id SET DEFAULT nextval('public."UserSettings_id_seq"'::regclass);


--
-- Name: Workspace id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Workspace" ALTER COLUMN id SET DEFAULT nextval('public."Workspace_id_seq"'::regclass);


--
-- Data for Name: Notification; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Notification" (id, title, message, type, "userId", "createdAt", "deletedAt", "readAt") FROM stdin;
1	Bem-vindo ao Workly 🎉	Sua conta foi criada com sucesso! Agora você já pode reservar espaços, gerenciar suas atividades e muito mais.	INFO	3	2025-12-23 18:45:59.541	\N	\N
\.


--
-- Data for Name: PasswordResetToken; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."PasswordResetToken" (id, token, "userId", used, "expiresAt", "createdAt") FROM stdin;
\.


--
-- Data for Name: Plan; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Plan" (id, name, price, "monthlyHours", "createdAt") FROM stdin;
4	BASIC	0	20	2025-12-31 19:49:37.278
5	GOLD	99.9	60	2025-12-31 19:49:37.934
6	PREMIUM	199.9	120	2025-12-31 19:49:37.963
\.


--
-- Data for Name: Reservation; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Reservation" (id, date, "startTime", "endTime", "userId", paid, "createdAt", "endDate", total, "workspaceId", "canceledAt", status, mode) FROM stdin;
1	2025-12-30 03:24:41.094	\N	\N	3	f	2025-12-30 03:38:16.544	2026-01-30 03:24:41.094	4000	3	2025-12-30 20:50:38.578	CANCELED	MONTHLY
2	2025-12-30 03:00:00	\N	\N	3	f	2025-12-31 01:12:33.111	2025-12-30 03:00:00	350	5	2025-12-31 01:12:40.612	CANCELED	DAILY
4	2025-12-30 03:00:00	2025-12-30 04:28:00	2025-12-30 20:28:00	3	f	2025-12-31 01:28:28.762	\N	320	2	2025-12-31 01:28:35.015	CANCELED	HOURLY
3	2025-12-30 03:00:00	\N	\N	3	f	2025-12-31 01:13:58.579	2026-01-30 03:00:00	4000	3	2025-12-31 02:41:01.225	CANCELED	MONTHLY
7	2025-12-30 03:00:00	2025-12-30 14:46:00	2025-12-30 19:52:00	3	f	2025-12-31 14:46:18.766	\N	153	3	2025-12-31 15:20:43.672	CANCELED	HOURLY
6	2025-12-30 03:00:00	2025-12-30 14:46:00	2025-12-30 19:52:00	3	f	2025-12-31 14:46:18.766	\N	153	3	2025-12-31 15:20:54.188	CANCELED	HOURLY
8	2025-12-30 03:00:00	2025-12-30 14:46:00	2025-12-30 19:52:00	3	t	2025-12-31 14:46:18.767	\N	153	3	\N	CONFIRMED	HOURLY
5	2025-12-30 03:00:00	\N	\N	3	f	2025-12-31 03:22:25.866	2025-12-30 03:00:00	350	5	2025-12-31 16:46:50.397	CANCELED	DAILY
9	2026-01-01 03:00:00	2026-01-01 12:00:00	2026-01-01 22:47:00	3	f	2025-12-31 16:47:31.891	\N	754.8333333333334	5	\N	PENDING	HOURLY
10	2025-12-31 03:00:00	\N	\N	3	f	2026-01-01 00:48:15.304	2025-12-31 03:00:00	350	5	2026-01-01 00:48:29.749	CANCELED	DAILY
\.


--
-- Data for Name: Room; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Room" (id, name, capacity, "workspaceId") FROM stdin;
1	Sala 1	10	2
2	Sala 2	10	2
3	Sala 3	10	2
4	Sala 4	10	2
5	Sala 5	10	2
6	Sala 1	10	3
7	Sala 2	10	3
8	Sala 3	10	3
9	Sala 4	10	3
10	Sala 5	10	3
11	Sala 6	10	3
12	Sala 7	10	3
13	Sala 8	10	3
17	Sala 1	34	5
18	Sala 2	34	5
19	Sala 3	34	5
20	Sala 1	10	6
21	Sala 2	10	6
22	Sala 3	10	6
\.


--
-- Data for Name: SpaceRequest; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."SpaceRequest" (id, "ownerName", "ownerDocument", "ownerEmail", "ownerPhone", "spaceName", "spaceType", "spaceDescription", "zipCode", street, number, complement, neighborhood, city, state, "totalArea", capacity, rooms, "pricePerHour", "pricePerDay", "pricePerMonth", "minimumBooking", "additionalInfo", amenities, images, status, "reviewedById", "reviewedAt", "createdAt", "ownerType") FROM stdin;
6	Gabigol Pelé Dennys da Silva	12345678900	lucas.gabriel_coimbra@hotmail.com	11988887777	Escritorium Pearson-Hadman	Escritório Executivo	Um espaço que é um escritório que é executivo. Chique.	56503-540	Rua Ataulfo Alves	656	Descendo o sétimo deserto	São Cristóvão	Arcoverde	PE	90	30	3	\N	500	\N	1	NÃO ENTRE A MEIA-NOITE!\r\nOU O LOBO MAU VAI TE PEGAR.	{SECURITY,ACCESSIBILITY,CAMERAS,POWER_OUTLETS,LOCKERS,WIFI,PRINTER,COFFEE,PHONE,FLEX_HOURS,AIR_CONDITIONING}	{"uploads\\\\bc4476c9113d6339eb7adc8cb5cf9b76","uploads\\\\ae2a51f21a884149b9dc83a6d9560d81","uploads\\\\51cf78270353c8d1bdb9a84c8427a30e","uploads\\\\a1d27347e8d89530986b0b85e3527320"}	APPROVED	1	2026-01-01 04:12:56.312	2026-01-01 04:04:33.532	individual
2	Tech Startup Ltda	9876543210001	contato@techstartup.com	11988887777	Tech Hub	Coworking	Espaço moderno com foco em tecnologia e inovação	87654321	Rua da Inovação	500	Sala 10	Bairro Tech	São Paulo	SP	200	80	8	30	200	4000	1	Café, Wi-Fi e Impressora disponíveis	{Wi-Fi,Café,Impressora}	{techhub1.jpg,techhub2.jpg}	REJECTED	1	2025-12-24 16:43:31.293	2025-12-24 16:43:06.777	company
3	Teste Lucas Coimbra	12345678901	teste.lucas@example.com	11999999999	Teste Coworking Central	Coworking	Espaço moderno e confortável para trabalho compartilhado	12345678	Rua Principal	100	Sala 1	Centro	São Paulo	SP	120	50	5	20	150	3000	1	Tem café gratuito	{Wi-Fi,Projetor,Ar-condicionado}	{url1.jpg,url2.jpg}	APPROVED	1	2025-12-24 18:35:53.133	2025-12-24 18:25:31.807	individual
4	Teste Tech Startup Ltda	9876543210001	teste.contato@techstartup.com	11988887777	Teste Tech Hub	Coworking	Espaço moderno com foco em tecnologia e inovação	87654321	Rua da Inovação	500	Sala 10	Bairro Tech	São Paulo	SP	200	80	8	30	200	4000	1	Café, Wi-Fi e Impressora disponíveis	{Wi-Fi,Café,Impressora}	{techhub1.jpg,techhub2.jpg}	APPROVED	1	2025-12-24 19:01:22.549	2025-12-24 18:26:21.367	company
1	Lucas Coimbra	12345678901	lucas@example.com	11999999999	Coworking Central	Coworking	Espaço moderno e confortável para trabalho compartilhado	12345678	Rua Principal	100	Sala 1	Centro	São Paulo	SP	120	50	5	20	150	3000	1	Tem café gratuito	{Wi-Fi,Projetor,Ar-condicionado}	{url1.jpg,url2.jpg}	REJECTED	1	2025-12-24 19:02:51.993	2025-12-24 16:04:33.91	individual
5	Robert Robertson	12345678900	lucas.gabriel_coimbra@hotmail.com	11999998888	Salão de Gala SDN - MechaMan	Sala de Eventos	Espaço moderno e culto para os verdadeiros apreciadores de Mecha.	01310-100	Avenida Paulista	1000	SDN Dispatch	Bela Vista	São Paulo	SP	300	100	3	70	350	2500	1	Funcionamento das 8h às 20h, funcionarios SDN tem descontos.	{ACCESSIBILITY,SECURITY,LOCKERS,CAMERAS,POWER_OUTLETS,FLEX_HOURS,AIR_CONDITIONING,OPEN_SPACE,PHONE,PARKING,WIFI,PRIVATE_ROOM,INDIVIDUAL_DESK,MONITOR,PRINTER}	{"uploads\\\\0363c6efafa55455b039c268042b1911","uploads\\\\e3a025d333cf85d0fd23a9ac328d08fc","uploads\\\\66fb414403da4a095622df325ebec031"}	APPROVED	1	2025-12-30 15:57:51.746	2025-12-26 21:01:44.491	individual
\.


--
-- Data for Name: SupportMessage; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."SupportMessage" (id, message, "isSupport", "ticketId", "authorId", "createdAt") FROM stdin;
1	A internet cai a cada 10 minutos	f	1	3	2025-12-23 22:24:31.985
2	O problema continua acontecendo hoje	f	1	3	2025-12-23 22:36:51.21
3	ei	f	1	3	2025-12-24 01:29:09.955
4	Vamos testar aqui	f	2	3	2025-12-24 02:14:44.679
5	pow	f	2	3	2025-12-28 16:20:59.937
\.


--
-- Data for Name: SupportTicket; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."SupportTicket" (id, title, description, category, priority, status, "userId", "createdAt", "updatedAt", "resolvedAt") FROM stdin;
1	Problema com internet	A internet cai a cada 10 minutos	network	high	progress	3	2025-12-23 22:24:31.985	2025-12-23 23:30:18.853	\N
2	Teste 1	Vamos testar aqui	general	low	open	3	2025-12-24 02:14:44.679	2025-12-24 02:14:44.679	\N
\.


--
-- Data for Name: User; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."User" (id, name, email, phone, password, role, "createdAt", "updatedAt", "planId") FROM stdin;
1	Admin	admin@workly.com	\N	$2b$10$YiteqHhbfXo1dyM5pBoVkeZzVEe8.NFe.gt1NtEZ5UQicyxq0Pxz.	ADMIN	2025-12-23 18:08:51.758	2025-12-23 18:08:51.758	\N
2	Support User	support@workly.com	\N	$2b$10$pFTPaQzGdji1wtV9HH1eEOiar0PJ95.6ZLN4Zmo/YTcKqtbdeIS3W	SUPPORT	2025-12-23 18:09:11.891	2025-12-23 18:09:11.891	\N
3	Lucas Teste	member@workly.com	87 9 88776655	$2b$10$FkmZKWDxlcRxMqjsjbE8muLiSQ4LOseS7NRXIC5OnV/cuCHufR6IG	MEMBER	2025-12-23 18:45:59.361	2025-12-23 18:45:59.361	\N
\.


--
-- Data for Name: UserSettings; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."UserSettings" (id, "userId", "emailNotifications", "smsNotifications", "reservationReminders", "promotionalEmails", "weeklyReport", language, timezone, currency, "twoFactorAuth", "createdAt", "updatedAt", "twoFactorExpiresAt", "twoFactorTempCode") FROM stdin;
51	1	t	f	t	t	f	pt-BR	America/Sao_Paulo	BRL	f	2025-12-29 01:16:39.722	2025-12-29 01:16:39.722	\N	\N
52	2	t	f	t	t	f	pt-BR	America/Sao_Paulo	BRL	f	2025-12-29 01:16:54.041	2025-12-29 01:16:54.041	\N	\N
1	3	t	f	t	t	f	en-US	America/Sao_Paulo	BRL	f	2025-12-27 01:16:08.848	2026-01-01 00:50:16.949	2025-12-28 23:39:24.193	754922
\.


--
-- Data for Name: Workspace; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Workspace" (id, name, "createdAt", "updatedAt", address, "approvedFromRequestId", description, email, phone, "additionalInfo", amenities, capacity, city, complement, images, "minimumBooking", neighborhood, number, "pricePerDay", "pricePerHour", "pricePerMonth", state, street, "totalArea", "totalRooms", "zipCode", "spaceType") FROM stdin;
2	Teste Coworking Central	2025-12-24 18:35:53.147	2025-12-30 17:39:57.671	Rua Principal, 100, São Paulo	3	Espaço moderno e confortável para trabalho compartilhado	teste.lucas@example.com	11999999999	Tem café gratuito	{WIFI,AIR_CONDITIONING,MONITOR}	50	São Paulo	Sala 1	{url1.jpg,url2.jpg}	1	Centro	100	150	20	3000	SP	Rua Principal	120	5	12345678	Coworking
3	Teste Tech Hub	2025-12-24 19:01:22.567	2025-12-30 17:39:57.671	Rua da Inovação, 500, São Paulo	4	Espaço moderno com foco em tecnologia e inovação	teste.contato@techstartup.com	11988887777	Café, Wi-Fi e Impressora disponíveis	{WIFI,COFFEE,PRINTER,PRIVATE_ROOM,PARKING}	80	São Paulo	Sala 10	{techhub1.jpg,techhub2.jpg}	1	Bairro Tech	500	200	30	4000	SP	Rua da Inovação	200	8	87654321	Coworking
5	Salão de Gala SDN - MechaMan	2025-12-30 15:57:51.914	2025-12-30 17:39:57.671	Avenida Paulista, 1000, São Paulo	5	Espaço moderno e culto para os verdadeiros apreciadores de Mecha.	lucas.gabriel_coimbra@hotmail.com	11999998888	Funcionamento das 8h às 20h, funcionarios SDN tem descontos.	{ACCESSIBILITY,SECURITY,LOCKERS,CAMERAS,POWER_OUTLETS,FLEX_HOURS,AIR_CONDITIONING,OPEN_SPACE,PHONE,PARKING,WIFI,PRIVATE_ROOM,INDIVIDUAL_DESK,MONITOR,PRINTER}	100	São Paulo	SDN Dispatch	{"uploads\\\\0363c6efafa55455b039c268042b1911","uploads\\\\e3a025d333cf85d0fd23a9ac328d08fc","uploads\\\\66fb414403da4a095622df325ebec031"}	1	Bela Vista	1000	350	70	2500	SP	Avenida Paulista	300	3	01310-100	Sala de Eventos
6	Escritorium Pearson-Hadman	2026-01-01 04:12:56.483	2026-01-01 04:12:56.483	Rua Ataulfo Alves, 656, Arcoverde	6	Um espaço que é um escritório que é executivo. Chique.	lucas.gabriel_coimbra@hotmail.com	11988887777	NÃO ENTRE A MEIA-NOITE!\r\nOU O LOBO MAU VAI TE PEGAR.	{SECURITY,ACCESSIBILITY,CAMERAS,POWER_OUTLETS,LOCKERS,WIFI,PRINTER,COFFEE,PHONE,FLEX_HOURS,AIR_CONDITIONING}	30	Arcoverde	Descendo o sétimo deserto	{"uploads\\\\bc4476c9113d6339eb7adc8cb5cf9b76","uploads\\\\ae2a51f21a884149b9dc83a6d9560d81","uploads\\\\51cf78270353c8d1bdb9a84c8427a30e","uploads\\\\a1d27347e8d89530986b0b85e3527320"}	1	São Cristóvão	656	500	\N	\N	PE	Rua Ataulfo Alves	90	3	56503-540	Escritório Executivo
\.


--
-- Data for Name: _prisma_migrations; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) FROM stdin;
7656db49-6e75-4edd-a5a0-ad56fe2ddf34	a5cc9f5f847adeb90243d904c4d7a86e8dcb2bdb7fd657687e06f260727e224a	2025-12-23 18:08:38.416216+00	20251223003122_init	\N	\N	2025-12-23 18:08:34.995269+00	1
5356eba0-ba8c-4872-b3b0-3a0d7dcb7eaa	8fd0f0931c6ac4a121ff8779a36e2d1026cf864e0f164bbb7b1e203cc4f939e3	2025-12-23 18:08:38.564384+00	20251223020645_add_soft_delete_to_notifications	\N	\N	2025-12-23 18:08:38.447355+00	1
794eb72e-9b7a-41c5-beb5-a20b3c71b6fb	7990b29ea617a8176519c04c78bbe36467cdc4f1a8412497a31128f3976d5bf3	2025-12-29 20:30:09.16057+00	20251229203008_spacetype_required_on_workspace	\N	\N	2025-12-29 20:30:08.980683+00	1
aaf4e33c-d22a-4098-aec7-e385d552cf4f	1df893c947d4b3cf0934ea40b7000c381dd3209512d21065fc2caf31384d91f9	2025-12-23 22:20:47.290525+00	20251223222045_support_tickets	\N	\N	2025-12-23 22:20:45.995873+00	1
68862239-a06c-4746-9b8a-1f6c1c445904	4e6804fb216a0a62b05e2ffcd664b3e2a68e13db0efe11aa9030ab18540db185	2025-12-24 02:23:59.349355+00	20251224022358_add_resolved_at_to_support_ticket	\N	\N	2025-12-24 02:23:59.14027+00	1
1a359c2c-5c19-4a63-af43-c877683c8cc6	b868713c980fad638cc80b5cbe80231ce7aff1a551a9de0b265c004668bdcda2	2025-12-24 13:44:20.273241+00	20251224134419_add_space_request	\N	\N	2025-12-24 13:44:19.637232+00	1
0a2b4b4e-5e8f-47d2-8d60-502f9745d4ec	707b53f1bc3bf229359660c0ed1c890cc315c4d708b60b96c86d981062e57faf	2025-12-30 12:28:17.867716+00	20251230122816_add_reservation_indexes	\N	\N	2025-12-30 12:28:16.962538+00	1
47ac00af-dce4-4a14-b4dd-3e4e645d7e8e	4b51050f279a029b749ed43d0778146ee0b6428862e274c098750d8d4b17aae2	2025-12-24 14:38:41.974087+00	20251224143837_space_request_and_workspace_flow	\N	\N	2025-12-24 14:38:38.328012+00	1
e1f03aab-b773-4ede-b8a6-4e7e1ed0bff3	93ce3dc57a2144ebc1a095a2f10dcacd16d5865ef5cdd6e1969de79c1e04cb11	2025-12-24 18:21:49.526957+00	20251224182148_workspace_full_info_with_rooms	\N	\N	2025-12-24 18:21:48.334629+00	1
6aa1d2b8-1ae4-42b2-afb8-221d7d354829	94bf02303ce6aa055d7f20c810d1c396535e55cc903127072235e5562f2959d7	2025-12-26 22:57:31.086793+00	20251226225730_add_reservations	\N	\N	2025-12-26 22:57:30.815643+00	1
73bc55bd-25a9-4808-aabe-ae49b3b65bcc	cb1a272fec67e78236b03e5eaf985bb7b0c8f78c015f8f9dcdab10d80e294d51	2025-12-31 00:41:55.768143+00	20251231004154_remove_payment_type_from_reservation	\N	\N	2025-12-31 00:41:54.436188+00	1
c7151c36-bf1c-4553-939f-eedc3062226b	6fd76f852c6344850f3378e89b5f24e77dbaea714ce9f715f8b267a00832a2ce	2025-12-27 00:16:22.668321+00	20251227001621_add_user_settings	\N	\N	2025-12-27 00:16:22.018045+00	1
c97a08ef-2807-4faf-9e2c-d1ff03a263ff	b97a2b0eb6a354fa86d7668db1c3ec84f920f1f0fb16a47d9876dcfc97e364ae	2025-12-27 01:34:44.663046+00	20251227013444_notification_read_at	\N	\N	2025-12-27 01:34:44.485186+00	1
688de5f5-1bf8-4d2f-9d78-6056557b0651	4610b6b93a3d5d2a0e74e6b69f957bd83a33fea3ea30087fd89e8ec88823080f	2025-12-27 14:20:03.594659+00	20251227142003_add_2fa_to_usersettings	\N	\N	2025-12-27 14:20:03.395169+00	1
1efe6f24-ca71-439c-8b22-5799035dbe94	ead26763757307e078090d4b62a44fcf6f99d8ed131fdec782dccd9652d208a6	2025-12-27 14:34:31.720111+00	20251227143431_add_reservation_status_and_cancel	\N	\N	2025-12-27 14:34:31.262922+00	1
5593a831-7d92-4b52-b1ce-1b8462a2bd20	0b8773c0bc1bb4c53a5a664ada6606ed858e539aa5610089c78c143d0a34651f	2025-12-29 20:28:14.709896+00	20251229202814_add_spacetype_to_workspace	\N	\N	2025-12-29 20:28:14.422029+00	1
\.


--
-- Name: Notification_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Notification_id_seq"', 19, true);


--
-- Name: PasswordResetToken_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."PasswordResetToken_id_seq"', 3, true);


--
-- Name: Plan_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Plan_id_seq"', 6, true);


--
-- Name: Reservation_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Reservation_id_seq"', 10, true);


--
-- Name: Room_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Room_id_seq"', 22, true);


--
-- Name: SpaceRequest_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."SpaceRequest_id_seq"', 6, true);


--
-- Name: SupportMessage_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."SupportMessage_id_seq"', 5, true);


--
-- Name: SupportTicket_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."SupportTicket_id_seq"', 2, true);


--
-- Name: UserSettings_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."UserSettings_id_seq"', 58, true);


--
-- Name: User_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."User_id_seq"', 19, true);


--
-- Name: Workspace_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Workspace_id_seq"', 6, true);


--
-- Name: Notification Notification_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Notification"
    ADD CONSTRAINT "Notification_pkey" PRIMARY KEY (id);


--
-- Name: PasswordResetToken PasswordResetToken_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."PasswordResetToken"
    ADD CONSTRAINT "PasswordResetToken_pkey" PRIMARY KEY (id);


--
-- Name: Plan Plan_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Plan"
    ADD CONSTRAINT "Plan_pkey" PRIMARY KEY (id);


--
-- Name: Reservation Reservation_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Reservation"
    ADD CONSTRAINT "Reservation_pkey" PRIMARY KEY (id);


--
-- Name: Room Room_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Room"
    ADD CONSTRAINT "Room_pkey" PRIMARY KEY (id);


--
-- Name: SpaceRequest SpaceRequest_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."SpaceRequest"
    ADD CONSTRAINT "SpaceRequest_pkey" PRIMARY KEY (id);


--
-- Name: SupportMessage SupportMessage_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."SupportMessage"
    ADD CONSTRAINT "SupportMessage_pkey" PRIMARY KEY (id);


--
-- Name: SupportTicket SupportTicket_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."SupportTicket"
    ADD CONSTRAINT "SupportTicket_pkey" PRIMARY KEY (id);


--
-- Name: UserSettings UserSettings_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserSettings"
    ADD CONSTRAINT "UserSettings_pkey" PRIMARY KEY (id);


--
-- Name: User User_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."User"
    ADD CONSTRAINT "User_pkey" PRIMARY KEY (id);


--
-- Name: Workspace Workspace_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Workspace"
    ADD CONSTRAINT "Workspace_pkey" PRIMARY KEY (id);


--
-- Name: _prisma_migrations _prisma_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public._prisma_migrations
    ADD CONSTRAINT _prisma_migrations_pkey PRIMARY KEY (id);


--
-- Name: PasswordResetToken_token_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "PasswordResetToken_token_key" ON public."PasswordResetToken" USING btree (token);


--
-- Name: Plan_name_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "Plan_name_key" ON public."Plan" USING btree (name);


--
-- Name: Reservation_userId_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "Reservation_userId_idx" ON public."Reservation" USING btree ("userId");


--
-- Name: Reservation_workspaceId_date_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "Reservation_workspaceId_date_idx" ON public."Reservation" USING btree ("workspaceId", date);


--
-- Name: Reservation_workspaceId_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "Reservation_workspaceId_idx" ON public."Reservation" USING btree ("workspaceId");


--
-- Name: Reservation_workspaceId_status_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "Reservation_workspaceId_status_idx" ON public."Reservation" USING btree ("workspaceId", status);


--
-- Name: UserSettings_userId_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "UserSettings_userId_key" ON public."UserSettings" USING btree ("userId");


--
-- Name: User_email_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "User_email_key" ON public."User" USING btree (email);


--
-- Name: Workspace_approvedFromRequestId_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "Workspace_approvedFromRequestId_key" ON public."Workspace" USING btree ("approvedFromRequestId");


--
-- Name: Notification Notification_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Notification"
    ADD CONSTRAINT "Notification_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: PasswordResetToken PasswordResetToken_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."PasswordResetToken"
    ADD CONSTRAINT "PasswordResetToken_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Reservation Reservation_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Reservation"
    ADD CONSTRAINT "Reservation_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Reservation Reservation_workspaceId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Reservation"
    ADD CONSTRAINT "Reservation_workspaceId_fkey" FOREIGN KEY ("workspaceId") REFERENCES public."Workspace"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Room Room_workspaceId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Room"
    ADD CONSTRAINT "Room_workspaceId_fkey" FOREIGN KEY ("workspaceId") REFERENCES public."Workspace"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: SpaceRequest SpaceRequest_reviewedById_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."SpaceRequest"
    ADD CONSTRAINT "SpaceRequest_reviewedById_fkey" FOREIGN KEY ("reviewedById") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: SupportMessage SupportMessage_authorId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."SupportMessage"
    ADD CONSTRAINT "SupportMessage_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: SupportMessage SupportMessage_ticketId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."SupportMessage"
    ADD CONSTRAINT "SupportMessage_ticketId_fkey" FOREIGN KEY ("ticketId") REFERENCES public."SupportTicket"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: SupportTicket SupportTicket_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."SupportTicket"
    ADD CONSTRAINT "SupportTicket_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: UserSettings UserSettings_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserSettings"
    ADD CONSTRAINT "UserSettings_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: User User_planId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."User"
    ADD CONSTRAINT "User_planId_fkey" FOREIGN KEY ("planId") REFERENCES public."Plan"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: Workspace Workspace_approvedFromRequestId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Workspace"
    ADD CONSTRAINT "Workspace_approvedFromRequestId_fkey" FOREIGN KEY ("approvedFromRequestId") REFERENCES public."SpaceRequest"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: postgres
--

REVOKE USAGE ON SCHEMA public FROM PUBLIC;


--
-- PostgreSQL database dump complete
--

\unrestrict mydvxsXEdPSEjEcd1EeC6MC0A7qQWShb40kSOGOBN18spsejlt9TiZdcQnu9tah

