PGDMP     +    ,                z           test2 %   12.12 (Ubuntu 12.12-0ubuntu0.20.04.1)    14.2     ~           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false                       0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            ?           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            ?           1262    24977    test2    DATABASE     V   CREATE DATABASE test2 WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE = 'C.UTF-8';
    DROP DATABASE test2;
                babyfootuser    false            ?            1259    24978    match_id_seq    SEQUENCE     w   CREATE SEQUENCE public.match_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 5000
    CACHE 1;
 #   DROP SEQUENCE public.match_id_seq;
       public          babyfoot    false            ?            1259    24980    matches    TABLE       CREATE TABLE public.matches (
    id bigint DEFAULT nextval('public.match_id_seq'::regclass) NOT NULL,
    players character varying[],
    score bigint[],
    finished boolean,
    created_at timestamp with time zone,
    finished_at timestamp with time zone
);
    DROP TABLE public.matches;
       public         heap    babyfoot    false    202            ?            1259    24987    message_id_seq    SEQUENCE     {   CREATE SEQUENCE public.message_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 100000
    CACHE 1;
 %   DROP SEQUENCE public.message_id_seq;
       public          babyfoot    false            ?            1259    24989    messages    TABLE     ?   CREATE TABLE public.messages (
    id bigint DEFAULT nextval('public.message_id_seq'::regclass) NOT NULL,
    body character varying,
    sender character varying,
    created_at timestamp with time zone
);
    DROP TABLE public.messages;
       public         heap    babyfoot    false    204            y          0    24980    matches 
   TABLE DATA           X   COPY public.matches (id, players, score, finished, created_at, finished_at) FROM stdin;
    public          babyfoot    false    203   N       {          0    24989    messages 
   TABLE DATA           @   COPY public.messages (id, body, sender, created_at) FROM stdin;
    public          babyfoot    false    205   k       ?           0    0    match_id_seq    SEQUENCE SET     ;   SELECT pg_catalog.setval('public.match_id_seq', 95, true);
          public          babyfoot    false    202            ?           0    0    message_id_seq    SEQUENCE SET     >   SELECT pg_catalog.setval('public.message_id_seq', 206, true);
          public          babyfoot    false    204            ?
           2606    24997    matches matches_pkey 
   CONSTRAINT     R   ALTER TABLE ONLY public.matches
    ADD CONSTRAINT matches_pkey PRIMARY KEY (id);
 >   ALTER TABLE ONLY public.matches DROP CONSTRAINT matches_pkey;
       public            babyfoot    false    203            ?
           2606    24999    messages messages_pkey 
   CONSTRAINT     T   ALTER TABLE ONLY public.messages
    ADD CONSTRAINT messages_pkey PRIMARY KEY (id);
 @   ALTER TABLE ONLY public.messages DROP CONSTRAINT messages_pkey;
       public            babyfoot    false    205            y      x?????? ? ?      {      x?????? ? ?     