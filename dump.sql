--
-- PostgreSQL database dump
--

\restrict LShc8qpKim61hpI9C6XuB4MCUvuNKKXjmUAhE8MKbwZkYuplPdYXbts2mahdPe9

-- Dumped from database version 16.13
-- Dumped by pg_dump version 16.13 (Ubuntu 16.13-0ubuntu0.24.04.1)

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
-- Name: uuid-ossp; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA public;


--
-- Name: EXTENSION "uuid-ossp"; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION "uuid-ossp" IS 'generate universally unique identifiers (UUIDs)';


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: films; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.films (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    title character varying NOT NULL,
    about character varying NOT NULL,
    description character varying NOT NULL,
    director character varying NOT NULL,
    rating double precision NOT NULL,
    tags json DEFAULT '[]'::json NOT NULL,
    image character varying NOT NULL,
    cover character varying NOT NULL
);


ALTER TABLE public.films OWNER TO postgres;

--
-- Name: schedules; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.schedules (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    daytime character varying NOT NULL,
    hall integer NOT NULL,
    rows integer NOT NULL,
    seats integer NOT NULL,
    price double precision NOT NULL,
    taken json DEFAULT '[]'::json NOT NULL,
    "filmId" uuid
);


ALTER TABLE public.schedules OWNER TO postgres;

--
-- Data for Name: films; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.films (id, title, about, description, director, rating, tags, image, cover) FROM stdin;
\.


--
-- Data for Name: schedules; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.schedules (id, daytime, hall, rows, seats, price, taken, "filmId") FROM stdin;
\.


--
-- Name: films PK_697487ada088902377482c970d1; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.films
    ADD CONSTRAINT "PK_697487ada088902377482c970d1" PRIMARY KEY (id);


--
-- Name: schedules PK_7e33fc2ea755a5765e3564e66dd; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.schedules
    ADD CONSTRAINT "PK_7e33fc2ea755a5765e3564e66dd" PRIMARY KEY (id);


--
-- Name: schedules FK_1c2f5e637713a429f4854024a76; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.schedules
    ADD CONSTRAINT "FK_1c2f5e637713a429f4854024a76" FOREIGN KEY ("filmId") REFERENCES public.films(id);


--
-- PostgreSQL database dump complete
--

\unrestrict LShc8qpKim61hpI9C6XuB4MCUvuNKKXjmUAhE8MKbwZkYuplPdYXbts2mahdPe9

