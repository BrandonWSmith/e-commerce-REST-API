-- Delete this command if you have already created a database
CREATE DATABASE "eShopping Database" WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'English_United States.1252';

-- Delete this command if you have already created a schema
CREATE SCHEMA public;

ALTER SCHEMA public OWNER TO pg_database_owner;



SET default_tablespace = '';

SET default_table_access_method = heap;



CREATE TABLE public.carts (
    id integer NOT NULL,
    user_id integer NOT NULL,
    created timestamp with time zone NOT NULL,
    modified timestamp with time zone
);

CREATE SEQUENCE public.carts_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER SEQUENCE public.carts_id_seq OWNED BY public.carts.id;



CREATE TABLE public.carts_products (
    id integer NOT NULL,
    quantity integer NOT NULL,
    price money NOT NULL,
    total money GENERATED ALWAYS AS ((price * quantity)) STORED NOT NULL,
    cart_id integer NOT NULL,
    product_id integer NOT NULL,
    added timestamp with time zone NOT NULL,
    modified timestamp with time zone
);

CREATE SEQUENCE public.carts_products_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER SEQUENCE public.carts_products_id_seq OWNED BY public.carts_products.id;



CREATE TABLE public.orders (
    id integer NOT NULL,
    user_id integer NOT NULL,
    created timestamp with time zone NOT NULL,
    modified timestamp with time zone
);

CREATE SEQUENCE public.orders_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER SEQUENCE public.orders_id_seq OWNED BY public.orders.id;



CREATE TABLE public.orders_products (
    id integer NOT NULL,
    quantity integer NOT NULL,
    price money NOT NULL,
    total money GENERATED ALWAYS AS ((price * quantity)) STORED NOT NULL,
    order_id integer NOT NULL,
    product_id integer NOT NULL,
    added timestamp with time zone NOT NULL,
    modified timestamp with time zone
);

CREATE SEQUENCE public.orders_products_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER SEQUENCE public.orders_products_id_seq OWNED BY public.orders_products.id;



CREATE TABLE public.products (
    id integer NOT NULL,
    name character varying NOT NULL,
    price money NOT NULL,
    description text NOT NULL,
    created timestamp with time zone NOT NULL,
    modified timestamp with time zone
);

CREATE SEQUENCE public.products_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER SEQUENCE public.products_id_seq OWNED BY public.products.id;



CREATE TABLE public.users (
    id integer NOT NULL,
    first_name character varying NOT NULL,
    last_name character varying NOT NULL,
    email character varying NOT NULL,
    password character varying NOT NULL,
    created timestamp with time zone NOT NULL,
    modified timestamp with time zone
);

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;



ALTER TABLE ONLY public.carts ALTER COLUMN id SET DEFAULT nextval('public.carts_id_seq'::regclass);



ALTER TABLE ONLY public.carts_products ALTER COLUMN id SET DEFAULT nextval('public.carts_products_id_seq'::regclass);



ALTER TABLE ONLY public.orders ALTER COLUMN id SET DEFAULT nextval('public.orders_id_seq'::regclass);



ALTER TABLE ONLY public.orders_products ALTER COLUMN id SET DEFAULT nextval('public.orders_products_id_seq'::regclass);



ALTER TABLE ONLY public.products ALTER COLUMN id SET DEFAULT nextval('public.products_id_seq'::regclass);



ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);



INSERT INTO public.products (id, name, price, description, created, modified) VALUES (1, 'Basketball', '$19.99', 'Made with all recycled rubber', '2024-04-04 14:30:53.32-04', NULL);
INSERT INTO public.products (id, name, price, description, created, modified) VALUES (2, 'BMX Bike', '$199.99', 'Solid aircraft-grade aluminum frame', '2024-05-20 10:08:35.437-04', NULL);
INSERT INTO public.products (id, name, price, description, created, modified) VALUES (3, 'Beef Jerky', '$3.99', 'Savory dried beef strips', '2024-05-29 14:08:51.752-04', NULL);
INSERT INTO public.products (id, name, price, description, created, modified) VALUES (4, 'Bug Repellent', '$4.99', 'A spray to keep all the bugs away', '2024-05-29 14:11:10.049-04', NULL);
INSERT INTO public.products (id, name, price, description, created, modified) VALUES (5, 'Strawberry Short Cakes', '$3.99', 'Sweet and dripped in strawberry syrup', '2024-05-29 14:14:01.184-04', NULL);
INSERT INTO public.products (id, name, price, description, created, modified) VALUES (6, 'Hardback Novels', '$16.99', 'Harback versions of our literary collection', '2024-05-29 14:16:46.327-04', NULL);
INSERT INTO public.products (id, name, price, description, created, modified) VALUES (7, 'Tropical Postcards', '$1.99', 'Timeless snapshots of the tropics free for anyone to write on and make their own', '2024-05-29 14:18:08.94-04', NULL);



SELECT pg_catalog.setval('public.carts_id_seq', 1, false);



SELECT pg_catalog.setval('public.carts_products_id_seq', 1, false);



SELECT pg_catalog.setval('public.orders_id_seq', 1, false);



SELECT pg_catalog.setval('public.orders_products_id_seq', 1, false);



SELECT pg_catalog.setval('public.products_id_seq', 7, true);



SELECT pg_catalog.setval('public.users_id_seq', 1, false);



ALTER TABLE ONLY public.carts
    ADD CONSTRAINT carts_pkey PRIMARY KEY (id);



ALTER TABLE ONLY public.carts_products
    ADD CONSTRAINT carts_products_pkey PRIMARY KEY (id);



ALTER TABLE ONLY public.orders
    ADD CONSTRAINT orders_pkey PRIMARY KEY (id);



ALTER TABLE ONLY public.orders_products
    ADD CONSTRAINT orders_products_pkey PRIMARY KEY (id);



ALTER TABLE ONLY public.products
    ADD CONSTRAINT products_pkey PRIMARY KEY (id);



ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);



ALTER TABLE ONLY public.carts_products
    ADD CONSTRAINT carts_products_cart_id_fkey FOREIGN KEY (cart_id) REFERENCES public.carts(id);



ALTER TABLE ONLY public.carts_products
    ADD CONSTRAINT carts_products_product_id_fkey FOREIGN KEY (product_id) REFERENCES public.products(id);




ALTER TABLE ONLY public.carts
    ADD CONSTRAINT carts_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id);



ALTER TABLE ONLY public.orders_products
    ADD CONSTRAINT orders_products_order_id_fkey FOREIGN KEY (order_id) REFERENCES public.orders(id);



ALTER TABLE ONLY public.orders_products
    ADD CONSTRAINT orders_products_product_id_fkey FOREIGN KEY (product_id) REFERENCES public.products(id);



ALTER TABLE ONLY public.orders
    ADD CONSTRAINT orders_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id);