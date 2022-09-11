--
-- PostgreSQL database dump
--

-- Dumped from database version 12.12 (Ubuntu 12.12-0ubuntu0.20.04.1)
-- Dumped by pg_dump version 14.2

-- Started on 2022-09-11 18:21:21

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
-- TOC entry 203 (class 1259 OID 24938)
-- Name: match_id_seq; Type: SEQUENCE; Schema: public; Owner: babyfootuser
--

CREATE SEQUENCE public.match_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 5000
    CACHE 1;


ALTER TABLE public.match_id_seq OWNER TO babyfootuser;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 202 (class 1259 OID 24930)
-- Name: matches; Type: TABLE; Schema: public; Owner: babyfootuser
--

CREATE TABLE public.matches (
    id bigint DEFAULT nextval('public.match_id_seq'::regclass) NOT NULL,
    players character varying[],
    score bigint[],
    finished boolean,
    created_at timestamp with time zone,
    finished_at timestamp with time zone
);


ALTER TABLE public.matches OWNER TO babyfootuser;

--
-- TOC entry 205 (class 1259 OID 24949)
-- Name: message_id_seq; Type: SEQUENCE; Schema: public; Owner: babyfootuser
--

CREATE SEQUENCE public.message_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 100000
    CACHE 1;


ALTER TABLE public.message_id_seq OWNER TO babyfootuser;

--
-- TOC entry 204 (class 1259 OID 24941)
-- Name: messages; Type: TABLE; Schema: public; Owner: babyfootuser
--

CREATE TABLE public.messages (
    id bigint DEFAULT nextval('public.message_id_seq'::regclass) NOT NULL,
    body character varying,
    sender character varying,
    created_at timestamp with time zone
);


ALTER TABLE public.messages OWNER TO babyfootuser;

--
-- TOC entry 2936 (class 0 OID 24930)
-- Dependencies: 202
-- Data for Name: matches; Type: TABLE DATA; Schema: public; Owner: babyfootuser
--

COPY public.matches (id, players, score, finished, created_at, finished_at) FROM stdin;
\.


--
-- TOC entry 2938 (class 0 OID 24941)
-- Dependencies: 204
-- Data for Name: messages; Type: TABLE DATA; Schema: public; Owner: babyfootuser
--

COPY public.messages (id, body, sender, created_at) FROM stdin;
\.


--
-- TOC entry 2945 (class 0 OID 0)
-- Dependencies: 203
-- Name: match_id_seq; Type: SEQUENCE SET; Schema: public; Owner: babyfootuser
--

SELECT pg_catalog.setval('public.match_id_seq', 95, true);


--
-- TOC entry 2946 (class 0 OID 0)
-- Dependencies: 205
-- Name: message_id_seq; Type: SEQUENCE SET; Schema: public; Owner: babyfootuser
--

SELECT pg_catalog.setval('public.message_id_seq', 206, true);


--
-- TOC entry 2807 (class 2606 OID 24937)
-- Name: matches matches_pkey; Type: CONSTRAINT; Schema: public; Owner: babyfootuser
--

ALTER TABLE ONLY public.matches
    ADD CONSTRAINT matches_pkey PRIMARY KEY (id);


--
-- TOC entry 2809 (class 2606 OID 24948)
-- Name: messages messages_pkey; Type: CONSTRAINT; Schema: public; Owner: babyfootuser
--

ALTER TABLE ONLY public.messages
    ADD CONSTRAINT messages_pkey PRIMARY KEY (id);


-- Completed on 2022-09-11 18:21:23

--
-- PostgreSQL database dump complete
--

