--
-- PostgreSQL database dump
--

-- Dumped from database version 12.2
-- Dumped by pg_dump version 12.2

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

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: Beers; Type: TABLE; Schema: public; Owner: Gabriel
--

CREATE TABLE public."beers" (
    id text NOT NULL,
    outflow real NOT NULL
);



COPY public."beers" (id, outflow) FROM stdin;
Blanche	0
Blonde	0
\.



ALTER TABLE ONLY public."beers"
    ADD CONSTRAINT "beers_pkey" PRIMARY KEY (id);

