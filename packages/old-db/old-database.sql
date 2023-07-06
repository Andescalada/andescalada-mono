--
-- PostgreSQL database dump
--

-- Dumped from database version 13.4 (Debian 13.4-1.pgdg100+1)
-- Dumped by pg_dump version 13.4 (Debian 13.4-1.pgdg100+1)

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
-- Name: postgis; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS postgis WITH SCHEMA public;


--
-- Name: EXTENSION postgis; Type: COMMENT; Schema: -; Owner: -
--

COMMENT ON EXTENSION postgis IS 'PostGIS geometry, geography, and raster spatial types and functions';


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: action_text_rich_texts; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.action_text_rich_texts (
    id bigint NOT NULL,
    name character varying NOT NULL,
    body text,
    record_type character varying NOT NULL,
    record_id bigint NOT NULL,
    created_at timestamp(6) without time zone NOT NULL,
    updated_at timestamp(6) without time zone NOT NULL
);


--
-- Name: action_text_rich_texts_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.action_text_rich_texts_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: action_text_rich_texts_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.action_text_rich_texts_id_seq OWNED BY public.action_text_rich_texts.id;


--
-- Name: active_storage_attachments; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.active_storage_attachments (
    id bigint NOT NULL,
    name character varying NOT NULL,
    record_type character varying NOT NULL,
    record_id bigint NOT NULL,
    blob_id bigint NOT NULL,
    created_at timestamp without time zone NOT NULL
);


--
-- Name: active_storage_attachments_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.active_storage_attachments_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: active_storage_attachments_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.active_storage_attachments_id_seq OWNED BY public.active_storage_attachments.id;


--
-- Name: active_storage_blobs; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.active_storage_blobs (
    id bigint NOT NULL,
    key character varying NOT NULL,
    filename character varying NOT NULL,
    content_type character varying,
    metadata text,
    byte_size bigint NOT NULL,
    checksum character varying NOT NULL,
    created_at timestamp without time zone NOT NULL,
    service_name character varying NOT NULL
);


--
-- Name: active_storage_blobs_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.active_storage_blobs_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: active_storage_blobs_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.active_storage_blobs_id_seq OWNED BY public.active_storage_blobs.id;


--
-- Name: active_storage_variant_records; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.active_storage_variant_records (
    id bigint NOT NULL,
    blob_id bigint NOT NULL,
    variation_digest character varying NOT NULL
);


--
-- Name: active_storage_variant_records_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.active_storage_variant_records_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: active_storage_variant_records_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.active_storage_variant_records_id_seq OWNED BY public.active_storage_variant_records.id;


--
-- Name: ar_internal_metadata; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.ar_internal_metadata (
    key character varying NOT NULL,
    value character varying,
    created_at timestamp(6) without time zone NOT NULL,
    updated_at timestamp(6) without time zone NOT NULL
);


--
-- Name: climbed_routes; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.climbed_routes (
    id bigint NOT NULL,
    route_id bigint NOT NULL,
    user_id bigint NOT NULL,
    created_at timestamp(6) without time zone NOT NULL,
    updated_at timestamp(6) without time zone NOT NULL
);


--
-- Name: climbed_routes_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.climbed_routes_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: climbed_routes_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.climbed_routes_id_seq OWNED BY public.climbed_routes.id;


--
-- Name: climbing_types; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.climbing_types (
    id bigint NOT NULL,
    name integer DEFAULT 0,
    created_at timestamp(6) without time zone NOT NULL,
    updated_at timestamp(6) without time zone NOT NULL
);


--
-- Name: climbing_types_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.climbing_types_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: climbing_types_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.climbing_types_id_seq OWNED BY public.climbing_types.id;


--
-- Name: coalition_members; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.coalition_members (
    id bigint NOT NULL,
    coalition_id bigint NOT NULL,
    user_id bigint NOT NULL,
    created_at timestamp(6) without time zone NOT NULL,
    updated_at timestamp(6) without time zone NOT NULL,
    approved boolean DEFAULT false
);


--
-- Name: coalition_members_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.coalition_members_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: coalition_members_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.coalition_members_id_seq OWNED BY public.coalition_members.id;


--
-- Name: coalitions; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.coalitions (
    id bigint NOT NULL,
    name character varying,
    email character varying,
    twitter character varying,
    instagram character varying,
    youtube character varying,
    tiktok character varying,
    facebook character varying,
    description text,
    created_at timestamp(6) without time zone NOT NULL,
    updated_at timestamp(6) without time zone NOT NULL,
    initiatives_count integer DEFAULT 0
);


--
-- Name: coalitions_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.coalitions_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: coalitions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.coalitions_id_seq OWNED BY public.coalitions.id;


--
-- Name: collaborated_routes; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.collaborated_routes (
    id bigint NOT NULL,
    route_id bigint NOT NULL,
    user_id bigint NOT NULL,
    created_at timestamp(6) without time zone NOT NULL,
    updated_at timestamp(6) without time zone NOT NULL
);


--
-- Name: collaborated_routes_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.collaborated_routes_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: collaborated_routes_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.collaborated_routes_id_seq OWNED BY public.collaborated_routes.id;


--
-- Name: countries; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.countries (
    id bigint NOT NULL,
    name character varying,
    created_at timestamp(6) without time zone NOT NULL,
    updated_at timestamp(6) without time zone NOT NULL
);


--
-- Name: countries_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.countries_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: countries_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.countries_id_seq OWNED BY public.countries.id;


--
-- Name: descent_alternatives; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.descent_alternatives (
    id bigint NOT NULL,
    route_id bigint NOT NULL,
    descent_id bigint NOT NULL,
    created_at timestamp(6) without time zone NOT NULL,
    updated_at timestamp(6) without time zone NOT NULL
);


--
-- Name: descent_alternatives_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.descent_alternatives_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: descent_alternatives_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.descent_alternatives_id_seq OWNED BY public.descent_alternatives.id;


--
-- Name: descents; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.descents (
    id bigint NOT NULL,
    name integer DEFAULT 0,
    created_at timestamp(6) without time zone NOT NULL,
    updated_at timestamp(6) without time zone NOT NULL
);


--
-- Name: descents_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.descents_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: descents_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.descents_id_seq OWNED BY public.descents.id;


--
-- Name: downloaded_zones; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.downloaded_zones (
    id bigint NOT NULL,
    user_id bigint NOT NULL,
    zone_id bigint NOT NULL,
    created_at timestamp(6) without time zone NOT NULL,
    updated_at timestamp(6) without time zone NOT NULL
);


--
-- Name: downloaded_zones_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.downloaded_zones_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: downloaded_zones_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.downloaded_zones_id_seq OWNED BY public.downloaded_zones.id;


--
-- Name: equipped_routes; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.equipped_routes (
    id bigint NOT NULL,
    route_id bigint NOT NULL,
    user_id bigint NOT NULL,
    date date,
    created_at timestamp(6) without time zone NOT NULL,
    updated_at timestamp(6) without time zone NOT NULL
);


--
-- Name: equipped_routes_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.equipped_routes_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: equipped_routes_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.equipped_routes_id_seq OWNED BY public.equipped_routes.id;


--
-- Name: initiative_participants; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.initiative_participants (
    id bigint NOT NULL,
    initiative_id bigint NOT NULL,
    user_id bigint NOT NULL,
    created_at timestamp(6) without time zone NOT NULL,
    updated_at timestamp(6) without time zone NOT NULL
);


--
-- Name: initiative_participants_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.initiative_participants_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: initiative_participants_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.initiative_participants_id_seq OWNED BY public.initiative_participants.id;


--
-- Name: initiative_sponsors; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.initiative_sponsors (
    id bigint NOT NULL,
    initiative_id bigint NOT NULL,
    sponsor_id bigint NOT NULL,
    created_at timestamp(6) without time zone NOT NULL,
    updated_at timestamp(6) without time zone NOT NULL
);


--
-- Name: initiative_sponsors_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.initiative_sponsors_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: initiative_sponsors_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.initiative_sponsors_id_seq OWNED BY public.initiative_sponsors.id;


--
-- Name: initiatives; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.initiatives (
    id bigint NOT NULL,
    donatable boolean DEFAULT true,
    joinable boolean DEFAULT true,
    start_date timestamp without time zone,
    end_date timestamp without time zone,
    donated double precision DEFAULT 0.0,
    coalition_id bigint NOT NULL,
    name character varying,
    email character varying,
    twitter character varying,
    instagram character varying,
    youtube character varying,
    tiktok character varying,
    facebook character varying,
    description text,
    created_at timestamp(6) without time zone NOT NULL,
    updated_at timestamp(6) without time zone NOT NULL,
    active boolean DEFAULT false
);


--
-- Name: initiatives_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.initiatives_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: initiatives_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.initiatives_id_seq OWNED BY public.initiatives.id;


--
-- Name: nesting_seasons; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.nesting_seasons (
    id bigint NOT NULL,
    start_date timestamp without time zone,
    end_date timestamp without time zone,
    route_id bigint NOT NULL,
    created_at timestamp(6) without time zone NOT NULL,
    updated_at timestamp(6) without time zone NOT NULL
);


--
-- Name: nesting_seasons_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.nesting_seasons_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: nesting_seasons_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.nesting_seasons_id_seq OWNED BY public.nesting_seasons.id;


--
-- Name: owners; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.owners (
    id bigint NOT NULL,
    company boolean DEFAULT false,
    government boolean DEFAULT false,
    name character varying,
    email character varying,
    phone_number character varying,
    additional_info text,
    created_at timestamp(6) without time zone NOT NULL,
    updated_at timestamp(6) without time zone NOT NULL
);


--
-- Name: owners_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.owners_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: owners_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.owners_id_seq OWNED BY public.owners.id;


--
-- Name: pictures; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.pictures (
    id bigint NOT NULL,
    downloaded boolean DEFAULT false,
    imageable_type character varying,
    imageable_id bigint,
    created_at timestamp(6) without time zone NOT NULL,
    updated_at timestamp(6) without time zone NOT NULL,
    description text
);


--
-- Name: pictures_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.pictures_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: pictures_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.pictures_id_seq OWNED BY public.pictures.id;


--
-- Name: recent_zones; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.recent_zones (
    id bigint NOT NULL,
    user_id bigint NOT NULL,
    zone_id bigint NOT NULL,
    created_at timestamp(6) without time zone NOT NULL,
    updated_at timestamp(6) without time zone NOT NULL
);


--
-- Name: recent_zones_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.recent_zones_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: recent_zones_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.recent_zones_id_seq OWNED BY public.recent_zones.id;


--
-- Name: recommended_descents; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.recommended_descents (
    id bigint NOT NULL,
    route_id bigint NOT NULL,
    descent_id bigint NOT NULL,
    created_at timestamp(6) without time zone NOT NULL,
    updated_at timestamp(6) without time zone NOT NULL
);


--
-- Name: recommended_descents_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.recommended_descents_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: recommended_descents_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.recommended_descents_id_seq OWNED BY public.recommended_descents.id;


--
-- Name: recommended_seasons; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.recommended_seasons (
    id bigint NOT NULL,
    wall_id bigint NOT NULL,
    season_id bigint NOT NULL,
    created_at timestamp(6) without time zone NOT NULL,
    updated_at timestamp(6) without time zone NOT NULL
);


--
-- Name: recommended_seasons_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.recommended_seasons_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: recommended_seasons_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.recommended_seasons_id_seq OWNED BY public.recommended_seasons.id;


--
-- Name: regions; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.regions (
    id bigint NOT NULL,
    name character varying,
    country_id bigint NOT NULL,
    created_at timestamp(6) without time zone NOT NULL,
    updated_at timestamp(6) without time zone NOT NULL
);


--
-- Name: regions_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.regions_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: regions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.regions_id_seq OWNED BY public.regions.id;


--
-- Name: roles; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.roles (
    id bigint NOT NULL,
    name character varying,
    resource_type character varying,
    resource_id bigint,
    created_at timestamp(6) without time zone NOT NULL,
    updated_at timestamp(6) without time zone NOT NULL
);


--
-- Name: roles_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.roles_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: roles_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.roles_id_seq OWNED BY public.roles.id;


--
-- Name: route_climbing_types; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.route_climbing_types (
    id bigint NOT NULL,
    route_id bigint NOT NULL,
    climbing_type_id bigint NOT NULL,
    created_at timestamp(6) without time zone NOT NULL,
    updated_at timestamp(6) without time zone NOT NULL
);


--
-- Name: route_climbing_types_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.route_climbing_types_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: route_climbing_types_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.route_climbing_types_id_seq OWNED BY public.route_climbing_types.id;


--
-- Name: route_reviews; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.route_reviews (
    id bigint NOT NULL,
    climbing_type_id integer,
    protection_rating integer,
    stars integer,
    route_id bigint NOT NULL,
    user_id bigint NOT NULL,
    grade character varying,
    comment text,
    created_at timestamp(6) without time zone NOT NULL,
    updated_at timestamp(6) without time zone NOT NULL
);


--
-- Name: route_reviews_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.route_reviews_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: route_reviews_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.route_reviews_id_seq OWNED BY public.route_reviews.id;


--
-- Name: routes; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.routes (
    id bigint NOT NULL,
    rains boolean DEFAULT false,
    classic boolean DEFAULT false,
    published boolean DEFAULT false,
    status integer DEFAULT 0,
    protection_ranking integer DEFAULT 0,
    slope integer DEFAULT 0,
    pitch_num integer DEFAULT 1,
    wind integer DEFAULT 0,
    topo_num integer,
    length integer,
    reviews_count integer DEFAULT 0,
    wall_id bigint NOT NULL,
    left_route_id bigint,
    name character varying,
    grade character varying,
    community_grade character varying,
    quickdraws character varying,
    status_title character varying,
    status_description text,
    created_at timestamp(6) without time zone NOT NULL,
    updated_at timestamp(6) without time zone NOT NULL
);


--
-- Name: routes_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.routes_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: routes_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.routes_id_seq OWNED BY public.routes.id;


--
-- Name: saved_routes; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.saved_routes (
    id bigint NOT NULL,
    route_id bigint NOT NULL,
    user_id bigint NOT NULL,
    created_at timestamp(6) without time zone NOT NULL,
    updated_at timestamp(6) without time zone NOT NULL
);


--
-- Name: saved_routes_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.saved_routes_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: saved_routes_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.saved_routes_id_seq OWNED BY public.saved_routes.id;


--
-- Name: schema_migrations; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.schema_migrations (
    version character varying NOT NULL
);


--
-- Name: season_sun_exposures; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.season_sun_exposures (
    id bigint NOT NULL,
    sun_exposure_id bigint NOT NULL,
    season_id bigint NOT NULL,
    created_at timestamp(6) without time zone NOT NULL,
    updated_at timestamp(6) without time zone NOT NULL
);


--
-- Name: season_sun_exposures_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.season_sun_exposures_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: season_sun_exposures_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.season_sun_exposures_id_seq OWNED BY public.season_sun_exposures.id;


--
-- Name: seasons; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.seasons (
    id bigint NOT NULL,
    start_date timestamp without time zone,
    end_date timestamp without time zone,
    name integer,
    created_at timestamp(6) without time zone NOT NULL,
    updated_at timestamp(6) without time zone NOT NULL
);


--
-- Name: seasons_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.seasons_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: seasons_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.seasons_id_seq OWNED BY public.seasons.id;


--
-- Name: sectors; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.sectors (
    id bigint NOT NULL,
    latitude numeric,
    longitude numeric,
    zone_id bigint NOT NULL,
    name character varying,
    created_at timestamp(6) without time zone NOT NULL,
    updated_at timestamp(6) without time zone NOT NULL
);


--
-- Name: sectors_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.sectors_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: sectors_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.sectors_id_seq OWNED BY public.sectors.id;


--
-- Name: sponsors; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.sponsors (
    id bigint NOT NULL,
    name character varying,
    created_at timestamp(6) without time zone NOT NULL,
    updated_at timestamp(6) without time zone NOT NULL,
    url character varying
);


--
-- Name: sponsors_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.sponsors_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: sponsors_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.sponsors_id_seq OWNED BY public.sponsors.id;


--
-- Name: sun_exposures; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.sun_exposures (
    id bigint NOT NULL,
    exposure integer DEFAULT 0,
    wall_id bigint NOT NULL,
    created_at timestamp(6) without time zone NOT NULL,
    updated_at timestamp(6) without time zone NOT NULL
);


--
-- Name: sun_exposures_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.sun_exposures_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: sun_exposures_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.sun_exposures_id_seq OWNED BY public.sun_exposures.id;


--
-- Name: user_sponsors; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.user_sponsors (
    id bigint NOT NULL,
    user_id bigint NOT NULL,
    sponsor_id bigint NOT NULL,
    created_at timestamp(6) without time zone NOT NULL,
    updated_at timestamp(6) without time zone NOT NULL
);


--
-- Name: user_sponsors_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.user_sponsors_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: user_sponsors_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.user_sponsors_id_seq OWNED BY public.user_sponsors.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.users (
    id bigint NOT NULL,
    provider character varying DEFAULT 'email'::character varying NOT NULL,
    uid character varying DEFAULT ''::character varying NOT NULL,
    encrypted_password character varying DEFAULT ''::character varying NOT NULL,
    reset_password_token character varying,
    reset_password_sent_at timestamp without time zone,
    allow_password_change boolean DEFAULT false,
    remember_created_at timestamp without time zone,
    sign_in_count integer DEFAULT 0 NOT NULL,
    current_sign_in_at timestamp without time zone,
    last_sign_in_at timestamp without time zone,
    current_sign_in_ip inet,
    last_sign_in_ip inet,
    confirmation_token character varying,
    confirmed_at timestamp without time zone,
    confirmation_sent_at timestamp without time zone,
    unconfirmed_email character varying,
    climbing_since integer,
    boulder_scale integer DEFAULT 0,
    route_scale integer DEFAULT 0,
    name character varying,
    brief_bio character varying,
    email character varying,
    phone_number bigint,
    twitter character varying,
    instagram character varying,
    youtube character varying,
    tiktok character varying,
    facebook character varying,
    last_sign_in_country character varying,
    biography text,
    tokens text,
    created_at timestamp(6) without time zone NOT NULL,
    updated_at timestamp(6) without time zone NOT NULL,
    country_code character varying,
    show_modal boolean DEFAULT true
);


--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.users_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: users_roles; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.users_roles (
    user_id bigint,
    role_id bigint
);


--
-- Name: walls; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.walls (
    id bigint NOT NULL,
    rains boolean DEFAULT false,
    published boolean DEFAULT false,
    routes_count integer DEFAULT 0,
    zone_id bigint NOT NULL,
    name character varying,
    description text,
    created_at timestamp(6) without time zone NOT NULL,
    updated_at timestamp(6) without time zone NOT NULL,
    sector_id bigint
);


--
-- Name: walls_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.walls_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: walls_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.walls_id_seq OWNED BY public.walls.id;


--
-- Name: zone_climbing_types; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.zone_climbing_types (
    id bigint NOT NULL,
    zone_id bigint NOT NULL,
    climbing_type_id bigint NOT NULL,
    created_at timestamp(6) without time zone NOT NULL,
    updated_at timestamp(6) without time zone NOT NULL
);


--
-- Name: zone_climbing_types_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.zone_climbing_types_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: zone_climbing_types_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.zone_climbing_types_id_seq OWNED BY public.zone_climbing_types.id;


--
-- Name: zone_coalitions; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.zone_coalitions (
    id bigint NOT NULL,
    coalition_id bigint NOT NULL,
    zone_id bigint NOT NULL,
    created_at timestamp(6) without time zone NOT NULL,
    updated_at timestamp(6) without time zone NOT NULL
);


--
-- Name: zone_coalitions_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.zone_coalitions_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: zone_coalitions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.zone_coalitions_id_seq OWNED BY public.zone_coalitions.id;


--
-- Name: zone_owners; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.zone_owners (
    id bigint NOT NULL,
    zone_id bigint NOT NULL,
    owner_id bigint NOT NULL,
    created_at timestamp(6) without time zone NOT NULL,
    updated_at timestamp(6) without time zone NOT NULL
);


--
-- Name: zone_owners_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.zone_owners_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: zone_owners_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.zone_owners_id_seq OWNED BY public.zone_owners.id;


--
-- Name: zones; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.zones (
    id bigint NOT NULL,
    camping_zone integer DEFAULT 2,
    bathroom_available integer DEFAULT 2,
    fire_allowed integer DEFAULT 2,
    published boolean DEFAULT false,
    multipitch boolean DEFAULT false,
    latitude numeric,
    longitude numeric,
    altitude double precision,
    routes_count integer DEFAULT 0,
    price integer DEFAULT 0,
    region_id bigint NOT NULL,
    name character varying,
    location character varying,
    lonlat public.geography(Point,4326),
    description text,
    created_at timestamp(6) without time zone NOT NULL,
    updated_at timestamp(6) without time zone NOT NULL,
    suitable_for_children integer DEFAULT 2
);


--
-- Name: zones_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.zones_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: zones_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.zones_id_seq OWNED BY public.zones.id;


--
-- Name: action_text_rich_texts id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.action_text_rich_texts ALTER COLUMN id SET DEFAULT nextval('public.action_text_rich_texts_id_seq'::regclass);


--
-- Name: active_storage_attachments id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.active_storage_attachments ALTER COLUMN id SET DEFAULT nextval('public.active_storage_attachments_id_seq'::regclass);


--
-- Name: active_storage_blobs id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.active_storage_blobs ALTER COLUMN id SET DEFAULT nextval('public.active_storage_blobs_id_seq'::regclass);


--
-- Name: active_storage_variant_records id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.active_storage_variant_records ALTER COLUMN id SET DEFAULT nextval('public.active_storage_variant_records_id_seq'::regclass);


--
-- Name: climbed_routes id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.climbed_routes ALTER COLUMN id SET DEFAULT nextval('public.climbed_routes_id_seq'::regclass);


--
-- Name: climbing_types id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.climbing_types ALTER COLUMN id SET DEFAULT nextval('public.climbing_types_id_seq'::regclass);


--
-- Name: coalition_members id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.coalition_members ALTER COLUMN id SET DEFAULT nextval('public.coalition_members_id_seq'::regclass);


--
-- Name: coalitions id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.coalitions ALTER COLUMN id SET DEFAULT nextval('public.coalitions_id_seq'::regclass);


--
-- Name: collaborated_routes id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.collaborated_routes ALTER COLUMN id SET DEFAULT nextval('public.collaborated_routes_id_seq'::regclass);


--
-- Name: countries id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.countries ALTER COLUMN id SET DEFAULT nextval('public.countries_id_seq'::regclass);


--
-- Name: descent_alternatives id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.descent_alternatives ALTER COLUMN id SET DEFAULT nextval('public.descent_alternatives_id_seq'::regclass);


--
-- Name: descents id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.descents ALTER COLUMN id SET DEFAULT nextval('public.descents_id_seq'::regclass);


--
-- Name: downloaded_zones id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.downloaded_zones ALTER COLUMN id SET DEFAULT nextval('public.downloaded_zones_id_seq'::regclass);


--
-- Name: equipped_routes id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.equipped_routes ALTER COLUMN id SET DEFAULT nextval('public.equipped_routes_id_seq'::regclass);


--
-- Name: initiative_participants id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.initiative_participants ALTER COLUMN id SET DEFAULT nextval('public.initiative_participants_id_seq'::regclass);


--
-- Name: initiative_sponsors id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.initiative_sponsors ALTER COLUMN id SET DEFAULT nextval('public.initiative_sponsors_id_seq'::regclass);


--
-- Name: initiatives id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.initiatives ALTER COLUMN id SET DEFAULT nextval('public.initiatives_id_seq'::regclass);


--
-- Name: nesting_seasons id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.nesting_seasons ALTER COLUMN id SET DEFAULT nextval('public.nesting_seasons_id_seq'::regclass);


--
-- Name: owners id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.owners ALTER COLUMN id SET DEFAULT nextval('public.owners_id_seq'::regclass);


--
-- Name: pictures id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.pictures ALTER COLUMN id SET DEFAULT nextval('public.pictures_id_seq'::regclass);


--
-- Name: recent_zones id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.recent_zones ALTER COLUMN id SET DEFAULT nextval('public.recent_zones_id_seq'::regclass);


--
-- Name: recommended_descents id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.recommended_descents ALTER COLUMN id SET DEFAULT nextval('public.recommended_descents_id_seq'::regclass);


--
-- Name: recommended_seasons id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.recommended_seasons ALTER COLUMN id SET DEFAULT nextval('public.recommended_seasons_id_seq'::regclass);


--
-- Name: regions id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.regions ALTER COLUMN id SET DEFAULT nextval('public.regions_id_seq'::regclass);


--
-- Name: roles id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.roles ALTER COLUMN id SET DEFAULT nextval('public.roles_id_seq'::regclass);


--
-- Name: route_climbing_types id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.route_climbing_types ALTER COLUMN id SET DEFAULT nextval('public.route_climbing_types_id_seq'::regclass);


--
-- Name: route_reviews id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.route_reviews ALTER COLUMN id SET DEFAULT nextval('public.route_reviews_id_seq'::regclass);


--
-- Name: routes id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.routes ALTER COLUMN id SET DEFAULT nextval('public.routes_id_seq'::regclass);


--
-- Name: saved_routes id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.saved_routes ALTER COLUMN id SET DEFAULT nextval('public.saved_routes_id_seq'::regclass);


--
-- Name: season_sun_exposures id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.season_sun_exposures ALTER COLUMN id SET DEFAULT nextval('public.season_sun_exposures_id_seq'::regclass);


--
-- Name: seasons id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.seasons ALTER COLUMN id SET DEFAULT nextval('public.seasons_id_seq'::regclass);


--
-- Name: sectors id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.sectors ALTER COLUMN id SET DEFAULT nextval('public.sectors_id_seq'::regclass);


--
-- Name: sponsors id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.sponsors ALTER COLUMN id SET DEFAULT nextval('public.sponsors_id_seq'::regclass);


--
-- Name: sun_exposures id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.sun_exposures ALTER COLUMN id SET DEFAULT nextval('public.sun_exposures_id_seq'::regclass);


--
-- Name: user_sponsors id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.user_sponsors ALTER COLUMN id SET DEFAULT nextval('public.user_sponsors_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Name: walls id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.walls ALTER COLUMN id SET DEFAULT nextval('public.walls_id_seq'::regclass);


--
-- Name: zone_climbing_types id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.zone_climbing_types ALTER COLUMN id SET DEFAULT nextval('public.zone_climbing_types_id_seq'::regclass);


--
-- Name: zone_coalitions id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.zone_coalitions ALTER COLUMN id SET DEFAULT nextval('public.zone_coalitions_id_seq'::regclass);


--
-- Name: zone_owners id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.zone_owners ALTER COLUMN id SET DEFAULT nextval('public.zone_owners_id_seq'::regclass);


--
-- Name: zones id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.zones ALTER COLUMN id SET DEFAULT nextval('public.zones_id_seq'::regclass);


--
-- Data for Name: action_text_rich_texts; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.action_text_rich_texts (id, name, body, record_type, record_id, created_at, updated_at) FROM stdin;
17	rules		Zone	35	2021-02-24 16:06:13.799566	2021-02-24 16:06:13.799566
18	history		Zone	35	2021-02-24 16:06:13.820431	2021-02-24 16:06:13.820431
20	gear	<div>Hay rutas desde 3 hasta 15 chapas, lo cual se recomienda un juego amplio de cintas express. Si se decide realizar escalada clásica, se requieren ciertos fisureros ya que son rutas de 25 metros aprox.</div>	Zone	35	2021-02-24 16:06:13.843414	2021-02-24 16:11:00.554805
21	directions	<div>Desde la calle O'Higgins (calle principal de Chile Chico) doblar en Caupolicán y luego doblar a mano izquierda en Hernán Tizano. Por esa calle avanzar hasta ver un camino de tierra a mano izquierda justo en una curva. Ingresar por este camino hasta el final y dejar lo más cerca posible de la pared.</div>	Zone	35	2021-02-24 16:06:13.852984	2021-02-24 16:16:21.40451
27	route_status		Route	36	2021-02-25 14:22:13.715828	2021-02-25 14:22:13.715828
28	history		Route	36	2021-02-25 14:22:13.719809	2021-02-25 14:22:13.719809
29	gear	<div>10 cintas</div>	Route	36	2021-02-25 14:22:13.72687	2021-02-25 14:22:13.72687
31	history		Route	37	2021-02-25 14:23:37.003904	2021-02-25 14:23:37.003904
32	gear		Route	37	2021-02-25 14:23:37.006675	2021-02-25 14:23:37.006675
19	about	<div>Las rutas suelen ser de unos 20 a 30 metros y casi todas ellas cuentan con reunión de maillones o cadenas en buen estado. Además, las rutas de escalada tradicional/clásica, igualmente cuentan con reunión en buen estado.</div>	Zone	35	2021-02-24 16:06:13.835656	2021-03-01 15:13:29.300056
41	route_status		Route	39	2021-04-08 15:44:35.142001	2021-04-08 15:44:35.142001
42	history	<div>Excelente vía, sotenida y segura </div>	Route	39	2021-04-08 15:44:35.157873	2021-04-08 15:44:35.157873
43	gear	<div>8 cintas + reunión </div>	Route	39	2021-04-08 15:44:35.17778	2021-04-08 15:44:35.17778
74	rules		Zone	38	2021-04-08 22:42:08.911269	2021-04-08 22:42:08.911269
75	history		Zone	38	2021-04-08 22:42:08.916716	2021-04-08 22:42:08.916716
76	about		Zone	38	2021-04-08 22:42:08.921276	2021-04-08 22:42:08.921276
77	gear		Zone	38	2021-04-08 22:42:08.92907	2021-04-08 22:42:08.92907
78	directions		Zone	38	2021-04-08 22:42:08.933551	2021-04-08 22:42:08.933551
79	rules		Zone	39	2021-04-08 22:43:31.461882	2021-04-08 22:43:31.461882
80	history		Zone	39	2021-04-08 22:43:31.487496	2021-04-08 22:43:31.487496
81	about		Zone	39	2021-04-08 22:43:31.500414	2021-04-08 22:43:31.500414
82	gear		Zone	39	2021-04-08 22:43:31.512341	2021-04-08 22:43:31.512341
83	directions		Zone	39	2021-04-08 22:43:31.520431	2021-04-08 22:43:31.520431
84	rules		Zone	40	2021-04-08 22:44:14.703952	2021-04-08 22:44:14.703952
85	history		Zone	40	2021-04-08 22:44:14.735531	2021-04-08 22:44:14.735531
86	about		Zone	40	2021-04-08 22:44:14.795724	2021-04-08 22:44:14.795724
87	gear		Zone	40	2021-04-08 22:44:14.815047	2021-04-08 22:44:14.815047
88	directions		Zone	40	2021-04-08 22:44:14.823802	2021-04-08 22:44:14.823802
89	rules		Zone	41	2021-04-08 22:45:55.080941	2021-04-08 22:45:55.080941
90	history		Zone	41	2021-04-08 22:45:55.09217	2021-04-08 22:45:55.09217
91	about		Zone	41	2021-04-08 22:45:55.101236	2021-04-08 22:45:55.101236
92	gear		Zone	41	2021-04-08 22:45:55.114379	2021-04-08 22:45:55.114379
93	directions		Zone	41	2021-04-08 22:45:55.126411	2021-04-08 22:45:55.126411
94	rules		Zone	42	2021-04-08 22:46:50.599989	2021-04-08 22:46:50.599989
95	history		Zone	42	2021-04-08 22:46:50.610582	2021-04-08 22:46:50.610582
96	about		Zone	42	2021-04-08 22:46:50.643455	2021-04-08 22:46:50.643455
97	gear		Zone	42	2021-04-08 22:46:50.653579	2021-04-08 22:46:50.653579
98	directions		Zone	42	2021-04-08 22:46:50.674365	2021-04-08 22:46:50.674365
99	rules		Zone	43	2021-04-08 22:47:37.03113	2021-04-08 22:47:37.03113
100	history		Zone	43	2021-04-08 22:47:37.040615	2021-04-08 22:47:37.040615
101	about		Zone	43	2021-04-08 22:47:37.048716	2021-04-08 22:47:37.048716
102	gear		Zone	43	2021-04-08 22:47:37.058496	2021-04-08 22:47:37.058496
103	directions		Zone	43	2021-04-08 22:47:37.067404	2021-04-08 22:47:37.067404
104	rules		Zone	44	2021-04-08 22:48:14.57282	2021-04-08 22:48:14.57282
105	history		Zone	44	2021-04-08 22:48:14.582161	2021-04-08 22:48:14.582161
106	about		Zone	44	2021-04-08 22:48:14.592657	2021-04-08 22:48:14.592657
107	gear		Zone	44	2021-04-08 22:48:14.612492	2021-04-08 22:48:14.612492
108	directions		Zone	44	2021-04-08 22:48:14.668304	2021-04-08 22:48:14.668304
109	rules		Zone	45	2021-04-08 22:48:43.131508	2021-04-08 22:48:43.131508
110	history		Zone	45	2021-04-08 22:48:43.135688	2021-04-08 22:48:43.135688
111	about		Zone	45	2021-04-08 22:48:43.140518	2021-04-08 22:48:43.140518
112	gear		Zone	45	2021-04-08 22:48:43.215872	2021-04-08 22:48:43.215872
113	directions		Zone	45	2021-04-08 22:48:43.251119	2021-04-08 22:48:43.251119
114	rules		Zone	46	2021-04-08 22:49:36.928102	2021-04-08 22:49:36.928102
115	history		Zone	46	2021-04-08 22:49:36.940996	2021-04-08 22:49:36.940996
116	about		Zone	46	2021-04-08 22:49:36.961778	2021-04-08 22:49:36.961778
117	gear		Zone	46	2021-04-08 22:49:36.998752	2021-04-08 22:49:36.998752
118	directions		Zone	46	2021-04-08 22:49:37.003792	2021-04-08 22:49:37.003792
119	rules		Zone	47	2021-04-08 22:50:42.135765	2021-04-08 22:50:42.135765
120	history		Zone	47	2021-04-08 22:50:42.147755	2021-04-08 22:50:42.147755
121	about		Zone	47	2021-04-08 22:50:42.155776	2021-04-08 22:50:42.155776
122	gear		Zone	47	2021-04-08 22:50:42.160381	2021-04-08 22:50:42.160381
123	directions		Zone	47	2021-04-08 22:50:42.166973	2021-04-08 22:50:42.166973
124	rules		Zone	48	2021-04-08 22:51:26.43393	2021-04-08 22:51:26.43393
125	history		Zone	48	2021-04-08 22:51:26.440706	2021-04-08 22:51:26.440706
126	about		Zone	48	2021-04-08 22:51:26.466759	2021-04-08 22:51:26.466759
127	gear		Zone	48	2021-04-08 22:51:26.471447	2021-04-08 22:51:26.471447
128	directions		Zone	48	2021-04-08 22:51:26.475652	2021-04-08 22:51:26.475652
129	rules		Zone	49	2021-04-08 22:52:08.046228	2021-04-08 22:52:08.046228
130	history		Zone	49	2021-04-08 22:52:08.0492	2021-04-08 22:52:08.0492
131	about		Zone	49	2021-04-08 22:52:08.052791	2021-04-08 22:52:08.052791
132	gear		Zone	49	2021-04-08 22:52:08.056269	2021-04-08 22:52:08.056269
133	directions		Zone	49	2021-04-08 22:52:08.061251	2021-04-08 22:52:08.061251
134	rules		Zone	50	2021-04-08 22:53:03.776664	2021-04-08 22:53:03.776664
135	history		Zone	50	2021-04-08 22:53:03.790632	2021-04-08 22:53:03.790632
136	about		Zone	50	2021-04-08 22:53:03.799883	2021-04-08 22:53:03.799883
137	gear		Zone	50	2021-04-08 22:53:03.810943	2021-04-08 22:53:03.810943
138	directions		Zone	50	2021-04-08 22:53:03.83519	2021-04-08 22:53:03.83519
139	rules		Zone	51	2021-04-08 22:53:42.194982	2021-04-08 22:53:42.194982
140	history		Zone	51	2021-04-08 22:53:42.202442	2021-04-08 22:53:42.202442
141	about		Zone	51	2021-04-08 22:53:42.213065	2021-04-08 22:53:42.213065
142	gear		Zone	51	2021-04-08 22:53:42.218766	2021-04-08 22:53:42.218766
143	directions		Zone	51	2021-04-08 22:53:42.231421	2021-04-08 22:53:42.231421
144	rules		Zone	52	2021-04-08 22:54:28.465585	2021-04-08 22:54:28.465585
145	history		Zone	52	2021-04-08 22:54:28.470708	2021-04-08 22:54:28.470708
146	about		Zone	52	2021-04-08 22:54:28.475345	2021-04-08 22:54:28.475345
147	gear		Zone	52	2021-04-08 22:54:28.482001	2021-04-08 22:54:28.482001
148	directions		Zone	52	2021-04-08 22:54:28.489887	2021-04-08 22:54:28.489887
149	rules		Zone	53	2021-04-08 22:55:19.952553	2021-04-08 22:55:19.952553
150	history		Zone	53	2021-04-08 22:55:19.97675	2021-04-08 22:55:19.97675
151	about		Zone	53	2021-04-08 22:55:19.994228	2021-04-08 22:55:19.994228
152	gear		Zone	53	2021-04-08 22:55:20.021128	2021-04-08 22:55:20.021128
153	directions		Zone	53	2021-04-08 22:55:20.035241	2021-04-08 22:55:20.035241
154	rules		Zone	54	2021-04-08 22:56:01.014616	2021-04-08 22:56:01.014616
155	history		Zone	54	2021-04-08 22:56:01.020575	2021-04-08 22:56:01.020575
156	about		Zone	54	2021-04-08 22:56:01.026175	2021-04-08 22:56:01.026175
157	gear		Zone	54	2021-04-08 22:56:01.031862	2021-04-08 22:56:01.031862
158	directions		Zone	54	2021-04-08 22:56:01.03675	2021-04-08 22:56:01.03675
159	rules		Zone	55	2021-04-08 22:56:42.593136	2021-04-08 22:56:42.593136
160	history		Zone	55	2021-04-08 22:56:42.604238	2021-04-08 22:56:42.604238
161	about		Zone	55	2021-04-08 22:56:42.612658	2021-04-08 22:56:42.612658
162	gear		Zone	55	2021-04-08 22:56:42.620205	2021-04-08 22:56:42.620205
163	directions		Zone	55	2021-04-08 22:56:42.631315	2021-04-08 22:56:42.631315
164	rules		Zone	56	2021-04-08 22:57:19.470209	2021-04-08 22:57:19.470209
165	history		Zone	56	2021-04-08 22:57:19.476639	2021-04-08 22:57:19.476639
166	about		Zone	56	2021-04-08 22:57:19.484194	2021-04-08 22:57:19.484194
167	gear		Zone	56	2021-04-08 22:57:19.49157	2021-04-08 22:57:19.49157
168	directions		Zone	56	2021-04-08 22:57:19.501408	2021-04-08 22:57:19.501408
169	rules		Zone	57	2021-04-08 22:57:55.029843	2021-04-08 22:57:55.029843
170	history		Zone	57	2021-04-08 22:57:55.04841	2021-04-08 22:57:55.04841
171	about		Zone	57	2021-04-08 22:57:55.061497	2021-04-08 22:57:55.061497
172	gear		Zone	57	2021-04-08 22:57:55.068103	2021-04-08 22:57:55.068103
173	directions		Zone	57	2021-04-08 22:57:55.077298	2021-04-08 22:57:55.077298
174	rules		Zone	58	2021-04-08 22:58:20.546622	2021-04-08 22:58:20.546622
175	history		Zone	58	2021-04-08 22:58:20.557814	2021-04-08 22:58:20.557814
176	about		Zone	58	2021-04-08 22:58:20.564877	2021-04-08 22:58:20.564877
177	gear		Zone	58	2021-04-08 22:58:20.571906	2021-04-08 22:58:20.571906
178	directions		Zone	58	2021-04-08 22:58:20.584536	2021-04-08 22:58:20.584536
179	rules		Zone	59	2021-04-08 22:58:46.198964	2021-04-08 22:58:46.198964
180	history		Zone	59	2021-04-08 22:58:46.203858	2021-04-08 22:58:46.203858
181	about		Zone	59	2021-04-08 22:58:46.211803	2021-04-08 22:58:46.211803
182	gear		Zone	59	2021-04-08 22:58:46.220904	2021-04-08 22:58:46.220904
183	directions		Zone	59	2021-04-08 22:58:46.228582	2021-04-08 22:58:46.228582
184	rules		Zone	60	2021-04-08 22:59:21.733373	2021-04-08 22:59:21.733373
185	history		Zone	60	2021-04-08 22:59:21.73956	2021-04-08 22:59:21.73956
186	about		Zone	60	2021-04-08 22:59:21.746836	2021-04-08 22:59:21.746836
187	gear		Zone	60	2021-04-08 22:59:21.751009	2021-04-08 22:59:21.751009
188	directions		Zone	60	2021-04-08 22:59:21.754497	2021-04-08 22:59:21.754497
189	rules		Zone	61	2021-04-08 22:59:58.796356	2021-04-08 22:59:58.796356
190	history		Zone	61	2021-04-08 22:59:58.80133	2021-04-08 22:59:58.80133
191	about		Zone	61	2021-04-08 22:59:58.809296	2021-04-08 22:59:58.809296
192	gear		Zone	61	2021-04-08 22:59:58.813906	2021-04-08 22:59:58.813906
193	directions		Zone	61	2021-04-08 22:59:58.81849	2021-04-08 22:59:58.81849
194	rules		Zone	62	2021-04-08 23:00:31.951714	2021-04-08 23:00:31.951714
195	history		Zone	62	2021-04-08 23:00:31.964988	2021-04-08 23:00:31.964988
196	about		Zone	62	2021-04-08 23:00:31.977735	2021-04-08 23:00:31.977735
197	gear		Zone	62	2021-04-08 23:00:32.002231	2021-04-08 23:00:32.002231
198	directions		Zone	62	2021-04-08 23:00:32.013244	2021-04-08 23:00:32.013244
199	rules		Zone	63	2021-04-08 23:01:01.758396	2021-04-08 23:01:01.758396
200	history		Zone	63	2021-04-08 23:01:01.763308	2021-04-08 23:01:01.763308
201	about		Zone	63	2021-04-08 23:01:01.767843	2021-04-08 23:01:01.767843
202	gear		Zone	63	2021-04-08 23:01:01.773569	2021-04-08 23:01:01.773569
203	directions		Zone	63	2021-04-08 23:01:01.779649	2021-04-08 23:01:01.779649
204	rules		Zone	64	2021-04-08 23:01:45.212396	2021-04-08 23:01:45.212396
205	history		Zone	64	2021-04-08 23:01:45.224426	2021-04-08 23:01:45.224426
206	about		Zone	64	2021-04-08 23:01:45.236432	2021-04-08 23:01:45.236432
207	gear		Zone	64	2021-04-08 23:01:45.25209	2021-04-08 23:01:45.25209
208	directions		Zone	64	2021-04-08 23:01:45.261073	2021-04-08 23:01:45.261073
209	rules		Zone	65	2021-04-08 23:02:23.915595	2021-04-08 23:02:23.915595
210	history		Zone	65	2021-04-08 23:02:23.921566	2021-04-08 23:02:23.921566
211	about		Zone	65	2021-04-08 23:02:23.957118	2021-04-08 23:02:23.957118
212	gear		Zone	65	2021-04-08 23:02:23.965339	2021-04-08 23:02:23.965339
213	directions		Zone	65	2021-04-08 23:02:23.97913	2021-04-08 23:02:23.97913
214	rules		Zone	66	2021-04-08 23:02:52.710721	2021-04-08 23:02:52.710721
215	history		Zone	66	2021-04-08 23:02:52.716988	2021-04-08 23:02:52.716988
216	about		Zone	66	2021-04-08 23:02:52.731629	2021-04-08 23:02:52.731629
217	gear		Zone	66	2021-04-08 23:02:52.740487	2021-04-08 23:02:52.740487
218	directions		Zone	66	2021-04-08 23:02:52.745357	2021-04-08 23:02:52.745357
219	rules		Zone	67	2021-04-08 23:03:35.600145	2021-04-08 23:03:35.600145
220	history		Zone	67	2021-04-08 23:03:35.61267	2021-04-08 23:03:35.61267
221	about		Zone	67	2021-04-08 23:03:35.625947	2021-04-08 23:03:35.625947
222	gear		Zone	67	2021-04-08 23:03:35.63939	2021-04-08 23:03:35.63939
223	directions		Zone	67	2021-04-08 23:03:35.652394	2021-04-08 23:03:35.652394
224	rules		Zone	68	2021-04-08 23:04:06.340785	2021-04-08 23:04:06.340785
225	history		Zone	68	2021-04-08 23:04:06.348914	2021-04-08 23:04:06.348914
226	about		Zone	68	2021-04-08 23:04:06.357841	2021-04-08 23:04:06.357841
227	gear		Zone	68	2021-04-08 23:04:06.392732	2021-04-08 23:04:06.392732
228	directions		Zone	68	2021-04-08 23:04:06.406781	2021-04-08 23:04:06.406781
229	rules		Zone	69	2021-04-08 23:04:40.77594	2021-04-08 23:04:40.77594
230	history		Zone	69	2021-04-08 23:04:40.796926	2021-04-08 23:04:40.796926
231	about		Zone	69	2021-04-08 23:04:40.81903	2021-04-08 23:04:40.81903
232	gear		Zone	69	2021-04-08 23:04:40.823628	2021-04-08 23:04:40.823628
233	directions		Zone	69	2021-04-08 23:04:40.827665	2021-04-08 23:04:40.827665
234	rules		Zone	70	2021-04-08 23:05:14.676561	2021-04-08 23:05:14.676561
235	history		Zone	70	2021-04-08 23:05:14.68133	2021-04-08 23:05:14.68133
236	about		Zone	70	2021-04-08 23:05:14.689556	2021-04-08 23:05:14.689556
237	gear		Zone	70	2021-04-08 23:05:14.69667	2021-04-08 23:05:14.69667
238	directions		Zone	70	2021-04-08 23:05:14.701601	2021-04-08 23:05:14.701601
239	route_status		Route	72	2021-04-13 14:12:10.412082	2021-04-13 14:12:10.412082
240	history	<div>Ruta equipada desde abajo</div>	Route	72	2021-04-13 14:12:10.442499	2021-04-13 14:12:10.442499
241	gear	<div>13 cintas</div>	Route	72	2021-04-13 14:12:10.465042	2021-04-13 14:12:10.465042
242	route_status		Route	73	2021-04-13 14:13:54.159417	2021-04-13 14:13:54.159417
243	history	<div>Una de las primeras rutas del sector, es más difícil de lo que parece</div>	Route	73	2021-04-13 14:13:54.169209	2021-04-13 14:13:54.169209
244	gear	<div>8 cintas</div>	Route	73	2021-04-13 14:13:54.184223	2021-04-13 14:13:54.184223
245	route_status		Route	74	2021-04-13 14:15:02.36344	2021-04-13 14:15:02.36344
246	history	<div>Corta pero entretenida</div>	Route	74	2021-04-13 14:15:02.37712	2021-04-13 14:15:02.37712
247	gear		Route	74	2021-04-13 14:15:02.409127	2021-04-13 14:15:02.409127
248	route_status		Route	75	2021-04-13 14:16:00.486241	2021-04-13 14:16:00.486241
249	history	<div>La primera ruta del cerro el indio y un clásico inmediato</div>	Route	75	2021-04-13 14:16:00.492954	2021-04-13 14:16:00.492954
250	gear		Route	75	2021-04-13 14:16:00.511819	2021-04-13 14:16:00.511819
251	route_status		Route	76	2021-04-13 14:17:09.42616	2021-04-13 14:17:09.42616
252	history		Route	76	2021-04-13 14:17:09.443703	2021-04-13 14:17:09.443703
253	gear		Route	76	2021-04-13 14:17:09.456858	2021-04-13 14:17:09.456858
254	route_status		Route	77	2021-04-13 14:18:30.602109	2021-04-13 14:18:30.602109
255	history		Route	77	2021-04-13 14:18:30.625285	2021-04-13 14:18:30.625285
256	gear		Route	77	2021-04-13 14:18:30.656427	2021-04-13 14:18:30.656427
30	route_status	<div>Bonita ruta, parte a la izquierda de Roquefort, pasa por <strong>3 desplomes</strong> en una esquina que mira hacia la derecha</div>	Route	37	2021-02-25 14:23:37.000297	2021-04-14 12:19:34.170109
257	history	\N	Route	78	2021-04-25 22:56:49.536894	2021-04-25 22:56:49.536894
258	gear	Cintas exprés, cuerda de 60m.	Route	78	2021-04-25 22:56:50.582968	2021-04-25 22:56:50.582968
259	history	\N	Route	79	2021-04-25 22:56:50.894911	2021-04-25 22:56:50.894911
260	gear	Cintas exprés, cuerda de 60m.	Route	79	2021-04-25 22:56:50.905515	2021-04-25 22:56:50.905515
261	history	\N	Route	80	2021-04-25 22:56:51.003689	2021-04-25 22:56:51.003689
262	gear	Cintas exprés, cuerda de 60m.	Route	80	2021-04-25 22:56:51.041554	2021-04-25 22:56:51.041554
263	history	\N	Route	81	2021-04-25 22:56:51.144281	2021-04-25 22:56:51.144281
264	gear	Cintas exprés, cuerda de 60m.	Route	81	2021-04-25 22:56:51.151307	2021-04-25 22:56:51.151307
265	history	\N	Route	82	2021-04-25 22:56:51.25832	2021-04-25 22:56:51.25832
266	gear	Cintas exprés, cuerda de 60m.	Route	82	2021-04-25 22:56:51.263939	2021-04-25 22:56:51.263939
267	history	\N	Route	83	2021-04-25 22:56:51.354662	2021-04-25 22:56:51.354662
268	gear	Cintas exprés, cuerda de 60m.	Route	83	2021-04-25 22:56:51.360279	2021-04-25 22:56:51.360279
269	history	\N	Route	84	2021-04-25 22:56:51.453813	2021-04-25 22:56:51.453813
270	gear	Cintas exprés, cuerda de 60m.	Route	84	2021-04-25 22:56:51.466935	2021-04-25 22:56:51.466935
271	history	\N	Route	85	2021-04-25 22:56:51.586402	2021-04-25 22:56:51.586402
272	gear	Cintas exprés, cuerda de 60m.	Route	85	2021-04-25 22:56:51.598957	2021-04-25 22:56:51.598957
273	history	\N	Route	86	2021-04-25 22:56:51.72184	2021-04-25 22:56:51.72184
274	gear	Cintas exprés, cuerda de 60m.	Route	86	2021-04-25 22:56:51.731325	2021-04-25 22:56:51.731325
275	history	\N	Route	87	2021-04-25 22:56:51.851863	2021-04-25 22:56:51.851863
276	gear	Cintas exprés, cuerda de 60m.	Route	87	2021-04-25 22:56:51.859269	2021-04-25 22:56:51.859269
277	history	\N	Route	88	2021-04-25 22:56:51.941773	2021-04-25 22:56:51.941773
278	gear	Cintas exprés, cuerda de 60m.	Route	88	2021-04-25 22:56:51.947231	2021-04-25 22:56:51.947231
279	history	\N	Route	89	2021-04-25 22:56:52.008776	2021-04-25 22:56:52.008776
280	gear	Cintas exprés, cuerda de 60m.	Route	89	2021-04-25 22:56:52.014214	2021-04-25 22:56:52.014214
281	history	\N	Route	90	2021-04-25 22:56:52.070166	2021-04-25 22:56:52.070166
282	gear	Cintas exprés, cuerda de 60m.	Route	90	2021-04-25 22:56:52.075631	2021-04-25 22:56:52.075631
283	history	\N	Route	91	2021-04-25 22:56:52.16378	2021-04-25 22:56:52.16378
284	gear	Cintas exprés, cuerda de 60m.	Route	91	2021-04-25 22:56:52.169035	2021-04-25 22:56:52.169035
285	history	\N	Route	92	2021-04-25 22:56:52.285626	2021-04-25 22:56:52.285626
286	gear	Cintas exprés, cuerda de 60m.	Route	92	2021-04-25 22:56:52.293175	2021-04-25 22:56:52.293175
287	history	\N	Route	93	2021-04-25 22:56:52.35925	2021-04-25 22:56:52.35925
288	gear	Cintas exprés, cuerda de 60m.	Route	93	2021-04-25 22:56:52.364708	2021-04-25 22:56:52.364708
289	history	\N	Route	94	2021-04-25 22:56:52.42202	2021-04-25 22:56:52.42202
290	gear	Cintas exprés, cuerda de 60m.	Route	94	2021-04-25 22:56:52.42709	2021-04-25 22:56:52.42709
291	history	\N	Route	95	2021-04-25 22:56:52.513312	2021-04-25 22:56:52.513312
292	gear	Cintas exprés, cuerda de 60m.	Route	95	2021-04-25 22:56:52.520607	2021-04-25 22:56:52.520607
293	history	\N	Route	96	2021-04-25 22:56:52.581019	2021-04-25 22:56:52.581019
294	gear	Cintas exprés, cuerda de 60m.	Route	96	2021-04-25 22:56:52.586305	2021-04-25 22:56:52.586305
295	history	\N	Route	97	2021-04-25 22:56:52.73076	2021-04-25 22:56:52.73076
296	gear	Cintas exprés, cuerda de 70m.	Route	97	2021-04-25 22:56:52.736028	2021-04-25 22:56:52.736028
297	history	\N	Route	98	2021-04-25 22:56:52.825154	2021-04-25 22:56:52.825154
298	gear	Cintas exprés, cuerda de 70m.	Route	98	2021-04-25 22:56:52.833688	2021-04-25 22:56:52.833688
299	history	\N	Route	99	2021-04-25 22:56:52.913469	2021-04-25 22:56:52.913469
300	gear	Cintas exprés, cuerda de 70m.	Route	99	2021-04-25 22:56:52.91831	2021-04-25 22:56:52.91831
301	history	\N	Route	100	2021-04-25 22:56:52.977146	2021-04-25 22:56:52.977146
302	gear	Cintas exprés, cuerda de 70m.	Route	100	2021-04-25 22:56:52.982542	2021-04-25 22:56:52.982542
303	history	\N	Route	101	2021-04-25 22:56:53.042097	2021-04-25 22:56:53.042097
304	gear	Cintas exprés, cuerda de 60m.	Route	101	2021-04-25 22:56:53.04801	2021-04-25 22:56:53.04801
305	history	\N	Route	102	2021-04-25 22:56:53.177623	2021-04-25 22:56:53.177623
306	gear	Cintas exprés, cuerda de 60m.	Route	102	2021-04-25 22:56:53.183399	2021-04-25 22:56:53.183399
307	history	\N	Route	103	2021-04-25 22:56:53.261512	2021-04-25 22:56:53.261512
308	gear	Cintas exprés, cuerda de 60m.	Route	103	2021-04-25 22:56:53.266692	2021-04-25 22:56:53.266692
309	history	\N	Route	104	2021-04-25 22:56:53.341281	2021-04-25 22:56:53.341281
310	gear	Cintas exprés, cuerda de 60m.	Route	104	2021-04-25 22:56:53.346311	2021-04-25 22:56:53.346311
311	history	\N	Route	105	2021-04-25 22:56:53.431691	2021-04-25 22:56:53.431691
312	gear	Cintas exprés, cuerda de 60m.	Route	105	2021-04-25 22:56:53.437038	2021-04-25 22:56:53.437038
313	history	\N	Route	106	2021-04-25 22:56:53.52003	2021-04-25 22:56:53.52003
314	gear	Cintas exprés, cuerda de 60m.	Route	106	2021-04-25 22:56:53.528188	2021-04-25 22:56:53.528188
315	history	\N	Route	107	2021-04-25 22:56:53.605525	2021-04-25 22:56:53.605525
316	gear	Cintas exprés, cuerda de 60m.	Route	107	2021-04-25 22:56:53.61472	2021-04-25 22:56:53.61472
317	history	\N	Route	108	2021-04-25 22:56:53.705864	2021-04-25 22:56:53.705864
318	gear	Cintas exprés, cuerda de 60m.	Route	108	2021-04-25 22:56:53.718585	2021-04-25 22:56:53.718585
319	history	\N	Route	109	2021-04-25 22:56:53.78954	2021-04-25 22:56:53.78954
320	gear	Cintas exprés, cuerda de 60m.	Route	109	2021-04-25 22:56:53.795538	2021-04-25 22:56:53.795538
321	history	\N	Route	110	2021-04-25 22:56:53.881124	2021-04-25 22:56:53.881124
322	gear	Cintas exprés, cuerda de 60m.	Route	110	2021-04-25 22:56:53.886297	2021-04-25 22:56:53.886297
323	history	\N	Route	111	2021-04-25 22:56:53.958062	2021-04-25 22:56:53.958062
324	gear	Cintas exprés, cuerda de 60m.	Route	111	2021-04-25 22:56:53.964525	2021-04-25 22:56:53.964525
325	history	\N	Route	112	2021-04-25 22:56:54.019542	2021-04-25 22:56:54.019542
326	gear	Cintas exprés, cuerda de 60m.	Route	112	2021-04-25 22:56:54.025329	2021-04-25 22:56:54.025329
327	history	\N	Route	113	2021-04-25 22:56:54.106031	2021-04-25 22:56:54.106031
328	gear	Cintas exprés, cuerda de 70m.	Route	113	2021-04-25 22:56:54.114872	2021-04-25 22:56:54.114872
329	history	\N	Route	114	2021-04-25 22:56:54.176665	2021-04-25 22:56:54.176665
330	gear	Cintas exprés, cuerda de 60m.	Route	114	2021-04-25 22:56:54.182022	2021-04-25 22:56:54.182022
331	history	\N	Route	115	2021-04-25 22:56:54.259065	2021-04-25 22:56:54.259065
332	gear	Cintas exprés, cuerda de 60m.	Route	115	2021-04-25 22:56:54.267191	2021-04-25 22:56:54.267191
333	history	\N	Route	116	2021-04-25 22:56:54.330414	2021-04-25 22:56:54.330414
334	gear	Cintas exprés, cuerda de 60m.	Route	116	2021-04-25 22:56:54.335143	2021-04-25 22:56:54.335143
335	history	\N	Route	117	2021-04-25 22:56:54.395342	2021-04-25 22:56:54.395342
336	gear	Cintas exprés, cuerda de 60m.	Route	117	2021-04-25 22:56:54.401368	2021-04-25 22:56:54.401368
337	history	\N	Route	118	2021-04-25 22:56:54.45547	2021-04-25 22:56:54.45547
338	gear	Cintas exprés, cuerda de 60m.	Route	118	2021-04-25 22:56:54.471336	2021-04-25 22:56:54.471336
339	history	\N	Route	119	2021-04-25 22:56:54.547907	2021-04-25 22:56:54.547907
340	gear	Cintas exprés, cuerda de 60m.	Route	119	2021-04-25 22:56:54.553063	2021-04-25 22:56:54.553063
341	history	\N	Route	120	2021-04-25 22:56:54.614708	2021-04-25 22:56:54.614708
342	gear	Cintas exprés, cuerda de 60m.	Route	120	2021-04-25 22:56:54.640798	2021-04-25 22:56:54.640798
343	history	\N	Route	121	2021-04-25 22:56:54.741385	2021-04-25 22:56:54.741385
344	gear	Cintas exprés, cuerda de 60m.	Route	121	2021-04-25 22:56:54.749958	2021-04-25 22:56:54.749958
345	history	\N	Route	122	2021-04-25 22:56:54.863803	2021-04-25 22:56:54.863803
346	gear	Cintas exprés, cuerda de 60m.	Route	122	2021-04-25 22:56:54.873898	2021-04-25 22:56:54.873898
347	history	\N	Route	123	2021-04-25 22:56:54.945576	2021-04-25 22:56:54.945576
348	gear	Cintas exprés, cuerda de 60m.	Route	123	2021-04-25 22:56:54.95498	2021-04-25 22:56:54.95498
349	history	\N	Route	124	2021-04-25 22:56:55.056084	2021-04-25 22:56:55.056084
350	gear	Cintas exprés, cuerda de 60m.	Route	124	2021-04-25 22:56:55.061291	2021-04-25 22:56:55.061291
351	history	\N	Route	125	2021-04-25 22:56:55.135532	2021-04-25 22:56:55.135532
352	gear	Cintas exprés, cuerda de 60m.	Route	125	2021-04-25 22:56:55.143125	2021-04-25 22:56:55.143125
353	history	\N	Route	126	2021-04-25 22:56:55.218589	2021-04-25 22:56:55.218589
354	gear	Cintas exprés, cuerda de 60m.	Route	126	2021-04-25 22:56:55.225387	2021-04-25 22:56:55.225387
355	history	\N	Route	127	2021-04-25 22:56:55.337175	2021-04-25 22:56:55.337175
356	gear	Cintas exprés, cuerda de 60m.	Route	127	2021-04-25 22:56:55.343106	2021-04-25 22:56:55.343106
357	history	\N	Route	128	2021-04-25 22:56:55.430501	2021-04-25 22:56:55.430501
358	gear	Cintas exprés, cuerda de 60m.	Route	128	2021-04-25 22:56:55.43832	2021-04-25 22:56:55.43832
359	history	\N	Route	129	2021-04-25 22:56:55.537447	2021-04-25 22:56:55.537447
360	gear	Cintas exprés, cuerda de 60m.	Route	129	2021-04-25 22:56:55.542766	2021-04-25 22:56:55.542766
361	history	\N	Route	130	2021-04-25 22:56:55.620575	2021-04-25 22:56:55.620575
362	gear	Cintas exprés, cuerda de 60m.	Route	130	2021-04-25 22:56:55.626345	2021-04-25 22:56:55.626345
363	history	\N	Route	131	2021-04-25 22:56:55.690257	2021-04-25 22:56:55.690257
364	gear	Cintas exprés, cuerda de 60m.	Route	131	2021-04-25 22:56:55.699083	2021-04-25 22:56:55.699083
365	history	\N	Route	132	2021-04-25 22:56:55.766606	2021-04-25 22:56:55.766606
366	gear	Cintas exprés, cuerda de 60m.	Route	132	2021-04-25 22:56:55.771713	2021-04-25 22:56:55.771713
367	history	\N	Route	133	2021-04-25 22:56:55.833178	2021-04-25 22:56:55.833178
368	gear	Cintas exprés, cuerda de 60m.	Route	133	2021-04-25 22:56:55.84042	2021-04-25 22:56:55.84042
369	history	\N	Route	134	2021-04-25 22:56:55.913488	2021-04-25 22:56:55.913488
370	gear	Cintas exprés, cuerda de 60m.	Route	134	2021-04-25 22:56:55.918684	2021-04-25 22:56:55.918684
371	history	\N	Route	135	2021-04-25 22:56:55.974481	2021-04-25 22:56:55.974481
372	gear	Cintas exprés, cuerda de 60m.	Route	135	2021-04-25 22:56:55.980091	2021-04-25 22:56:55.980091
373	history	\N	Route	136	2021-04-25 22:56:56.078219	2021-04-25 22:56:56.078219
374	gear	Cintas exprés, cuerda de 60m.	Route	136	2021-04-25 22:56:56.087367	2021-04-25 22:56:56.087367
375	history	\N	Route	137	2021-04-25 22:56:56.151501	2021-04-25 22:56:56.151501
376	gear	Cintas exprés, cuerda de 60m.	Route	137	2021-04-25 22:56:56.157483	2021-04-25 22:56:56.157483
377	history	\N	Route	138	2021-04-25 22:56:56.240943	2021-04-25 22:56:56.240943
378	gear	Cintas exprés, cuerda de 60m.	Route	138	2021-04-25 22:56:56.245899	2021-04-25 22:56:56.245899
379	history	\N	Route	139	2021-04-25 22:56:56.307991	2021-04-25 22:56:56.307991
380	gear	Cintas exprés, cuerda de 60m.	Route	139	2021-04-25 22:56:56.312941	2021-04-25 22:56:56.312941
381	history	\N	Route	140	2021-04-25 22:56:56.368876	2021-04-25 22:56:56.368876
382	gear	Cintas exprés, cuerda de 60m.	Route	140	2021-04-25 22:56:56.373769	2021-04-25 22:56:56.373769
383	history	\N	Route	141	2021-04-25 22:56:56.449476	2021-04-25 22:56:56.449476
384	gear	Cintas exprés, cuerda de 60m.	Route	141	2021-04-25 22:56:56.454955	2021-04-25 22:56:56.454955
385	history	\N	Route	142	2021-04-25 22:56:56.537294	2021-04-25 22:56:56.537294
386	gear	Cintas exprés, cuerda de 60m.	Route	142	2021-04-25 22:56:56.541935	2021-04-25 22:56:56.541935
387	history	\N	Route	143	2021-04-25 22:56:56.599327	2021-04-25 22:56:56.599327
388	gear	Cintas exprés, cuerda de 60m.	Route	143	2021-04-25 22:56:56.60445	2021-04-25 22:56:56.60445
389	history	\N	Route	144	2021-04-25 22:56:56.671433	2021-04-25 22:56:56.671433
390	gear	Cintas exprés, cuerda de 60m.	Route	144	2021-04-25 22:56:56.67646	2021-04-25 22:56:56.67646
391	history	\N	Route	145	2021-04-25 22:56:56.759023	2021-04-25 22:56:56.759023
392	gear	Cintas exprés, cuerda de 60m.	Route	145	2021-04-25 22:56:56.763941	2021-04-25 22:56:56.763941
393	history	\N	Route	146	2021-04-25 22:56:56.817127	2021-04-25 22:56:56.817127
394	gear	Cintas exprés, cuerda de 60m.	Route	146	2021-04-25 22:56:56.821934	2021-04-25 22:56:56.821934
395	history	\N	Route	147	2021-04-25 22:56:56.87602	2021-04-25 22:56:56.87602
396	gear	Cintas exprés, cuerda de 60m.	Route	147	2021-04-25 22:56:56.881208	2021-04-25 22:56:56.881208
397	history	\N	Route	148	2021-04-25 22:56:56.933427	2021-04-25 22:56:56.933427
398	gear	Cintas exprés, cuerda de 60m.	Route	148	2021-04-25 22:56:56.938486	2021-04-25 22:56:56.938486
399	history	\N	Route	149	2021-04-25 22:56:56.992537	2021-04-25 22:56:56.992537
400	gear	Cintas exprés, cuerda de 60m.	Route	149	2021-04-25 22:56:56.998681	2021-04-25 22:56:56.998681
401	history	\N	Route	150	2021-04-25 22:56:57.052825	2021-04-25 22:56:57.052825
402	gear	Cintas exprés, cuerda de 60m.	Route	150	2021-04-25 22:56:57.062263	2021-04-25 22:56:57.062263
403	history	\N	Route	151	2021-04-25 22:56:57.116534	2021-04-25 22:56:57.116534
404	gear	Cintas exprés, cuerda de 60m.	Route	151	2021-04-25 22:56:57.121523	2021-04-25 22:56:57.121523
405	history	\N	Route	152	2021-04-25 22:56:57.219372	2021-04-25 22:56:57.219372
406	gear	Cintas exprés, cuerda de 60m.	Route	152	2021-04-25 22:56:57.224431	2021-04-25 22:56:57.224431
407	history	\N	Route	153	2021-04-25 22:56:57.280321	2021-04-25 22:56:57.280321
408	gear	Cintas exprés, cuerda de 60m.	Route	153	2021-04-25 22:56:57.286664	2021-04-25 22:56:57.286664
409	history	\N	Route	154	2021-04-25 22:56:57.343598	2021-04-25 22:56:57.343598
410	gear	Cintas exprés, cuerda de 60m.	Route	154	2021-04-25 22:56:57.349208	2021-04-25 22:56:57.349208
411	history	\N	Route	155	2021-04-25 22:56:57.403294	2021-04-25 22:56:57.403294
412	gear	Cintas exprés, cuerda de 60m.	Route	155	2021-04-25 22:56:57.424011	2021-04-25 22:56:57.424011
413	history	\N	Route	156	2021-04-25 22:56:57.484338	2021-04-25 22:56:57.484338
414	gear	Cintas exprés, cuerda de 60m.	Route	156	2021-04-25 22:56:57.491074	2021-04-25 22:56:57.491074
415	history	\N	Route	157	2021-04-25 22:56:57.563267	2021-04-25 22:56:57.563267
416	gear	Cintas exprés, cuerda de 60m.	Route	157	2021-04-25 22:56:57.56852	2021-04-25 22:56:57.56852
417	history	\N	Route	158	2021-04-25 22:56:57.647878	2021-04-25 22:56:57.647878
418	gear	Cintas exprés, cuerda de 60m.	Route	158	2021-04-25 22:56:57.65342	2021-04-25 22:56:57.65342
419	history	\N	Route	159	2021-04-25 22:56:57.74141	2021-04-25 22:56:57.74141
420	gear	Cintas exprés, cuerda de 60m.	Route	159	2021-04-25 22:56:57.746287	2021-04-25 22:56:57.746287
421	history	\N	Route	160	2021-04-25 22:56:57.845171	2021-04-25 22:56:57.845171
422	gear	Cintas exprés, cuerda de 60m.	Route	160	2021-04-25 22:56:57.850349	2021-04-25 22:56:57.850349
423	history	\N	Route	161	2021-04-25 22:56:57.910438	2021-04-25 22:56:57.910438
424	gear	Cintas exprés, cuerda de 60m.	Route	161	2021-04-25 22:56:57.915794	2021-04-25 22:56:57.915794
425	history	\N	Route	162	2021-04-25 22:56:57.994384	2021-04-25 22:56:57.994384
426	gear	Cintas exprés, cuerda de 60m.	Route	162	2021-04-25 22:56:57.999445	2021-04-25 22:56:57.999445
427	history	\N	Route	163	2021-04-25 22:56:58.063722	2021-04-25 22:56:58.063722
428	gear	Cintas exprés, cuerda de 60m.	Route	163	2021-04-25 22:56:58.069072	2021-04-25 22:56:58.069072
429	history	\N	Route	164	2021-04-25 22:56:58.142711	2021-04-25 22:56:58.142711
430	gear	Cintas exprés, cuerda de 60m.	Route	164	2021-04-25 22:56:58.148449	2021-04-25 22:56:58.148449
431	history	\N	Route	165	2021-04-25 22:56:58.211851	2021-04-25 22:56:58.211851
432	gear	Cintas exprés, cuerda de 60m.	Route	165	2021-04-25 22:56:58.217341	2021-04-25 22:56:58.217341
433	history	\N	Route	166	2021-04-25 22:56:58.297814	2021-04-25 22:56:58.297814
434	gear	Cintas exprés, cuerda de 60m.	Route	166	2021-04-25 22:56:58.304074	2021-04-25 22:56:58.304074
435	history	\N	Route	167	2021-04-25 22:56:58.369616	2021-04-25 22:56:58.369616
436	gear	Cintas exprés, cuerda de 60m.	Route	167	2021-04-25 22:56:58.374776	2021-04-25 22:56:58.374776
437	history	\N	Route	168	2021-04-25 22:56:58.430512	2021-04-25 22:56:58.430512
438	gear	Cintas exprés, cuerda de 60m.	Route	168	2021-04-25 22:56:58.435831	2021-04-25 22:56:58.435831
439	history	\N	Route	169	2021-04-25 22:56:58.517709	2021-04-25 22:56:58.517709
440	gear	Cintas exprés, cuerda de 60m.	Route	169	2021-04-25 22:56:58.522767	2021-04-25 22:56:58.522767
441	history	\N	Route	170	2021-04-25 22:56:58.580275	2021-04-25 22:56:58.580275
442	gear	Cintas exprés, cuerda de 60m.	Route	170	2021-04-25 22:56:58.585294	2021-04-25 22:56:58.585294
443	history	\N	Route	171	2021-04-25 22:56:58.656516	2021-04-25 22:56:58.656516
444	gear	Cintas exprés, cuerda de 60m.	Route	171	2021-04-25 22:56:58.66194	2021-04-25 22:56:58.66194
445	history	\N	Route	172	2021-04-25 22:56:58.737468	2021-04-25 22:56:58.737468
446	gear	Cintas exprés, cuerda de 60m.	Route	172	2021-04-25 22:56:58.742073	2021-04-25 22:56:58.742073
447	history	\N	Route	173	2021-04-25 22:56:58.801681	2021-04-25 22:56:58.801681
448	gear	Cintas exprés, cuerda de 60m.	Route	173	2021-04-25 22:56:58.807832	2021-04-25 22:56:58.807832
449	history	\N	Route	174	2021-04-25 22:56:58.883856	2021-04-25 22:56:58.883856
450	gear	Cintas exprés, cuerda de 60m.	Route	174	2021-04-25 22:56:58.981992	2021-04-25 22:56:58.981992
451	history	\N	Route	175	2021-04-25 22:56:59.050115	2021-04-25 22:56:59.050115
452	gear	Cintas exprés, cuerda de 60m.	Route	175	2021-04-25 22:56:59.055369	2021-04-25 22:56:59.055369
453	history	\N	Route	176	2021-04-25 22:56:59.143217	2021-04-25 22:56:59.143217
454	gear	Cintas exprés, cuerda de 60m.	Route	176	2021-04-25 22:56:59.148574	2021-04-25 22:56:59.148574
455	history	\N	Route	177	2021-04-25 22:56:59.235027	2021-04-25 22:56:59.235027
456	gear	Cintas exprés, cuerda de 60m.	Route	177	2021-04-25 22:56:59.241193	2021-04-25 22:56:59.241193
457	history	\N	Route	178	2021-04-25 22:56:59.300499	2021-04-25 22:56:59.300499
458	gear	Cintas exprés, cuerda de 60m.	Route	178	2021-04-25 22:56:59.305858	2021-04-25 22:56:59.305858
459	history	\N	Route	179	2021-04-25 22:56:59.368751	2021-04-25 22:56:59.368751
460	gear	Cintas exprés, cuerda de 60m.	Route	179	2021-04-25 22:56:59.374065	2021-04-25 22:56:59.374065
461	history	\N	Route	180	2021-04-25 22:56:59.433814	2021-04-25 22:56:59.433814
462	gear	Cintas exprés, cuerda de 60m.	Route	180	2021-04-25 22:56:59.438954	2021-04-25 22:56:59.438954
463	history	\N	Route	181	2021-04-25 22:56:59.512535	2021-04-25 22:56:59.512535
464	gear	Cintas exprés, cuerda de 60m.	Route	181	2021-04-25 22:56:59.517722	2021-04-25 22:56:59.517722
465	history	\N	Route	182	2021-04-25 22:56:59.583863	2021-04-25 22:56:59.583863
466	gear	Cintas exprés, cuerda de 60m.	Route	182	2021-04-25 22:56:59.590676	2021-04-25 22:56:59.590676
467	history	\N	Route	183	2021-04-25 22:56:59.657095	2021-04-25 22:56:59.657095
468	gear	Cintas exprés, cuerda de 60m.	Route	183	2021-04-25 22:56:59.666963	2021-04-25 22:56:59.666963
469	history	\N	Route	184	2021-04-25 22:56:59.745233	2021-04-25 22:56:59.745233
470	gear	Cintas exprés, cuerda de 60m.	Route	184	2021-04-25 22:56:59.75061	2021-04-25 22:56:59.75061
471	history	\N	Route	185	2021-04-25 22:56:59.828079	2021-04-25 22:56:59.828079
472	gear	Cintas exprés, cuerda de 60m.	Route	185	2021-04-25 22:56:59.834393	2021-04-25 22:56:59.834393
473	history	\N	Route	186	2021-04-25 22:56:59.900822	2021-04-25 22:56:59.900822
474	gear	Cintas exprés, cuerda de 60m.	Route	186	2021-04-25 22:56:59.906006	2021-04-25 22:56:59.906006
475	history	\N	Route	187	2021-04-25 22:56:59.964606	2021-04-25 22:56:59.964606
476	gear	Cintas exprés, cuerda de 60m.	Route	187	2021-04-25 22:56:59.970023	2021-04-25 22:56:59.970023
477	history	\N	Route	188	2021-04-25 22:57:00.036832	2021-04-25 22:57:00.036832
478	gear	Cintas exprés, cuerda de 60m.	Route	188	2021-04-25 22:57:00.042058	2021-04-25 22:57:00.042058
479	history	\N	Route	189	2021-04-25 22:57:00.112842	2021-04-25 22:57:00.112842
480	gear	Cintas exprés, cuerda de 60m.	Route	189	2021-04-25 22:57:00.122777	2021-04-25 22:57:00.122777
481	history	\N	Route	190	2021-04-25 22:57:00.193855	2021-04-25 22:57:00.193855
482	gear	Cintas exprés, cuerda de 60m.	Route	190	2021-04-25 22:57:00.200241	2021-04-25 22:57:00.200241
483	history	\N	Route	191	2021-04-25 22:57:00.25883	2021-04-25 22:57:00.25883
484	gear	Cintas exprés, cuerda de 60m.	Route	191	2021-04-25 22:57:00.267547	2021-04-25 22:57:00.267547
485	history	\N	Route	192	2021-04-25 22:57:00.3473	2021-04-25 22:57:00.3473
486	gear	Cintas exprés, cuerda de 60m.	Route	192	2021-04-25 22:57:00.353973	2021-04-25 22:57:00.353973
487	history	\N	Route	193	2021-04-25 22:57:00.399463	2021-04-25 22:57:00.399463
488	gear	Cintas exprés, cuerda de 60m.	Route	193	2021-04-25 22:57:00.405399	2021-04-25 22:57:00.405399
489	history	\N	Route	194	2021-04-25 22:57:00.468998	2021-04-25 22:57:00.468998
490	gear	Cintas exprés, cuerda de 60m.	Route	194	2021-04-25 22:57:00.474529	2021-04-25 22:57:00.474529
491	history	\N	Route	195	2021-04-25 22:57:00.554105	2021-04-25 22:57:00.554105
492	gear	Cintas exprés, cuerda de 60m.	Route	195	2021-04-25 22:57:00.560737	2021-04-25 22:57:00.560737
493	history	\N	Route	196	2021-04-25 22:57:00.64001	2021-04-25 22:57:00.64001
494	gear	Cintas exprés, cuerda de 60m.	Route	196	2021-04-25 22:57:00.645081	2021-04-25 22:57:00.645081
495	history	\N	Route	197	2021-04-25 22:57:00.74986	2021-04-25 22:57:00.74986
496	gear	Cintas exprés, cuerda de 60m.	Route	197	2021-04-25 22:57:00.768855	2021-04-25 22:57:00.768855
497	history	\N	Route	198	2021-04-25 22:57:00.868362	2021-04-25 22:57:00.868362
498	gear	Cintas exprés, cuerda de 60m.	Route	198	2021-04-25 22:57:00.873807	2021-04-25 22:57:00.873807
499	history	\N	Route	199	2021-04-25 22:57:00.939027	2021-04-25 22:57:00.939027
500	gear	Cintas exprés, cuerda de 60m.	Route	199	2021-04-25 22:57:00.944581	2021-04-25 22:57:00.944581
501	history	\N	Route	200	2021-04-25 22:57:01.019351	2021-04-25 22:57:01.019351
502	gear	Cintas exprés, cuerda de 60m.	Route	200	2021-04-25 22:57:01.026469	2021-04-25 22:57:01.026469
503	history	\N	Route	201	2021-04-25 22:57:01.08577	2021-04-25 22:57:01.08577
504	gear	Cintas exprés, cuerda de 60m.	Route	201	2021-04-25 22:57:01.098321	2021-04-25 22:57:01.098321
505	history	Fue el primer 8a equipado en Chile. Actualmente se considera 7c+.	Route	202	2021-04-25 22:57:01.173272	2021-04-25 22:57:01.173272
506	gear	Cintas exprés, cuerda de 60m.	Route	202	2021-04-25 22:57:01.183351	2021-04-25 22:57:01.183351
507	history	\N	Route	203	2021-04-25 22:57:01.246697	2021-04-25 22:57:01.246697
508	gear	Cintas exprés, cuerda de 60m.	Route	203	2021-04-25 22:57:01.253247	2021-04-25 22:57:01.253247
509	history	\N	Route	204	2021-04-25 22:57:01.333902	2021-04-25 22:57:01.333902
510	gear	Cintas exprés, cuerda de 60m.	Route	204	2021-04-25 22:57:01.342955	2021-04-25 22:57:01.342955
511	history	\N	Route	205	2021-04-25 22:57:01.417182	2021-04-25 22:57:01.417182
512	gear	Cintas exprés, cuerda de 60m.	Route	205	2021-04-25 22:57:01.422405	2021-04-25 22:57:01.422405
513	history	\N	Route	206	2021-04-25 22:57:01.485953	2021-04-25 22:57:01.485953
514	gear	Cintas exprés, cuerda de 60m.	Route	206	2021-04-25 22:57:01.495696	2021-04-25 22:57:01.495696
515	history	\N	Route	207	2021-04-25 22:57:01.589849	2021-04-25 22:57:01.589849
516	gear	Cintas exprés, cuerda de 60m.	Route	207	2021-04-25 22:57:01.595187	2021-04-25 22:57:01.595187
517	history	\N	Route	208	2021-04-25 22:57:01.664043	2021-04-25 22:57:01.664043
518	gear	Cintas exprés, cuerda de 60m.	Route	208	2021-04-25 22:57:01.669567	2021-04-25 22:57:01.669567
519	history	\N	Route	209	2021-04-25 22:57:01.736851	2021-04-25 22:57:01.736851
520	gear	Cintas exprés, cuerda de 60m.	Route	209	2021-04-25 22:57:01.74268	2021-04-25 22:57:01.74268
521	history	\N	Route	210	2021-04-25 22:57:01.825637	2021-04-25 22:57:01.825637
522	gear	Cintas exprés, cuerda de 60m.	Route	210	2021-04-25 22:57:01.83252	2021-04-25 22:57:01.83252
523	history	\N	Route	211	2021-04-25 22:57:01.896304	2021-04-25 22:57:01.896304
524	gear	Cintas exprés, cuerda de 60m.	Route	211	2021-04-25 22:57:01.901472	2021-04-25 22:57:01.901472
525	history	\N	Route	212	2021-04-25 22:57:01.961978	2021-04-25 22:57:01.961978
526	gear	Cintas exprés, cuerda de 60m.	Route	212	2021-04-25 22:57:01.971256	2021-04-25 22:57:01.971256
527	history	\N	Route	213	2021-04-25 22:57:02.046316	2021-04-25 22:57:02.046316
528	gear	Cintas exprés, cuerda de 60m.	Route	213	2021-04-25 22:57:02.05153	2021-04-25 22:57:02.05153
529	history	\N	Route	214	2021-04-25 22:57:02.158932	2021-04-25 22:57:02.158932
530	gear	Cintas exprés, cuerda de 60m.	Route	214	2021-04-25 22:57:02.164204	2021-04-25 22:57:02.164204
531	history	\N	Route	215	2021-04-25 22:57:02.251666	2021-04-25 22:57:02.251666
532	gear	Cintas exprés, cuerda de 60m.	Route	215	2021-04-25 22:57:02.257159	2021-04-25 22:57:02.257159
533	history	\N	Route	216	2021-04-25 22:57:02.34285	2021-04-25 22:57:02.34285
534	gear	Cintas exprés, cuerda de 60m.	Route	216	2021-04-25 22:57:02.348137	2021-04-25 22:57:02.348137
535	history	\N	Route	217	2021-04-25 22:57:02.433015	2021-04-25 22:57:02.433015
536	gear	Cintas exprés, cuerda de 60m.	Route	217	2021-04-25 22:57:02.439262	2021-04-25 22:57:02.439262
537	history	\N	Route	218	2021-04-25 22:57:02.519215	2021-04-25 22:57:02.519215
538	gear	Cintas exprés, cuerda de 60m.	Route	218	2021-04-25 22:57:02.524294	2021-04-25 22:57:02.524294
539	history	\N	Route	219	2021-04-25 22:57:02.609924	2021-04-25 22:57:02.609924
540	gear	Cintas exprés, cuerda de 60m.	Route	219	2021-04-25 22:57:02.618913	2021-04-25 22:57:02.618913
541	history	\N	Route	220	2021-04-25 22:57:02.681745	2021-04-25 22:57:02.681745
542	gear	Cintas exprés, cuerda de 60m.	Route	220	2021-04-25 22:57:02.689161	2021-04-25 22:57:02.689161
543	history	\N	Route	221	2021-04-25 22:57:02.75463	2021-04-25 22:57:02.75463
544	gear	Cintas exprés, cuerda de 60m.	Route	221	2021-04-25 22:57:02.763004	2021-04-25 22:57:02.763004
545	history	\N	Route	222	2021-04-25 22:57:02.848457	2021-04-25 22:57:02.848457
546	gear	Cintas exprés, cuerda de 60m.	Route	222	2021-04-25 22:57:02.854509	2021-04-25 22:57:02.854509
547	history	\N	Route	223	2021-04-25 22:57:02.936358	2021-04-25 22:57:02.936358
548	gear	Cintas exprés, cuerda de 60m.	Route	223	2021-04-25 22:57:02.941953	2021-04-25 22:57:02.941953
549	history	\N	Route	224	2021-04-25 22:57:03.087154	2021-04-25 22:57:03.087154
550	gear	Cintas exprés, cuerda de 60m.	Route	224	2021-04-25 22:57:03.093001	2021-04-25 22:57:03.093001
551	history	\N	Route	225	2021-04-25 22:57:03.170517	2021-04-25 22:57:03.170517
552	gear	Cintas exprés, cuerda de 60m.	Route	225	2021-04-25 22:57:03.175618	2021-04-25 22:57:03.175618
553	history	\N	Route	226	2021-04-25 22:57:03.239059	2021-04-25 22:57:03.239059
554	gear	Cintas exprés, cuerda de 60m.	Route	226	2021-04-25 22:57:03.244782	2021-04-25 22:57:03.244782
555	history	\N	Route	227	2021-04-25 22:57:03.30712	2021-04-25 22:57:03.30712
556	gear	Cintas exprés, cuerda de 60m.	Route	227	2021-04-25 22:57:03.312267	2021-04-25 22:57:03.312267
557	history	\N	Route	228	2021-04-25 22:57:03.393658	2021-04-25 22:57:03.393658
558	gear	Cintas exprés, cuerda de 60m.	Route	228	2021-04-25 22:57:03.401237	2021-04-25 22:57:03.401237
559	history	\N	Route	229	2021-04-25 22:57:03.47947	2021-04-25 22:57:03.47947
560	gear	Cintas exprés, cuerda de 60m.	Route	229	2021-04-25 22:57:03.485343	2021-04-25 22:57:03.485343
561	history	\N	Route	230	2021-04-25 22:57:03.561677	2021-04-25 22:57:03.561677
562	gear	Cintas exprés, cuerda de 60m.	Route	230	2021-04-25 22:57:03.570591	2021-04-25 22:57:03.570591
563	history	\N	Route	231	2021-04-25 22:57:03.655677	2021-04-25 22:57:03.655677
564	gear	Cintas exprés, cuerda de 60m.	Route	231	2021-04-25 22:57:03.663414	2021-04-25 22:57:03.663414
565	history	\N	Route	232	2021-04-25 22:57:03.723264	2021-04-25 22:57:03.723264
566	gear	Cintas exprés, cuerda de 60m.	Route	232	2021-04-25 22:57:03.728639	2021-04-25 22:57:03.728639
567	history	\N	Route	233	2021-04-25 22:57:03.812107	2021-04-25 22:57:03.812107
568	gear	Cintas exprés, cuerda de 60m.	Route	233	2021-04-25 22:57:03.821303	2021-04-25 22:57:03.821303
569	history	\N	Route	234	2021-04-25 22:57:03.898392	2021-04-25 22:57:03.898392
570	gear	Cintas exprés, cuerda de 60m.	Route	234	2021-04-25 22:57:03.905855	2021-04-25 22:57:03.905855
571	history	\N	Route	235	2021-04-25 22:57:03.972465	2021-04-25 22:57:03.972465
572	gear	Cintas exprés, cuerda de 60m.	Route	235	2021-04-25 22:57:03.977927	2021-04-25 22:57:03.977927
573	history	\N	Route	236	2021-04-25 22:57:04.059245	2021-04-25 22:57:04.059245
574	gear	Cintas exprés, cuerda de 60m.	Route	236	2021-04-25 22:57:04.064691	2021-04-25 22:57:04.064691
575	history	\N	Route	237	2021-04-25 22:57:04.164993	2021-04-25 22:57:04.164993
576	gear	Cintas exprés, cuerda de 60m.	Route	237	2021-04-25 22:57:04.1702	2021-04-25 22:57:04.1702
577	history	\N	Route	238	2021-04-25 22:57:04.235792	2021-04-25 22:57:04.235792
578	gear	Cintas exprés, cuerda de 60m.	Route	238	2021-04-25 22:57:04.241365	2021-04-25 22:57:04.241365
579	history	\N	Route	239	2021-04-25 22:57:04.317085	2021-04-25 22:57:04.317085
580	gear	Cintas exprés, cuerda de 60m.	Route	239	2021-04-25 22:57:04.322066	2021-04-25 22:57:04.322066
581	history	\N	Route	240	2021-04-25 22:57:04.403286	2021-04-25 22:57:04.403286
582	gear	Cintas exprés, cuerda de 60m.	Route	240	2021-04-25 22:57:04.40867	2021-04-25 22:57:04.40867
583	history	\N	Route	241	2021-04-25 22:57:04.482233	2021-04-25 22:57:04.482233
584	gear	Cintas exprés, cuerda de 60m.	Route	241	2021-04-25 22:57:04.487648	2021-04-25 22:57:04.487648
585	history	\N	Route	242	2021-04-25 22:57:04.578717	2021-04-25 22:57:04.578717
586	gear	Cintas exprés, cuerda de 60m.	Route	242	2021-04-25 22:57:04.586241	2021-04-25 22:57:04.586241
587	history	\N	Route	243	2021-04-25 22:57:04.645237	2021-04-25 22:57:04.645237
588	gear	Cintas exprés, cuerda de 60m.	Route	243	2021-04-25 22:57:04.651032	2021-04-25 22:57:04.651032
589	history	\N	Route	244	2021-04-25 22:57:04.716119	2021-04-25 22:57:04.716119
590	gear	Cintas exprés, cuerda de 60m.	Route	244	2021-04-25 22:57:04.728556	2021-04-25 22:57:04.728556
591	history	\N	Route	245	2021-04-25 22:57:04.821565	2021-04-25 22:57:04.821565
592	gear	Cintas exprés, cuerda de 60m.	Route	245	2021-04-25 22:57:04.826972	2021-04-25 22:57:04.826972
593	history	\N	Route	246	2021-04-25 22:57:04.917019	2021-04-25 22:57:04.917019
594	gear	Cintas exprés, cuerda de 60m.	Route	246	2021-04-25 22:57:04.927107	2021-04-25 22:57:04.927107
595	history	\N	Route	247	2021-04-25 22:57:05.001173	2021-04-25 22:57:05.001173
596	gear	Cintas exprés, cuerda de 60m.	Route	247	2021-04-25 22:57:05.006284	2021-04-25 22:57:05.006284
597	history	\N	Route	248	2021-04-25 22:57:05.079263	2021-04-25 22:57:05.079263
598	gear	Cintas exprés, cuerda de 60m.	Route	248	2021-04-25 22:57:05.085337	2021-04-25 22:57:05.085337
599	history	\N	Route	249	2021-04-25 22:57:05.209058	2021-04-25 22:57:05.209058
600	gear	Cintas exprés, cuerda de 60m.	Route	249	2021-04-25 22:57:05.21444	2021-04-25 22:57:05.21444
601	history	\N	Route	250	2021-04-25 22:57:05.281396	2021-04-25 22:57:05.281396
602	gear	Cintas exprés, cuerda de 60m.	Route	250	2021-04-25 22:57:05.287099	2021-04-25 22:57:05.287099
603	history	\N	Route	251	2021-04-25 22:57:05.362322	2021-04-25 22:57:05.362322
604	gear	Cintas exprés, cuerda de 60m.	Route	251	2021-04-25 22:57:05.370802	2021-04-25 22:57:05.370802
605	history	\N	Route	252	2021-04-25 22:57:05.441675	2021-04-25 22:57:05.441675
606	gear	Cintas exprés, cuerda de 60m.	Route	252	2021-04-25 22:57:05.447926	2021-04-25 22:57:05.447926
607	history	\N	Route	253	2021-04-25 22:57:05.521676	2021-04-25 22:57:05.521676
608	gear	Cintas exprés, cuerda de 60m.	Route	253	2021-04-25 22:57:05.530997	2021-04-25 22:57:05.530997
609	history	\N	Route	254	2021-04-25 22:57:05.641269	2021-04-25 22:57:05.641269
610	gear	Cintas exprés, cuerda de 60m.	Route	254	2021-04-25 22:57:05.64635	2021-04-25 22:57:05.64635
611	history	\N	Route	255	2021-04-25 22:57:05.723722	2021-04-25 22:57:05.723722
612	gear	Cintas exprés, cuerda de 60m.	Route	255	2021-04-25 22:57:05.731074	2021-04-25 22:57:05.731074
613	history	\N	Route	256	2021-04-25 22:57:05.803893	2021-04-25 22:57:05.803893
614	gear	Cintas exprés, cuerda de 60m.	Route	256	2021-04-25 22:57:05.809652	2021-04-25 22:57:05.809652
615	history	\N	Route	257	2021-04-25 22:57:05.886441	2021-04-25 22:57:05.886441
616	gear	Cintas exprés, cuerda de 60m.	Route	257	2021-04-25 22:57:05.89181	2021-04-25 22:57:05.89181
617	history	\N	Route	258	2021-04-25 22:57:05.957631	2021-04-25 22:57:05.957631
618	gear	Cintas exprés, cuerda de 60m.	Route	258	2021-04-25 22:57:05.966493	2021-04-25 22:57:05.966493
619	history	\N	Route	259	2021-04-25 22:57:06.051025	2021-04-25 22:57:06.051025
620	gear	Cintas exprés, cuerda de 60m.	Route	259	2021-04-25 22:57:06.056338	2021-04-25 22:57:06.056338
621	history	\N	Route	260	2021-04-25 22:57:06.14168	2021-04-25 22:57:06.14168
622	gear	Cintas exprés, cuerda de 60m.	Route	260	2021-04-25 22:57:06.149146	2021-04-25 22:57:06.149146
623	history	\N	Route	261	2021-04-25 22:57:06.217827	2021-04-25 22:57:06.217827
624	gear	Cintas exprés, cuerda de 60m.	Route	261	2021-04-25 22:57:06.238157	2021-04-25 22:57:06.238157
625	history	\N	Route	262	2021-04-25 22:57:06.301211	2021-04-25 22:57:06.301211
626	gear	Cintas exprés, cuerda de 60m.	Route	262	2021-04-25 22:57:06.306837	2021-04-25 22:57:06.306837
627	history	\N	Route	263	2021-04-25 22:57:06.370465	2021-04-25 22:57:06.370465
628	gear	Cintas exprés, cuerda de 60m.	Route	263	2021-04-25 22:57:06.37804	2021-04-25 22:57:06.37804
629	history	\N	Route	264	2021-04-25 22:57:06.437993	2021-04-25 22:57:06.437993
630	gear	Cintas exprés, cuerda de 60m.	Route	264	2021-04-25 22:57:06.443366	2021-04-25 22:57:06.443366
631	history	\N	Route	265	2021-04-25 22:57:06.515772	2021-04-25 22:57:06.515772
632	gear	Cintas exprés, cuerda de 60m.	Route	265	2021-04-25 22:57:06.521962	2021-04-25 22:57:06.521962
633	history	\N	Route	266	2021-04-25 22:57:06.619914	2021-04-25 22:57:06.619914
634	gear	Cintas exprés, cuerda de 60m.	Route	266	2021-04-25 22:57:06.625422	2021-04-25 22:57:06.625422
635	history	\N	Route	267	2021-04-25 22:57:06.690511	2021-04-25 22:57:06.690511
636	gear	Cintas exprés, cuerda de 60m.	Route	267	2021-04-25 22:57:06.695906	2021-04-25 22:57:06.695906
637	history	\N	Route	268	2021-04-25 22:57:06.803104	2021-04-25 22:57:06.803104
638	gear	Cintas exprés, cuerda de 60m.	Route	268	2021-04-25 22:57:06.808899	2021-04-25 22:57:06.808899
639	history	\N	Route	269	2021-04-25 22:57:06.871651	2021-04-25 22:57:06.871651
640	gear	Cintas exprés, cuerda de 60m.	Route	269	2021-04-25 22:57:06.883017	2021-04-25 22:57:06.883017
641	history	\N	Route	270	2021-04-25 22:57:07.001494	2021-04-25 22:57:07.001494
642	gear	Cintas exprés, cuerda de 60m.	Route	270	2021-04-25 22:57:07.006782	2021-04-25 22:57:07.006782
643	history	\N	Route	271	2021-04-25 22:57:07.083967	2021-04-25 22:57:07.083967
644	gear	Cintas exprés, cuerda de 60m.	Route	271	2021-04-25 22:57:07.092756	2021-04-25 22:57:07.092756
645	history	\N	Route	272	2021-04-25 22:57:07.177889	2021-04-25 22:57:07.177889
646	gear	Cintas exprés, cuerda de 60m.	Route	272	2021-04-25 22:57:07.183408	2021-04-25 22:57:07.183408
647	history	\N	Route	273	2021-04-25 22:57:07.259025	2021-04-25 22:57:07.259025
648	gear	Cintas exprés, cuerda de 60m.	Route	273	2021-04-25 22:57:07.264204	2021-04-25 22:57:07.264204
649	history	\N	Route	274	2021-04-25 22:57:07.326781	2021-04-25 22:57:07.326781
650	gear	Cintas exprés, cuerda de 60m.	Route	274	2021-04-25 22:57:07.333512	2021-04-25 22:57:07.333512
651	history	\N	Route	275	2021-04-25 22:57:07.399461	2021-04-25 22:57:07.399461
652	gear	Cintas exprés, cuerda de 60m.	Route	275	2021-04-25 22:57:07.407276	2021-04-25 22:57:07.407276
653	history	\N	Route	276	2021-04-25 22:57:07.486147	2021-04-25 22:57:07.486147
654	gear	Cintas exprés, cuerda de 60m.	Route	276	2021-04-25 22:57:07.491752	2021-04-25 22:57:07.491752
655	history	\N	Route	277	2021-04-25 22:57:07.570574	2021-04-25 22:57:07.570574
656	gear	Cintas exprés, cuerda de 60m.	Route	277	2021-04-25 22:57:07.580059	2021-04-25 22:57:07.580059
657	history	\N	Route	278	2021-04-25 22:57:07.683375	2021-04-25 22:57:07.683375
658	gear	Cintas exprés, cuerda de 60m.	Route	278	2021-04-25 22:57:07.689754	2021-04-25 22:57:07.689754
659	history	\N	Route	279	2021-04-25 22:57:07.760694	2021-04-25 22:57:07.760694
660	gear	Cintas exprés, cuerda de 60m.	Route	279	2021-04-25 22:57:07.765734	2021-04-25 22:57:07.765734
661	history	\N	Route	280	2021-04-25 22:57:07.862245	2021-04-25 22:57:07.862245
662	gear	Cintas exprés, cuerda de 60m.	Route	280	2021-04-25 22:57:07.868593	2021-04-25 22:57:07.868593
663	history	\N	Route	281	2021-04-25 22:57:07.950765	2021-04-25 22:57:07.950765
664	gear	Cintas exprés, cuerda de 60m.	Route	281	2021-04-25 22:57:07.956935	2021-04-25 22:57:07.956935
665	history	\N	Route	282	2021-04-25 22:57:08.035584	2021-04-25 22:57:08.035584
666	gear	Cintas exprés, cuerda de 60m.	Route	282	2021-04-25 22:57:08.043124	2021-04-25 22:57:08.043124
667	history	\N	Route	283	2021-04-25 22:57:08.115937	2021-04-25 22:57:08.115937
668	gear	Cintas exprés, cuerda de 60m.	Route	283	2021-04-25 22:57:08.121045	2021-04-25 22:57:08.121045
669	history	\N	Route	284	2021-04-25 22:57:08.218357	2021-04-25 22:57:08.218357
670	gear	Cintas exprés, cuerda de 60m.	Route	284	2021-04-25 22:57:08.225008	2021-04-25 22:57:08.225008
671	history	\N	Route	285	2021-04-25 22:57:08.278691	2021-04-25 22:57:08.278691
672	gear	Cintas exprés, cuerda de 60m.	Route	285	2021-04-25 22:57:08.283715	2021-04-25 22:57:08.283715
673	history	\N	Route	286	2021-04-25 22:57:08.344904	2021-04-25 22:57:08.344904
674	gear	Cintas exprés, cuerda de 60m.	Route	286	2021-04-25 22:57:08.352002	2021-04-25 22:57:08.352002
675	history	\N	Route	287	2021-04-25 22:57:08.409653	2021-04-25 22:57:08.409653
676	gear	Cintas exprés, cuerda de 60m.	Route	287	2021-04-25 22:57:08.417985	2021-04-25 22:57:08.417985
677	history	\N	Route	288	2021-04-25 22:57:08.503775	2021-04-25 22:57:08.503775
678	gear	Cintas exprés, cuerda de 60m.	Route	288	2021-04-25 22:57:08.510773	2021-04-25 22:57:08.510773
679	history	\N	Route	289	2021-04-25 22:57:08.589738	2021-04-25 22:57:08.589738
680	gear	Cintas exprés, cuerda de 60m.	Route	289	2021-04-25 22:57:08.59472	2021-04-25 22:57:08.59472
681	history	\N	Route	290	2021-04-25 22:57:08.663887	2021-04-25 22:57:08.663887
682	gear	Cintas exprés, cuerda de 60m.	Route	290	2021-04-25 22:57:08.670867	2021-04-25 22:57:08.670867
683	history	\N	Route	291	2021-04-25 22:57:08.734289	2021-04-25 22:57:08.734289
684	gear	Cintas exprés, cuerda de 60m.	Route	291	2021-04-25 22:57:08.739247	2021-04-25 22:57:08.739247
685	history	\N	Route	292	2021-04-25 22:57:08.800327	2021-04-25 22:57:08.800327
686	gear	Cintas exprés, cuerda de 60m.	Route	292	2021-04-25 22:57:08.808428	2021-04-25 22:57:08.808428
687	history	\N	Route	293	2021-04-25 22:57:08.873737	2021-04-25 22:57:08.873737
688	gear	Cintas exprés, cuerda de 60m.	Route	293	2021-04-25 22:57:08.882951	2021-04-25 22:57:08.882951
689	history	\N	Route	294	2021-04-25 22:57:08.948735	2021-04-25 22:57:08.948735
690	gear	Cintas exprés, cuerda de 60m.	Route	294	2021-04-25 22:57:08.954926	2021-04-25 22:57:08.954926
691	history	\N	Route	295	2021-04-25 22:57:09.019952	2021-04-25 22:57:09.019952
692	gear	Cintas exprés, cuerda de 60m.	Route	295	2021-04-25 22:57:09.026207	2021-04-25 22:57:09.026207
693	history	\N	Route	296	2021-04-25 22:57:09.096926	2021-04-25 22:57:09.096926
694	gear	Cintas exprés, cuerda de 60m.	Route	296	2021-04-25 22:57:09.10277	2021-04-25 22:57:09.10277
695	history	\N	Route	297	2021-04-25 22:57:09.229211	2021-04-25 22:57:09.229211
696	gear	Cintas exprés, cuerda de 60m.	Route	297	2021-04-25 22:57:09.234859	2021-04-25 22:57:09.234859
697	history	\N	Route	298	2021-04-25 22:57:09.299055	2021-04-25 22:57:09.299055
698	gear	Cintas exprés, cuerda de 60m.	Route	298	2021-04-25 22:57:09.304486	2021-04-25 22:57:09.304486
699	history	\N	Route	299	2021-04-25 22:57:09.392101	2021-04-25 22:57:09.392101
700	gear	Cintas exprés, cuerda de 60m.	Route	299	2021-04-25 22:57:09.397191	2021-04-25 22:57:09.397191
701	history	\N	Route	300	2021-04-25 22:57:09.462414	2021-04-25 22:57:09.462414
702	gear	Cintas exprés, cuerda de 60m.	Route	300	2021-04-25 22:57:09.472402	2021-04-25 22:57:09.472402
703	history	\N	Route	301	2021-04-25 22:57:09.56083	2021-04-25 22:57:09.56083
704	gear	Cintas exprés, cuerda de 60m.	Route	301	2021-04-25 22:57:09.566233	2021-04-25 22:57:09.566233
705	history	\N	Route	302	2021-04-25 22:57:09.617615	2021-04-25 22:57:09.617615
706	gear	Cintas exprés, cuerda de 60m.	Route	302	2021-04-25 22:57:09.622563	2021-04-25 22:57:09.622563
707	history	\N	Route	303	2021-04-25 22:57:09.7217	2021-04-25 22:57:09.7217
708	gear	Cintas exprés, cuerda de 60m.	Route	303	2021-04-25 22:57:09.737417	2021-04-25 22:57:09.737417
709	history	\N	Route	304	2021-04-25 22:57:09.861799	2021-04-25 22:57:09.861799
710	gear	Cintas exprés, cuerda de 60m.	Route	304	2021-04-25 22:57:09.871107	2021-04-25 22:57:09.871107
711	history	\N	Route	305	2021-04-25 22:57:09.940439	2021-04-25 22:57:09.940439
712	gear	Cintas exprés, cuerda de 60m.	Route	305	2021-04-25 22:57:09.945458	2021-04-25 22:57:09.945458
713	history	\N	Route	306	2021-04-25 22:57:10.032851	2021-04-25 22:57:10.032851
714	gear	Cintas exprés, cuerda de 60m.	Route	306	2021-04-25 22:57:10.038113	2021-04-25 22:57:10.038113
715	history	\N	Route	307	2021-04-25 22:57:10.122432	2021-04-25 22:57:10.122432
716	gear	Cintas exprés, cuerda de 60m.	Route	307	2021-04-25 22:57:10.136331	2021-04-25 22:57:10.136331
717	history	\N	Route	308	2021-04-25 22:57:10.207191	2021-04-25 22:57:10.207191
718	gear	Cintas exprés, cuerda de 60m.	Route	308	2021-04-25 22:57:10.212984	2021-04-25 22:57:10.212984
719	history	\N	Route	309	2021-04-25 22:57:10.272751	2021-04-25 22:57:10.272751
720	gear	Cintas exprés, cuerda de 60m.	Route	309	2021-04-25 22:57:10.279483	2021-04-25 22:57:10.279483
721	history	\N	Route	310	2021-04-25 22:57:10.350117	2021-04-25 22:57:10.350117
722	gear	Cintas exprés, cuerda de 60m.	Route	310	2021-04-25 22:57:10.355856	2021-04-25 22:57:10.355856
723	history	\N	Route	311	2021-04-25 22:57:10.456603	2021-04-25 22:57:10.456603
724	gear	Cintas exprés, cuerda de 60m.	Route	311	2021-04-25 22:57:10.468752	2021-04-25 22:57:10.468752
725	history	\N	Route	312	2021-04-25 22:57:10.586686	2021-04-25 22:57:10.586686
726	gear	Cintas exprés, cuerda de 60m.	Route	312	2021-04-25 22:57:10.59312	2021-04-25 22:57:10.59312
727	history	\N	Route	313	2021-04-25 22:57:10.667125	2021-04-25 22:57:10.667125
728	gear	Cintas exprés, cuerda de 60m.	Route	313	2021-04-25 22:57:10.673018	2021-04-25 22:57:10.673018
729	history	\N	Route	314	2021-04-25 22:57:10.731768	2021-04-25 22:57:10.731768
730	gear	Cintas exprés, cuerda de 60m.	Route	314	2021-04-25 22:57:10.740072	2021-04-25 22:57:10.740072
731	history	\N	Route	315	2021-04-25 22:57:10.818509	2021-04-25 22:57:10.818509
732	gear	Cintas exprés, cuerda de 60m.	Route	315	2021-04-25 22:57:10.824737	2021-04-25 22:57:10.824737
733	history	\N	Route	316	2021-04-25 22:57:10.913256	2021-04-25 22:57:10.913256
734	gear	Cintas exprés, cuerda de 60m.	Route	316	2021-04-25 22:57:10.921687	2021-04-25 22:57:10.921687
735	history	\N	Route	317	2021-04-25 22:57:11.021172	2021-04-25 22:57:11.021172
736	gear	Cintas exprés, cuerda de 60m.	Route	317	2021-04-25 22:57:11.026266	2021-04-25 22:57:11.026266
737	history	\N	Route	318	2021-04-25 22:57:11.090338	2021-04-25 22:57:11.090338
738	gear	Cintas exprés, cuerda de 60m.	Route	318	2021-04-25 22:57:11.095264	2021-04-25 22:57:11.095264
739	history	\N	Route	319	2021-04-25 22:57:11.179395	2021-04-25 22:57:11.179395
740	gear	Cintas exprés, cuerda de 60m.	Route	319	2021-04-25 22:57:11.184716	2021-04-25 22:57:11.184716
741	history	\N	Route	320	2021-04-25 22:57:11.257176	2021-04-25 22:57:11.257176
742	gear	Cintas exprés, cuerda de 60m.	Route	320	2021-04-25 22:57:11.26223	2021-04-25 22:57:11.26223
743	history	\N	Route	321	2021-04-25 22:57:11.343728	2021-04-25 22:57:11.343728
744	gear	Cintas exprés, cuerda de 60m.	Route	321	2021-04-25 22:57:11.349456	2021-04-25 22:57:11.349456
745	history	\N	Route	322	2021-04-25 22:57:11.435143	2021-04-25 22:57:11.435143
746	gear	Cintas exprés, cuerda de 60m.	Route	322	2021-04-25 22:57:11.440708	2021-04-25 22:57:11.440708
747	history	\N	Route	323	2021-04-25 22:57:11.512069	2021-04-25 22:57:11.512069
748	gear	Cintas exprés, cuerda de 60m.	Route	323	2021-04-25 22:57:11.517667	2021-04-25 22:57:11.517667
749	history	\N	Route	324	2021-04-25 22:57:11.584082	2021-04-25 22:57:11.584082
750	gear	Cintas exprés, cuerda de 60m.	Route	324	2021-04-25 22:57:11.59004	2021-04-25 22:57:11.59004
751	history	\N	Route	325	2021-04-25 22:57:11.646699	2021-04-25 22:57:11.646699
752	gear	Cintas exprés, cuerda de 60m.	Route	325	2021-04-25 22:57:11.652886	2021-04-25 22:57:11.652886
753	history	\N	Route	326	2021-04-25 22:57:11.733892	2021-04-25 22:57:11.733892
754	gear	Cintas exprés, cuerda de 60m.	Route	326	2021-04-25 22:57:11.742832	2021-04-25 22:57:11.742832
755	history	\N	Route	327	2021-04-25 22:57:11.819614	2021-04-25 22:57:11.819614
756	gear	Cintas exprés, cuerda de 60m.	Route	327	2021-04-25 22:57:11.82484	2021-04-25 22:57:11.82484
757	history	\N	Route	328	2021-04-25 22:57:11.929381	2021-04-25 22:57:11.929381
758	gear	Cintas exprés, cuerda de 60m.	Route	328	2021-04-25 22:57:11.938982	2021-04-25 22:57:11.938982
759	history	\N	Route	329	2021-04-25 22:57:12.03413	2021-04-25 22:57:12.03413
760	gear	Cintas exprés, cuerda de 60m.	Route	329	2021-04-25 22:57:12.060751	2021-04-25 22:57:12.060751
761	history	\N	Route	330	2021-04-25 22:57:12.168602	2021-04-25 22:57:12.168602
762	gear	Cintas exprés, cuerda de 60m.	Route	330	2021-04-25 22:57:12.173757	2021-04-25 22:57:12.173757
763	history	\N	Route	331	2021-04-25 22:57:12.246176	2021-04-25 22:57:12.246176
764	gear	Cintas exprés, cuerda de 60m.	Route	331	2021-04-25 22:57:12.253969	2021-04-25 22:57:12.253969
765	history	\N	Route	332	2021-04-25 22:57:12.334914	2021-04-25 22:57:12.334914
766	gear	Cintas exprés, cuerda de 60m.	Route	332	2021-04-25 22:57:12.343731	2021-04-25 22:57:12.343731
767	history	\N	Route	333	2021-04-25 22:57:12.440134	2021-04-25 22:57:12.440134
768	gear	Cintas exprés, cuerda de 60m.	Route	333	2021-04-25 22:57:12.449981	2021-04-25 22:57:12.449981
769	history	\N	Route	334	2021-04-25 22:57:12.527746	2021-04-25 22:57:12.527746
770	gear	Cintas exprés, cuerda de 60m.	Route	334	2021-04-25 22:57:12.537038	2021-04-25 22:57:12.537038
771	history	\N	Route	335	2021-04-25 22:57:12.603274	2021-04-25 22:57:12.603274
772	gear	Cintas exprés, cuerda de 60m.	Route	335	2021-04-25 22:57:12.610546	2021-04-25 22:57:12.610546
773	history	\N	Route	336	2021-04-25 22:57:12.717669	2021-04-25 22:57:12.717669
774	gear	Cintas exprés, cuerda de 60m.	Route	336	2021-04-25 22:57:12.726873	2021-04-25 22:57:12.726873
775	history	\N	Route	337	2021-04-25 22:57:12.838359	2021-04-25 22:57:12.838359
776	gear	Cintas exprés, cuerda de 60m.	Route	337	2021-04-25 22:57:12.844437	2021-04-25 22:57:12.844437
777	history	\N	Route	338	2021-04-25 22:57:12.917454	2021-04-25 22:57:12.917454
778	gear	Cintas exprés, cuerda de 60m.	Route	338	2021-04-25 22:57:12.92455	2021-04-25 22:57:12.92455
779	history	\N	Route	339	2021-04-25 22:57:13.001282	2021-04-25 22:57:13.001282
780	gear	Cintas exprés, cuerda de 60m.	Route	339	2021-04-25 22:57:13.006899	2021-04-25 22:57:13.006899
781	history	\N	Route	340	2021-04-25 22:57:13.109686	2021-04-25 22:57:13.109686
782	gear	Cintas exprés, cuerda de 60m.	Route	340	2021-04-25 22:57:13.119554	2021-04-25 22:57:13.119554
783	history	\N	Route	341	2021-04-25 22:57:13.224545	2021-04-25 22:57:13.224545
784	gear	Cintas exprés, cuerda de 60m.	Route	341	2021-04-25 22:57:13.242645	2021-04-25 22:57:13.242645
785	history	\N	Route	342	2021-04-25 22:57:13.330393	2021-04-25 22:57:13.330393
786	gear	Cintas exprés, cuerda de 60m.	Route	342	2021-04-25 22:57:13.346347	2021-04-25 22:57:13.346347
787	history	\N	Route	343	2021-04-25 22:57:13.420296	2021-04-25 22:57:13.420296
788	gear	Cintas exprés, cuerda de 60m.	Route	343	2021-04-25 22:57:13.425257	2021-04-25 22:57:13.425257
789	history	\N	Route	344	2021-04-25 22:57:13.505629	2021-04-25 22:57:13.505629
790	gear	Cintas exprés, cuerda de 60m.	Route	344	2021-04-25 22:57:13.510847	2021-04-25 22:57:13.510847
791	history	\N	Route	345	2021-04-25 22:57:13.578519	2021-04-25 22:57:13.578519
792	gear	Cintas exprés, cuerda de 60m.	Route	345	2021-04-25 22:57:13.584207	2021-04-25 22:57:13.584207
793	history	\N	Route	346	2021-04-25 22:57:13.671733	2021-04-25 22:57:13.671733
794	gear	Cintas exprés, cuerda de 60m.	Route	346	2021-04-25 22:57:13.676989	2021-04-25 22:57:13.676989
795	history	\N	Route	347	2021-04-25 22:57:13.748556	2021-04-25 22:57:13.748556
796	gear	Cintas exprés, cuerda de 60m.	Route	347	2021-04-25 22:57:13.75412	2021-04-25 22:57:13.75412
797	history	\N	Route	348	2021-04-25 22:57:13.83036	2021-04-25 22:57:13.83036
798	gear	Cintas exprés, cuerda de 60m.	Route	348	2021-04-25 22:57:13.835877	2021-04-25 22:57:13.835877
799	history	\N	Route	349	2021-04-25 22:57:13.895371	2021-04-25 22:57:13.895371
800	gear	Cintas exprés, cuerda de 60m.	Route	349	2021-04-25 22:57:13.900639	2021-04-25 22:57:13.900639
801	history	\N	Route	350	2021-04-25 22:57:13.979058	2021-04-25 22:57:13.979058
802	gear	Cintas exprés, cuerda de 60m.	Route	350	2021-04-25 22:57:13.984582	2021-04-25 22:57:13.984582
803	history	\N	Route	351	2021-04-25 22:57:14.042448	2021-04-25 22:57:14.042448
804	gear	Cintas exprés, cuerda de 60m.	Route	351	2021-04-25 22:57:14.051448	2021-04-25 22:57:14.051448
805	history	\N	Route	352	2021-04-25 22:57:14.121093	2021-04-25 22:57:14.121093
806	gear	Cintas exprés, cuerda de 60m.	Route	352	2021-04-25 22:57:14.125688	2021-04-25 22:57:14.125688
807	history	\N	Route	353	2021-04-25 22:57:14.202995	2021-04-25 22:57:14.202995
808	gear	Cintas exprés, cuerda de 60m.	Route	353	2021-04-25 22:57:14.20842	2021-04-25 22:57:14.20842
809	history	\N	Route	354	2021-04-25 22:57:14.276735	2021-04-25 22:57:14.276735
810	gear	Cintas exprés, cuerda de 60m.	Route	354	2021-04-25 22:57:14.282484	2021-04-25 22:57:14.282484
811	history	\N	Route	355	2021-04-25 22:57:14.35087	2021-04-25 22:57:14.35087
812	gear	Cintas exprés, cuerda de 60m.	Route	355	2021-04-25 22:57:14.356134	2021-04-25 22:57:14.356134
813	history	\N	Route	356	2021-04-25 22:57:14.432724	2021-04-25 22:57:14.432724
814	gear	Cintas exprés, cuerda de 60m.	Route	356	2021-04-25 22:57:14.437959	2021-04-25 22:57:14.437959
815	history	\N	Route	357	2021-04-25 22:57:14.500293	2021-04-25 22:57:14.500293
816	gear	Cintas exprés, cuerda de 60m.	Route	357	2021-04-25 22:57:14.505469	2021-04-25 22:57:14.505469
817	history	\N	Route	358	2021-04-25 22:57:14.604298	2021-04-25 22:57:14.604298
818	gear	Cintas exprés, cuerda de 60m.	Route	358	2021-04-25 22:57:14.60966	2021-04-25 22:57:14.60966
819	history	\N	Route	359	2021-04-25 22:57:14.677201	2021-04-25 22:57:14.677201
820	gear	Cintas exprés, cuerda de 60m.	Route	359	2021-04-25 22:57:14.682614	2021-04-25 22:57:14.682614
821	history	\N	Route	360	2021-04-25 22:57:14.757379	2021-04-25 22:57:14.757379
822	gear	Cintas exprés, cuerda de 60m.	Route	360	2021-04-25 22:57:14.763126	2021-04-25 22:57:14.763126
823	history	\N	Route	361	2021-04-25 22:57:14.829784	2021-04-25 22:57:14.829784
824	gear	Cintas exprés, cuerda de 60m.	Route	361	2021-04-25 22:57:14.841689	2021-04-25 22:57:14.841689
825	history	\N	Route	362	2021-04-25 22:57:14.89954	2021-04-25 22:57:14.89954
826	gear	Cintas exprés, cuerda de 60m.	Route	362	2021-04-25 22:57:14.905269	2021-04-25 22:57:14.905269
827	history	\N	Route	363	2021-04-25 22:57:14.984733	2021-04-25 22:57:14.984733
828	gear	Cintas exprés, cuerda de 60m.	Route	363	2021-04-25 22:57:14.99012	2021-04-25 22:57:14.99012
829	history	\N	Route	364	2021-04-25 22:57:15.078226	2021-04-25 22:57:15.078226
830	gear	Rack Simple. Camalot 0.3-4. Repetir 2 y 3. 4 Cintas runners de 60cm.	Route	364	2021-04-25 22:57:15.084901	2021-04-25 22:57:15.084901
831	history	\N	Route	365	2021-04-25 22:57:15.16592	2021-04-25 22:57:15.16592
832	gear	Rack Simple. Camalot 0.3-4. Repetir 2 y 3. 8 Cintas runners de 60cm.	Route	365	2021-04-25 22:57:15.175088	2021-04-25 22:57:15.175088
833	history	\N	Route	366	2021-04-25 22:57:15.244994	2021-04-25 22:57:15.244994
1364	gear	\N	Route	631	2021-04-25 22:57:37.957766	2021-04-25 22:57:37.957766
834	gear	Rack Simple hasta camalot 6. 1 set de Stoppers. 6 runners de 60 cm.	Route	366	2021-04-25 22:57:15.252376	2021-04-25 22:57:15.252376
835	history	\N	Route	367	2021-04-25 22:57:15.334173	2021-04-25 22:57:15.334173
836	gear	Rack simple hasta camalot 5.	Route	367	2021-04-25 22:57:15.344532	2021-04-25 22:57:15.344532
837	history	\N	Route	368	2021-04-25 22:57:15.42702	2021-04-25 22:57:15.42702
838	gear	Rack Simple hasta camalot 3. 1 set de Stoppers. 6 runners de 60 cm.	Route	368	2021-04-25 22:57:15.432634	2021-04-25 22:57:15.432634
839	history	\N	Route	369	2021-04-25 22:57:15.505104	2021-04-25 22:57:15.505104
840	gear	Rack Simple hasta camalot 5. Repetir el 1 y 3. 1 set de Stoppers. 6 runners de 60 cm.	Route	369	2021-04-25 22:57:15.513341	2021-04-25 22:57:15.513341
841	history	\N	Route	370	2021-04-25 22:57:15.585628	2021-04-25 22:57:15.585628
842	gear	Rack Simple hasta camalot 6. Repetir el 0,75, 1, 2 y 3. 1 set de Stoppers. 8 runners de 60 cm y 2 de 120cm.	Route	370	2021-04-25 22:57:15.591163	2021-04-25 22:57:15.591163
843	history	\N	Route	371	2021-04-25 22:57:15.692799	2021-04-25 22:57:15.692799
844	gear	Cintas exprés, cuerda de 60m.	Route	371	2021-04-25 22:57:15.700749	2021-04-25 22:57:15.700749
845	history	\N	Route	372	2021-04-25 22:57:15.81761	2021-04-25 22:57:15.81761
846	gear	Cintas exprés, cuerda de 60m.	Route	372	2021-04-25 22:57:15.828232	2021-04-25 22:57:15.828232
847	history	\N	Route	373	2021-04-25 22:57:15.920588	2021-04-25 22:57:15.920588
848	gear	Cintas exprés, cuerda de 60m.	Route	373	2021-04-25 22:57:15.928642	2021-04-25 22:57:15.928642
849	history	\N	Route	374	2021-04-25 22:57:16.013468	2021-04-25 22:57:16.013468
850	gear	Cintas exprés, cuerda de 60m.	Route	374	2021-04-25 22:57:16.020029	2021-04-25 22:57:16.020029
851	history	\N	Route	375	2021-04-25 22:57:16.081471	2021-04-25 22:57:16.081471
852	gear	Cintas exprés, cuerda de 60m.	Route	375	2021-04-25 22:57:16.087977	2021-04-25 22:57:16.087977
853	history	\N	Route	376	2021-04-25 22:57:16.166893	2021-04-25 22:57:16.166893
854	gear	Cintas exprés, cuerda de 60m.	Route	376	2021-04-25 22:57:16.177175	2021-04-25 22:57:16.177175
855	history	\N	Route	377	2021-04-25 22:57:16.245033	2021-04-25 22:57:16.245033
856	gear	Cintas exprés, cuerda de 60m.	Route	377	2021-04-25 22:57:16.254639	2021-04-25 22:57:16.254639
857	history	\N	Route	378	2021-04-25 22:57:16.334935	2021-04-25 22:57:16.334935
858	gear	Cintas exprés, cuerda de 60m.	Route	378	2021-04-25 22:57:16.340276	2021-04-25 22:57:16.340276
859	history	\N	Route	379	2021-04-25 22:57:16.411359	2021-04-25 22:57:16.411359
860	gear	Cintas exprés, cuerda de 60m.	Route	379	2021-04-25 22:57:16.418922	2021-04-25 22:57:16.418922
861	history	\N	Route	380	2021-04-25 22:57:16.481234	2021-04-25 22:57:16.481234
862	gear	Cintas exprés, cuerda de 60m.	Route	380	2021-04-25 22:57:16.486753	2021-04-25 22:57:16.486753
863	history	\N	Route	381	2021-04-25 22:57:16.557826	2021-04-25 22:57:16.557826
864	gear	Cintas exprés, cuerda de 60m.	Route	381	2021-04-25 22:57:16.563844	2021-04-25 22:57:16.563844
865	history	\N	Route	382	2021-04-25 22:57:16.633912	2021-04-25 22:57:16.633912
866	gear	Cintas exprés, cuerda de 60m.	Route	382	2021-04-25 22:57:16.63892	2021-04-25 22:57:16.63892
867	history	\N	Route	383	2021-04-25 22:57:16.693629	2021-04-25 22:57:16.693629
868	gear	Cintas exprés, cuerda de 60m.	Route	383	2021-04-25 22:57:16.698781	2021-04-25 22:57:16.698781
869	history	\N	Route	384	2021-04-25 22:57:16.82439	2021-04-25 22:57:16.82439
870	gear	Cintas exprés, cuerda de 60m.	Route	384	2021-04-25 22:57:16.848663	2021-04-25 22:57:16.848663
871	history	\N	Route	385	2021-04-25 22:57:17.10029	2021-04-25 22:57:17.10029
872	gear	Cintas exprés, cuerda de 60m.	Route	385	2021-04-25 22:57:17.105712	2021-04-25 22:57:17.105712
873	history	\N	Route	386	2021-04-25 22:57:17.18799	2021-04-25 22:57:17.18799
874	gear	Cintas exprés, cuerda de 60m.	Route	386	2021-04-25 22:57:17.193879	2021-04-25 22:57:17.193879
875	history	\N	Route	387	2021-04-25 22:57:17.270519	2021-04-25 22:57:17.270519
876	gear	Cintas exprés, cuerda de 60m.	Route	387	2021-04-25 22:57:17.279157	2021-04-25 22:57:17.279157
877	history	\N	Route	388	2021-04-25 22:57:17.344597	2021-04-25 22:57:17.344597
878	gear	Cintas exprés, cuerda de 60m.	Route	388	2021-04-25 22:57:17.350236	2021-04-25 22:57:17.350236
879	history	\N	Route	389	2021-04-25 22:57:17.419198	2021-04-25 22:57:17.419198
880	gear	Cintas exprés, cuerda de 60m.	Route	389	2021-04-25 22:57:17.429671	2021-04-25 22:57:17.429671
881	history	\N	Route	390	2021-04-25 22:57:17.513382	2021-04-25 22:57:17.513382
882	gear	Cintas exprés, cuerda de 60m.	Route	390	2021-04-25 22:57:17.519842	2021-04-25 22:57:17.519842
883	history	\N	Route	391	2021-04-25 22:57:17.639894	2021-04-25 22:57:17.639894
884	gear	Cintas exprés, cuerda de 60m.	Route	391	2021-04-25 22:57:17.651091	2021-04-25 22:57:17.651091
885	history	\N	Route	392	2021-04-25 22:57:17.758225	2021-04-25 22:57:17.758225
886	gear	Cintas exprés, cuerda de 60m.	Route	392	2021-04-25 22:57:17.766545	2021-04-25 22:57:17.766545
887	history	\N	Route	393	2021-04-25 22:57:17.868528	2021-04-25 22:57:17.868528
888	gear	Cintas exprés, cuerda de 60m.	Route	393	2021-04-25 22:57:17.875321	2021-04-25 22:57:17.875321
889	history	\N	Route	394	2021-04-25 22:57:17.989934	2021-04-25 22:57:17.989934
890	gear	Cintas exprés, cuerda de 60m.	Route	394	2021-04-25 22:57:18.006297	2021-04-25 22:57:18.006297
891	history	\N	Route	395	2021-04-25 22:57:18.120599	2021-04-25 22:57:18.120599
892	gear	Cintas exprés, cuerda de 60m.	Route	395	2021-04-25 22:57:18.125146	2021-04-25 22:57:18.125146
893	history	\N	Route	396	2021-04-25 22:57:18.232088	2021-04-25 22:57:18.232088
894	gear	Cintas exprés, cuerda de 60m.	Route	396	2021-04-25 22:57:18.23702	2021-04-25 22:57:18.23702
895	history	\N	Route	397	2021-04-25 22:57:18.317242	2021-04-25 22:57:18.317242
896	gear	Cintas exprés, cuerda de 60m.	Route	397	2021-04-25 22:57:18.322727	2021-04-25 22:57:18.322727
897	history	\N	Route	398	2021-04-25 22:57:18.403986	2021-04-25 22:57:18.403986
898	gear	Cintas exprés, cuerda de 60m.	Route	398	2021-04-25 22:57:18.409823	2021-04-25 22:57:18.409823
899	history	\N	Route	399	2021-04-25 22:57:18.497733	2021-04-25 22:57:18.497733
900	gear	Cintas exprés, cuerda de 60m.	Route	399	2021-04-25 22:57:18.507497	2021-04-25 22:57:18.507497
901	history	\N	Route	400	2021-04-25 22:57:18.609783	2021-04-25 22:57:18.609783
902	gear	Cintas exprés, cuerda de 60m.	Route	400	2021-04-25 22:57:18.619373	2021-04-25 22:57:18.619373
903	history	\N	Route	401	2021-04-25 22:57:18.698993	2021-04-25 22:57:18.698993
904	gear	Cintas exprés, cuerda de 60m.	Route	401	2021-04-25 22:57:18.722836	2021-04-25 22:57:18.722836
905	history	\N	Route	402	2021-04-25 22:57:18.830005	2021-04-25 22:57:18.830005
906	gear	Cintas exprés, cuerda de 60m.	Route	402	2021-04-25 22:57:18.838826	2021-04-25 22:57:18.838826
907	history	\N	Route	403	2021-04-25 22:57:18.935015	2021-04-25 22:57:18.935015
908	gear	Cintas exprés, cuerda de 60m.	Route	403	2021-04-25 22:57:18.940474	2021-04-25 22:57:18.940474
909	history	\N	Route	404	2021-04-25 22:57:19.02278	2021-04-25 22:57:19.02278
910	gear	Cintas exprés, cuerda de 60m.	Route	404	2021-04-25 22:57:19.031128	2021-04-25 22:57:19.031128
911	history	\N	Route	405	2021-04-25 22:57:19.148461	2021-04-25 22:57:19.148461
912	gear	Cintas exprés, cuerda de 60m.	Route	405	2021-04-25 22:57:19.17717	2021-04-25 22:57:19.17717
913	history	\N	Route	406	2021-04-25 22:57:19.236306	2021-04-25 22:57:19.236306
914	gear	Cintas exprés, cuerda de 60m.	Route	406	2021-04-25 22:57:19.241814	2021-04-25 22:57:19.241814
915	history	\N	Route	407	2021-04-25 22:57:19.308421	2021-04-25 22:57:19.308421
916	gear	Cintas exprés, cuerda de 60m.	Route	407	2021-04-25 22:57:19.314193	2021-04-25 22:57:19.314193
917	history	\N	Route	408	2021-04-25 22:57:19.373067	2021-04-25 22:57:19.373067
918	gear	Cintas exprés, cuerda de 60m.	Route	408	2021-04-25 22:57:19.379772	2021-04-25 22:57:19.379772
919	history	\N	Route	409	2021-04-25 22:57:19.460146	2021-04-25 22:57:19.460146
920	gear	Cintas exprés, cuerda de 60m.	Route	409	2021-04-25 22:57:19.465521	2021-04-25 22:57:19.465521
921	history	\N	Route	410	2021-04-25 22:57:19.573863	2021-04-25 22:57:19.573863
922	gear	Cintas exprés, cuerda de 60m.	Route	410	2021-04-25 22:57:19.58319	2021-04-25 22:57:19.58319
923	history	\N	Route	411	2021-04-25 22:57:19.670797	2021-04-25 22:57:19.670797
924	gear	Cintas exprés, cuerda de 60m.	Route	411	2021-04-25 22:57:19.677162	2021-04-25 22:57:19.677162
925	history	\N	Route	412	2021-04-25 22:57:19.738645	2021-04-25 22:57:19.738645
926	gear	Cintas exprés, cuerda de 60m.	Route	412	2021-04-25 22:57:19.746716	2021-04-25 22:57:19.746716
927	history	\N	Route	413	2021-04-25 22:57:19.937689	2021-04-25 22:57:19.937689
928	gear	Cintas exprés, cuerda de 60m.	Route	413	2021-04-25 22:57:19.942656	2021-04-25 22:57:19.942656
929	history	\N	Route	414	2021-04-25 22:57:20.041663	2021-04-25 22:57:20.041663
930	gear	Cintas exprés, cuerda de 60m.	Route	414	2021-04-25 22:57:20.049608	2021-04-25 22:57:20.049608
931	history	\N	Route	415	2021-04-25 22:57:20.148154	2021-04-25 22:57:20.148154
932	gear	Cintas exprés, cuerda de 60m.	Route	415	2021-04-25 22:57:20.157561	2021-04-25 22:57:20.157561
933	history	\N	Route	416	2021-04-25 22:57:20.262034	2021-04-25 22:57:20.262034
934	gear	Cintas exprés, cuerda de 60m.	Route	416	2021-04-25 22:57:20.269837	2021-04-25 22:57:20.269837
935	history	\N	Route	417	2021-04-25 22:57:20.385819	2021-04-25 22:57:20.385819
936	gear	Cintas exprés, cuerda de 60m.	Route	417	2021-04-25 22:57:20.392353	2021-04-25 22:57:20.392353
937	history	\N	Route	418	2021-04-25 22:57:20.475094	2021-04-25 22:57:20.475094
938	gear	Cintas exprés, cuerda de 60m.	Route	418	2021-04-25 22:57:20.480391	2021-04-25 22:57:20.480391
939	history	\N	Route	419	2021-04-25 22:57:20.557795	2021-04-25 22:57:20.557795
940	gear	Cintas exprés, cuerda de 60m.	Route	419	2021-04-25 22:57:20.566719	2021-04-25 22:57:20.566719
941	history	\N	Route	420	2021-04-25 22:57:20.637764	2021-04-25 22:57:20.637764
942	gear	Cintas exprés, cuerda de 60m.	Route	420	2021-04-25 22:57:20.643046	2021-04-25 22:57:20.643046
943	history	\N	Route	421	2021-04-25 22:57:20.720842	2021-04-25 22:57:20.720842
944	gear	Cintas exprés, cuerda de 60m.	Route	421	2021-04-25 22:57:20.726247	2021-04-25 22:57:20.726247
945	history	\N	Route	422	2021-04-25 22:57:20.797889	2021-04-25 22:57:20.797889
946	gear	Cintas exprés, cuerda de 60m.	Route	422	2021-04-25 22:57:20.802983	2021-04-25 22:57:20.802983
947	history	\N	Route	423	2021-04-25 22:57:20.858965	2021-04-25 22:57:20.858965
948	gear	Cintas exprés, cuerda de 60m.	Route	423	2021-04-25 22:57:20.864459	2021-04-25 22:57:20.864459
949	history	\N	Route	424	2021-04-25 22:57:20.932804	2021-04-25 22:57:20.932804
950	gear	Cintas exprés, cuerda de 60m.	Route	424	2021-04-25 22:57:20.938198	2021-04-25 22:57:20.938198
951	history	\N	Route	425	2021-04-25 22:57:20.995842	2021-04-25 22:57:20.995842
952	gear	Cintas exprés, cuerda de 60m.	Route	425	2021-04-25 22:57:21.0011	2021-04-25 22:57:21.0011
953	history	\N	Route	426	2021-04-25 22:57:21.061582	2021-04-25 22:57:21.061582
954	gear	Cintas exprés, cuerda de 60m.	Route	426	2021-04-25 22:57:21.066822	2021-04-25 22:57:21.066822
955	history	\N	Route	427	2021-04-25 22:57:21.124698	2021-04-25 22:57:21.124698
956	gear	Cintas exprés, cuerda de 60m.	Route	427	2021-04-25 22:57:21.130074	2021-04-25 22:57:21.130074
957	history	\N	Route	428	2021-04-25 22:57:21.221522	2021-04-25 22:57:21.221522
958	gear	Cintas exprés, cuerda de 60m.	Route	428	2021-04-25 22:57:21.227281	2021-04-25 22:57:21.227281
959	history	\N	Route	429	2021-04-25 22:57:21.290086	2021-04-25 22:57:21.290086
960	gear	Cintas exprés, cuerda de 60m.	Route	429	2021-04-25 22:57:21.295297	2021-04-25 22:57:21.295297
961	history	\N	Route	430	2021-04-25 22:57:21.362619	2021-04-25 22:57:21.362619
962	gear	Cintas exprés, cuerda de 60m.	Route	430	2021-04-25 22:57:21.370062	2021-04-25 22:57:21.370062
963	history	\N	Route	431	2021-04-25 22:57:21.433294	2021-04-25 22:57:21.433294
964	gear	Cintas exprés, cuerda de 60m.	Route	431	2021-04-25 22:57:21.438685	2021-04-25 22:57:21.438685
965	history	\N	Route	432	2021-04-25 22:57:21.498018	2021-04-25 22:57:21.498018
966	gear	Cintas exprés, cuerda de 60m.	Route	432	2021-04-25 22:57:21.503424	2021-04-25 22:57:21.503424
967	history	\N	Route	433	2021-04-25 22:57:21.58015	2021-04-25 22:57:21.58015
968	gear	Cintas exprés, cuerda de 60m.	Route	433	2021-04-25 22:57:21.58545	2021-04-25 22:57:21.58545
969	history	\N	Route	434	2021-04-25 22:57:21.640567	2021-04-25 22:57:21.640567
970	gear	Cintas exprés, cuerda de 60m.	Route	434	2021-04-25 22:57:21.645903	2021-04-25 22:57:21.645903
971	history	\N	Route	435	2021-04-25 22:57:21.716458	2021-04-25 22:57:21.716458
972	gear	Cintas exprés, cuerda de 60m.	Route	435	2021-04-25 22:57:21.721978	2021-04-25 22:57:21.721978
973	history	\N	Route	436	2021-04-25 22:57:21.803495	2021-04-25 22:57:21.803495
974	gear	Cintas exprés, cuerda de 60m.	Route	436	2021-04-25 22:57:21.810917	2021-04-25 22:57:21.810917
975	history	\N	Route	437	2021-04-25 22:57:21.880999	2021-04-25 22:57:21.880999
976	gear	Cintas exprés, cuerda de 60m.	Route	437	2021-04-25 22:57:21.886288	2021-04-25 22:57:21.886288
977	history	\N	Route	438	2021-04-25 22:57:21.943892	2021-04-25 22:57:21.943892
978	gear	Cintas exprés, cuerda de 60m.	Route	438	2021-04-25 22:57:21.94914	2021-04-25 22:57:21.94914
979	history	\N	Route	439	2021-04-25 22:57:22.009699	2021-04-25 22:57:22.009699
980	gear	Cintas exprés, cuerda de 60m.	Route	439	2021-04-25 22:57:22.016665	2021-04-25 22:57:22.016665
981	history	\N	Route	440	2021-04-25 22:57:22.075691	2021-04-25 22:57:22.075691
982	gear	Cintas exprés, cuerda de 60m.	Route	440	2021-04-25 22:57:22.084953	2021-04-25 22:57:22.084953
983	history	\N	Route	441	2021-04-25 22:57:22.161991	2021-04-25 22:57:22.161991
984	gear	Cintas exprés, cuerda de 60m.	Route	441	2021-04-25 22:57:22.170759	2021-04-25 22:57:22.170759
985	history	\N	Route	442	2021-04-25 22:57:22.236496	2021-04-25 22:57:22.236496
986	gear	Cintas exprés, cuerda de 60m.	Route	442	2021-04-25 22:57:22.242115	2021-04-25 22:57:22.242115
987	history	\N	Route	443	2021-04-25 22:57:22.309644	2021-04-25 22:57:22.309644
988	gear	Cintas exprés, cuerda de 60m.	Route	443	2021-04-25 22:57:22.316306	2021-04-25 22:57:22.316306
989	history	\N	Route	444	2021-04-25 22:57:22.402234	2021-04-25 22:57:22.402234
990	gear	Cintas exprés, cuerda de 60m.	Route	444	2021-04-25 22:57:22.407593	2021-04-25 22:57:22.407593
991	history	\N	Route	445	2021-04-25 22:57:22.468183	2021-04-25 22:57:22.468183
992	gear	Cintas exprés, cuerda de 60m.	Route	445	2021-04-25 22:57:22.475545	2021-04-25 22:57:22.475545
993	history	\N	Route	446	2021-04-25 22:57:22.538147	2021-04-25 22:57:22.538147
994	gear	Cintas exprés, cuerda de 60m.	Route	446	2021-04-25 22:57:22.547145	2021-04-25 22:57:22.547145
995	history	\N	Route	447	2021-04-25 22:57:22.637874	2021-04-25 22:57:22.637874
996	gear	Cintas exprés, cuerda de 60m.	Route	447	2021-04-25 22:57:22.646861	2021-04-25 22:57:22.646861
997	history	\N	Route	448	2021-04-25 22:57:22.725391	2021-04-25 22:57:22.725391
998	gear	Cintas exprés, cuerda de 60m.	Route	448	2021-04-25 22:57:22.733364	2021-04-25 22:57:22.733364
999	history	\N	Route	449	2021-04-25 22:57:22.839597	2021-04-25 22:57:22.839597
1000	gear	Cintas exprés, cuerda de 60m.	Route	449	2021-04-25 22:57:22.845799	2021-04-25 22:57:22.845799
1001	history	\N	Route	450	2021-04-25 22:57:22.937393	2021-04-25 22:57:22.937393
1002	gear	Cintas exprés, cuerda de 60m.	Route	450	2021-04-25 22:57:22.943915	2021-04-25 22:57:22.943915
1003	history	\N	Route	451	2021-04-25 22:57:23.012987	2021-04-25 22:57:23.012987
1004	gear	Cintas exprés, cuerda de 60m.	Route	451	2021-04-25 22:57:23.019019	2021-04-25 22:57:23.019019
1005	history	\N	Route	452	2021-04-25 22:57:23.102769	2021-04-25 22:57:23.102769
1006	gear	Cintas exprés, cuerda de 60m.	Route	452	2021-04-25 22:57:23.111186	2021-04-25 22:57:23.111186
1007	history	\N	Route	453	2021-04-25 22:57:23.192314	2021-04-25 22:57:23.192314
1008	gear	Cintas exprés, cuerda de 60m.	Route	453	2021-04-25 22:57:23.198901	2021-04-25 22:57:23.198901
1009	history	\N	Route	454	2021-04-25 22:57:23.281405	2021-04-25 22:57:23.281405
1010	gear	Cintas exprés, cuerda de 60m.	Route	454	2021-04-25 22:57:23.291112	2021-04-25 22:57:23.291112
1011	history	\N	Route	455	2021-04-25 22:57:23.364061	2021-04-25 22:57:23.364061
1012	gear	Cintas exprés, cuerda de 60m.	Route	455	2021-04-25 22:57:23.37097	2021-04-25 22:57:23.37097
1013	history	\N	Route	456	2021-04-25 22:57:23.428539	2021-04-25 22:57:23.428539
1014	gear	Cintas exprés, cuerda de 60m.	Route	456	2021-04-25 22:57:23.433517	2021-04-25 22:57:23.433517
1015	history	\N	Route	457	2021-04-25 22:57:23.506006	2021-04-25 22:57:23.506006
1016	gear	Cintas exprés, cuerda de 60m.	Route	457	2021-04-25 22:57:23.517769	2021-04-25 22:57:23.517769
1017	history	\N	Route	458	2021-04-25 22:57:23.631856	2021-04-25 22:57:23.631856
1018	gear	Cintas exprés, cuerda de 60m.	Route	458	2021-04-25 22:57:23.637746	2021-04-25 22:57:23.637746
1019	history	\N	Route	459	2021-04-25 22:57:23.73218	2021-04-25 22:57:23.73218
1020	gear	Cintas exprés, cuerda de 60m.	Route	459	2021-04-25 22:57:23.753087	2021-04-25 22:57:23.753087
1021	history	\N	Route	460	2021-04-25 22:57:23.855439	2021-04-25 22:57:23.855439
1022	gear	Cintas exprés, cuerda de 60m.	Route	460	2021-04-25 22:57:23.861593	2021-04-25 22:57:23.861593
1023	history	\N	Route	461	2021-04-25 22:57:23.929121	2021-04-25 22:57:23.929121
1024	gear	Cintas exprés, cuerda de 60m.	Route	461	2021-04-25 22:57:23.937253	2021-04-25 22:57:23.937253
1025	history	\N	Route	462	2021-04-25 22:57:24.025124	2021-04-25 22:57:24.025124
1026	gear	Cintas exprés, cuerda de 60m.	Route	462	2021-04-25 22:57:24.032909	2021-04-25 22:57:24.032909
1027	history	\N	Route	463	2021-04-25 22:57:24.112262	2021-04-25 22:57:24.112262
1028	gear	Cintas exprés, cuerda de 60m.	Route	463	2021-04-25 22:57:24.118548	2021-04-25 22:57:24.118548
1029	history	\N	Route	464	2021-04-25 22:57:24.202889	2021-04-25 22:57:24.202889
1030	gear	Cintas exprés, cuerda de 60m.	Route	464	2021-04-25 22:57:24.209007	2021-04-25 22:57:24.209007
1031	history	\N	Route	465	2021-04-25 22:57:24.301868	2021-04-25 22:57:24.301868
1032	gear	Cintas exprés, cuerda de 60m.	Route	465	2021-04-25 22:57:24.307293	2021-04-25 22:57:24.307293
1033	history	\N	Route	466	2021-04-25 22:57:24.365102	2021-04-25 22:57:24.365102
1034	gear	Cintas exprés, cuerda de 60m.	Route	466	2021-04-25 22:57:24.3702	2021-04-25 22:57:24.3702
1035	history	\N	Route	467	2021-04-25 22:57:24.47503	2021-04-25 22:57:24.47503
1036	gear	Cintas exprés, cuerda de 60m.	Route	467	2021-04-25 22:57:24.487037	2021-04-25 22:57:24.487037
1037	history	\N	Route	468	2021-04-25 22:57:24.573903	2021-04-25 22:57:24.573903
1038	gear	Cintas exprés, cuerda de 60m.	Route	468	2021-04-25 22:57:24.581068	2021-04-25 22:57:24.581068
1039	history	\N	Route	469	2021-04-25 22:57:24.660752	2021-04-25 22:57:24.660752
1040	gear	Cintas exprés, cuerda de 60m.	Route	469	2021-04-25 22:57:24.666426	2021-04-25 22:57:24.666426
1041	history	\N	Route	470	2021-04-25 22:57:24.750193	2021-04-25 22:57:24.750193
1042	gear	Cintas exprés, cuerda de 60m.	Route	470	2021-04-25 22:57:24.759159	2021-04-25 22:57:24.759159
1043	history	\N	Route	471	2021-04-25 22:57:24.853824	2021-04-25 22:57:24.853824
1044	gear	Cintas exprés, cuerda de 60m.	Route	471	2021-04-25 22:57:24.862923	2021-04-25 22:57:24.862923
1045	history	\N	Route	472	2021-04-25 22:57:24.942242	2021-04-25 22:57:24.942242
1046	gear	Cintas exprés, cuerda de 60m.	Route	472	2021-04-25 22:57:24.94894	2021-04-25 22:57:24.94894
1047	history	\N	Route	473	2021-04-25 22:57:25.009227	2021-04-25 22:57:25.009227
1048	gear	Cintas exprés, cuerda de 60m.	Route	473	2021-04-25 22:57:25.014862	2021-04-25 22:57:25.014862
1049	history	\N	Route	474	2021-04-25 22:57:25.094124	2021-04-25 22:57:25.094124
1050	gear	\N	Route	474	2021-04-25 22:57:25.098182	2021-04-25 22:57:25.098182
1051	history	\N	Route	475	2021-04-25 22:57:25.175452	2021-04-25 22:57:25.175452
1052	gear	Cintas exprés, cuerda de 60m.	Route	475	2021-04-25 22:57:25.181174	2021-04-25 22:57:25.181174
1053	history	\N	Route	476	2021-04-25 22:57:25.23593	2021-04-25 22:57:25.23593
1054	gear	Cintas exprés, cuerda de 60m.	Route	476	2021-04-25 22:57:25.241579	2021-04-25 22:57:25.241579
1055	history	\N	Route	477	2021-04-25 22:57:25.369586	2021-04-25 22:57:25.369586
1056	gear	\N	Route	477	2021-04-25 22:57:25.373677	2021-04-25 22:57:25.373677
1057	history	\N	Route	478	2021-04-25 22:57:25.436102	2021-04-25 22:57:25.436102
1058	gear	Cintas exprés, cuerda de 60m.	Route	478	2021-04-25 22:57:25.442671	2021-04-25 22:57:25.442671
1059	history	\N	Route	479	2021-04-25 22:57:25.513037	2021-04-25 22:57:25.513037
1060	gear	Cintas exprés, cuerda de 60m.	Route	479	2021-04-25 22:57:25.519184	2021-04-25 22:57:25.519184
1061	history	\N	Route	480	2021-04-25 22:57:25.596981	2021-04-25 22:57:25.596981
1062	gear	Cintas exprés, cuerda de 60m.	Route	480	2021-04-25 22:57:25.603107	2021-04-25 22:57:25.603107
1063	history	\N	Route	481	2021-04-25 22:57:25.673541	2021-04-25 22:57:25.673541
1064	gear	Cintas exprés, cuerda de 60m.	Route	481	2021-04-25 22:57:25.679356	2021-04-25 22:57:25.679356
1065	history	\N	Route	482	2021-04-25 22:57:25.73969	2021-04-25 22:57:25.73969
1066	gear	Cintas exprés, cuerda de 60m.	Route	482	2021-04-25 22:57:25.745122	2021-04-25 22:57:25.745122
1067	history	\N	Route	483	2021-04-25 22:57:25.818164	2021-04-25 22:57:25.818164
1068	gear	Cintas exprés, cuerda de 60m.	Route	483	2021-04-25 22:57:25.823516	2021-04-25 22:57:25.823516
1069	history	\N	Route	484	2021-04-25 22:57:25.902904	2021-04-25 22:57:25.902904
1070	gear	\N	Route	484	2021-04-25 22:57:25.907294	2021-04-25 22:57:25.907294
1071	history	\N	Route	485	2021-04-25 22:57:25.996622	2021-04-25 22:57:25.996622
1072	gear	Cintas exprés, cuerda de 60m.	Route	485	2021-04-25 22:57:26.001683	2021-04-25 22:57:26.001683
1073	history	\N	Route	486	2021-04-25 22:57:26.057729	2021-04-25 22:57:26.057729
1074	gear	Cintas exprés, cuerda de 60m.	Route	486	2021-04-25 22:57:26.063003	2021-04-25 22:57:26.063003
1075	history	\N	Route	487	2021-04-25 22:57:26.125328	2021-04-25 22:57:26.125328
1076	gear	Cintas exprés, cuerda de 60m.	Route	487	2021-04-25 22:57:26.130888	2021-04-25 22:57:26.130888
1077	history	\N	Route	488	2021-04-25 22:57:26.221312	2021-04-25 22:57:26.221312
1078	gear	\N	Route	488	2021-04-25 22:57:26.225463	2021-04-25 22:57:26.225463
1079	history	\N	Route	489	2021-04-25 22:57:26.279809	2021-04-25 22:57:26.279809
1080	gear	Cintas exprés, cuerda de 60m.	Route	489	2021-04-25 22:57:26.285332	2021-04-25 22:57:26.285332
1081	history	\N	Route	490	2021-04-25 22:57:26.378701	2021-04-25 22:57:26.378701
1082	gear	Cintas exprés, cuerda de 60m.	Route	490	2021-04-25 22:57:26.384585	2021-04-25 22:57:26.384585
1083	history	\N	Route	491	2021-04-25 22:57:26.467323	2021-04-25 22:57:26.467323
1084	gear	Cintas exprés, cuerda de 60m.	Route	491	2021-04-25 22:57:26.472763	2021-04-25 22:57:26.472763
1085	history	\N	Route	492	2021-04-25 22:57:26.545664	2021-04-25 22:57:26.545664
1086	gear	Cintas exprés, cuerda de 60m.	Route	492	2021-04-25 22:57:26.551472	2021-04-25 22:57:26.551472
1087	history	\N	Route	493	2021-04-25 22:57:26.615235	2021-04-25 22:57:26.615235
1088	gear	Cintas exprés, cuerda de 60m.	Route	493	2021-04-25 22:57:26.620598	2021-04-25 22:57:26.620598
1089	history	\N	Route	494	2021-04-25 22:57:26.686733	2021-04-25 22:57:26.686733
1090	gear	Cintas exprés, cuerda de 60m.	Route	494	2021-04-25 22:57:26.694494	2021-04-25 22:57:26.694494
1091	history	\N	Route	495	2021-04-25 22:57:26.786562	2021-04-25 22:57:26.786562
1092	gear	Cintas exprés, cuerda de 60m.	Route	495	2021-04-25 22:57:26.794934	2021-04-25 22:57:26.794934
1093	history	\N	Route	496	2021-04-25 22:57:26.86069	2021-04-25 22:57:26.86069
1094	gear	Cintas exprés, cuerda de 60m.	Route	496	2021-04-25 22:57:26.864922	2021-04-25 22:57:26.864922
1095	history	\N	Route	497	2021-04-25 22:57:26.983855	2021-04-25 22:57:26.983855
1096	gear	Cintas exprés, cuerda de 60m.	Route	497	2021-04-25 22:57:26.989149	2021-04-25 22:57:26.989149
1097	history	\N	Route	498	2021-04-25 22:57:27.05556	2021-04-25 22:57:27.05556
1098	gear	Cintas exprés, cuerda de 60m.	Route	498	2021-04-25 22:57:27.060449	2021-04-25 22:57:27.060449
1099	history	\N	Route	499	2021-04-25 22:57:27.154773	2021-04-25 22:57:27.154773
1100	gear	Cintas exprés, cuerda de 60m.	Route	499	2021-04-25 22:57:27.161823	2021-04-25 22:57:27.161823
1101	history	\N	Route	500	2021-04-25 22:57:27.224707	2021-04-25 22:57:27.224707
1102	gear	Cintas exprés, cuerda de 60m.	Route	500	2021-04-25 22:57:27.229986	2021-04-25 22:57:27.229986
1103	history	\N	Route	501	2021-04-25 22:57:27.297505	2021-04-25 22:57:27.297505
1104	gear	\N	Route	501	2021-04-25 22:57:27.301618	2021-04-25 22:57:27.301618
1105	history	\N	Route	502	2021-04-25 22:57:27.360925	2021-04-25 22:57:27.360925
1106	gear	Cintas exprés, cuerda de 60m.	Route	502	2021-04-25 22:57:27.367212	2021-04-25 22:57:27.367212
1107	history	\N	Route	503	2021-04-25 22:57:27.457058	2021-04-25 22:57:27.457058
1108	gear	Cintas exprés, cuerda de 60m.	Route	503	2021-04-25 22:57:27.462519	2021-04-25 22:57:27.462519
1109	history	\N	Route	504	2021-04-25 22:57:27.533117	2021-04-25 22:57:27.533117
1110	gear	Cintas exprés, cuerda de 60m.	Route	504	2021-04-25 22:57:27.543039	2021-04-25 22:57:27.543039
1111	history	\N	Route	505	2021-04-25 22:57:27.616863	2021-04-25 22:57:27.616863
1112	gear	Cintas exprés, cuerda de 60m.	Route	505	2021-04-25 22:57:27.62241	2021-04-25 22:57:27.62241
1113	history	\N	Route	506	2021-04-25 22:57:27.708287	2021-04-25 22:57:27.708287
1114	gear	Cintas exprés, cuerda de 60m.	Route	506	2021-04-25 22:57:27.716623	2021-04-25 22:57:27.716623
1115	history	\N	Route	507	2021-04-25 22:57:27.852976	2021-04-25 22:57:27.852976
1116	gear	Cintas exprés, cuerda de 60m.	Route	507	2021-04-25 22:57:27.872024	2021-04-25 22:57:27.872024
1117	history	\N	Route	508	2021-04-25 22:57:27.977654	2021-04-25 22:57:27.977654
1118	gear	Cintas exprés, cuerda de 60m.	Route	508	2021-04-25 22:57:27.990646	2021-04-25 22:57:27.990646
1119	history	\N	Route	509	2021-04-25 22:57:28.068174	2021-04-25 22:57:28.068174
1120	gear	\N	Route	509	2021-04-25 22:57:28.07325	2021-04-25 22:57:28.07325
1121	history	\N	Route	510	2021-04-25 22:57:28.142865	2021-04-25 22:57:28.142865
1122	gear	\N	Route	510	2021-04-25 22:57:28.148746	2021-04-25 22:57:28.148746
1123	history	\N	Route	511	2021-04-25 22:57:28.254688	2021-04-25 22:57:28.254688
1124	gear	\N	Route	511	2021-04-25 22:57:28.259103	2021-04-25 22:57:28.259103
1125	history	\N	Route	512	2021-04-25 22:57:28.313985	2021-04-25 22:57:28.313985
1126	gear	\N	Route	512	2021-04-25 22:57:28.3182	2021-04-25 22:57:28.3182
1127	history	\N	Route	513	2021-04-25 22:57:28.406812	2021-04-25 22:57:28.406812
1128	gear	\N	Route	513	2021-04-25 22:57:28.413634	2021-04-25 22:57:28.413634
1129	history	\N	Route	514	2021-04-25 22:57:28.495099	2021-04-25 22:57:28.495099
1130	gear	Cintas exprés, cuerda de 60m.	Route	514	2021-04-25 22:57:28.501073	2021-04-25 22:57:28.501073
1131	history	\N	Route	515	2021-04-25 22:57:28.579756	2021-04-25 22:57:28.579756
1132	gear	Cintas exprés, cuerda de 60m.	Route	515	2021-04-25 22:57:28.58719	2021-04-25 22:57:28.58719
1133	history	\N	Route	516	2021-04-25 22:57:28.698098	2021-04-25 22:57:28.698098
1134	gear	Cintas exprés, cuerda de 60m.	Route	516	2021-04-25 22:57:28.704119	2021-04-25 22:57:28.704119
1135	history	\N	Route	517	2021-04-25 22:57:28.785512	2021-04-25 22:57:28.785512
1136	gear	Cintas exprés, cuerda de 60m.	Route	517	2021-04-25 22:57:28.794761	2021-04-25 22:57:28.794761
1137	history	\N	Route	518	2021-04-25 22:57:28.887044	2021-04-25 22:57:28.887044
1138	gear	Cintas exprés, cuerda de 60m.	Route	518	2021-04-25 22:57:28.891562	2021-04-25 22:57:28.891562
1139	history	\N	Route	519	2021-04-25 22:57:28.985515	2021-04-25 22:57:28.985515
1140	gear	Cintas exprés, cuerda de 60m.	Route	519	2021-04-25 22:57:28.991339	2021-04-25 22:57:28.991339
1141	history	\N	Route	520	2021-04-25 22:57:29.049586	2021-04-25 22:57:29.049586
1142	gear	Cintas exprés, cuerda de 60m.	Route	520	2021-04-25 22:57:29.055127	2021-04-25 22:57:29.055127
1143	history	\N	Route	521	2021-04-25 22:57:29.180649	2021-04-25 22:57:29.180649
1144	gear	Cintas exprés, cuerda de 60m.	Route	521	2021-04-25 22:57:29.191098	2021-04-25 22:57:29.191098
1145	history	\N	Route	522	2021-04-25 22:57:29.252376	2021-04-25 22:57:29.252376
1146	gear	Cintas exprés, cuerda de 70m.	Route	522	2021-04-25 22:57:29.258388	2021-04-25 22:57:29.258388
1147	history	\N	Route	523	2021-04-25 22:57:29.320817	2021-04-25 22:57:29.320817
1148	gear	Cintas exprés, cuerda de 60m.	Route	523	2021-04-25 22:57:29.326573	2021-04-25 22:57:29.326573
1149	history	\N	Route	524	2021-04-25 22:57:29.412937	2021-04-25 22:57:29.412937
1150	gear	Cintas exprés, cuerda de 60m.	Route	524	2021-04-25 22:57:29.418151	2021-04-25 22:57:29.418151
1151	history	\N	Route	525	2021-04-25 22:57:29.490861	2021-04-25 22:57:29.490861
1152	gear	Cintas exprés, cuerda de 60m.	Route	525	2021-04-25 22:57:29.496126	2021-04-25 22:57:29.496126
1153	history	\N	Route	526	2021-04-25 22:57:29.576407	2021-04-25 22:57:29.576407
1154	gear	Cintas exprés, cuerda de 60m.	Route	526	2021-04-25 22:57:29.581278	2021-04-25 22:57:29.581278
1155	history	\N	Route	527	2021-04-25 22:57:29.638067	2021-04-25 22:57:29.638067
1156	gear	Cintas exprés, cuerda de 60m.	Route	527	2021-04-25 22:57:29.643171	2021-04-25 22:57:29.643171
1157	history	\N	Route	528	2021-04-25 22:57:29.70828	2021-04-25 22:57:29.70828
1158	gear	Cintas exprés, cuerda de 60m.	Route	528	2021-04-25 22:57:29.714054	2021-04-25 22:57:29.714054
1159	history	\N	Route	529	2021-04-25 22:57:29.778303	2021-04-25 22:57:29.778303
1160	gear	Cintas exprés, cuerda de 60m.	Route	529	2021-04-25 22:57:29.783692	2021-04-25 22:57:29.783692
1161	history	\N	Route	530	2021-04-25 22:57:29.852142	2021-04-25 22:57:29.852142
1162	gear	Cintas exprés, cuerda de 60m.	Route	530	2021-04-25 22:57:29.857536	2021-04-25 22:57:29.857536
1163	history	\N	Route	531	2021-04-25 22:57:29.941652	2021-04-25 22:57:29.941652
1164	gear	Cintas exprés, cuerda de 60m.	Route	531	2021-04-25 22:57:29.947614	2021-04-25 22:57:29.947614
1165	history	\N	Route	532	2021-04-25 22:57:30.017559	2021-04-25 22:57:30.017559
1166	gear	Cintas exprés, cuerda de 60m.	Route	532	2021-04-25 22:57:30.022733	2021-04-25 22:57:30.022733
1167	history	\N	Route	533	2021-04-25 22:57:30.101824	2021-04-25 22:57:30.101824
1168	gear	Cintas exprés, cuerda de 60m.	Route	533	2021-04-25 22:57:30.107469	2021-04-25 22:57:30.107469
1169	history	\N	Route	534	2021-04-25 22:57:30.172875	2021-04-25 22:57:30.172875
1170	gear	Cintas exprés, cuerda de 60m.	Route	534	2021-04-25 22:57:30.178495	2021-04-25 22:57:30.178495
1171	history	\N	Route	535	2021-04-25 22:57:30.253642	2021-04-25 22:57:30.253642
1172	gear	Cintas exprés, cuerda de 60m.	Route	535	2021-04-25 22:57:30.258891	2021-04-25 22:57:30.258891
1173	history	\N	Route	536	2021-04-25 22:57:30.355632	2021-04-25 22:57:30.355632
1174	gear	Cintas exprés, cuerda de 60m.	Route	536	2021-04-25 22:57:30.36116	2021-04-25 22:57:30.36116
1175	history	\N	Route	537	2021-04-25 22:57:30.445693	2021-04-25 22:57:30.445693
1176	gear	Cintas exprés, cuerda de 60m.	Route	537	2021-04-25 22:57:30.453781	2021-04-25 22:57:30.453781
1177	history	\N	Route	538	2021-04-25 22:57:30.512926	2021-04-25 22:57:30.512926
1178	gear	Cintas exprés, cuerda de 60m.	Route	538	2021-04-25 22:57:30.518089	2021-04-25 22:57:30.518089
1179	history	\N	Route	539	2021-04-25 22:57:30.598608	2021-04-25 22:57:30.598608
1180	gear	Cintas exprés, cuerda de 60m.	Route	539	2021-04-25 22:57:30.603972	2021-04-25 22:57:30.603972
1181	history	\N	Route	540	2021-04-25 22:57:30.667562	2021-04-25 22:57:30.667562
1182	gear	Cintas exprés, cuerda de 60m.	Route	540	2021-04-25 22:57:30.675532	2021-04-25 22:57:30.675532
1183	history	\N	Route	541	2021-04-25 22:57:30.764362	2021-04-25 22:57:30.764362
1184	gear	Cintas exprés, cuerda de 60m.	Route	541	2021-04-25 22:57:30.771285	2021-04-25 22:57:30.771285
1185	history	\N	Route	542	2021-04-25 22:57:30.897617	2021-04-25 22:57:30.897617
1186	gear	Cintas exprés, cuerda de 60m.	Route	542	2021-04-25 22:57:30.903838	2021-04-25 22:57:30.903838
1187	history	\N	Route	543	2021-04-25 22:57:30.973942	2021-04-25 22:57:30.973942
1188	gear	Cintas exprés, cuerda de 60m.	Route	543	2021-04-25 22:57:30.979476	2021-04-25 22:57:30.979476
1189	history	\N	Route	544	2021-04-25 22:57:31.047702	2021-04-25 22:57:31.047702
1190	gear	Cintas exprés, cuerda de 60m.	Route	544	2021-04-25 22:57:31.054125	2021-04-25 22:57:31.054125
1191	history	\N	Route	545	2021-04-25 22:57:31.132674	2021-04-25 22:57:31.132674
1192	gear	Cintas exprés, cuerda de 60m.	Route	545	2021-04-25 22:57:31.138248	2021-04-25 22:57:31.138248
1193	history	\N	Route	546	2021-04-25 22:57:31.214699	2021-04-25 22:57:31.214699
1194	gear	Cintas exprés, cuerda de 60m.	Route	546	2021-04-25 22:57:31.224605	2021-04-25 22:57:31.224605
1195	history	\N	Route	547	2021-04-25 22:57:31.290546	2021-04-25 22:57:31.290546
1196	gear	Cintas exprés, cuerda de 60m.	Route	547	2021-04-25 22:57:31.296038	2021-04-25 22:57:31.296038
1197	history	\N	Route	548	2021-04-25 22:57:31.377519	2021-04-25 22:57:31.377519
1198	gear	Cintas exprés, cuerda de 60m.	Route	548	2021-04-25 22:57:31.386381	2021-04-25 22:57:31.386381
1199	history	\N	Route	549	2021-04-25 22:57:31.473432	2021-04-25 22:57:31.473432
1200	gear	Cintas exprés, cuerda de 60m.	Route	549	2021-04-25 22:57:31.478908	2021-04-25 22:57:31.478908
1201	history	\N	Route	550	2021-04-25 22:57:31.535093	2021-04-25 22:57:31.535093
1202	gear	Cintas exprés, cuerda de 60m.	Route	550	2021-04-25 22:57:31.545035	2021-04-25 22:57:31.545035
1203	history	\N	Route	551	2021-04-25 22:57:31.643054	2021-04-25 22:57:31.643054
1204	gear	Cintas exprés, cuerda de 60m.	Route	551	2021-04-25 22:57:31.64916	2021-04-25 22:57:31.64916
1205	history	\N	Route	552	2021-04-25 22:57:31.704623	2021-04-25 22:57:31.704623
1206	gear	Cintas exprés, cuerda de 80m.	Route	552	2021-04-25 22:57:31.710015	2021-04-25 22:57:31.710015
1207	history	\N	Route	553	2021-04-25 22:57:31.772995	2021-04-25 22:57:31.772995
1208	gear	Cintas exprés, cuerda de 60m.	Route	553	2021-04-25 22:57:31.778093	2021-04-25 22:57:31.778093
1209	history	\N	Route	554	2021-04-25 22:57:31.838	2021-04-25 22:57:31.838
1210	gear	Cintas exprés, cuerda de 60m.	Route	554	2021-04-25 22:57:31.843434	2021-04-25 22:57:31.843434
1211	history	\N	Route	555	2021-04-25 22:57:31.898665	2021-04-25 22:57:31.898665
1212	gear	Cintas exprés, cuerda de 60m.	Route	555	2021-04-25 22:57:31.903807	2021-04-25 22:57:31.903807
1213	history	\N	Route	556	2021-04-25 22:57:31.971051	2021-04-25 22:57:31.971051
1214	gear	Cintas exprés, cuerda de 60m.	Route	556	2021-04-25 22:57:31.976404	2021-04-25 22:57:31.976404
1215	history	\N	Route	557	2021-04-25 22:57:32.055221	2021-04-25 22:57:32.055221
1216	gear	Cintas exprés, cuerda de 60m.	Route	557	2021-04-25 22:57:32.060391	2021-04-25 22:57:32.060391
1217	history	\N	Route	558	2021-04-25 22:57:32.120768	2021-04-25 22:57:32.120768
1218	gear	Cintas exprés, cuerda de 60m.	Route	558	2021-04-25 22:57:32.126923	2021-04-25 22:57:32.126923
1219	history	\N	Route	559	2021-04-25 22:57:32.199594	2021-04-25 22:57:32.199594
1220	gear	Cintas exprés, cuerda de 60m.	Route	559	2021-04-25 22:57:32.208293	2021-04-25 22:57:32.208293
1221	history	\N	Route	560	2021-04-25 22:57:32.28215	2021-04-25 22:57:32.28215
1222	gear	Cintas exprés, cuerda de 60m.	Route	560	2021-04-25 22:57:32.288039	2021-04-25 22:57:32.288039
1223	history	\N	Route	561	2021-04-25 22:57:32.354925	2021-04-25 22:57:32.354925
1224	gear	Cintas exprés, cuerda de 60m.	Route	561	2021-04-25 22:57:32.360165	2021-04-25 22:57:32.360165
1225	history	\N	Route	562	2021-04-25 22:57:32.418731	2021-04-25 22:57:32.418731
1226	gear	Cintas exprés, cuerda de 60m.	Route	562	2021-04-25 22:57:32.42409	2021-04-25 22:57:32.42409
1227	history	\N	Route	563	2021-04-25 22:57:32.497618	2021-04-25 22:57:32.497618
1228	gear	Cintas exprés, cuerda de 60m.	Route	563	2021-04-25 22:57:32.504389	2021-04-25 22:57:32.504389
1229	history	\N	Route	564	2021-04-25 22:57:32.598788	2021-04-25 22:57:32.598788
1230	gear	Cintas exprés, cuerda de 60m.	Route	564	2021-04-25 22:57:32.604064	2021-04-25 22:57:32.604064
1231	history	\N	Route	565	2021-04-25 22:57:32.67765	2021-04-25 22:57:32.67765
1232	gear	Cintas exprés, cuerda de 60m.	Route	565	2021-04-25 22:57:32.68667	2021-04-25 22:57:32.68667
1233	history	\N	Route	566	2021-04-25 22:57:32.75765	2021-04-25 22:57:32.75765
1234	gear	Cintas exprés, cuerda de 60m.	Route	566	2021-04-25 22:57:32.763032	2021-04-25 22:57:32.763032
1235	history	\N	Route	567	2021-04-25 22:57:32.847557	2021-04-25 22:57:32.847557
1236	gear	Cintas exprés, cuerda de 60m.	Route	567	2021-04-25 22:57:32.852913	2021-04-25 22:57:32.852913
1237	history	\N	Route	568	2021-04-25 22:57:32.914953	2021-04-25 22:57:32.914953
1238	gear	Cintas exprés, cuerda de 60m.	Route	568	2021-04-25 22:57:32.920565	2021-04-25 22:57:32.920565
1239	history	\N	Route	569	2021-04-25 22:57:32.99717	2021-04-25 22:57:32.99717
1240	gear	Cintas exprés, cuerda de 60m.	Route	569	2021-04-25 22:57:33.00263	2021-04-25 22:57:33.00263
1241	history	\N	Route	570	2021-04-25 22:57:33.075245	2021-04-25 22:57:33.075245
1242	gear	Cintas exprés, cuerda de 60m.	Route	570	2021-04-25 22:57:33.080688	2021-04-25 22:57:33.080688
1243	history	\N	Route	571	2021-04-25 22:57:33.152455	2021-04-25 22:57:33.152455
1244	gear	Cintas exprés, cuerda de 60m.	Route	571	2021-04-25 22:57:33.162321	2021-04-25 22:57:33.162321
1245	history	\N	Route	572	2021-04-25 22:57:33.251321	2021-04-25 22:57:33.251321
1246	gear	Cintas exprés, cuerda de 60m.	Route	572	2021-04-25 22:57:33.257146	2021-04-25 22:57:33.257146
1247	history	\N	Route	573	2021-04-25 22:57:33.344038	2021-04-25 22:57:33.344038
1248	gear	Cintas exprés, cuerda de 60m.	Route	573	2021-04-25 22:57:33.349665	2021-04-25 22:57:33.349665
1249	history	\N	Route	574	2021-04-25 22:57:33.421432	2021-04-25 22:57:33.421432
1250	gear	Cintas exprés, cuerda de 60m.	Route	574	2021-04-25 22:57:33.426983	2021-04-25 22:57:33.426983
1251	history	\N	Route	575	2021-04-25 22:57:33.497603	2021-04-25 22:57:33.497603
1252	gear	Cintas exprés, cuerda de 60m.	Route	575	2021-04-25 22:57:33.502832	2021-04-25 22:57:33.502832
1253	history	\N	Route	576	2021-04-25 22:57:33.591583	2021-04-25 22:57:33.591583
1254	gear	Cintas exprés, cuerda de 60m.	Route	576	2021-04-25 22:57:33.601612	2021-04-25 22:57:33.601612
1255	history	\N	Route	577	2021-04-25 22:57:33.681632	2021-04-25 22:57:33.681632
1256	gear	Cintas exprés, cuerda de 60m.	Route	577	2021-04-25 22:57:33.686855	2021-04-25 22:57:33.686855
1257	history	\N	Route	578	2021-04-25 22:57:33.771795	2021-04-25 22:57:33.771795
1258	gear	Cintas exprés, cuerda de 60m.	Route	578	2021-04-25 22:57:33.77909	2021-04-25 22:57:33.77909
1259	history	\N	Route	579	2021-04-25 22:57:33.853341	2021-04-25 22:57:33.853341
1260	gear	Cintas exprés, cuerda de 60m.	Route	579	2021-04-25 22:57:33.858831	2021-04-25 22:57:33.858831
1261	history	\N	Route	580	2021-04-25 22:57:33.930236	2021-04-25 22:57:33.930236
1262	gear	Cintas exprés, cuerda de 60m.	Route	580	2021-04-25 22:57:33.935321	2021-04-25 22:57:33.935321
1263	history	\N	Route	581	2021-04-25 22:57:33.993079	2021-04-25 22:57:33.993079
1264	gear	Cintas exprés, cuerda de 60m.	Route	581	2021-04-25 22:57:33.998383	2021-04-25 22:57:33.998383
1265	history	\N	Route	582	2021-04-25 22:57:34.081863	2021-04-25 22:57:34.081863
1266	gear	Cintas exprés, cuerda de 60m.	Route	582	2021-04-25 22:57:34.089758	2021-04-25 22:57:34.089758
1267	history	\N	Route	583	2021-04-25 22:57:34.157911	2021-04-25 22:57:34.157911
1268	gear	Cintas exprés, cuerda de 60m.	Route	583	2021-04-25 22:57:34.167226	2021-04-25 22:57:34.167226
1269	history	\N	Route	584	2021-04-25 22:57:34.244518	2021-04-25 22:57:34.244518
1270	gear	Cintas exprés, cuerda de 60m.	Route	584	2021-04-25 22:57:34.250038	2021-04-25 22:57:34.250038
1271	history	\N	Route	585	2021-04-25 22:57:34.315242	2021-04-25 22:57:34.315242
1272	gear	Cintas exprés, cuerda de 60m.	Route	585	2021-04-25 22:57:34.321417	2021-04-25 22:57:34.321417
1273	history	\N	Route	586	2021-04-25 22:57:34.397199	2021-04-25 22:57:34.397199
1274	gear	Cintas exprés, cuerda de 60m.	Route	586	2021-04-25 22:57:34.403194	2021-04-25 22:57:34.403194
1275	history	\N	Route	587	2021-04-25 22:57:34.465613	2021-04-25 22:57:34.465613
1276	gear	Cintas exprés, cuerda de 60m.	Route	587	2021-04-25 22:57:34.474949	2021-04-25 22:57:34.474949
1277	history	\N	Route	588	2021-04-25 22:57:34.571281	2021-04-25 22:57:34.571281
1278	gear	Cintas exprés, cuerda de 60m.	Route	588	2021-04-25 22:57:34.578766	2021-04-25 22:57:34.578766
1279	history	\N	Route	589	2021-04-25 22:57:34.641833	2021-04-25 22:57:34.641833
1280	gear	Cintas exprés, cuerda de 60m.	Route	589	2021-04-25 22:57:34.647321	2021-04-25 22:57:34.647321
1281	history	\N	Route	590	2021-04-25 22:57:34.710985	2021-04-25 22:57:34.710985
1282	gear	Cintas exprés, cuerda de 60m.	Route	590	2021-04-25 22:57:34.717543	2021-04-25 22:57:34.717543
1283	history	\N	Route	591	2021-04-25 22:57:34.801659	2021-04-25 22:57:34.801659
1284	gear	Cintas exprés, cuerda de 60m.	Route	591	2021-04-25 22:57:34.806944	2021-04-25 22:57:34.806944
1285	history	\N	Route	592	2021-04-25 22:57:34.865887	2021-04-25 22:57:34.865887
1286	gear	Cintas exprés, cuerda de 60m.	Route	592	2021-04-25 22:57:34.872871	2021-04-25 22:57:34.872871
1287	history	\N	Route	593	2021-04-25 22:57:34.954091	2021-04-25 22:57:34.954091
1288	gear	Cintas exprés, cuerda de 60m.	Route	593	2021-04-25 22:57:34.95951	2021-04-25 22:57:34.95951
1289	history	\N	Route	594	2021-04-25 22:57:35.057139	2021-04-25 22:57:35.057139
1290	gear	Cintas exprés, cuerda de 60m.	Route	594	2021-04-25 22:57:35.063697	2021-04-25 22:57:35.063697
1291	history	\N	Route	595	2021-04-25 22:57:35.133751	2021-04-25 22:57:35.133751
1292	gear	Cintas exprés, cuerda de 60m.	Route	595	2021-04-25 22:57:35.139653	2021-04-25 22:57:35.139653
1293	history	\N	Route	596	2021-04-25 22:57:35.202458	2021-04-25 22:57:35.202458
1294	gear	Cintas exprés, cuerda de 60m.	Route	596	2021-04-25 22:57:35.212397	2021-04-25 22:57:35.212397
1295	history	\N	Route	597	2021-04-25 22:57:35.268645	2021-04-25 22:57:35.268645
1296	gear	Cintas exprés, cuerda de 60m.	Route	597	2021-04-25 22:57:35.275538	2021-04-25 22:57:35.275538
1297	history	\N	Route	598	2021-04-25 22:57:35.32966	2021-04-25 22:57:35.32966
1298	gear	Cintas exprés, cuerda de 60m.	Route	598	2021-04-25 22:57:35.33898	2021-04-25 22:57:35.33898
1299	history	\N	Route	599	2021-04-25 22:57:35.398829	2021-04-25 22:57:35.398829
1300	gear	Cintas exprés, cuerda de 60m.	Route	599	2021-04-25 22:57:35.403941	2021-04-25 22:57:35.403941
1301	history	\N	Route	600	2021-04-25 22:57:35.463481	2021-04-25 22:57:35.463481
1302	gear	Cintas exprés, cuerda de 60m.	Route	600	2021-04-25 22:57:35.471851	2021-04-25 22:57:35.471851
1303	history	\N	Route	601	2021-04-25 22:57:35.512629	2021-04-25 22:57:35.512629
1304	gear	Cintas exprés, cuerda de 60m.	Route	601	2021-04-25 22:57:35.517895	2021-04-25 22:57:35.517895
1305	history	\N	Route	602	2021-04-25 22:57:35.585714	2021-04-25 22:57:35.585714
1306	gear	Cintas exprés, cuerda de 60m.	Route	602	2021-04-25 22:57:35.591099	2021-04-25 22:57:35.591099
1307	history	\N	Route	603	2021-04-25 22:57:35.655766	2021-04-25 22:57:35.655766
1308	gear	Cintas exprés, cuerda de 60m.	Route	603	2021-04-25 22:57:35.665567	2021-04-25 22:57:35.665567
1309	history	\N	Route	604	2021-04-25 22:57:35.725193	2021-04-25 22:57:35.725193
1310	gear	Cintas exprés, cuerda de 60m.	Route	604	2021-04-25 22:57:35.731194	2021-04-25 22:57:35.731194
1311	history	\N	Route	605	2021-04-25 22:57:35.806225	2021-04-25 22:57:35.806225
1312	gear	Cintas exprés, cuerda de 60m.	Route	605	2021-04-25 22:57:35.811613	2021-04-25 22:57:35.811613
1313	history	\N	Route	606	2021-04-25 22:57:35.925541	2021-04-25 22:57:35.925541
1314	gear	Cintas exprés, cuerda de 60m.	Route	606	2021-04-25 22:57:35.935086	2021-04-25 22:57:35.935086
1315	history	\N	Route	607	2021-04-25 22:57:36.016716	2021-04-25 22:57:36.016716
1316	gear	Cintas exprés, cuerda de 60m.	Route	607	2021-04-25 22:57:36.023456	2021-04-25 22:57:36.023456
1317	history	\N	Route	608	2021-04-25 22:57:36.109942	2021-04-25 22:57:36.109942
1318	gear	Cintas exprés, cuerda de 60m.	Route	608	2021-04-25 22:57:36.119038	2021-04-25 22:57:36.119038
1319	history	\N	Route	609	2021-04-25 22:57:36.197857	2021-04-25 22:57:36.197857
1320	gear	Cintas exprés, cuerda de 60m.	Route	609	2021-04-25 22:57:36.209401	2021-04-25 22:57:36.209401
1321	history	\N	Route	610	2021-04-25 22:57:36.292729	2021-04-25 22:57:36.292729
1322	gear	Cintas exprés, cuerda de 60m.	Route	610	2021-04-25 22:57:36.299056	2021-04-25 22:57:36.299056
1323	history	\N	Route	611	2021-04-25 22:57:36.369643	2021-04-25 22:57:36.369643
1324	gear	Camalots 1 y 3. Un Juego de Stoppers.	Route	611	2021-04-25 22:57:36.375004	2021-04-25 22:57:36.375004
1325	history	\N	Route	612	2021-04-25 22:57:36.442234	2021-04-25 22:57:36.442234
1326	gear	Cintas exprés, cuerda de 60m.	Route	612	2021-04-25 22:57:36.449386	2021-04-25 22:57:36.449386
1327	history	\N	Route	613	2021-04-25 22:57:36.505036	2021-04-25 22:57:36.505036
1328	gear	Cintas exprés, cuerda de 60m.	Route	613	2021-04-25 22:57:36.51052	2021-04-25 22:57:36.51052
1329	history	\N	Route	614	2021-04-25 22:57:36.593425	2021-04-25 22:57:36.593425
1330	gear	Cintas exprés, cuerda de 60m.	Route	614	2021-04-25 22:57:36.598903	2021-04-25 22:57:36.598903
1331	history	\N	Route	615	2021-04-25 22:57:36.674136	2021-04-25 22:57:36.674136
1332	gear	Cintas exprés, cuerda de 60m.	Route	615	2021-04-25 22:57:36.679523	2021-04-25 22:57:36.679523
1333	history	\N	Route	616	2021-04-25 22:57:36.773128	2021-04-25 22:57:36.773128
1334	gear	3 Cintas exprés. Camalots 1 y 3.	Route	616	2021-04-25 22:57:36.779651	2021-04-25 22:57:36.779651
1335	history	\N	Route	617	2021-04-25 22:57:36.845656	2021-04-25 22:57:36.845656
1336	gear	Cintas exprés, cuerda de 60m.	Route	617	2021-04-25 22:57:36.855373	2021-04-25 22:57:36.855373
1337	history	\N	Route	618	2021-04-25 22:57:36.930338	2021-04-25 22:57:36.930338
1338	gear	Cintas exprés, cuerda de 60m.	Route	618	2021-04-25 22:57:36.938682	2021-04-25 22:57:36.938682
1339	history	\N	Route	619	2021-04-25 22:57:37.009034	2021-04-25 22:57:37.009034
1340	gear	Cintas exprés, cuerda de 60m.	Route	619	2021-04-25 22:57:37.014619	2021-04-25 22:57:37.014619
1341	history	\N	Route	620	2021-04-25 22:57:37.074283	2021-04-25 22:57:37.074283
1342	gear	Cintas exprés, cuerda de 60m.	Route	620	2021-04-25 22:57:37.079969	2021-04-25 22:57:37.079969
1343	history	\N	Route	621	2021-04-25 22:57:37.154809	2021-04-25 22:57:37.154809
1344	gear	Cintas exprés, cuerda de 60m.	Route	621	2021-04-25 22:57:37.175583	2021-04-25 22:57:37.175583
1345	history	\N	Route	622	2021-04-25 22:57:37.252014	2021-04-25 22:57:37.252014
1346	gear	Cintas exprés, cuerda de 60m.	Route	622	2021-04-25 22:57:37.257528	2021-04-25 22:57:37.257528
1347	history	\N	Route	623	2021-04-25 22:57:37.323028	2021-04-25 22:57:37.323028
1348	gear	Cintas exprés, cuerda de 60m.	Route	623	2021-04-25 22:57:37.329075	2021-04-25 22:57:37.329075
1349	history	\N	Route	624	2021-04-25 22:57:37.404691	2021-04-25 22:57:37.404691
1350	gear	Cintas exprés, cuerda de 60m.	Route	624	2021-04-25 22:57:37.410176	2021-04-25 22:57:37.410176
1351	history	\N	Route	625	2021-04-25 22:57:37.491435	2021-04-25 22:57:37.491435
1352	gear	Cintas exprés, cuerda de 60m.	Route	625	2021-04-25 22:57:37.496879	2021-04-25 22:57:37.496879
1353	history	\N	Route	626	2021-04-25 22:57:37.555696	2021-04-25 22:57:37.555696
1354	gear	Cintas exprés, cuerda de 60m.	Route	626	2021-04-25 22:57:37.56133	2021-04-25 22:57:37.56133
1355	history	\N	Route	627	2021-04-25 22:57:37.672035	2021-04-25 22:57:37.672035
1356	gear	Cintas exprés, cuerda de 60m.	Route	627	2021-04-25 22:57:37.677187	2021-04-25 22:57:37.677187
1357	history	\N	Route	628	2021-04-25 22:57:37.735734	2021-04-25 22:57:37.735734
1358	gear	Cintas exprés, cuerda de 60m.	Route	628	2021-04-25 22:57:37.741146	2021-04-25 22:57:37.741146
1359	history	\N	Route	629	2021-04-25 22:57:37.805832	2021-04-25 22:57:37.805832
1360	gear	Cintas exprés, cuerda de 60m.	Route	629	2021-04-25 22:57:37.813721	2021-04-25 22:57:37.813721
1361	history	\N	Route	630	2021-04-25 22:57:37.878858	2021-04-25 22:57:37.878858
1362	gear	Cintas exprés, cuerda de 60m.	Route	630	2021-04-25 22:57:37.884803	2021-04-25 22:57:37.884803
1363	history	\N	Route	631	2021-04-25 22:57:37.953376	2021-04-25 22:57:37.953376
1365	history	\N	Route	632	2021-04-25 22:57:38.015518	2021-04-25 22:57:38.015518
1366	gear	4 Cintas Exprés.	Route	632	2021-04-25 22:57:38.021533	2021-04-25 22:57:38.021533
1367	history	\N	Route	633	2021-04-25 22:57:38.101648	2021-04-25 22:57:38.101648
1368	gear	Cintas exprés, cuerda de 60m.	Route	633	2021-04-25 22:57:38.114517	2021-04-25 22:57:38.114517
1369	history	\N	Route	634	2021-04-25 22:57:38.185125	2021-04-25 22:57:38.185125
1370	gear	Cintas exprés, cuerda de 60m.	Route	634	2021-04-25 22:57:38.191622	2021-04-25 22:57:38.191622
1371	history	\N	Route	635	2021-04-25 22:57:38.264058	2021-04-25 22:57:38.264058
1372	gear	\N	Route	635	2021-04-25 22:57:38.268314	2021-04-25 22:57:38.268314
1373	history	\N	Route	636	2021-04-25 22:57:38.324628	2021-04-25 22:57:38.324628
1374	gear	4 Cintas Exprés.	Route	636	2021-04-25 22:57:38.330084	2021-04-25 22:57:38.330084
1375	history	\N	Route	637	2021-04-25 22:57:38.402064	2021-04-25 22:57:38.402064
1376	gear	Cintas exprés, cuerda de 60m.	Route	637	2021-04-25 22:57:38.407492	2021-04-25 22:57:38.407492
1377	history	\N	Route	638	2021-04-25 22:57:38.473906	2021-04-25 22:57:38.473906
1378	gear	Cintas exprés, cuerda de 60m.	Route	638	2021-04-25 22:57:38.480032	2021-04-25 22:57:38.480032
1379	history	\N	Route	639	2021-04-25 22:57:38.546032	2021-04-25 22:57:38.546032
1380	gear	Cintas exprés, cuerda de 60m.	Route	639	2021-04-25 22:57:38.55123	2021-04-25 22:57:38.55123
1381	history	\N	Route	640	2021-04-25 22:57:38.634154	2021-04-25 22:57:38.634154
1382	gear	Cintas exprés, cuerda de 60m.	Route	640	2021-04-25 22:57:38.639228	2021-04-25 22:57:38.639228
1383	history	\N	Route	641	2021-04-25 22:57:38.852509	2021-04-25 22:57:38.852509
1384	gear	Cintas exprés, cuerda de 60m.	Route	641	2021-04-25 22:57:38.862873	2021-04-25 22:57:38.862873
1385	history	\N	Route	642	2021-04-25 22:57:38.922447	2021-04-25 22:57:38.922447
1386	gear	Cintas exprés, cuerda de 60m.	Route	642	2021-04-25 22:57:38.927776	2021-04-25 22:57:38.927776
1387	history	\N	Route	643	2021-04-25 22:57:39.004	2021-04-25 22:57:39.004
1388	gear	Cintas exprés, cuerda de 60m.	Route	643	2021-04-25 22:57:39.00989	2021-04-25 22:57:39.00989
1389	history	\N	Route	644	2021-04-25 22:57:39.079238	2021-04-25 22:57:39.079238
1390	gear	Cintas exprés, cuerda de 60m.	Route	644	2021-04-25 22:57:39.084608	2021-04-25 22:57:39.084608
1391	history	\N	Route	645	2021-04-25 22:57:39.14671	2021-04-25 22:57:39.14671
1392	gear	Cintas exprés, cuerda de 60m.	Route	645	2021-04-25 22:57:39.152564	2021-04-25 22:57:39.152564
1393	history	\N	Route	646	2021-04-25 22:57:39.262831	2021-04-25 22:57:39.262831
1394	gear	Cintas exprés, cuerda de 60m.	Route	646	2021-04-25 22:57:39.268167	2021-04-25 22:57:39.268167
1395	history	\N	Route	647	2021-04-25 22:57:39.333552	2021-04-25 22:57:39.333552
1396	gear	\N	Route	647	2021-04-25 22:57:39.337794	2021-04-25 22:57:39.337794
1397	history	\N	Route	648	2021-04-25 22:57:39.39374	2021-04-25 22:57:39.39374
1398	gear	Cintas exprés, cuerda de 60m.	Route	648	2021-04-25 22:57:39.399237	2021-04-25 22:57:39.399237
1399	history	\N	Route	649	2021-04-25 22:57:39.460704	2021-04-25 22:57:39.460704
1400	gear	Cintas exprés, cuerda de 60m.	Route	649	2021-04-25 22:57:39.466196	2021-04-25 22:57:39.466196
1401	history	\N	Route	650	2021-04-25 22:57:39.556965	2021-04-25 22:57:39.556965
1402	gear	Cintas exprés, cuerda de 60m.	Route	650	2021-04-25 22:57:39.570437	2021-04-25 22:57:39.570437
1403	history	\N	Route	651	2021-04-25 22:57:39.665024	2021-04-25 22:57:39.665024
1404	gear	\N	Route	651	2021-04-25 22:57:39.66922	2021-04-25 22:57:39.66922
1405	history	\N	Route	652	2021-04-25 22:57:39.738099	2021-04-25 22:57:39.738099
1406	gear	Cintas exprés, cuerda de 60m.	Route	652	2021-04-25 22:57:39.743719	2021-04-25 22:57:39.743719
1407	history	\N	Route	653	2021-04-25 22:57:39.801972	2021-04-25 22:57:39.801972
1408	gear	Cintas exprés, cuerda de 60m.	Route	653	2021-04-25 22:57:39.807277	2021-04-25 22:57:39.807277
1409	history	\N	Route	654	2021-04-25 22:57:39.887945	2021-04-25 22:57:39.887945
1410	gear	Cintas exprés, cuerda de 60m.	Route	654	2021-04-25 22:57:39.893905	2021-04-25 22:57:39.893905
1411	history	\N	Route	655	2021-04-25 22:57:39.954867	2021-04-25 22:57:39.954867
1412	gear	Cintas exprés, cuerda de 60m.	Route	655	2021-04-25 22:57:39.96154	2021-04-25 22:57:39.96154
1413	history	\N	Route	656	2021-04-25 22:57:40.026173	2021-04-25 22:57:40.026173
1414	gear	Cintas exprés, cuerda de 60m.	Route	656	2021-04-25 22:57:40.031641	2021-04-25 22:57:40.031641
1415	history	\N	Route	657	2021-04-25 22:57:40.089751	2021-04-25 22:57:40.089751
1416	gear	Cintas exprés, cuerda de 60m.	Route	657	2021-04-25 22:57:40.095063	2021-04-25 22:57:40.095063
1417	history	\N	Route	658	2021-04-25 22:57:40.154253	2021-04-25 22:57:40.154253
1418	gear	Cintas exprés, cuerda de 60m.	Route	658	2021-04-25 22:57:40.159636	2021-04-25 22:57:40.159636
1419	history	\N	Route	659	2021-04-25 22:57:40.237858	2021-04-25 22:57:40.237858
1420	gear	Cintas exprés, cuerda de 60m.	Route	659	2021-04-25 22:57:40.24333	2021-04-25 22:57:40.24333
1421	history	\N	Route	660	2021-04-25 22:57:40.32409	2021-04-25 22:57:40.32409
1422	gear	Cintas exprés, cuerda de 60m.	Route	660	2021-04-25 22:57:40.329931	2021-04-25 22:57:40.329931
1423	history	\N	Route	661	2021-04-25 22:57:40.398137	2021-04-25 22:57:40.398137
1424	gear	Cintas exprés, cuerda de 60m.	Route	661	2021-04-25 22:57:40.403856	2021-04-25 22:57:40.403856
1425	history	\N	Route	662	2021-04-25 22:57:40.478244	2021-04-25 22:57:40.478244
1426	gear	Cintas exprés, cuerda de 60m.	Route	662	2021-04-25 22:57:40.487129	2021-04-25 22:57:40.487129
1427	history	\N	Route	663	2021-04-25 22:57:40.553286	2021-04-25 22:57:40.553286
1428	gear	Cintas exprés, cuerda de 60m.	Route	663	2021-04-25 22:57:40.55877	2021-04-25 22:57:40.55877
1429	history	\N	Route	664	2021-04-25 22:57:40.652785	2021-04-25 22:57:40.652785
1430	gear	Cintas exprés, cuerda de 60m.	Route	664	2021-04-25 22:57:40.661324	2021-04-25 22:57:40.661324
1431	history	\N	Route	665	2021-04-25 22:57:40.767415	2021-04-25 22:57:40.767415
1432	gear	Cintas exprés, cuerda de 60m.	Route	665	2021-04-25 22:57:40.77392	2021-04-25 22:57:40.77392
1433	history	\N	Route	666	2021-04-25 22:57:40.840712	2021-04-25 22:57:40.840712
1434	gear	Cintas exprés, cuerda de 60m.	Route	666	2021-04-25 22:57:40.846284	2021-04-25 22:57:40.846284
1435	history	\N	Route	667	2021-04-25 22:57:40.937786	2021-04-25 22:57:40.937786
1436	gear	Cintas exprés, cuerda de 60m.	Route	667	2021-04-25 22:57:40.943655	2021-04-25 22:57:40.943655
1437	history	\N	Route	668	2021-04-25 22:57:41.003006	2021-04-25 22:57:41.003006
1438	gear	\N	Route	668	2021-04-25 22:57:41.007092	2021-04-25 22:57:41.007092
1439	history	\N	Route	669	2021-04-25 22:57:41.063114	2021-04-25 22:57:41.063114
1440	gear	\N	Route	669	2021-04-25 22:57:41.067269	2021-04-25 22:57:41.067269
1441	history	\N	Route	670	2021-04-25 22:57:41.129383	2021-04-25 22:57:41.129383
1442	gear	Cintas exprés, cuerda de 60m.	Route	670	2021-04-25 22:57:41.135316	2021-04-25 22:57:41.135316
1443	history	\N	Route	671	2021-04-25 22:57:41.201127	2021-04-25 22:57:41.201127
1444	gear	Cintas exprés, cuerda de 60m.	Route	671	2021-04-25 22:57:41.206561	2021-04-25 22:57:41.206561
1445	history	\N	Route	672	2021-04-25 22:57:41.287337	2021-04-25 22:57:41.287337
1446	gear	Cintas exprés, cuerda de 60m.	Route	672	2021-04-25 22:57:41.292869	2021-04-25 22:57:41.292869
1447	history	\N	Route	673	2021-04-25 22:57:41.354486	2021-04-25 22:57:41.354486
1448	gear	\N	Route	673	2021-04-25 22:57:41.358605	2021-04-25 22:57:41.358605
1449	history	\N	Route	674	2021-04-25 22:57:41.420287	2021-04-25 22:57:41.420287
1450	gear	Cintas exprés, cuerda de 60m.	Route	674	2021-04-25 22:57:41.425643	2021-04-25 22:57:41.425643
1451	history	\N	Route	675	2021-04-25 22:57:41.49638	2021-04-25 22:57:41.49638
1452	gear	Cintas exprés, cuerda de 60m.	Route	675	2021-04-25 22:57:41.503799	2021-04-25 22:57:41.503799
1453	history	\N	Route	676	2021-04-25 22:57:41.593668	2021-04-25 22:57:41.593668
1454	gear	Cintas exprés, cuerda de 60m.	Route	676	2021-04-25 22:57:41.603514	2021-04-25 22:57:41.603514
1455	history	\N	Route	677	2021-04-25 22:57:41.677911	2021-04-25 22:57:41.677911
1456	gear	Cintas exprés, cuerda de 60m.	Route	677	2021-04-25 22:57:41.689383	2021-04-25 22:57:41.689383
1457	history	\N	Route	678	2021-04-25 22:57:41.753714	2021-04-25 22:57:41.753714
1458	gear	Cintas exprés, cuerda de 60m.	Route	678	2021-04-25 22:57:41.760658	2021-04-25 22:57:41.760658
1459	history	\N	Route	679	2021-04-25 22:57:41.837768	2021-04-25 22:57:41.837768
1460	gear	Cintas exprés, cuerda de 60m.	Route	679	2021-04-25 22:57:41.843381	2021-04-25 22:57:41.843381
1461	history	\N	Route	680	2021-04-25 22:57:41.918176	2021-04-25 22:57:41.918176
1462	gear	Cintas exprés, cuerda de 60m.	Route	680	2021-04-25 22:57:41.923732	2021-04-25 22:57:41.923732
1463	history	\N	Route	681	2021-04-25 22:57:41.985524	2021-04-25 22:57:41.985524
1464	gear	Cintas exprés, cuerda de 60m.	Route	681	2021-04-25 22:57:41.990778	2021-04-25 22:57:41.990778
1465	history	\N	Route	682	2021-04-25 22:57:42.050371	2021-04-25 22:57:42.050371
1466	gear	Cintas exprés, cuerda de 60m.	Route	682	2021-04-25 22:57:42.055676	2021-04-25 22:57:42.055676
1467	history	\N	Route	683	2021-04-25 22:57:42.12528	2021-04-25 22:57:42.12528
1468	gear	Cintas exprés, cuerda de 60m.	Route	683	2021-04-25 22:57:42.133558	2021-04-25 22:57:42.133558
1469	history	\N	Route	684	2021-04-25 22:57:42.201803	2021-04-25 22:57:42.201803
1470	gear	Cintas exprés, cuerda de 60m.	Route	684	2021-04-25 22:57:42.210376	2021-04-25 22:57:42.210376
1471	history	\N	Route	685	2021-04-25 22:57:42.304692	2021-04-25 22:57:42.304692
1472	gear	Cintas exprés, cuerda de 60m.	Route	685	2021-04-25 22:57:42.310089	2021-04-25 22:57:42.310089
1473	history	\N	Route	686	2021-04-25 22:57:42.365457	2021-04-25 22:57:42.365457
1474	gear	Cintas exprés, cuerda de 60m.	Route	686	2021-04-25 22:57:42.370782	2021-04-25 22:57:42.370782
1475	history	\N	Route	687	2021-04-25 22:57:42.428394	2021-04-25 22:57:42.428394
1476	gear	Cintas exprés, cuerda de 60m.	Route	687	2021-04-25 22:57:42.434654	2021-04-25 22:57:42.434654
1477	history	\N	Route	688	2021-04-25 22:57:42.488513	2021-04-25 22:57:42.488513
1478	gear	Cintas exprés, cuerda de 60m.	Route	688	2021-04-25 22:57:42.493834	2021-04-25 22:57:42.493834
1479	history	\N	Route	689	2021-04-25 22:57:42.552386	2021-04-25 22:57:42.552386
1480	gear	Cintas exprés, cuerda de 60m.	Route	689	2021-04-25 22:57:42.557568	2021-04-25 22:57:42.557568
1481	history	\N	Route	690	2021-04-25 22:57:42.626682	2021-04-25 22:57:42.626682
1482	gear	Cintas exprés, cuerda de 60m.	Route	690	2021-04-25 22:57:42.63197	2021-04-25 22:57:42.63197
1483	history	\N	Route	691	2021-04-25 22:57:42.685912	2021-04-25 22:57:42.685912
1484	gear	Cintas exprés, cuerda de 60m.	Route	691	2021-04-25 22:57:42.691042	2021-04-25 22:57:42.691042
1485	history	\N	Route	692	2021-04-25 22:57:42.748644	2021-04-25 22:57:42.748644
1486	gear	Cintas exprés, cuerda de 60m.	Route	692	2021-04-25 22:57:42.760699	2021-04-25 22:57:42.760699
1487	history	\N	Route	693	2021-04-25 22:57:42.821815	2021-04-25 22:57:42.821815
1488	gear	Cintas exprés, cuerda de 60m.	Route	693	2021-04-25 22:57:42.82789	2021-04-25 22:57:42.82789
1489	history	\N	Route	694	2021-04-25 22:57:42.899729	2021-04-25 22:57:42.899729
1490	gear	Cintas exprés, cuerda de 60m.	Route	694	2021-04-25 22:57:42.905156	2021-04-25 22:57:42.905156
1491	history	\N	Route	695	2021-04-25 22:57:42.970728	2021-04-25 22:57:42.970728
1492	gear	Cintas exprés, cuerda de 60m.	Route	695	2021-04-25 22:57:42.976582	2021-04-25 22:57:42.976582
1493	history	\N	Route	696	2021-04-25 22:57:43.039478	2021-04-25 22:57:43.039478
1494	gear	Cintas exprés, cuerda de 60m.	Route	696	2021-04-25 22:57:43.045015	2021-04-25 22:57:43.045015
1495	history	\N	Route	697	2021-04-25 22:57:43.10843	2021-04-25 22:57:43.10843
1496	gear	Cintas exprés, cuerda de 60m.	Route	697	2021-04-25 22:57:43.114411	2021-04-25 22:57:43.114411
1497	history	\N	Route	698	2021-04-25 22:57:43.201168	2021-04-25 22:57:43.201168
1498	gear	Cintas exprés, cuerda de 60m.	Route	698	2021-04-25 22:57:43.208993	2021-04-25 22:57:43.208993
1499	history	\N	Route	699	2021-04-25 22:57:43.288862	2021-04-25 22:57:43.288862
1500	gear	Cintas exprés, cuerda de 60m.	Route	699	2021-04-25 22:57:43.293978	2021-04-25 22:57:43.293978
1501	history	\N	Route	700	2021-04-25 22:57:43.359535	2021-04-25 22:57:43.359535
1502	gear	Cintas exprés, cuerda de 60m.	Route	700	2021-04-25 22:57:43.364869	2021-04-25 22:57:43.364869
1503	history	\N	Route	701	2021-04-25 22:57:43.431274	2021-04-25 22:57:43.431274
1504	gear	Cintas exprés, cuerda de 60m.	Route	701	2021-04-25 22:57:43.436746	2021-04-25 22:57:43.436746
1505	history	\N	Route	702	2021-04-25 22:57:43.504427	2021-04-25 22:57:43.504427
1506	gear	Cintas exprés, cuerda de 60m.	Route	702	2021-04-25 22:57:43.50969	2021-04-25 22:57:43.50969
1507	history	\N	Route	703	2021-04-25 22:57:43.581085	2021-04-25 22:57:43.581085
1508	gear	Cintas exprés, cuerda de 60m.	Route	703	2021-04-25 22:57:43.590643	2021-04-25 22:57:43.590643
1509	history	\N	Route	704	2021-04-25 22:57:43.667275	2021-04-25 22:57:43.667275
1510	gear	Cintas exprés, cuerda de 60m.	Route	704	2021-04-25 22:57:43.672876	2021-04-25 22:57:43.672876
1511	history	\N	Route	705	2021-04-25 22:57:43.73168	2021-04-25 22:57:43.73168
1512	gear	Cintas exprés, cuerda de 60m.	Route	705	2021-04-25 22:57:43.736647	2021-04-25 22:57:43.736647
1513	history	\N	Route	706	2021-04-25 22:57:43.796255	2021-04-25 22:57:43.796255
1514	gear	Cintas exprés, cuerda de 60m.	Route	706	2021-04-25 22:57:43.801827	2021-04-25 22:57:43.801827
1515	history	\N	Route	707	2021-04-25 22:57:43.894468	2021-04-25 22:57:43.894468
1516	gear	Cintas exprés, cuerda de 60m.	Route	707	2021-04-25 22:57:43.902764	2021-04-25 22:57:43.902764
1517	history	\N	Route	708	2021-04-25 22:57:44.001326	2021-04-25 22:57:44.001326
1518	gear	Cintas exprés, cuerda de 60m.	Route	708	2021-04-25 22:57:44.009509	2021-04-25 22:57:44.009509
1519	history	\N	Route	709	2021-04-25 22:57:44.07735	2021-04-25 22:57:44.07735
1520	gear	Cintas exprés, cuerda de 60m.	Route	709	2021-04-25 22:57:44.083106	2021-04-25 22:57:44.083106
1521	history	\N	Route	710	2021-04-25 22:57:44.147004	2021-04-25 22:57:44.147004
1522	gear	Cintas exprés, cuerda de 60m.	Route	710	2021-04-25 22:57:44.154482	2021-04-25 22:57:44.154482
1523	history	\N	Route	711	2021-04-25 22:57:44.239747	2021-04-25 22:57:44.239747
1524	gear	Cintas exprés, cuerda de 60m.	Route	711	2021-04-25 22:57:44.245182	2021-04-25 22:57:44.245182
1525	history	\N	Route	712	2021-04-25 22:57:44.336919	2021-04-25 22:57:44.336919
1526	gear	Cintas exprés, cuerda de 60m.	Route	712	2021-04-25 22:57:44.342498	2021-04-25 22:57:44.342498
1527	history	\N	Route	713	2021-04-25 22:57:44.432012	2021-04-25 22:57:44.432012
1528	gear	Cintas exprés, cuerda de 60m.	Route	713	2021-04-25 22:57:44.437362	2021-04-25 22:57:44.437362
1529	history	\N	Route	714	2021-04-25 22:57:44.502079	2021-04-25 22:57:44.502079
1530	gear	Cintas exprés, cuerda de 60m.	Route	714	2021-04-25 22:57:44.507822	2021-04-25 22:57:44.507822
1531	history	\N	Route	715	2021-04-25 22:57:44.564434	2021-04-25 22:57:44.564434
1532	gear	Cintas exprés, cuerda de 60m.	Route	715	2021-04-25 22:57:44.571675	2021-04-25 22:57:44.571675
1533	history	\N	Route	716	2021-04-25 22:57:44.649335	2021-04-25 22:57:44.649335
1534	gear	Cintas exprés, cuerda de 60m.	Route	716	2021-04-25 22:57:44.657384	2021-04-25 22:57:44.657384
1535	history	\N	Route	717	2021-04-25 22:57:44.758644	2021-04-25 22:57:44.758644
1536	gear	Crash Pad	Route	717	2021-04-25 22:57:44.764906	2021-04-25 22:57:44.764906
1537	history	\N	Route	718	2021-04-25 22:57:44.846824	2021-04-25 22:57:44.846824
1538	gear	Cintas exprés, cuerda de 60m.	Route	718	2021-04-25 22:57:44.854535	2021-04-25 22:57:44.854535
1539	history	\N	Route	719	2021-04-25 22:57:44.916119	2021-04-25 22:57:44.916119
1540	gear	Cintas exprés, cuerda de 60m.	Route	719	2021-04-25 22:57:44.922363	2021-04-25 22:57:44.922363
1541	history	\N	Route	720	2021-04-25 22:57:44.979425	2021-04-25 22:57:44.979425
1542	gear	Cintas exprés, cuerda de 60m.	Route	720	2021-04-25 22:57:44.985097	2021-04-25 22:57:44.985097
1543	history	\N	Route	721	2021-04-25 22:57:45.064092	2021-04-25 22:57:45.064092
1544	gear	Cintas exprés, cuerda de 60m.	Route	721	2021-04-25 22:57:45.070915	2021-04-25 22:57:45.070915
1545	history	\N	Route	722	2021-04-25 22:57:45.181773	2021-04-25 22:57:45.181773
1546	gear	Cintas exprés, cuerda de 60m.	Route	722	2021-04-25 22:57:45.190914	2021-04-25 22:57:45.190914
1547	history	\N	Route	723	2021-04-25 22:57:45.254271	2021-04-25 22:57:45.254271
1548	gear	Cintas exprés, cuerda de 60m.	Route	723	2021-04-25 22:57:45.260488	2021-04-25 22:57:45.260488
1549	history	\N	Route	724	2021-04-25 22:57:45.342158	2021-04-25 22:57:45.342158
1550	gear	Cintas exprés, cuerda de 60m.	Route	724	2021-04-25 22:57:45.347378	2021-04-25 22:57:45.347378
1551	history	\N	Route	725	2021-04-25 22:57:45.467244	2021-04-25 22:57:45.467244
1552	gear	Cintas exprés, cuerda de 60m.	Route	725	2021-04-25 22:57:45.47345	2021-04-25 22:57:45.47345
1553	history	\N	Route	726	2021-04-25 22:57:45.535896	2021-04-25 22:57:45.535896
1554	gear	Cintas exprés, cuerda de 60m.	Route	726	2021-04-25 22:57:45.541471	2021-04-25 22:57:45.541471
1555	history	\N	Route	727	2021-04-25 22:57:45.611315	2021-04-25 22:57:45.611315
1556	gear	Cintas exprés, cuerda de 60m.	Route	727	2021-04-25 22:57:45.616705	2021-04-25 22:57:45.616705
1557	history	\N	Route	728	2021-04-25 22:57:45.68996	2021-04-25 22:57:45.68996
1558	gear	Cintas exprés, cuerda de 60m.	Route	728	2021-04-25 22:57:45.696288	2021-04-25 22:57:45.696288
1559	history	\N	Route	729	2021-04-25 22:57:45.779814	2021-04-25 22:57:45.779814
1560	gear	Cintas exprés, cuerda de 60m.	Route	729	2021-04-25 22:57:45.791246	2021-04-25 22:57:45.791246
1561	history	\N	Route	730	2021-04-25 22:57:45.893825	2021-04-25 22:57:45.893825
1562	gear	Cintas exprés, cuerda de 60m.	Route	730	2021-04-25 22:57:45.902904	2021-04-25 22:57:45.902904
1563	history	\N	Route	731	2021-04-25 22:57:45.99848	2021-04-25 22:57:45.99848
1564	gear	\N	Route	731	2021-04-25 22:57:46.003988	2021-04-25 22:57:46.003988
1565	history	\N	Route	732	2021-04-25 22:57:46.079529	2021-04-25 22:57:46.079529
1566	gear	Cintas exprés, cuerda de 60m.	Route	732	2021-04-25 22:57:46.086045	2021-04-25 22:57:46.086045
1567	history	\N	Route	733	2021-04-25 22:57:46.159187	2021-04-25 22:57:46.159187
1568	gear	Cintas exprés, cuerda de 60m.	Route	733	2021-04-25 22:57:46.164654	2021-04-25 22:57:46.164654
1569	history	\N	Route	734	2021-04-25 22:57:46.246797	2021-04-25 22:57:46.246797
1570	gear	Cintas exprés, cuerda de 60m.	Route	734	2021-04-25 22:57:46.251712	2021-04-25 22:57:46.251712
1571	history	\N	Route	735	2021-04-25 22:57:46.320538	2021-04-25 22:57:46.320538
1572	gear	\N	Route	735	2021-04-25 22:57:46.325861	2021-04-25 22:57:46.325861
1573	history	\N	Route	736	2021-04-25 22:57:46.392014	2021-04-25 22:57:46.392014
1574	gear	\N	Route	736	2021-04-25 22:57:46.396395	2021-04-25 22:57:46.396395
1575	history	\N	Route	737	2021-04-25 22:57:46.456485	2021-04-25 22:57:46.456485
1576	gear	\N	Route	737	2021-04-25 22:57:46.464111	2021-04-25 22:57:46.464111
1577	history	\N	Route	738	2021-04-25 22:57:46.533846	2021-04-25 22:57:46.533846
1578	gear	Cintas exprés, cuerda de 60m.	Route	738	2021-04-25 22:57:46.539953	2021-04-25 22:57:46.539953
1579	history	\N	Route	739	2021-04-25 22:57:46.622557	2021-04-25 22:57:46.622557
1580	gear	\N	Route	739	2021-04-25 22:57:46.626656	2021-04-25 22:57:46.626656
1581	history	\N	Route	740	2021-04-25 22:57:46.66597	2021-04-25 22:57:46.66597
1582	gear	Cintas exprés, cuerda de 60m.	Route	740	2021-04-25 22:57:46.671067	2021-04-25 22:57:46.671067
1583	history	\N	Route	741	2021-04-25 22:57:46.732598	2021-04-25 22:57:46.732598
1584	gear	Cintas exprés, cuerda de 60m.	Route	741	2021-04-25 22:57:46.737881	2021-04-25 22:57:46.737881
1585	history	\N	Route	742	2021-04-25 22:57:46.809685	2021-04-25 22:57:46.809685
1586	gear	\N	Route	742	2021-04-25 22:57:46.814013	2021-04-25 22:57:46.814013
1587	history	\N	Route	743	2021-04-25 22:57:46.890023	2021-04-25 22:57:46.890023
1588	gear	\N	Route	743	2021-04-25 22:57:46.894113	2021-04-25 22:57:46.894113
1589	history	\N	Route	744	2021-04-25 22:57:46.951442	2021-04-25 22:57:46.951442
1590	gear	Cintas exprés, cuerda de 60m.	Route	744	2021-04-25 22:57:46.956884	2021-04-25 22:57:46.956884
1591	history	\N	Route	745	2021-04-25 22:57:47.029828	2021-04-25 22:57:47.029828
1592	gear	Cintas exprés, cuerda de 60m.	Route	745	2021-04-25 22:57:47.038482	2021-04-25 22:57:47.038482
1593	history	\N	Route	746	2021-04-25 22:57:47.110329	2021-04-25 22:57:47.110329
1594	gear	Cintas exprés, cuerda de 60m.	Route	746	2021-04-25 22:57:47.11579	2021-04-25 22:57:47.11579
1595	history	\N	Route	747	2021-04-25 22:57:47.181799	2021-04-25 22:57:47.181799
1596	gear	Cintas exprés, cuerda de 60m.	Route	747	2021-04-25 22:57:47.188179	2021-04-25 22:57:47.188179
1597	history	\N	Route	748	2021-04-25 22:57:47.268183	2021-04-25 22:57:47.268183
1598	gear	Cintas exprés, cuerda de 60m.	Route	748	2021-04-25 22:57:47.273727	2021-04-25 22:57:47.273727
1599	history	\N	Route	749	2021-04-25 22:57:47.334244	2021-04-25 22:57:47.334244
1600	gear	Cintas exprés, cuerda de 60m.	Route	749	2021-04-25 22:57:47.351154	2021-04-25 22:57:47.351154
1601	history	\N	Route	750	2021-04-25 22:57:47.415395	2021-04-25 22:57:47.415395
1602	gear	Cintas exprés, cuerda de 60m.	Route	750	2021-04-25 22:57:47.42354	2021-04-25 22:57:47.42354
1603	history	\N	Route	751	2021-04-25 22:57:47.492971	2021-04-25 22:57:47.492971
1604	gear	Cintas exprés, cuerda de 60m.	Route	751	2021-04-25 22:57:47.499244	2021-04-25 22:57:47.499244
1605	history	\N	Route	752	2021-04-25 22:57:47.562566	2021-04-25 22:57:47.562566
1606	gear	Cintas exprés, cuerda de 60m.	Route	752	2021-04-25 22:57:47.567881	2021-04-25 22:57:47.567881
1607	history	\N	Route	753	2021-04-25 22:57:47.661553	2021-04-25 22:57:47.661553
1608	gear	Cintas exprés, cuerda de 60m.	Route	753	2021-04-25 22:57:47.666996	2021-04-25 22:57:47.666996
1609	history	\N	Route	754	2021-04-25 22:57:47.7334	2021-04-25 22:57:47.7334
1610	gear	Cintas exprés, cuerda de 60m.	Route	754	2021-04-25 22:57:47.738613	2021-04-25 22:57:47.738613
1611	history	\N	Route	755	2021-04-25 22:57:47.820503	2021-04-25 22:57:47.820503
1612	gear	Cintas exprés, cuerda de 60m.	Route	755	2021-04-25 22:57:47.830154	2021-04-25 22:57:47.830154
1613	history	\N	Route	756	2021-04-25 22:57:47.905375	2021-04-25 22:57:47.905375
1614	gear	Cintas exprés, cuerda de 60m.	Route	756	2021-04-25 22:57:47.910559	2021-04-25 22:57:47.910559
1615	history	\N	Route	757	2021-04-25 22:57:47.977145	2021-04-25 22:57:47.977145
1616	gear	Cintas exprés, cuerda de 60m.	Route	757	2021-04-25 22:57:47.982529	2021-04-25 22:57:47.982529
1617	history	\N	Route	758	2021-04-25 22:57:48.069164	2021-04-25 22:57:48.069164
1618	gear	Cintas exprés, cuerda de 60m.	Route	758	2021-04-25 22:57:48.074538	2021-04-25 22:57:48.074538
1619	history	\N	Route	759	2021-04-25 22:57:48.155406	2021-04-25 22:57:48.155406
1620	gear	Cintas exprés, cuerda de 60m.	Route	759	2021-04-25 22:57:48.160891	2021-04-25 22:57:48.160891
1621	history	\N	Route	760	2021-04-25 22:57:48.362487	2021-04-25 22:57:48.362487
1622	gear	Cintas exprés, cuerda de 60m.	Route	760	2021-04-25 22:57:48.367736	2021-04-25 22:57:48.367736
1623	history	\N	Route	761	2021-04-25 22:57:48.432922	2021-04-25 22:57:48.432922
1624	gear	Cintas exprés, cuerda de 60m.	Route	761	2021-04-25 22:57:48.439269	2021-04-25 22:57:48.439269
1625	history	\N	Route	762	2021-04-25 22:57:48.529896	2021-04-25 22:57:48.529896
1626	gear	Cintas exprés, cuerda de 60m.	Route	762	2021-04-25 22:57:48.539454	2021-04-25 22:57:48.539454
1627	history	\N	Route	763	2021-04-25 22:57:48.61068	2021-04-25 22:57:48.61068
1628	gear	Cintas exprés, cuerda de 60m.	Route	763	2021-04-25 22:57:48.615983	2021-04-25 22:57:48.615983
1629	history	\N	Route	764	2021-04-25 22:57:48.687955	2021-04-25 22:57:48.687955
1630	gear	Cintas exprés, cuerda de 60m.	Route	764	2021-04-25 22:57:48.694489	2021-04-25 22:57:48.694489
1631	history	\N	Route	765	2021-04-25 22:57:48.816267	2021-04-25 22:57:48.816267
1632	gear	Cintas exprés, cuerda de 60m.	Route	765	2021-04-25 22:57:48.834453	2021-04-25 22:57:48.834453
1633	history	\N	Route	766	2021-04-25 22:57:48.921921	2021-04-25 22:57:48.921921
1634	gear	Cintas exprés, cuerda de 60m.	Route	766	2021-04-25 22:57:48.931228	2021-04-25 22:57:48.931228
1635	history	\N	Route	767	2021-04-25 22:57:49.009803	2021-04-25 22:57:49.009803
1636	gear	Cintas exprés, cuerda de 60m.	Route	767	2021-04-25 22:57:49.018804	2021-04-25 22:57:49.018804
1637	history	\N	Route	768	2021-04-25 22:57:49.101888	2021-04-25 22:57:49.101888
1638	gear	Cintas exprés, cuerda de 60m.	Route	768	2021-04-25 22:57:49.107822	2021-04-25 22:57:49.107822
1639	history	\N	Route	769	2021-04-25 22:57:49.201631	2021-04-25 22:57:49.201631
1640	gear	Cintas exprés, cuerda de 60m.	Route	769	2021-04-25 22:57:49.2149	2021-04-25 22:57:49.2149
1641	history	\N	Route	770	2021-04-25 22:57:49.329868	2021-04-25 22:57:49.329868
1642	gear	Cintas exprés, cuerda de 60m.	Route	770	2021-04-25 22:57:49.335805	2021-04-25 22:57:49.335805
1643	history	\N	Route	771	2021-04-25 22:57:49.393129	2021-04-25 22:57:49.393129
1644	gear	Cintas exprés, cuerda de 60m.	Route	771	2021-04-25 22:57:49.398618	2021-04-25 22:57:49.398618
1645	history	\N	Route	772	2021-04-25 22:57:49.479597	2021-04-25 22:57:49.479597
1646	gear	Cintas exprés, cuerda de 60m.	Route	772	2021-04-25 22:57:49.485093	2021-04-25 22:57:49.485093
1647	history	\N	Route	773	2021-04-25 22:57:49.549512	2021-04-25 22:57:49.549512
1648	gear	Cintas exprés, cuerda de 60m.	Route	773	2021-04-25 22:57:49.55488	2021-04-25 22:57:49.55488
1649	history	\N	Route	774	2021-04-25 22:57:49.62408	2021-04-25 22:57:49.62408
1650	gear	Cintas exprés, cuerda de 60m.	Route	774	2021-04-25 22:57:49.629668	2021-04-25 22:57:49.629668
1651	history	\N	Route	775	2021-04-25 22:57:49.698568	2021-04-25 22:57:49.698568
1652	gear	Cintas exprés, cuerda de 60m.	Route	775	2021-04-25 22:57:49.707093	2021-04-25 22:57:49.707093
1653	history	\N	Route	776	2021-04-25 22:57:49.808817	2021-04-25 22:57:49.808817
1654	gear	Cintas exprés, cuerda de 60m.	Route	776	2021-04-25 22:57:49.813582	2021-04-25 22:57:49.813582
1655	history	\N	Route	777	2021-04-25 22:57:49.895437	2021-04-25 22:57:49.895437
1656	gear	Cintas exprés, cuerda de 60m.	Route	777	2021-04-25 22:57:49.903034	2021-04-25 22:57:49.903034
1657	history	\N	Route	778	2021-04-25 22:57:49.958501	2021-04-25 22:57:49.958501
1658	gear	Cintas exprés, cuerda de 60m.	Route	778	2021-04-25 22:57:49.963537	2021-04-25 22:57:49.963537
1659	history	\N	Route	779	2021-04-25 22:57:50.01895	2021-04-25 22:57:50.01895
1660	gear	Cintas exprés, cuerda de 60m.	Route	779	2021-04-25 22:57:50.024117	2021-04-25 22:57:50.024117
1661	history	\N	Route	780	2021-04-25 22:57:50.088603	2021-04-25 22:57:50.088603
1662	gear	\N	Route	780	2021-04-25 22:57:50.09279	2021-04-25 22:57:50.09279
1663	history	\N	Route	781	2021-04-25 22:57:50.178233	2021-04-25 22:57:50.178233
1664	gear	Cintas exprés, cuerda de 60m.	Route	781	2021-04-25 22:57:50.191265	2021-04-25 22:57:50.191265
1665	history	\N	Route	782	2021-04-25 22:57:50.309785	2021-04-25 22:57:50.309785
1666	gear	Cintas exprés, cuerda de 60m.	Route	782	2021-04-25 22:57:50.318949	2021-04-25 22:57:50.318949
1667	history	\N	Route	783	2021-04-25 22:57:50.391201	2021-04-25 22:57:50.391201
1668	gear	Cintas exprés, cuerda de 60m.	Route	783	2021-04-25 22:57:50.396527	2021-04-25 22:57:50.396527
1669	history	\N	Route	784	2021-04-25 22:57:50.459185	2021-04-25 22:57:50.459185
1670	gear	\N	Route	784	2021-04-25 22:57:50.463468	2021-04-25 22:57:50.463468
1671	history	\N	Route	785	2021-04-25 22:57:50.56492	2021-04-25 22:57:50.56492
1672	gear	\N	Route	785	2021-04-25 22:57:50.569937	2021-04-25 22:57:50.569937
1673	history	\N	Route	786	2021-04-25 22:57:50.647453	2021-04-25 22:57:50.647453
1674	gear	Cintas exprés, cuerda de 60m.	Route	786	2021-04-25 22:57:50.652946	2021-04-25 22:57:50.652946
1675	history	\N	Route	787	2021-04-25 22:57:50.709941	2021-04-25 22:57:50.709941
1676	gear	\N	Route	787	2021-04-25 22:57:50.713978	2021-04-25 22:57:50.713978
1677	history	\N	Route	788	2021-04-25 22:57:50.785781	2021-04-25 22:57:50.785781
1678	gear	Cintas exprés, cuerda de 60m.	Route	788	2021-04-25 22:57:50.791849	2021-04-25 22:57:50.791849
1679	history	\N	Route	789	2021-04-25 22:57:50.858589	2021-04-25 22:57:50.858589
1680	gear	\N	Route	789	2021-04-25 22:57:50.86308	2021-04-25 22:57:50.86308
1681	history	\N	Route	790	2021-04-25 22:57:50.921128	2021-04-25 22:57:50.921128
1682	gear	\N	Route	790	2021-04-25 22:57:50.925448	2021-04-25 22:57:50.925448
1683	history	\N	Route	791	2021-04-25 22:57:50.992398	2021-04-25 22:57:50.992398
1684	gear	Cintas exprés, cuerda de 60m.	Route	791	2021-04-25 22:57:50.997424	2021-04-25 22:57:50.997424
1685	history	\N	Route	792	2021-04-25 22:57:51.085883	2021-04-25 22:57:51.085883
1686	gear	Cintas exprés, cuerda de 60m.	Route	792	2021-04-25 22:57:51.091185	2021-04-25 22:57:51.091185
1687	history	\N	Route	793	2021-04-25 22:57:51.158707	2021-04-25 22:57:51.158707
1688	gear	Cintas exprés, cuerda de 60m.	Route	793	2021-04-25 22:57:51.165049	2021-04-25 22:57:51.165049
1689	history	\N	Route	794	2021-04-25 22:57:51.258249	2021-04-25 22:57:51.258249
1690	gear	Cintas exprés, cuerda de 60m.	Route	794	2021-04-25 22:57:51.263745	2021-04-25 22:57:51.263745
1691	history	\N	Route	795	2021-04-25 22:57:51.332283	2021-04-25 22:57:51.332283
1692	gear	Cintas exprés, cuerda de 60m.	Route	795	2021-04-25 22:57:51.337552	2021-04-25 22:57:51.337552
1693	history	\N	Route	796	2021-04-25 22:57:51.391395	2021-04-25 22:57:51.391395
1694	gear	Cintas exprés, cuerda de 60m.	Route	796	2021-04-25 22:57:51.400338	2021-04-25 22:57:51.400338
1695	history	\N	Route	797	2021-04-25 22:57:51.45593	2021-04-25 22:57:51.45593
1696	gear	Cintas exprés, cuerda de 60m.	Route	797	2021-04-25 22:57:51.461486	2021-04-25 22:57:51.461486
1697	history	\N	Route	798	2021-04-25 22:57:51.516466	2021-04-25 22:57:51.516466
1698	gear	Cintas exprés, cuerda de 60m.	Route	798	2021-04-25 22:57:51.521871	2021-04-25 22:57:51.521871
1699	history	\N	Route	799	2021-04-25 22:57:51.576524	2021-04-25 22:57:51.576524
1700	gear	Cintas exprés, cuerda de 60m.	Route	799	2021-04-25 22:57:51.582162	2021-04-25 22:57:51.582162
1701	history	\N	Route	800	2021-04-25 22:57:51.637878	2021-04-25 22:57:51.637878
1702	gear	Cintas exprés, cuerda de 60m.	Route	800	2021-04-25 22:57:51.643639	2021-04-25 22:57:51.643639
1703	history	\N	Route	801	2021-04-25 22:57:51.758463	2021-04-25 22:57:51.758463
1704	gear	\N	Route	801	2021-04-25 22:57:51.764776	2021-04-25 22:57:51.764776
1705	history	\N	Route	802	2021-04-25 22:57:51.856717	2021-04-25 22:57:51.856717
1706	gear	\N	Route	802	2021-04-25 22:57:51.861757	2021-04-25 22:57:51.861757
1707	history	\N	Route	803	2021-04-25 22:57:51.946308	2021-04-25 22:57:51.946308
1708	gear	\N	Route	803	2021-04-25 22:57:51.950479	2021-04-25 22:57:51.950479
1709	history	\N	Route	804	2021-04-25 22:57:52.006136	2021-04-25 22:57:52.006136
1710	gear	\N	Route	804	2021-04-25 22:57:52.010434	2021-04-25 22:57:52.010434
1711	history	\N	Route	805	2021-04-25 22:57:52.065089	2021-04-25 22:57:52.065089
1712	gear	\N	Route	805	2021-04-25 22:57:52.069297	2021-04-25 22:57:52.069297
1713	history	\N	Route	806	2021-04-25 22:57:52.128875	2021-04-25 22:57:52.128875
1714	gear	Cintas exprés, cuerda de 60m.	Route	806	2021-04-25 22:57:52.134209	2021-04-25 22:57:52.134209
1715	history	\N	Route	807	2021-04-25 22:57:52.245838	2021-04-25 22:57:52.245838
1716	gear	Cintas exprés, cuerda de 60m.	Route	807	2021-04-25 22:57:52.25152	2021-04-25 22:57:52.25152
1717	history	\N	Route	808	2021-04-25 22:57:52.317966	2021-04-25 22:57:52.317966
1718	gear	Cintas exprés, cuerda de 60m.	Route	808	2021-04-25 22:57:52.323553	2021-04-25 22:57:52.323553
1719	history	\N	Route	809	2021-04-25 22:57:52.386064	2021-04-25 22:57:52.386064
1720	gear	Cintas exprés, cuerda de 60m.	Route	809	2021-04-25 22:57:52.392043	2021-04-25 22:57:52.392043
1721	history	\N	Route	810	2021-04-25 22:57:52.470121	2021-04-25 22:57:52.470121
1722	gear	\N	Route	810	2021-04-25 22:57:52.477781	2021-04-25 22:57:52.477781
1723	history	\N	Route	811	2021-04-25 22:57:52.544309	2021-04-25 22:57:52.544309
1724	gear	\N	Route	811	2021-04-25 22:57:52.548412	2021-04-25 22:57:52.548412
1725	history	\N	Route	812	2021-04-25 22:57:52.622199	2021-04-25 22:57:52.622199
1726	gear	\N	Route	812	2021-04-25 22:57:52.630922	2021-04-25 22:57:52.630922
1727	history	\N	Route	813	2021-04-25 22:57:52.685483	2021-04-25 22:57:52.685483
1728	gear	\N	Route	813	2021-04-25 22:57:52.69009	2021-04-25 22:57:52.69009
1729	history	\N	Route	814	2021-04-25 22:57:52.745096	2021-04-25 22:57:52.745096
1730	gear	\N	Route	814	2021-04-25 22:57:52.74998	2021-04-25 22:57:52.74998
1731	history	\N	Route	815	2021-04-25 22:57:52.82235	2021-04-25 22:57:52.82235
1732	gear	\N	Route	815	2021-04-25 22:57:52.826768	2021-04-25 22:57:52.826768
1733	history	\N	Route	816	2021-04-25 22:57:52.917149	2021-04-25 22:57:52.917149
1734	gear	\N	Route	816	2021-04-25 22:57:52.921142	2021-04-25 22:57:52.921142
1735	history	\N	Route	817	2021-04-25 22:57:52.997662	2021-04-25 22:57:52.997662
1736	gear	\N	Route	817	2021-04-25 22:57:53.001766	2021-04-25 22:57:53.001766
1737	history	\N	Route	818	2021-04-25 22:57:53.070925	2021-04-25 22:57:53.070925
1738	gear	\N	Route	818	2021-04-25 22:57:53.074781	2021-04-25 22:57:53.074781
1739	history	\N	Route	819	2021-04-25 22:57:53.166357	2021-04-25 22:57:53.166357
1740	gear	Cintas exprés, cuerda de 60m.	Route	819	2021-04-25 22:57:53.172068	2021-04-25 22:57:53.172068
1741	history	\N	Route	820	2021-04-25 22:57:53.252847	2021-04-25 22:57:53.252847
1742	gear	Cintas exprés, cuerda de 60m.	Route	820	2021-04-25 22:57:53.259277	2021-04-25 22:57:53.259277
1743	history	\N	Route	821	2021-04-25 22:57:53.320914	2021-04-25 22:57:53.320914
1744	gear	Cintas exprés, cuerda de 60m.	Route	821	2021-04-25 22:57:53.327522	2021-04-25 22:57:53.327522
1745	history	\N	Route	822	2021-04-25 22:57:53.38994	2021-04-25 22:57:53.38994
1746	gear	Cintas exprés, cuerda de 60m.	Route	822	2021-04-25 22:57:53.395643	2021-04-25 22:57:53.395643
1747	history	\N	Route	823	2021-04-25 22:57:53.458648	2021-04-25 22:57:53.458648
1748	gear	Cintas exprés, cuerda de 60m.	Route	823	2021-04-25 22:57:53.464745	2021-04-25 22:57:53.464745
1749	history	\N	Route	824	2021-04-25 22:57:53.522028	2021-04-25 22:57:53.522028
1750	gear	Cintas exprés, cuerda de 60m.	Route	824	2021-04-25 22:57:53.52972	2021-04-25 22:57:53.52972
1751	history	\N	Route	825	2021-04-25 22:57:53.625928	2021-04-25 22:57:53.625928
1752	gear	Cintas exprés, cuerda de 60m.	Route	825	2021-04-25 22:57:53.631498	2021-04-25 22:57:53.631498
1753	history	\N	Route	826	2021-04-25 22:57:53.694403	2021-04-25 22:57:53.694403
1754	gear	Cintas exprés, cuerda de 60m.	Route	826	2021-04-25 22:57:53.699671	2021-04-25 22:57:53.699671
1755	history	\N	Route	827	2021-04-25 22:57:53.763043	2021-04-25 22:57:53.763043
1756	gear	Cintas exprés, cuerda de 60m.	Route	827	2021-04-25 22:57:53.775537	2021-04-25 22:57:53.775537
1757	history	\N	Route	828	2021-04-25 22:57:53.864741	2021-04-25 22:57:53.864741
1758	gear	Cintas exprés, cuerda de 60m.	Route	828	2021-04-25 22:57:53.872901	2021-04-25 22:57:53.872901
1759	history	\N	Route	829	2021-04-25 22:57:53.943701	2021-04-25 22:57:53.943701
1760	gear	Cintas exprés, cuerda de 60m.	Route	829	2021-04-25 22:57:53.94997	2021-04-25 22:57:53.94997
1761	history	\N	Route	830	2021-04-25 22:57:54.011663	2021-04-25 22:57:54.011663
1762	gear	\N	Route	830	2021-04-25 22:57:54.015892	2021-04-25 22:57:54.015892
1763	history	\N	Route	831	2021-04-25 22:57:54.087394	2021-04-25 22:57:54.087394
1764	gear	Cintas exprés, cuerda de 60m.	Route	831	2021-04-25 22:57:54.093348	2021-04-25 22:57:54.093348
1765	history	\N	Route	832	2021-04-25 22:57:54.165373	2021-04-25 22:57:54.165373
1766	gear	\N	Route	832	2021-04-25 22:57:54.169325	2021-04-25 22:57:54.169325
1767	history	\N	Route	833	2021-04-25 22:57:54.242586	2021-04-25 22:57:54.242586
1768	gear	\N	Route	833	2021-04-25 22:57:54.24665	2021-04-25 22:57:54.24665
1769	history	\N	Route	834	2021-04-25 22:57:54.302585	2021-04-25 22:57:54.302585
1770	gear	\N	Route	834	2021-04-25 22:57:54.306927	2021-04-25 22:57:54.306927
1771	history	\N	Route	835	2021-04-25 22:57:54.367348	2021-04-25 22:57:54.367348
1772	gear	\N	Route	835	2021-04-25 22:57:54.371596	2021-04-25 22:57:54.371596
1773	history	\N	Route	836	2021-04-25 22:57:54.448278	2021-04-25 22:57:54.448278
1774	gear	\N	Route	836	2021-04-25 22:57:54.452565	2021-04-25 22:57:54.452565
1775	history	\N	Route	837	2021-04-25 22:57:54.533293	2021-04-25 22:57:54.533293
1776	gear	\N	Route	837	2021-04-25 22:57:54.537955	2021-04-25 22:57:54.537955
1777	history	\N	Route	838	2021-04-25 22:57:54.578688	2021-04-25 22:57:54.578688
1778	gear	\N	Route	838	2021-04-25 22:57:54.583638	2021-04-25 22:57:54.583638
1779	history	\N	Route	839	2021-04-25 22:57:54.634834	2021-04-25 22:57:54.634834
1780	gear	\N	Route	839	2021-04-25 22:57:54.657186	2021-04-25 22:57:54.657186
1781	history	\N	Route	840	2021-04-25 22:57:54.699545	2021-04-25 22:57:54.699545
1782	gear	\N	Route	840	2021-04-25 22:57:54.70367	2021-04-25 22:57:54.70367
1783	history	\N	Route	841	2021-04-25 22:57:54.744259	2021-04-25 22:57:54.744259
1784	gear	\N	Route	841	2021-04-25 22:57:54.7481	2021-04-25 22:57:54.7481
1785	history	\N	Route	842	2021-04-25 22:57:54.799584	2021-04-25 22:57:54.799584
1786	gear	\N	Route	842	2021-04-25 22:57:54.805433	2021-04-25 22:57:54.805433
1787	history	\N	Route	843	2021-04-25 22:57:54.8539	2021-04-25 22:57:54.8539
1788	gear	\N	Route	843	2021-04-25 22:57:54.85989	2021-04-25 22:57:54.85989
1789	history	\N	Route	844	2021-04-25 22:57:54.916517	2021-04-25 22:57:54.916517
1790	gear	\N	Route	844	2021-04-25 22:57:54.921976	2021-04-25 22:57:54.921976
1791	history	\N	Route	845	2021-04-25 22:57:54.958492	2021-04-25 22:57:54.958492
1792	gear	\N	Route	845	2021-04-25 22:57:54.962577	2021-04-25 22:57:54.962577
1793	history	\N	Route	846	2021-04-25 22:57:55.024017	2021-04-25 22:57:55.024017
1794	gear	\N	Route	846	2021-04-25 22:57:55.028263	2021-04-25 22:57:55.028263
1795	history	\N	Route	847	2021-04-25 22:57:55.072405	2021-04-25 22:57:55.072405
1796	gear	\N	Route	847	2021-04-25 22:57:55.076726	2021-04-25 22:57:55.076726
1797	history	\N	Route	848	2021-04-25 22:57:55.120683	2021-04-25 22:57:55.120683
1798	gear	\N	Route	848	2021-04-25 22:57:55.125979	2021-04-25 22:57:55.125979
1799	history	\N	Route	849	2021-04-25 22:57:55.170548	2021-04-25 22:57:55.170548
1800	gear	Cintas exprés, cuerda de 60m.	Route	849	2021-04-25 22:57:55.177154	2021-04-25 22:57:55.177154
1801	history	\N	Route	850	2021-04-25 22:57:55.246673	2021-04-25 22:57:55.246673
1802	gear	Cintas exprés, cuerda de 60m.	Route	850	2021-04-25 22:57:55.266809	2021-04-25 22:57:55.266809
1803	history	\N	Route	851	2021-04-25 22:57:55.329934	2021-04-25 22:57:55.329934
1804	gear	Cintas exprés, cuerda de 60m.	Route	851	2021-04-25 22:57:55.335783	2021-04-25 22:57:55.335783
1805	history	\N	Route	852	2021-04-25 22:57:55.42717	2021-04-25 22:57:55.42717
1806	gear	Cintas exprés, cuerda de 60m.	Route	852	2021-04-25 22:57:55.432465	2021-04-25 22:57:55.432465
1807	history	\N	Route	853	2021-04-25 22:57:55.496921	2021-04-25 22:57:55.496921
1808	gear	Cintas exprés, cuerda de 60m.	Route	853	2021-04-25 22:57:55.502352	2021-04-25 22:57:55.502352
1809	history	\N	Route	854	2021-04-25 22:57:55.558035	2021-04-25 22:57:55.558035
1810	gear	Cintas exprés, cuerda de 60m.	Route	854	2021-04-25 22:57:55.563121	2021-04-25 22:57:55.563121
1811	history	\N	Route	855	2021-04-25 22:57:55.651291	2021-04-25 22:57:55.651291
1812	gear	Cintas exprés, cuerda de 60m.	Route	855	2021-04-25 22:57:55.656439	2021-04-25 22:57:55.656439
1813	history	\N	Route	856	2021-04-25 22:57:55.732907	2021-04-25 22:57:55.732907
1814	gear	Cintas exprés, cuerda de 60m.	Route	856	2021-04-25 22:57:55.738524	2021-04-25 22:57:55.738524
1815	history	\N	Route	857	2021-04-25 22:57:55.79679	2021-04-25 22:57:55.79679
1816	gear	Cintas exprés, cuerda de 60m.	Route	857	2021-04-25 22:57:55.802281	2021-04-25 22:57:55.802281
1817	history	\N	Route	858	2021-04-25 22:57:55.884337	2021-04-25 22:57:55.884337
1818	gear	Cintas exprés, cuerda de 60m.	Route	858	2021-04-25 22:57:55.889718	2021-04-25 22:57:55.889718
1819	history	\N	Route	859	2021-04-25 22:57:55.964657	2021-04-25 22:57:55.964657
1820	gear	Cintas exprés, cuerda de 60m.	Route	859	2021-04-25 22:57:55.970923	2021-04-25 22:57:55.970923
1821	history	\N	Route	860	2021-04-25 22:57:56.033551	2021-04-25 22:57:56.033551
1822	gear	\N	Route	860	2021-04-25 22:57:56.037969	2021-04-25 22:57:56.037969
1823	history	\N	Route	861	2021-04-25 22:57:56.117599	2021-04-25 22:57:56.117599
1824	gear	\N	Route	861	2021-04-25 22:57:56.149273	2021-04-25 22:57:56.149273
1825	history	\N	Route	862	2021-04-25 22:57:56.213889	2021-04-25 22:57:56.213889
1826	gear	\N	Route	862	2021-04-25 22:57:56.218152	2021-04-25 22:57:56.218152
1827	history	\N	Route	863	2021-04-25 22:57:56.286098	2021-04-25 22:57:56.286098
1828	gear	\N	Route	863	2021-04-25 22:57:56.290403	2021-04-25 22:57:56.290403
1829	history	\N	Route	864	2021-04-25 22:57:56.350595	2021-04-25 22:57:56.350595
1830	gear	\N	Route	864	2021-04-25 22:57:56.355166	2021-04-25 22:57:56.355166
1831	history	\N	Route	865	2021-04-25 22:57:56.42279	2021-04-25 22:57:56.42279
1832	gear	Cintas exprés, cuerda de 60m.	Route	865	2021-04-25 22:57:56.428067	2021-04-25 22:57:56.428067
1833	history	\N	Route	866	2021-04-25 22:57:56.51828	2021-04-25 22:57:56.51828
1834	gear	Cintas exprés, cuerda de 60m.	Route	866	2021-04-25 22:57:56.523768	2021-04-25 22:57:56.523768
1835	history	\N	Route	867	2021-04-25 22:57:56.591394	2021-04-25 22:57:56.591394
1836	gear	Cintas exprés, cuerda de 60m.	Route	867	2021-04-25 22:57:56.597438	2021-04-25 22:57:56.597438
1837	history	\N	Route	868	2021-04-25 22:57:56.688755	2021-04-25 22:57:56.688755
1838	gear	Cintas exprés, cuerda de 60m.	Route	868	2021-04-25 22:57:56.694015	2021-04-25 22:57:56.694015
1839	history	\N	Route	869	2021-04-25 22:57:56.782847	2021-04-25 22:57:56.782847
1840	gear	\N	Route	869	2021-04-25 22:57:56.787135	2021-04-25 22:57:56.787135
1841	history	\N	Route	870	2021-04-25 22:57:56.885755	2021-04-25 22:57:56.885755
1842	gear	Cintas exprés, cuerda de 60m.	Route	870	2021-04-25 22:57:56.895183	2021-04-25 22:57:56.895183
1843	history	\N	Route	871	2021-04-25 22:57:56.982377	2021-04-25 22:57:56.982377
1844	gear	\N	Route	871	2021-04-25 22:57:56.98628	2021-04-25 22:57:56.98628
1845	history	\N	Route	872	2021-04-25 22:57:57.062202	2021-04-25 22:57:57.062202
1846	gear	Cintas exprés, cuerda de 60m.	Route	872	2021-04-25 22:57:57.075313	2021-04-25 22:57:57.075313
1847	history	\N	Route	873	2021-04-25 22:57:57.161559	2021-04-25 22:57:57.161559
1848	gear	\N	Route	873	2021-04-25 22:57:57.165507	2021-04-25 22:57:57.165507
1849	history	\N	Route	874	2021-04-25 22:57:57.228991	2021-04-25 22:57:57.228991
1850	gear	Cintas exprés, cuerda de 60m.	Route	874	2021-04-25 22:57:57.237377	2021-04-25 22:57:57.237377
1851	history	\N	Route	875	2021-04-25 22:57:57.33103	2021-04-25 22:57:57.33103
1852	gear	\N	Route	875	2021-04-25 22:57:57.335382	2021-04-25 22:57:57.335382
1853	history	\N	Route	876	2021-04-25 22:57:57.429158	2021-04-25 22:57:57.429158
1854	gear	\N	Route	876	2021-04-25 22:57:57.43299	2021-04-25 22:57:57.43299
1855	history	\N	Route	877	2021-04-25 22:57:57.501954	2021-04-25 22:57:57.501954
1856	gear	Cintas exprés, cuerda de 60m.	Route	877	2021-04-25 22:57:57.507335	2021-04-25 22:57:57.507335
1857	history	\N	Route	878	2021-04-25 22:57:57.56979	2021-04-25 22:57:57.56979
1858	gear	\N	Route	878	2021-04-25 22:57:57.573959	2021-04-25 22:57:57.573959
1859	history	\N	Route	879	2021-04-25 22:57:57.637491	2021-04-25 22:57:57.637491
1860	gear	\N	Route	879	2021-04-25 22:57:57.657347	2021-04-25 22:57:57.657347
1861	history	\N	Route	880	2021-04-25 22:57:57.741471	2021-04-25 22:57:57.741471
1862	gear	\N	Route	880	2021-04-25 22:57:57.759828	2021-04-25 22:57:57.759828
1863	history	\N	Route	881	2021-04-25 22:57:57.829311	2021-04-25 22:57:57.829311
1864	gear	\N	Route	881	2021-04-25 22:57:57.833882	2021-04-25 22:57:57.833882
1865	history	\N	Route	882	2021-04-25 22:57:57.927794	2021-04-25 22:57:57.927794
1866	gear	\N	Route	882	2021-04-25 22:57:57.932675	2021-04-25 22:57:57.932675
1867	history	\N	Route	883	2021-04-25 22:57:58.022655	2021-04-25 22:57:58.022655
1868	gear	\N	Route	883	2021-04-25 22:57:58.029974	2021-04-25 22:57:58.029974
1869	history	\N	Route	884	2021-04-25 22:57:58.102253	2021-04-25 22:57:58.102253
1870	gear	\N	Route	884	2021-04-25 22:57:58.106393	2021-04-25 22:57:58.106393
1871	history	\N	Route	885	2021-04-25 22:57:58.169653	2021-04-25 22:57:58.169653
1872	gear	\N	Route	885	2021-04-25 22:57:58.174322	2021-04-25 22:57:58.174322
1873	history	\N	Route	886	2021-04-25 22:57:58.264684	2021-04-25 22:57:58.264684
1874	gear	\N	Route	886	2021-04-25 22:57:58.268654	2021-04-25 22:57:58.268654
1875	history	\N	Route	887	2021-04-25 22:57:58.354117	2021-04-25 22:57:58.354117
1876	gear	\N	Route	887	2021-04-25 22:57:58.358582	2021-04-25 22:57:58.358582
1877	history	\N	Route	888	2021-04-25 22:57:58.418424	2021-04-25 22:57:58.418424
1878	gear	Cintas exprés, cuerda de 60m.	Route	888	2021-04-25 22:57:58.424668	2021-04-25 22:57:58.424668
1879	history	\N	Route	889	2021-04-25 22:57:58.487606	2021-04-25 22:57:58.487606
1880	gear	Cintas exprés, cuerda de 60m.	Route	889	2021-04-25 22:57:58.493816	2021-04-25 22:57:58.493816
1881	history	\N	Route	890	2021-04-25 22:57:58.568742	2021-04-25 22:57:58.568742
1882	gear	Cintas exprés, cuerda de 60m.	Route	890	2021-04-25 22:57:58.57506	2021-04-25 22:57:58.57506
1883	history	\N	Route	891	2021-04-25 22:57:58.669769	2021-04-25 22:57:58.669769
1884	gear	Cintas exprés, cuerda de 60m.	Route	891	2021-04-25 22:57:58.679103	2021-04-25 22:57:58.679103
1885	history	\N	Route	892	2021-04-25 22:57:58.753323	2021-04-25 22:57:58.753323
1886	gear	\N	Route	892	2021-04-25 22:57:58.757877	2021-04-25 22:57:58.757877
1887	history	\N	Route	893	2021-04-25 22:57:58.818032	2021-04-25 22:57:58.818032
1888	gear	\N	Route	893	2021-04-25 22:57:58.822202	2021-04-25 22:57:58.822202
1889	history	\N	Route	894	2021-04-25 22:57:58.893639	2021-04-25 22:57:58.893639
1890	gear	\N	Route	894	2021-04-25 22:57:58.900565	2021-04-25 22:57:58.900565
1891	history	\N	Route	895	2021-04-25 22:57:58.981179	2021-04-25 22:57:58.981179
1892	gear	\N	Route	895	2021-04-25 22:57:58.985309	2021-04-25 22:57:58.985309
1893	history	\N	Route	896	2021-04-25 22:57:59.046455	2021-04-25 22:57:59.046455
1894	gear	\N	Route	896	2021-04-25 22:57:59.05061	2021-04-25 22:57:59.05061
1895	history	\N	Route	897	2021-04-25 22:57:59.141684	2021-04-25 22:57:59.141684
1896	gear	Cintas exprés, cuerda de 60m.	Route	897	2021-04-25 22:57:59.147494	2021-04-25 22:57:59.147494
1897	history	\N	Route	898	2021-04-25 22:57:59.209205	2021-04-25 22:57:59.209205
1898	gear	\N	Route	898	2021-04-25 22:57:59.234292	2021-04-25 22:57:59.234292
1899	history	\N	Route	899	2021-04-25 22:57:59.325424	2021-04-25 22:57:59.325424
1900	gear	Cintas exprés, cuerda de 60m.	Route	899	2021-04-25 22:57:59.331039	2021-04-25 22:57:59.331039
1901	history	\N	Route	900	2021-04-25 22:57:59.396078	2021-04-25 22:57:59.396078
1902	gear	Cintas exprés, cuerda de 60m.	Route	900	2021-04-25 22:57:59.402175	2021-04-25 22:57:59.402175
1903	history	\N	Route	901	2021-04-25 22:57:59.460005	2021-04-25 22:57:59.460005
1904	gear	Cintas exprés, cuerda de 60m.	Route	901	2021-04-25 22:57:59.465749	2021-04-25 22:57:59.465749
1905	history	\N	Route	902	2021-04-25 22:57:59.522286	2021-04-25 22:57:59.522286
1906	gear	\N	Route	902	2021-04-25 22:57:59.526295	2021-04-25 22:57:59.526295
1907	history	\N	Route	903	2021-04-25 22:57:59.60458	2021-04-25 22:57:59.60458
1908	gear	\N	Route	903	2021-04-25 22:57:59.60995	2021-04-25 22:57:59.60995
1909	history	\N	Route	904	2021-04-25 22:57:59.685673	2021-04-25 22:57:59.685673
1910	gear	Cintas exprés, cuerda de 60m.	Route	904	2021-04-25 22:57:59.694984	2021-04-25 22:57:59.694984
1911	history	\N	Route	905	2021-04-25 22:57:59.752054	2021-04-25 22:57:59.752054
1912	gear	Cintas exprés, cuerda de 60m.	Route	905	2021-04-25 22:57:59.757426	2021-04-25 22:57:59.757426
1913	history	\N	Route	906	2021-04-25 22:57:59.824854	2021-04-25 22:57:59.824854
1914	gear	\N	Route	906	2021-04-25 22:57:59.828984	2021-04-25 22:57:59.828984
1915	history	\N	Route	907	2021-04-25 22:57:59.917871	2021-04-25 22:57:59.917871
1916	gear	Cintas exprés, cuerda de 60m.	Route	907	2021-04-25 22:57:59.9232	2021-04-25 22:57:59.9232
1917	history	\N	Route	908	2021-04-25 22:57:59.985867	2021-04-25 22:57:59.985867
1918	gear	Cintas exprés, cuerda de 60m.	Route	908	2021-04-25 22:57:59.991411	2021-04-25 22:57:59.991411
1919	history	\N	Route	909	2021-04-25 22:58:00.093368	2021-04-25 22:58:00.093368
1920	gear	Cintas exprés, cuerda de 60m.	Route	909	2021-04-25 22:58:00.098909	2021-04-25 22:58:00.098909
1921	history	\N	Route	910	2021-04-25 22:58:00.170915	2021-04-25 22:58:00.170915
1922	gear	Cintas exprés, cuerda de 60m.	Route	910	2021-04-25 22:58:00.176278	2021-04-25 22:58:00.176278
1923	history	\N	Route	911	2021-04-25 22:58:00.261373	2021-04-25 22:58:00.261373
1924	gear	Cintas exprés, cuerda de 60m.	Route	911	2021-04-25 22:58:00.27325	2021-04-25 22:58:00.27325
1925	history	\N	Route	912	2021-04-25 22:58:00.397758	2021-04-25 22:58:00.397758
1926	gear	Cintas exprés, cuerda de 60m.	Route	912	2021-04-25 22:58:00.403252	2021-04-25 22:58:00.403252
1927	history	\N	Route	913	2021-04-25 22:58:00.478044	2021-04-25 22:58:00.478044
1928	gear	Cintas exprés, cuerda de 60m.	Route	913	2021-04-25 22:58:00.483399	2021-04-25 22:58:00.483399
1929	history	\N	Route	914	2021-04-25 22:58:00.544762	2021-04-25 22:58:00.544762
1930	gear	Cintas exprés, cuerda de 60m.	Route	914	2021-04-25 22:58:00.549799	2021-04-25 22:58:00.549799
1931	history	\N	Route	915	2021-04-25 22:58:00.621855	2021-04-25 22:58:00.621855
1932	gear	Cintas exprés, cuerda de 60m.	Route	915	2021-04-25 22:58:00.632156	2021-04-25 22:58:00.632156
1933	history	\N	Route	916	2021-04-25 22:58:00.810114	2021-04-25 22:58:00.810114
1934	gear	Cintas exprés, cuerda de 60m.	Route	916	2021-04-25 22:58:00.81904	2021-04-25 22:58:00.81904
1935	history	\N	Route	917	2021-04-25 22:58:00.932353	2021-04-25 22:58:00.932353
1936	gear	Cintas exprés, cuerda de 60m.	Route	917	2021-04-25 22:58:00.941707	2021-04-25 22:58:00.941707
1937	history	\N	Route	918	2021-04-25 22:58:01.026424	2021-04-25 22:58:01.026424
1938	gear	Cintas exprés, cuerda de 60m.	Route	918	2021-04-25 22:58:01.031558	2021-04-25 22:58:01.031558
1939	history	\N	Route	919	2021-04-25 22:58:01.094537	2021-04-25 22:58:01.094537
1940	gear	Cintas exprés, cuerda de 60m.	Route	919	2021-04-25 22:58:01.099604	2021-04-25 22:58:01.099604
1941	history	\N	Route	920	2021-04-25 22:58:01.18972	2021-04-25 22:58:01.18972
1942	gear	Cintas exprés, cuerda de 60m.	Route	920	2021-04-25 22:58:01.19665	2021-04-25 22:58:01.19665
1943	history	\N	Route	921	2021-04-25 22:58:01.289301	2021-04-25 22:58:01.289301
1944	gear	Cintas exprés, cuerda de 60m.	Route	921	2021-04-25 22:58:01.294175	2021-04-25 22:58:01.294175
1945	history	\N	Route	922	2021-04-25 22:58:01.401958	2021-04-25 22:58:01.401958
1946	gear	Cintas exprés, cuerda de 60m.	Route	922	2021-04-25 22:58:01.413944	2021-04-25 22:58:01.413944
1947	history	\N	Route	923	2021-04-25 22:58:01.498088	2021-04-25 22:58:01.498088
1948	gear	Cintas exprés, cuerda de 60m.	Route	923	2021-04-25 22:58:01.507065	2021-04-25 22:58:01.507065
1949	history	\N	Route	924	2021-04-25 22:58:01.585156	2021-04-25 22:58:01.585156
1950	gear	Cintas exprés, cuerda de 60m.	Route	924	2021-04-25 22:58:01.590888	2021-04-25 22:58:01.590888
1951	history	\N	Route	925	2021-04-25 22:58:01.727135	2021-04-25 22:58:01.727135
1952	gear	Cintas exprés, cuerda de 60m.	Route	925	2021-04-25 22:58:01.74897	2021-04-25 22:58:01.74897
1953	history	\N	Route	926	2021-04-25 22:58:01.830047	2021-04-25 22:58:01.830047
1954	gear	Cintas exprés, cuerda de 60m.	Route	926	2021-04-25 22:58:01.839099	2021-04-25 22:58:01.839099
1955	history	\N	Route	927	2021-04-25 22:58:01.941983	2021-04-25 22:58:01.941983
1956	gear	Cintas exprés, cuerda de 60m.	Route	927	2021-04-25 22:58:01.947994	2021-04-25 22:58:01.947994
1957	history	\N	Route	928	2021-04-25 22:58:02.042173	2021-04-25 22:58:02.042173
1958	gear	Cintas exprés, cuerda de 60m.	Route	928	2021-04-25 22:58:02.051736	2021-04-25 22:58:02.051736
1959	history	\N	Route	929	2021-04-25 22:58:02.145929	2021-04-25 22:58:02.145929
1960	gear	Cintas exprés, cuerda de 60m.	Route	929	2021-04-25 22:58:02.156141	2021-04-25 22:58:02.156141
1961	history	\N	Route	930	2021-04-25 22:58:02.247056	2021-04-25 22:58:02.247056
1962	gear	Cintas exprés, cuerda de 60m.	Route	930	2021-04-25 22:58:02.252112	2021-04-25 22:58:02.252112
1963	history	\N	Route	931	2021-04-25 22:58:02.360505	2021-04-25 22:58:02.360505
1964	gear	Cintas exprés, cuerda de 60m.	Route	931	2021-04-25 22:58:02.367293	2021-04-25 22:58:02.367293
1965	history	\N	Route	932	2021-04-25 22:58:02.460678	2021-04-25 22:58:02.460678
1966	gear	Cintas exprés, cuerda de 60m.	Route	932	2021-04-25 22:58:02.470467	2021-04-25 22:58:02.470467
1967	history	\N	Route	933	2021-04-25 22:58:02.576494	2021-04-25 22:58:02.576494
1968	gear	Cintas exprés, cuerda de 60m.	Route	933	2021-04-25 22:58:02.582378	2021-04-25 22:58:02.582378
1969	history	\N	Route	934	2021-04-25 22:58:02.671955	2021-04-25 22:58:02.671955
1970	gear	Cintas exprés, cuerda de 60m.	Route	934	2021-04-25 22:58:02.677305	2021-04-25 22:58:02.677305
1971	history	\N	Route	935	2021-04-25 22:58:02.79729	2021-04-25 22:58:02.79729
1972	gear	Cintas exprés, cuerda de 60m.	Route	935	2021-04-25 22:58:02.825901	2021-04-25 22:58:02.825901
1973	history	\N	Route	936	2021-04-25 22:58:02.942019	2021-04-25 22:58:02.942019
1974	gear	Cintas exprés, cuerda de 60m.	Route	936	2021-04-25 22:58:02.948928	2021-04-25 22:58:02.948928
1975	history	\N	Route	937	2021-04-25 22:58:03.032866	2021-04-25 22:58:03.032866
1976	gear	Cintas exprés, cuerda de 60m.	Route	937	2021-04-25 22:58:03.038102	2021-04-25 22:58:03.038102
1977	history	\N	Route	938	2021-04-25 22:58:03.145514	2021-04-25 22:58:03.145514
1978	gear	Cintas exprés, cuerda de 60m.	Route	938	2021-04-25 22:58:03.150989	2021-04-25 22:58:03.150989
1979	history	\N	Route	939	2021-04-25 22:58:03.274027	2021-04-25 22:58:03.274027
1980	gear	Cintas exprés, cuerda de 60m.	Route	939	2021-04-25 22:58:03.282019	2021-04-25 22:58:03.282019
1981	history	\N	Route	940	2021-04-25 22:58:03.396463	2021-04-25 22:58:03.396463
1982	gear	Cintas exprés, cuerda de 60m.	Route	940	2021-04-25 22:58:03.405312	2021-04-25 22:58:03.405312
1983	history	\N	Route	941	2021-04-25 22:58:03.531485	2021-04-25 22:58:03.531485
1984	gear	Cintas exprés, cuerda de 60m.	Route	941	2021-04-25 22:58:03.540322	2021-04-25 22:58:03.540322
1985	history	\N	Route	942	2021-04-25 22:58:03.660506	2021-04-25 22:58:03.660506
1986	gear	Cintas exprés, cuerda de 60m.	Route	942	2021-04-25 22:58:03.673294	2021-04-25 22:58:03.673294
1987	history	\N	Route	943	2021-04-25 22:58:03.772367	2021-04-25 22:58:03.772367
1988	gear	Cintas exprés, cuerda de 60m.	Route	943	2021-04-25 22:58:03.778401	2021-04-25 22:58:03.778401
1989	history	\N	Route	944	2021-04-25 22:58:03.862057	2021-04-25 22:58:03.862057
1990	gear	Cintas exprés, cuerda de 60m.	Route	944	2021-04-25 22:58:03.871688	2021-04-25 22:58:03.871688
1991	history	\N	Route	945	2021-04-25 22:58:03.947628	2021-04-25 22:58:03.947628
1992	gear	Cintas exprés, cuerda de 60m.	Route	945	2021-04-25 22:58:03.954095	2021-04-25 22:58:03.954095
1993	history	\N	Route	946	2021-04-25 22:58:04.033631	2021-04-25 22:58:04.033631
1994	gear	Cintas exprés, cuerda de 60m.	Route	946	2021-04-25 22:58:04.046296	2021-04-25 22:58:04.046296
1995	history	\N	Route	947	2021-04-25 22:58:04.117506	2021-04-25 22:58:04.117506
1996	gear	Cintas exprés, cuerda de 60m.	Route	947	2021-04-25 22:58:04.122643	2021-04-25 22:58:04.122643
1997	history	\N	Route	948	2021-04-25 22:58:04.190556	2021-04-25 22:58:04.190556
1998	gear	Cintas exprés, cuerda de 60m.	Route	948	2021-04-25 22:58:04.195997	2021-04-25 22:58:04.195997
1999	history	\N	Route	949	2021-04-25 22:58:04.274832	2021-04-25 22:58:04.274832
2000	gear	Cintas exprés, cuerda de 60m.	Route	949	2021-04-25 22:58:04.279947	2021-04-25 22:58:04.279947
2001	history	\N	Route	950	2021-04-25 22:58:04.361887	2021-04-25 22:58:04.361887
2002	gear	Cintas exprés, cuerda de 60m.	Route	950	2021-04-25 22:58:04.370297	2021-04-25 22:58:04.370297
2003	history	\N	Route	951	2021-04-25 22:58:04.443611	2021-04-25 22:58:04.443611
2004	gear	Cintas exprés, cuerda de 60m.	Route	951	2021-04-25 22:58:04.457182	2021-04-25 22:58:04.457182
2005	history	\N	Route	952	2021-04-25 22:58:04.525324	2021-04-25 22:58:04.525324
2006	gear	Cintas exprés, cuerda de 60m.	Route	952	2021-04-25 22:58:04.535972	2021-04-25 22:58:04.535972
2007	history	\N	Route	953	2021-04-25 22:58:04.634523	2021-04-25 22:58:04.634523
2008	gear	Cintas exprés, cuerda de 60m.	Route	953	2021-04-25 22:58:04.642518	2021-04-25 22:58:04.642518
2009	history	\N	Route	954	2021-04-25 22:58:04.722366	2021-04-25 22:58:04.722366
2010	gear	Cintas exprés, cuerda de 60m.	Route	954	2021-04-25 22:58:04.727371	2021-04-25 22:58:04.727371
2011	history	\N	Route	955	2021-04-25 22:58:04.827972	2021-04-25 22:58:04.827972
2012	gear	Cintas exprés, cuerda de 60m.	Route	955	2021-04-25 22:58:04.837028	2021-04-25 22:58:04.837028
2013	history	\N	Route	956	2021-04-25 22:58:04.917069	2021-04-25 22:58:04.917069
2014	gear	Cintas exprés, cuerda de 60m.	Route	956	2021-04-25 22:58:04.922684	2021-04-25 22:58:04.922684
2015	history	\N	Route	957	2021-04-25 22:58:04.988741	2021-04-25 22:58:04.988741
2016	gear	Cintas exprés, cuerda de 60m.	Route	957	2021-04-25 22:58:04.99438	2021-04-25 22:58:04.99438
2017	history	\N	Route	958	2021-04-25 22:58:05.056877	2021-04-25 22:58:05.056877
2018	gear	Cintas exprés, cuerda de 60m.	Route	958	2021-04-25 22:58:05.06528	2021-04-25 22:58:05.06528
2019	history	\N	Route	959	2021-04-25 22:58:05.123868	2021-04-25 22:58:05.123868
2020	gear	Cintas exprés, cuerda de 60m.	Route	959	2021-04-25 22:58:05.129967	2021-04-25 22:58:05.129967
2021	history	\N	Route	960	2021-04-25 22:58:05.189995	2021-04-25 22:58:05.189995
2022	gear	Cintas exprés, cuerda de 60m.	Route	960	2021-04-25 22:58:05.195288	2021-04-25 22:58:05.195288
2023	history	\N	Route	961	2021-04-25 22:58:05.266985	2021-04-25 22:58:05.266985
2024	gear	Cintas exprés, cuerda de 60m.	Route	961	2021-04-25 22:58:05.276529	2021-04-25 22:58:05.276529
2025	history	\N	Route	962	2021-04-25 22:58:05.364809	2021-04-25 22:58:05.364809
2026	gear	Cintas exprés, cuerda de 60m.	Route	962	2021-04-25 22:58:05.370603	2021-04-25 22:58:05.370603
2027	history	\N	Route	963	2021-04-25 22:58:05.494236	2021-04-25 22:58:05.494236
2028	gear	Cintas exprés, cuerda de 60m.	Route	963	2021-04-25 22:58:05.499615	2021-04-25 22:58:05.499615
2029	history	\N	Route	964	2021-04-25 22:58:05.557935	2021-04-25 22:58:05.557935
2030	gear	Cintas exprés, cuerda de 60m.	Route	964	2021-04-25 22:58:05.564109	2021-04-25 22:58:05.564109
2031	history	\N	Route	965	2021-04-25 22:58:05.66147	2021-04-25 22:58:05.66147
2032	gear	Cintas exprés, cuerda de 60m.	Route	965	2021-04-25 22:58:05.666986	2021-04-25 22:58:05.666986
2033	history	\N	Route	966	2021-04-25 22:58:05.73947	2021-04-25 22:58:05.73947
2034	gear	Cintas exprés, cuerda de 60m.	Route	966	2021-04-25 22:58:05.750634	2021-04-25 22:58:05.750634
2035	history	\N	Route	967	2021-04-25 22:58:05.830822	2021-04-25 22:58:05.830822
2036	gear	Cintas exprés, cuerda de 60m.	Route	967	2021-04-25 22:58:05.836124	2021-04-25 22:58:05.836124
2037	history	\N	Route	968	2021-04-25 22:58:05.918139	2021-04-25 22:58:05.918139
2038	gear	Cintas exprés, cuerda de 60m.	Route	968	2021-04-25 22:58:05.927362	2021-04-25 22:58:05.927362
2039	history	\N	Route	969	2021-04-25 22:58:06.008447	2021-04-25 22:58:06.008447
2040	gear	Cintas exprés, cuerda de 60m.	Route	969	2021-04-25 22:58:06.01496	2021-04-25 22:58:06.01496
2041	history	\N	Route	970	2021-04-25 22:58:06.130366	2021-04-25 22:58:06.130366
2042	gear	Cintas exprés, cuerda de 60m.	Route	970	2021-04-25 22:58:06.13603	2021-04-25 22:58:06.13603
2043	history	\N	Route	971	2021-04-25 22:58:06.207456	2021-04-25 22:58:06.207456
2044	gear	Cintas exprés, cuerda de 60m.	Route	971	2021-04-25 22:58:06.215041	2021-04-25 22:58:06.215041
2045	history	\N	Route	972	2021-04-25 22:58:06.351091	2021-04-25 22:58:06.351091
2046	gear	Cintas exprés, cuerda de 60m.	Route	972	2021-04-25 22:58:06.356559	2021-04-25 22:58:06.356559
2047	history	\N	Route	973	2021-04-25 22:58:06.421171	2021-04-25 22:58:06.421171
2048	gear	Cintas exprés, cuerda de 60m.	Route	973	2021-04-25 22:58:06.42697	2021-04-25 22:58:06.42697
2049	history	\N	Route	974	2021-04-25 22:58:06.494664	2021-04-25 22:58:06.494664
2050	gear	Cintas exprés, cuerda de 60m.	Route	974	2021-04-25 22:58:06.503056	2021-04-25 22:58:06.503056
2051	history	\N	Route	975	2021-04-25 22:58:06.595666	2021-04-25 22:58:06.595666
2052	gear	Cintas exprés, cuerda de 60m.	Route	975	2021-04-25 22:58:06.604116	2021-04-25 22:58:06.604116
2053	history	\N	Route	976	2021-04-25 22:58:06.696601	2021-04-25 22:58:06.696601
2054	gear	Cintas exprés, cuerda de 60m.	Route	976	2021-04-25 22:58:06.702938	2021-04-25 22:58:06.702938
2055	history	\N	Route	977	2021-04-25 22:58:06.78582	2021-04-25 22:58:06.78582
2056	gear	Cintas exprés, cuerda de 60m.	Route	977	2021-04-25 22:58:06.794538	2021-04-25 22:58:06.794538
2057	history	\N	Route	978	2021-04-25 22:58:06.901716	2021-04-25 22:58:06.901716
2058	gear	Cintas exprés, cuerda de 60m.	Route	978	2021-04-25 22:58:06.907287	2021-04-25 22:58:06.907287
2059	history	\N	Route	979	2021-04-25 22:58:06.991937	2021-04-25 22:58:06.991937
2060	gear	Cintas exprés, cuerda de 60m.	Route	979	2021-04-25 22:58:07.00152	2021-04-25 22:58:07.00152
2061	history	\N	Route	980	2021-04-25 22:58:07.095295	2021-04-25 22:58:07.095295
2062	gear	Cintas exprés, cuerda de 60m.	Route	980	2021-04-25 22:58:07.106815	2021-04-25 22:58:07.106815
2063	history	\N	Route	981	2021-04-25 22:58:07.191065	2021-04-25 22:58:07.191065
2064	gear	Cintas exprés, cuerda de 60m.	Route	981	2021-04-25 22:58:07.201359	2021-04-25 22:58:07.201359
2065	history	\N	Route	982	2021-04-25 22:58:07.30984	2021-04-25 22:58:07.30984
2066	gear	Cintas exprés, cuerda de 60m.	Route	982	2021-04-25 22:58:07.315663	2021-04-25 22:58:07.315663
2067	history	\N	Route	983	2021-04-25 22:58:07.382344	2021-04-25 22:58:07.382344
2068	gear	Cintas exprés, cuerda de 60m.	Route	983	2021-04-25 22:58:07.389041	2021-04-25 22:58:07.389041
2069	history	\N	Route	984	2021-04-25 22:58:07.462269	2021-04-25 22:58:07.462269
2070	gear	Cintas exprés, cuerda de 60m.	Route	984	2021-04-25 22:58:07.469328	2021-04-25 22:58:07.469328
2071	history	\N	Route	985	2021-04-25 22:58:07.534333	2021-04-25 22:58:07.534333
2072	gear	Cintas exprés, cuerda de 60m.	Route	985	2021-04-25 22:58:07.539768	2021-04-25 22:58:07.539768
2073	history	\N	Route	986	2021-04-25 22:58:07.613737	2021-04-25 22:58:07.613737
2074	gear	Cintas exprés, cuerda de 60m.	Route	986	2021-04-25 22:58:07.619724	2021-04-25 22:58:07.619724
2075	history	\N	Route	987	2021-04-25 22:58:07.692104	2021-04-25 22:58:07.692104
2076	gear	Cintas exprés, cuerda de 60m.	Route	987	2021-04-25 22:58:07.69784	2021-04-25 22:58:07.69784
2077	history	\N	Route	988	2021-04-25 22:58:07.758136	2021-04-25 22:58:07.758136
2078	gear	Cintas exprés, cuerda de 60m.	Route	988	2021-04-25 22:58:07.764135	2021-04-25 22:58:07.764135
2079	history	\N	Route	989	2021-04-25 22:58:07.845675	2021-04-25 22:58:07.845675
2080	gear	Cintas exprés, cuerda de 60m.	Route	989	2021-04-25 22:58:07.851257	2021-04-25 22:58:07.851257
2081	history	\N	Route	990	2021-04-25 22:58:07.919249	2021-04-25 22:58:07.919249
2082	gear	Cintas exprés, cuerda de 60m.	Route	990	2021-04-25 22:58:07.924078	2021-04-25 22:58:07.924078
2083	history	\N	Route	991	2021-04-25 22:58:07.988118	2021-04-25 22:58:07.988118
2084	gear	Cintas exprés, cuerda de 60m.	Route	991	2021-04-25 22:58:07.993914	2021-04-25 22:58:07.993914
2085	history	\N	Route	992	2021-04-25 22:58:08.096303	2021-04-25 22:58:08.096303
2086	gear	Cintas exprés, cuerda de 60m.	Route	992	2021-04-25 22:58:08.102397	2021-04-25 22:58:08.102397
2087	history	\N	Route	993	2021-04-25 22:58:08.165075	2021-04-25 22:58:08.165075
2088	gear	Cintas exprés, cuerda de 60m.	Route	993	2021-04-25 22:58:08.170567	2021-04-25 22:58:08.170567
2089	history	\N	Route	994	2021-04-25 22:58:08.235634	2021-04-25 22:58:08.235634
2090	gear	Cintas exprés, cuerda de 60m.	Route	994	2021-04-25 22:58:08.241461	2021-04-25 22:58:08.241461
2091	history	\N	Route	995	2021-04-25 22:58:08.331551	2021-04-25 22:58:08.331551
2092	gear	Cintas exprés, cuerda de 60m.	Route	995	2021-04-25 22:58:08.337052	2021-04-25 22:58:08.337052
2093	history	\N	Route	996	2021-04-25 22:58:08.403796	2021-04-25 22:58:08.403796
2094	gear	Cintas exprés, cuerda de 60m.	Route	996	2021-04-25 22:58:08.410584	2021-04-25 22:58:08.410584
2095	history	\N	Route	997	2021-04-25 22:58:08.47998	2021-04-25 22:58:08.47998
2096	gear	Cintas exprés, cuerda de 60m.	Route	997	2021-04-25 22:58:08.485874	2021-04-25 22:58:08.485874
2097	history	\N	Route	998	2021-04-25 22:58:08.561043	2021-04-25 22:58:08.561043
2098	gear	Cintas exprés, cuerda de 60m.	Route	998	2021-04-25 22:58:08.567795	2021-04-25 22:58:08.567795
2099	history	\N	Route	999	2021-04-25 22:58:08.672175	2021-04-25 22:58:08.672175
2100	gear	Cintas exprés, cuerda de 60m.	Route	999	2021-04-25 22:58:08.677587	2021-04-25 22:58:08.677587
2101	history	\N	Route	1000	2021-04-25 22:58:08.775992	2021-04-25 22:58:08.775992
2102	gear	Cintas exprés, cuerda de 60m.	Route	1000	2021-04-25 22:58:08.781395	2021-04-25 22:58:08.781395
2103	history	\N	Route	1001	2021-04-25 22:58:08.849994	2021-04-25 22:58:08.849994
2104	gear	Cintas exprés, cuerda de 60m.	Route	1001	2021-04-25 22:58:08.856206	2021-04-25 22:58:08.856206
2105	history	\N	Route	1002	2021-04-25 22:58:08.934939	2021-04-25 22:58:08.934939
2106	gear	Cintas exprés, cuerda de 60m.	Route	1002	2021-04-25 22:58:08.944756	2021-04-25 22:58:08.944756
2107	history	\N	Route	1003	2021-04-25 22:58:09.013512	2021-04-25 22:58:09.013512
2108	gear	Cintas exprés, cuerda de 60m.	Route	1003	2021-04-25 22:58:09.020761	2021-04-25 22:58:09.020761
2109	history	\N	Route	1004	2021-04-25 22:58:09.091928	2021-04-25 22:58:09.091928
2110	gear	Cintas exprés, cuerda de 60m.	Route	1004	2021-04-25 22:58:09.100535	2021-04-25 22:58:09.100535
2111	history	\N	Route	1005	2021-04-25 22:58:09.170596	2021-04-25 22:58:09.170596
2112	gear	Cintas exprés, cuerda de 60m.	Route	1005	2021-04-25 22:58:09.176197	2021-04-25 22:58:09.176197
2113	history	\N	Route	1006	2021-04-25 22:58:09.238789	2021-04-25 22:58:09.238789
2114	gear	Cintas exprés, cuerda de 60m.	Route	1006	2021-04-25 22:58:09.24504	2021-04-25 22:58:09.24504
2115	history	\N	Route	1007	2021-04-25 22:58:09.345179	2021-04-25 22:58:09.345179
2116	gear	Cintas exprés, cuerda de 60m.	Route	1007	2021-04-25 22:58:09.350639	2021-04-25 22:58:09.350639
2117	history	\N	Route	1008	2021-04-25 22:58:09.413797	2021-04-25 22:58:09.413797
2118	gear	Cintas exprés, cuerda de 60m.	Route	1008	2021-04-25 22:58:09.420091	2021-04-25 22:58:09.420091
2119	history	\N	Route	1009	2021-04-25 22:58:09.519556	2021-04-25 22:58:09.519556
2120	gear	Cintas exprés, cuerda de 60m.	Route	1009	2021-04-25 22:58:09.52535	2021-04-25 22:58:09.52535
2121	history	\N	Route	1010	2021-04-25 22:58:09.603652	2021-04-25 22:58:09.603652
2122	gear	Cintas exprés, cuerda de 60m.	Route	1010	2021-04-25 22:58:09.612001	2021-04-25 22:58:09.612001
2123	history	\N	Route	1011	2021-04-25 22:58:09.693852	2021-04-25 22:58:09.693852
2124	gear	Cintas exprés, cuerda de 60m.	Route	1011	2021-04-25 22:58:09.699426	2021-04-25 22:58:09.699426
2125	history	\N	Route	1012	2021-04-25 22:58:09.765323	2021-04-25 22:58:09.765323
2126	gear	Cintas exprés, cuerda de 60m.	Route	1012	2021-04-25 22:58:09.770653	2021-04-25 22:58:09.770653
2127	history	\N	Route	1013	2021-04-25 22:58:09.843222	2021-04-25 22:58:09.843222
2128	gear	Cintas exprés, cuerda de 60m.	Route	1013	2021-04-25 22:58:09.855319	2021-04-25 22:58:09.855319
2129	history	\N	Route	1014	2021-04-25 22:58:09.93944	2021-04-25 22:58:09.93944
2130	gear	Cintas exprés, cuerda de 60m.	Route	1014	2021-04-25 22:58:09.944919	2021-04-25 22:58:09.944919
2131	history	\N	Route	1015	2021-04-25 22:58:10.013169	2021-04-25 22:58:10.013169
2132	gear	Cintas exprés, cuerda de 60m.	Route	1015	2021-04-25 22:58:10.018617	2021-04-25 22:58:10.018617
2133	history	\N	Route	1016	2021-04-25 22:58:10.111896	2021-04-25 22:58:10.111896
2134	gear	Cintas exprés, cuerda de 60m.	Route	1016	2021-04-25 22:58:10.117349	2021-04-25 22:58:10.117349
2135	history	\N	Route	1017	2021-04-25 22:58:10.182568	2021-04-25 22:58:10.182568
2136	gear	Cintas exprés, cuerda de 60m.	Route	1017	2021-04-25 22:58:10.188824	2021-04-25 22:58:10.188824
2137	history	\N	Route	1018	2021-04-25 22:58:10.297203	2021-04-25 22:58:10.297203
2138	gear	Cintas exprés, cuerda de 60m.	Route	1018	2021-04-25 22:58:10.303698	2021-04-25 22:58:10.303698
2139	history	\N	Route	1019	2021-04-25 22:58:10.410279	2021-04-25 22:58:10.410279
2140	gear	Cintas exprés, cuerda de 60m.	Route	1019	2021-04-25 22:58:10.41628	2021-04-25 22:58:10.41628
2141	history	\N	Route	1020	2021-04-25 22:58:10.472034	2021-04-25 22:58:10.472034
2142	gear	Cintas exprés, cuerda de 60m.	Route	1020	2021-04-25 22:58:10.477079	2021-04-25 22:58:10.477079
2143	history	\N	Route	1021	2021-04-25 22:58:10.540753	2021-04-25 22:58:10.540753
2144	gear	Cintas exprés, cuerda de 60m.	Route	1021	2021-04-25 22:58:10.547309	2021-04-25 22:58:10.547309
2145	history	\N	Route	1022	2021-04-25 22:58:10.627334	2021-04-25 22:58:10.627334
2146	gear	Cintas exprés, cuerda de 60m.	Route	1022	2021-04-25 22:58:10.640336	2021-04-25 22:58:10.640336
2147	history	\N	Route	1023	2021-04-25 22:58:10.75782	2021-04-25 22:58:10.75782
2148	gear	Cintas exprés, cuerda de 60m.	Route	1023	2021-04-25 22:58:10.763833	2021-04-25 22:58:10.763833
2149	history	\N	Route	1024	2021-04-25 22:58:10.833957	2021-04-25 22:58:10.833957
2150	gear	Cintas exprés, cuerda de 60m.	Route	1024	2021-04-25 22:58:10.84861	2021-04-25 22:58:10.84861
2151	history	\N	Route	1025	2021-04-25 22:58:10.934512	2021-04-25 22:58:10.934512
2152	gear	Cintas exprés, cuerda de 60m.	Route	1025	2021-04-25 22:58:10.942372	2021-04-25 22:58:10.942372
2153	history	\N	Route	1026	2021-04-25 22:58:11.113244	2021-04-25 22:58:11.113244
2154	gear	Cintas exprés, cuerda de 60m.	Route	1026	2021-04-25 22:58:11.120671	2021-04-25 22:58:11.120671
2155	history	\N	Route	1027	2021-04-25 22:58:11.225383	2021-04-25 22:58:11.225383
2156	gear	Cintas exprés, cuerda de 60m.	Route	1027	2021-04-25 22:58:11.242811	2021-04-25 22:58:11.242811
2157	history	\N	Route	1028	2021-04-25 22:58:11.317819	2021-04-25 22:58:11.317819
2158	gear	Cintas exprés, cuerda de 60m.	Route	1028	2021-04-25 22:58:11.324478	2021-04-25 22:58:11.324478
2159	history	\N	Route	1029	2021-04-25 22:58:11.394037	2021-04-25 22:58:11.394037
2160	gear	Cintas exprés, cuerda de 60m.	Route	1029	2021-04-25 22:58:11.402895	2021-04-25 22:58:11.402895
2161	history	\N	Route	1030	2021-04-25 22:58:11.469808	2021-04-25 22:58:11.469808
2162	gear	Cintas exprés, cuerda de 60m.	Route	1030	2021-04-25 22:58:11.476421	2021-04-25 22:58:11.476421
2163	history	\N	Route	1031	2021-04-25 22:58:11.558929	2021-04-25 22:58:11.558929
2164	gear	Cintas exprés, cuerda de 60m.	Route	1031	2021-04-25 22:58:11.572515	2021-04-25 22:58:11.572515
2165	history	\N	Route	1032	2021-04-25 22:58:11.652087	2021-04-25 22:58:11.652087
2166	gear	Cintas exprés, cuerda de 60m.	Route	1032	2021-04-25 22:58:11.670486	2021-04-25 22:58:11.670486
2167	history	\N	Route	1033	2021-04-25 22:58:11.777464	2021-04-25 22:58:11.777464
2168	gear	Cintas exprés, cuerda de 60m.	Route	1033	2021-04-25 22:58:11.782781	2021-04-25 22:58:11.782781
2169	history	\N	Route	1034	2021-04-25 22:58:11.859706	2021-04-25 22:58:11.859706
2170	gear	Cintas exprés, cuerda de 60m.	Route	1034	2021-04-25 22:58:11.865026	2021-04-25 22:58:11.865026
2171	history	\N	Route	1035	2021-04-25 22:58:11.931545	2021-04-25 22:58:11.931545
2172	gear	\N	Route	1035	2021-04-25 22:58:11.938452	2021-04-25 22:58:11.938452
2173	history	\N	Route	1036	2021-04-25 22:58:12.00187	2021-04-25 22:58:12.00187
2174	gear	\N	Route	1036	2021-04-25 22:58:12.005921	2021-04-25 22:58:12.005921
2175	history	\N	Route	1037	2021-04-25 22:58:12.069146	2021-04-25 22:58:12.069146
2176	gear	Cintas exprés, cuerda de 60m.	Route	1037	2021-04-25 22:58:12.074426	2021-04-25 22:58:12.074426
2177	history	\N	Route	1038	2021-04-25 22:58:12.154935	2021-04-25 22:58:12.154935
2178	gear	Cintas exprés, cuerda de 60m.	Route	1038	2021-04-25 22:58:12.162431	2021-04-25 22:58:12.162431
2179	history	\N	Route	1039	2021-04-25 22:58:12.222785	2021-04-25 22:58:12.222785
2180	gear	Cintas exprés, cuerda de 60m.	Route	1039	2021-04-25 22:58:12.227807	2021-04-25 22:58:12.227807
2181	history	\N	Route	1040	2021-04-25 22:58:12.34508	2021-04-25 22:58:12.34508
2182	gear	Cintas exprés, cuerda de 60m.	Route	1040	2021-04-25 22:58:12.350944	2021-04-25 22:58:12.350944
2183	history	\N	Route	1041	2021-04-25 22:58:12.438742	2021-04-25 22:58:12.438742
2184	gear	Cintas exprés, cuerda de 60m.	Route	1041	2021-04-25 22:58:12.445936	2021-04-25 22:58:12.445936
2185	history	\N	Route	1042	2021-04-25 22:58:12.528838	2021-04-25 22:58:12.528838
2186	gear	Cintas exprés, cuerda de 60m.	Route	1042	2021-04-25 22:58:12.534351	2021-04-25 22:58:12.534351
2187	history	\N	Route	1043	2021-04-25 22:58:12.591219	2021-04-25 22:58:12.591219
2188	gear	Cintas exprés, cuerda de 60m.	Route	1043	2021-04-25 22:58:12.596903	2021-04-25 22:58:12.596903
2189	history	\N	Route	1044	2021-04-25 22:58:12.697225	2021-04-25 22:58:12.697225
2190	gear	Cintas exprés, cuerda de 60m.	Route	1044	2021-04-25 22:58:12.703427	2021-04-25 22:58:12.703427
2191	history	\N	Route	1045	2021-04-25 22:58:12.782789	2021-04-25 22:58:12.782789
2192	gear	Cintas exprés, cuerda de 60m.	Route	1045	2021-04-25 22:58:12.791272	2021-04-25 22:58:12.791272
2193	history	\N	Route	1046	2021-04-25 22:58:12.86481	2021-04-25 22:58:12.86481
2194	gear	Cintas exprés, cuerda de 60m.	Route	1046	2021-04-25 22:58:12.870455	2021-04-25 22:58:12.870455
2195	history	\N	Route	1047	2021-04-25 22:58:12.988288	2021-04-25 22:58:12.988288
2196	gear	Cintas exprés, cuerda de 60m.	Route	1047	2021-04-25 22:58:12.995043	2021-04-25 22:58:12.995043
2197	history	\N	Route	1048	2021-04-25 22:58:13.113836	2021-04-25 22:58:13.113836
2198	gear	Cintas exprés, cuerda de 60m.	Route	1048	2021-04-25 22:58:13.122578	2021-04-25 22:58:13.122578
2199	history	\N	Route	1049	2021-04-25 22:58:13.252593	2021-04-25 22:58:13.252593
2200	gear	Cintas exprés, cuerda de 60m.	Route	1049	2021-04-25 22:58:13.262767	2021-04-25 22:58:13.262767
2201	history	\N	Route	1050	2021-04-25 22:58:13.361828	2021-04-25 22:58:13.361828
2202	gear	Cintas exprés, cuerda de 60m.	Route	1050	2021-04-25 22:58:13.369238	2021-04-25 22:58:13.369238
2203	history	\N	Route	1051	2021-04-25 22:58:13.471639	2021-04-25 22:58:13.471639
2204	gear	Cintas exprés, cuerda de 60m.	Route	1051	2021-04-25 22:58:13.477952	2021-04-25 22:58:13.477952
2205	history	\N	Route	1052	2021-04-25 22:58:13.581893	2021-04-25 22:58:13.581893
2206	gear	Cintas exprés, cuerda de 60m.	Route	1052	2021-04-25 22:58:13.588019	2021-04-25 22:58:13.588019
2207	history	\N	Route	1053	2021-04-25 22:58:13.71016	2021-04-25 22:58:13.71016
2208	gear	Cintas exprés, cuerda de 60m.	Route	1053	2021-04-25 22:58:13.729605	2021-04-25 22:58:13.729605
2209	history	\N	Route	1054	2021-04-25 22:58:13.831385	2021-04-25 22:58:13.831385
2210	gear	Cintas exprés, cuerda de 60m.	Route	1054	2021-04-25 22:58:13.838723	2021-04-25 22:58:13.838723
2211	history	\N	Route	1055	2021-04-25 22:58:13.916644	2021-04-25 22:58:13.916644
2212	gear	Cintas exprés, cuerda de 60m.	Route	1055	2021-04-25 22:58:13.926765	2021-04-25 22:58:13.926765
2213	history	\N	Route	1056	2021-04-25 22:58:14.002258	2021-04-25 22:58:14.002258
2214	gear	Cintas exprés, cuerda de 60m.	Route	1056	2021-04-25 22:58:14.011015	2021-04-25 22:58:14.011015
2215	history	\N	Route	1057	2021-04-25 22:58:14.08691	2021-04-25 22:58:14.08691
2216	gear	Cintas exprés, cuerda de 60m.	Route	1057	2021-04-25 22:58:14.092048	2021-04-25 22:58:14.092048
2217	history	\N	Route	1058	2021-04-25 22:58:14.17285	2021-04-25 22:58:14.17285
2218	gear	Cintas exprés, cuerda de 60m.	Route	1058	2021-04-25 22:58:14.178103	2021-04-25 22:58:14.178103
2219	history	\N	Route	1059	2021-04-25 22:58:14.277621	2021-04-25 22:58:14.277621
2220	gear	Cintas exprés, cuerda de 60m.	Route	1059	2021-04-25 22:58:14.287123	2021-04-25 22:58:14.287123
2221	history	\N	Route	1060	2021-04-25 22:58:14.410377	2021-04-25 22:58:14.410377
2222	gear	Cintas exprés, cuerda de 60m.	Route	1060	2021-04-25 22:58:14.419015	2021-04-25 22:58:14.419015
2223	history	\N	Route	1061	2021-04-25 22:58:14.487947	2021-04-25 22:58:14.487947
2224	gear	Cintas exprés, cuerda de 60m.	Route	1061	2021-04-25 22:58:14.495467	2021-04-25 22:58:14.495467
2225	history	\N	Route	1062	2021-04-25 22:58:14.57368	2021-04-25 22:58:14.57368
2226	gear	Cintas exprés, cuerda de 60m.	Route	1062	2021-04-25 22:58:14.57964	2021-04-25 22:58:14.57964
2227	history	\N	Route	1063	2021-04-25 22:58:14.694708	2021-04-25 22:58:14.694708
2228	gear	Cintas exprés, cuerda de 60m.	Route	1063	2021-04-25 22:58:14.701201	2021-04-25 22:58:14.701201
2229	history	\N	Route	1064	2021-04-25 22:58:14.799729	2021-04-25 22:58:14.799729
2230	gear	Cintas exprés, cuerda de 60m.	Route	1064	2021-04-25 22:58:14.805566	2021-04-25 22:58:14.805566
2231	history	\N	Route	1065	2021-04-25 22:58:14.91791	2021-04-25 22:58:14.91791
2232	gear	Cintas exprés, cuerda de 60m.	Route	1065	2021-04-25 22:58:14.929426	2021-04-25 22:58:14.929426
2233	history	\N	Route	1066	2021-04-25 22:58:15.017804	2021-04-25 22:58:15.017804
2234	gear	Cintas exprés, cuerda de 60m.	Route	1066	2021-04-25 22:58:15.023963	2021-04-25 22:58:15.023963
2235	history	\N	Route	1067	2021-04-25 22:58:15.108915	2021-04-25 22:58:15.108915
2236	gear	Cintas exprés, cuerda de 60m.	Route	1067	2021-04-25 22:58:15.114802	2021-04-25 22:58:15.114802
2237	history	\N	Route	1068	2021-04-25 22:58:15.17879	2021-04-25 22:58:15.17879
2238	gear	Cintas exprés, cuerda de 60m.	Route	1068	2021-04-25 22:58:15.185548	2021-04-25 22:58:15.185548
2239	history	\N	Route	1069	2021-04-25 22:58:15.251585	2021-04-25 22:58:15.251585
2240	gear	Cintas exprés, cuerda de 60m.	Route	1069	2021-04-25 22:58:15.259806	2021-04-25 22:58:15.259806
2241	history	\N	Route	1070	2021-04-25 22:58:15.338364	2021-04-25 22:58:15.338364
2242	gear	Cintas exprés, cuerda de 60m.	Route	1070	2021-04-25 22:58:15.346635	2021-04-25 22:58:15.346635
2243	history	\N	Route	1071	2021-04-25 22:58:15.412713	2021-04-25 22:58:15.412713
2244	gear	Cintas exprés, cuerda de 60m.	Route	1071	2021-04-25 22:58:15.419317	2021-04-25 22:58:15.419317
2245	history	\N	Route	1072	2021-04-25 22:58:15.482578	2021-04-25 22:58:15.482578
2246	gear	Cintas exprés, cuerda de 60m.	Route	1072	2021-04-25 22:58:15.487931	2021-04-25 22:58:15.487931
2247	history	\N	Route	1073	2021-04-25 22:58:15.554639	2021-04-25 22:58:15.554639
2248	gear	Cintas exprés, cuerda de 60m.	Route	1073	2021-04-25 22:58:15.566854	2021-04-25 22:58:15.566854
2249	history	\N	Route	1074	2021-04-25 22:58:15.632793	2021-04-25 22:58:15.632793
2250	gear	Cintas exprés, cuerda de 60m.	Route	1074	2021-04-25 22:58:15.639274	2021-04-25 22:58:15.639274
2251	history	\N	Route	1075	2021-04-25 22:58:15.717475	2021-04-25 22:58:15.717475
2252	gear	Cintas exprés, cuerda de 60m.	Route	1075	2021-04-25 22:58:15.722902	2021-04-25 22:58:15.722902
2253	history	\N	Route	1076	2021-04-25 22:58:15.807579	2021-04-25 22:58:15.807579
2254	gear	Cintas exprés, cuerda de 60m.	Route	1076	2021-04-25 22:58:15.815013	2021-04-25 22:58:15.815013
2255	history	\N	Route	1077	2021-04-25 22:58:15.901312	2021-04-25 22:58:15.901312
2256	gear	Cintas exprés, cuerda de 60m.	Route	1077	2021-04-25 22:58:15.908925	2021-04-25 22:58:15.908925
2257	history	\N	Route	1078	2021-04-25 22:58:15.987276	2021-04-25 22:58:15.987276
2258	gear	Cintas exprés, cuerda de 60m.	Route	1078	2021-04-25 22:58:15.992545	2021-04-25 22:58:15.992545
2259	history	\N	Route	1079	2021-04-25 22:58:16.065035	2021-04-25 22:58:16.065035
2260	gear	Cintas exprés, cuerda de 60m.	Route	1079	2021-04-25 22:58:16.070284	2021-04-25 22:58:16.070284
2261	history	\N	Route	1080	2021-04-25 22:58:16.175093	2021-04-25 22:58:16.175093
2262	gear	Cintas exprés, cuerda de 60m.	Route	1080	2021-04-25 22:58:16.180146	2021-04-25 22:58:16.180146
2263	history	\N	Route	1081	2021-04-25 22:58:16.333634	2021-04-25 22:58:16.333634
2264	gear	Cintas exprés, cuerda de 60m.	Route	1081	2021-04-25 22:58:16.343	2021-04-25 22:58:16.343
2265	history	\N	Route	1082	2021-04-25 22:58:16.455789	2021-04-25 22:58:16.455789
2266	gear	\N	Route	1082	2021-04-25 22:58:16.459773	2021-04-25 22:58:16.459773
2267	history	\N	Route	1083	2021-04-25 22:58:16.51141	2021-04-25 22:58:16.51141
2268	gear	\N	Route	1083	2021-04-25 22:58:16.515858	2021-04-25 22:58:16.515858
2269	history	\N	Route	1084	2021-04-25 22:58:16.592799	2021-04-25 22:58:16.592799
2270	gear	Cintas exprés, cuerda de 60m.	Route	1084	2021-04-25 22:58:16.599187	2021-04-25 22:58:16.599187
2271	history	\N	Route	1085	2021-04-25 22:58:16.67679	2021-04-25 22:58:16.67679
2272	gear	Cintas exprés, cuerda de 60m.	Route	1085	2021-04-25 22:58:16.682141	2021-04-25 22:58:16.682141
2273	history	\N	Route	1086	2021-04-25 22:58:16.765458	2021-04-25 22:58:16.765458
2274	gear	\N	Route	1086	2021-04-25 22:58:16.770087	2021-04-25 22:58:16.770087
2275	history	\N	Route	1087	2021-04-25 22:58:16.840545	2021-04-25 22:58:16.840545
2276	gear	Cintas exprés, cuerda de 60m.	Route	1087	2021-04-25 22:58:16.845763	2021-04-25 22:58:16.845763
2277	history	\N	Route	1088	2021-04-25 22:58:16.93211	2021-04-25 22:58:16.93211
2278	gear	\N	Route	1088	2021-04-25 22:58:16.937352	2021-04-25 22:58:16.937352
2279	history	\N	Route	1089	2021-04-25 22:58:17.011341	2021-04-25 22:58:17.011341
2280	gear	Cintas exprés, cuerda de 60m.	Route	1089	2021-04-25 22:58:17.021067	2021-04-25 22:58:17.021067
2281	history	\N	Route	1090	2021-04-25 22:58:17.111359	2021-04-25 22:58:17.111359
2282	gear	Cintas exprés, cuerda de 60m.	Route	1090	2021-04-25 22:58:17.124834	2021-04-25 22:58:17.124834
2283	history	\N	Route	1091	2021-04-25 22:58:17.211898	2021-04-25 22:58:17.211898
2284	gear	\N	Route	1091	2021-04-25 22:58:17.216288	2021-04-25 22:58:17.216288
2285	history	\N	Route	1092	2021-04-25 22:58:17.285475	2021-04-25 22:58:17.285475
2286	gear	\N	Route	1092	2021-04-25 22:58:17.289529	2021-04-25 22:58:17.289529
2287	history	\N	Route	1093	2021-04-25 22:58:17.366313	2021-04-25 22:58:17.366313
2288	gear	\N	Route	1093	2021-04-25 22:58:17.370766	2021-04-25 22:58:17.370766
2289	history	\N	Route	1094	2021-04-25 22:58:17.426663	2021-04-25 22:58:17.426663
2290	gear	\N	Route	1094	2021-04-25 22:58:17.430936	2021-04-25 22:58:17.430936
2291	history	\N	Route	1095	2021-04-25 22:58:17.519367	2021-04-25 22:58:17.519367
2292	gear	\N	Route	1095	2021-04-25 22:58:17.523587	2021-04-25 22:58:17.523587
2293	history	\N	Route	1096	2021-04-25 22:58:17.581404	2021-04-25 22:58:17.581404
2294	gear	Cintas exprés, cuerda de 60m.	Route	1096	2021-04-25 22:58:17.59136	2021-04-25 22:58:17.59136
2295	history	\N	Route	1097	2021-04-25 22:58:17.652056	2021-04-25 22:58:17.652056
2296	gear	Cintas exprés, cuerda de 60m.	Route	1097	2021-04-25 22:58:17.658935	2021-04-25 22:58:17.658935
2297	history	\N	Route	1098	2021-04-25 22:58:17.72504	2021-04-25 22:58:17.72504
2298	gear	Cintas exprés, cuerda de 60m.	Route	1098	2021-04-25 22:58:17.735517	2021-04-25 22:58:17.735517
2299	history	\N	Route	1099	2021-04-25 22:58:17.806554	2021-04-25 22:58:17.806554
2300	gear	\N	Route	1099	2021-04-25 22:58:17.810711	2021-04-25 22:58:17.810711
2301	history	\N	Route	1100	2021-04-25 22:58:17.863811	2021-04-25 22:58:17.863811
2302	gear	\N	Route	1100	2021-04-25 22:58:17.868052	2021-04-25 22:58:17.868052
2303	history	\N	Route	1101	2021-04-25 22:58:17.936423	2021-04-25 22:58:17.936423
2304	gear	Cintas exprés, cuerda de 60m.	Route	1101	2021-04-25 22:58:17.941928	2021-04-25 22:58:17.941928
2305	history	\N	Route	1102	2021-04-25 22:58:17.998256	2021-04-25 22:58:17.998256
2306	gear	\N	Route	1102	2021-04-25 22:58:18.002557	2021-04-25 22:58:18.002557
2307	history	\N	Route	1103	2021-04-25 22:58:18.085169	2021-04-25 22:58:18.085169
2308	gear	\N	Route	1103	2021-04-25 22:58:18.089305	2021-04-25 22:58:18.089305
2309	history	\N	Route	1104	2021-04-25 22:58:18.143901	2021-04-25 22:58:18.143901
2310	gear	Cintas exprés, cuerda de 60m.	Route	1104	2021-04-25 22:58:18.150495	2021-04-25 22:58:18.150495
2311	history	\N	Route	1105	2021-04-25 22:58:18.212161	2021-04-25 22:58:18.212161
2312	gear	Cintas exprés, cuerda de 60m.	Route	1105	2021-04-25 22:58:18.217717	2021-04-25 22:58:18.217717
2313	history	\N	Route	1106	2021-04-25 22:58:18.301917	2021-04-25 22:58:18.301917
2314	gear	Cintas exprés, cuerda de 60m.	Route	1106	2021-04-25 22:58:18.310972	2021-04-25 22:58:18.310972
2315	history	\N	Route	1107	2021-04-25 22:58:18.381353	2021-04-25 22:58:18.381353
2316	gear	Cintas exprés, cuerda de 60m.	Route	1107	2021-04-25 22:58:18.391538	2021-04-25 22:58:18.391538
2317	history	\N	Route	1108	2021-04-25 22:58:18.476932	2021-04-25 22:58:18.476932
2318	gear	Cintas exprés, cuerda de 60m.	Route	1108	2021-04-25 22:58:18.482564	2021-04-25 22:58:18.482564
2319	history	\N	Route	1109	2021-04-25 22:58:18.5478	2021-04-25 22:58:18.5478
2320	gear	\N	Route	1109	2021-04-25 22:58:18.552507	2021-04-25 22:58:18.552507
2321	history	\N	Route	1110	2021-04-25 22:58:18.613798	2021-04-25 22:58:18.613798
2322	gear	\N	Route	1110	2021-04-25 22:58:18.618516	2021-04-25 22:58:18.618516
2323	history	\N	Route	1111	2021-04-25 22:58:18.686537	2021-04-25 22:58:18.686537
2324	gear	\N	Route	1111	2021-04-25 22:58:18.691504	2021-04-25 22:58:18.691504
2325	history	\N	Route	1112	2021-04-25 22:58:18.757912	2021-04-25 22:58:18.757912
2326	gear	Cintas exprés, cuerda de 60m.	Route	1112	2021-04-25 22:58:18.765907	2021-04-25 22:58:18.765907
2327	history	\N	Route	1113	2021-04-25 22:58:18.884174	2021-04-25 22:58:18.884174
2328	gear	Cintas exprés, cuerda de 60m.	Route	1113	2021-04-25 22:58:18.906077	2021-04-25 22:58:18.906077
2329	history	\N	Route	1114	2021-04-25 22:58:18.972738	2021-04-25 22:58:18.972738
2330	gear	\N	Route	1114	2021-04-25 22:58:18.977695	2021-04-25 22:58:18.977695
2331	history	\N	Route	1115	2021-04-25 22:58:19.049479	2021-04-25 22:58:19.049479
2332	gear	\N	Route	1115	2021-04-25 22:58:19.05344	2021-04-25 22:58:19.05344
2333	history	\N	Route	1116	2021-04-25 22:58:19.120727	2021-04-25 22:58:19.120727
2334	gear	Cintas exprés, cuerda de 60m.	Route	1116	2021-04-25 22:58:19.126032	2021-04-25 22:58:19.126032
2335	history	\N	Route	1117	2021-04-25 22:58:19.198248	2021-04-25 22:58:19.198248
2336	gear	\N	Route	1117	2021-04-25 22:58:19.206136	2021-04-25 22:58:19.206136
2337	history	\N	Route	1118	2021-04-25 22:58:19.264007	2021-04-25 22:58:19.264007
2338	gear	Cintas exprés, cuerda de 60m.	Route	1118	2021-04-25 22:58:19.271275	2021-04-25 22:58:19.271275
2339	history	\N	Route	1119	2021-04-25 22:58:19.34617	2021-04-25 22:58:19.34617
2340	gear	\N	Route	1119	2021-04-25 22:58:19.3505	2021-04-25 22:58:19.3505
2341	history	\N	Route	1120	2021-04-25 22:58:19.417651	2021-04-25 22:58:19.417651
2342	gear	Cintas exprés, cuerda de 60m.	Route	1120	2021-04-25 22:58:19.424357	2021-04-25 22:58:19.424357
2343	history	\N	Route	1121	2021-04-25 22:58:19.48387	2021-04-25 22:58:19.48387
2344	gear	Cintas exprés, cuerda de 60m.	Route	1121	2021-04-25 22:58:19.489714	2021-04-25 22:58:19.489714
2345	history	\N	Route	1122	2021-04-25 22:58:19.556494	2021-04-25 22:58:19.556494
2346	gear	Cintas exprés, cuerda de 60m.	Route	1122	2021-04-25 22:58:19.562149	2021-04-25 22:58:19.562149
2347	history	\N	Route	1123	2021-04-25 22:58:19.62195	2021-04-25 22:58:19.62195
2348	gear	Cintas exprés, cuerda de 60m.	Route	1123	2021-04-25 22:58:19.631552	2021-04-25 22:58:19.631552
2349	history	\N	Route	1124	2021-04-25 22:58:19.716267	2021-04-25 22:58:19.716267
2350	gear	\N	Route	1124	2021-04-25 22:58:19.720456	2021-04-25 22:58:19.720456
2351	history	\N	Route	1125	2021-04-25 22:58:19.780944	2021-04-25 22:58:19.780944
2352	gear	\N	Route	1125	2021-04-25 22:58:19.785057	2021-04-25 22:58:19.785057
2353	history	\N	Route	1126	2021-04-25 22:58:19.846535	2021-04-25 22:58:19.846535
2354	gear	\N	Route	1126	2021-04-25 22:58:19.852866	2021-04-25 22:58:19.852866
2355	history	\N	Route	1127	2021-04-25 22:58:19.929724	2021-04-25 22:58:19.929724
2356	gear	\N	Route	1127	2021-04-25 22:58:19.934087	2021-04-25 22:58:19.934087
2357	history	\N	Route	1128	2021-04-25 22:58:20.105209	2021-04-25 22:58:20.105209
2358	gear	\N	Route	1128	2021-04-25 22:58:20.109485	2021-04-25 22:58:20.109485
2359	history	\N	Route	1129	2021-04-25 22:58:20.173136	2021-04-25 22:58:20.173136
2360	gear	Cintas exprés, cuerda de 60m.	Route	1129	2021-04-25 22:58:20.178444	2021-04-25 22:58:20.178444
2361	history	\N	Route	1130	2021-04-25 22:58:20.243441	2021-04-25 22:58:20.243441
2362	gear	\N	Route	1130	2021-04-25 22:58:20.247748	2021-04-25 22:58:20.247748
2363	history	\N	Route	1131	2021-04-25 22:58:20.326806	2021-04-25 22:58:20.326806
2364	gear	\N	Route	1131	2021-04-25 22:58:20.331074	2021-04-25 22:58:20.331074
2365	history	\N	Route	1132	2021-04-25 22:58:20.4033	2021-04-25 22:58:20.4033
2366	gear	\N	Route	1132	2021-04-25 22:58:20.422052	2021-04-25 22:58:20.422052
2367	history	\N	Route	1133	2021-04-25 22:58:20.497789	2021-04-25 22:58:20.497789
2368	gear	\N	Route	1133	2021-04-25 22:58:20.501779	2021-04-25 22:58:20.501779
2369	history	\N	Route	1134	2021-04-25 22:58:20.590453	2021-04-25 22:58:20.590453
2370	gear	Cintas exprés, cuerda de 60m.	Route	1134	2021-04-25 22:58:20.596461	2021-04-25 22:58:20.596461
2371	history	\N	Route	1135	2021-04-25 22:58:20.673033	2021-04-25 22:58:20.673033
2372	gear	\N	Route	1135	2021-04-25 22:58:20.677125	2021-04-25 22:58:20.677125
2373	history	\N	Route	1136	2021-04-25 22:58:20.730623	2021-04-25 22:58:20.730623
2374	gear	\N	Route	1136	2021-04-25 22:58:20.735051	2021-04-25 22:58:20.735051
2375	history	\N	Route	1137	2021-04-25 22:58:20.802487	2021-04-25 22:58:20.802487
2376	gear	\N	Route	1137	2021-04-25 22:58:20.806745	2021-04-25 22:58:20.806745
2377	history	\N	Route	1138	2021-04-25 22:58:20.860309	2021-04-25 22:58:20.860309
2378	gear	Cintas exprés, cuerda de 60m.	Route	1138	2021-04-25 22:58:20.86607	2021-04-25 22:58:20.86607
2379	history	\N	Route	1139	2021-04-25 22:58:20.961897	2021-04-25 22:58:20.961897
2380	gear	Cintas exprés, cuerda de 60m.	Route	1139	2021-04-25 22:58:20.968404	2021-04-25 22:58:20.968404
2381	history	\N	Route	1140	2021-04-25 22:58:21.045042	2021-04-25 22:58:21.045042
2382	gear	Cintas exprés, cuerda de 60m.	Route	1140	2021-04-25 22:58:21.051005	2021-04-25 22:58:21.051005
2383	history	\N	Route	1141	2021-04-25 22:58:21.122194	2021-04-25 22:58:21.122194
2384	gear	Cintas exprés, cuerda de 60m.	Route	1141	2021-04-25 22:58:21.127525	2021-04-25 22:58:21.127525
2385	history	\N	Route	1142	2021-04-25 22:58:21.185975	2021-04-25 22:58:21.185975
2386	gear	Cintas exprés, cuerda de 60m.	Route	1142	2021-04-25 22:58:21.192594	2021-04-25 22:58:21.192594
2387	history	\N	Route	1143	2021-04-25 22:58:21.255448	2021-04-25 22:58:21.255448
2388	gear	\N	Route	1143	2021-04-25 22:58:21.259771	2021-04-25 22:58:21.259771
2389	history	\N	Route	1144	2021-04-25 22:58:21.3385	2021-04-25 22:58:21.3385
2390	gear	Cintas exprés, cuerda de 60m.	Route	1144	2021-04-25 22:58:21.344368	2021-04-25 22:58:21.344368
2391	history	\N	Route	1145	2021-04-25 22:58:21.433172	2021-04-25 22:58:21.433172
2392	gear	Cintas exprés, cuerda de 60m.	Route	1145	2021-04-25 22:58:21.438572	2021-04-25 22:58:21.438572
2393	history	\N	Route	1146	2021-04-25 22:58:21.511672	2021-04-25 22:58:21.511672
2394	gear	\N	Route	1146	2021-04-25 22:58:21.51609	2021-04-25 22:58:21.51609
2395	history	\N	Route	1147	2021-04-25 22:58:21.56982	2021-04-25 22:58:21.56982
2396	gear	\N	Route	1147	2021-04-25 22:58:21.576829	2021-04-25 22:58:21.576829
2397	history	\N	Route	1148	2021-04-25 22:58:21.64536	2021-04-25 22:58:21.64536
2398	gear	Cintas exprés, cuerda de 60m.	Route	1148	2021-04-25 22:58:21.653667	2021-04-25 22:58:21.653667
2399	history	\N	Route	1149	2021-04-25 22:58:21.713688	2021-04-25 22:58:21.713688
2400	gear	Cintas exprés, cuerda de 60m.	Route	1149	2021-04-25 22:58:21.718816	2021-04-25 22:58:21.718816
2401	history	\N	Route	1150	2021-04-25 22:58:21.803576	2021-04-25 22:58:21.803576
2402	gear	Cintas exprés, cuerda de 60m.	Route	1150	2021-04-25 22:58:21.81584	2021-04-25 22:58:21.81584
2403	history	\N	Route	1151	2021-04-25 22:58:21.939243	2021-04-25 22:58:21.939243
2404	gear	\N	Route	1151	2021-04-25 22:58:21.950305	2021-04-25 22:58:21.950305
2405	history	\N	Route	1152	2021-04-25 22:58:22.03996	2021-04-25 22:58:22.03996
2406	gear	Cintas exprés, cuerda de 60m.	Route	1152	2021-04-25 22:58:22.046686	2021-04-25 22:58:22.046686
2407	history	\N	Route	1153	2021-04-25 22:58:22.105557	2021-04-25 22:58:22.105557
2408	gear	Cintas exprés, cuerda de 60m.	Route	1153	2021-04-25 22:58:22.110698	2021-04-25 22:58:22.110698
2409	history	\N	Route	1154	2021-04-25 22:58:22.170863	2021-04-25 22:58:22.170863
2410	gear	Cintas exprés, cuerda de 60m.	Route	1154	2021-04-25 22:58:22.176882	2021-04-25 22:58:22.176882
2411	history	\N	Route	1155	2021-04-25 22:58:22.237268	2021-04-25 22:58:22.237268
2412	gear	Cintas exprés, cuerda de 60m.	Route	1155	2021-04-25 22:58:22.242842	2021-04-25 22:58:22.242842
2413	history	\N	Route	1156	2021-04-25 22:58:22.333855	2021-04-25 22:58:22.333855
2414	gear	Cintas exprés, cuerda de 60m.	Route	1156	2021-04-25 22:58:22.34317	2021-04-25 22:58:22.34317
2415	history	\N	Route	1157	2021-04-25 22:58:22.453633	2021-04-25 22:58:22.453633
2416	gear	Cintas exprés, cuerda de 60m.	Route	1157	2021-04-25 22:58:22.458863	2021-04-25 22:58:22.458863
2417	history	\N	Route	1158	2021-04-25 22:58:22.524591	2021-04-25 22:58:22.524591
2418	gear	Cintas exprés, cuerda de 60m.	Route	1158	2021-04-25 22:58:22.530079	2021-04-25 22:58:22.530079
2419	history	\N	Route	1159	2021-04-25 22:58:22.589879	2021-04-25 22:58:22.589879
2420	gear	Cintas exprés, cuerda de 60m.	Route	1159	2021-04-25 22:58:22.599211	2021-04-25 22:58:22.599211
2421	history	\N	Route	1160	2021-04-25 22:58:22.692868	2021-04-25 22:58:22.692868
2422	gear	Cintas exprés, cuerda de 60m.	Route	1160	2021-04-25 22:58:22.700627	2021-04-25 22:58:22.700627
2423	history	\N	Route	1161	2021-04-25 22:58:22.763672	2021-04-25 22:58:22.763672
2424	gear	Cintas exprés, cuerda de 60m.	Route	1161	2021-04-25 22:58:22.769599	2021-04-25 22:58:22.769599
2425	history	\N	Route	1162	2021-04-25 22:58:22.837795	2021-04-25 22:58:22.837795
2426	gear	Cintas exprés, cuerda de 60m.	Route	1162	2021-04-25 22:58:22.845272	2021-04-25 22:58:22.845272
2427	history	\N	Route	1163	2021-04-25 22:58:22.915106	2021-04-25 22:58:22.915106
2428	gear	Cintas exprés, cuerda de 60m.	Route	1163	2021-04-25 22:58:22.92092	2021-04-25 22:58:22.92092
2429	history	\N	Route	1164	2021-04-25 22:58:22.977142	2021-04-25 22:58:22.977142
2430	gear	Cintas exprés, cuerda de 60m.	Route	1164	2021-04-25 22:58:22.982764	2021-04-25 22:58:22.982764
2431	history	\N	Route	1165	2021-04-25 22:58:23.041857	2021-04-25 22:58:23.041857
2432	gear	Cintas exprés, cuerda de 60m.	Route	1165	2021-04-25 22:58:23.051354	2021-04-25 22:58:23.051354
2433	history	\N	Route	1166	2021-04-25 22:58:23.117204	2021-04-25 22:58:23.117204
2434	gear	Cintas exprés, cuerda de 60m.	Route	1166	2021-04-25 22:58:23.123367	2021-04-25 22:58:23.123367
2435	history	\N	Route	1167	2021-04-25 22:58:23.289498	2021-04-25 22:58:23.289498
2436	gear	Cintas exprés, cuerda de 60m.	Route	1167	2021-04-25 22:58:23.301641	2021-04-25 22:58:23.301641
2437	history	\N	Route	1168	2021-04-25 22:58:23.386154	2021-04-25 22:58:23.386154
2438	gear	Cintas exprés, cuerda de 60m.	Route	1168	2021-04-25 22:58:23.392701	2021-04-25 22:58:23.392701
2439	history	\N	Route	1169	2021-04-25 22:58:23.48853	2021-04-25 22:58:23.48853
2440	gear	Cintas exprés, cuerda de 60m.	Route	1169	2021-04-25 22:58:23.494017	2021-04-25 22:58:23.494017
2441	history	\N	Route	1170	2021-04-25 22:58:23.550669	2021-04-25 22:58:23.550669
2442	gear	Cintas exprés, cuerda de 60m.	Route	1170	2021-04-25 22:58:23.559562	2021-04-25 22:58:23.559562
2443	history	\N	Route	1171	2021-04-25 22:58:23.644422	2021-04-25 22:58:23.644422
2444	gear	Cintas exprés, cuerda de 60m.	Route	1171	2021-04-25 22:58:23.649582	2021-04-25 22:58:23.649582
2445	history	\N	Route	1172	2021-04-25 22:58:23.715909	2021-04-25 22:58:23.715909
2446	gear	Cintas exprés, cuerda de 60m.	Route	1172	2021-04-25 22:58:23.723283	2021-04-25 22:58:23.723283
2447	history	\N	Route	1173	2021-04-25 22:58:23.815203	2021-04-25 22:58:23.815203
2448	gear	\N	Route	1173	2021-04-25 22:58:23.819523	2021-04-25 22:58:23.819523
2449	history	\N	Route	1174	2021-04-25 22:58:23.883659	2021-04-25 22:58:23.883659
2450	gear	\N	Route	1174	2021-04-25 22:58:23.888838	2021-04-25 22:58:23.888838
2451	history	\N	Route	1175	2021-04-25 22:58:23.960533	2021-04-25 22:58:23.960533
2452	gear	Cintas exprés, cuerda de 60m.	Route	1175	2021-04-25 22:58:23.966585	2021-04-25 22:58:23.966585
2453	history	\N	Route	1176	2021-04-25 22:58:24.048486	2021-04-25 22:58:24.048486
2454	gear	Cintas exprés, cuerda de 60m.	Route	1176	2021-04-25 22:58:24.054278	2021-04-25 22:58:24.054278
2455	history	\N	Route	1177	2021-04-25 22:58:24.141701	2021-04-25 22:58:24.141701
2456	gear	Cintas exprés, cuerda de 60m.	Route	1177	2021-04-25 22:58:24.150836	2021-04-25 22:58:24.150836
2457	history	\N	Route	1178	2021-04-25 22:58:24.236311	2021-04-25 22:58:24.236311
2458	gear	\N	Route	1178	2021-04-25 22:58:24.240928	2021-04-25 22:58:24.240928
2459	history	\N	Route	1179	2021-04-25 22:58:24.309755	2021-04-25 22:58:24.309755
2460	gear	\N	Route	1179	2021-04-25 22:58:24.316333	2021-04-25 22:58:24.316333
2461	history	\N	Route	1180	2021-04-25 22:58:24.393819	2021-04-25 22:58:24.393819
2462	gear	\N	Route	1180	2021-04-25 22:58:24.402566	2021-04-25 22:58:24.402566
2463	history	\N	Route	1181	2021-04-25 22:58:24.465981	2021-04-25 22:58:24.465981
2464	gear	\N	Route	1181	2021-04-25 22:58:24.471589	2021-04-25 22:58:24.471589
2465	history	\N	Route	1182	2021-04-25 22:58:24.541197	2021-04-25 22:58:24.541197
2466	gear	Cintas exprés, cuerda de 60m.	Route	1182	2021-04-25 22:58:24.548307	2021-04-25 22:58:24.548307
2467	history	\N	Route	1183	2021-04-25 22:58:24.611746	2021-04-25 22:58:24.611746
2468	gear	Cintas exprés, cuerda de 60m.	Route	1183	2021-04-25 22:58:24.626919	2021-04-25 22:58:24.626919
2469	history	\N	Route	1184	2021-04-25 22:58:24.736452	2021-04-25 22:58:24.736452
2470	gear	\N	Route	1184	2021-04-25 22:58:24.740714	2021-04-25 22:58:24.740714
2471	history	\N	Route	1185	2021-04-25 22:58:24.812424	2021-04-25 22:58:24.812424
2472	gear	\N	Route	1185	2021-04-25 22:58:24.816584	2021-04-25 22:58:24.816584
2473	history	\N	Route	1186	2021-04-25 22:58:24.882281	2021-04-25 22:58:24.882281
2474	gear	Cintas exprés, cuerda de 60m.	Route	1186	2021-04-25 22:58:24.887794	2021-04-25 22:58:24.887794
2475	history	\N	Route	1187	2021-04-25 22:58:24.974851	2021-04-25 22:58:24.974851
2476	gear	\N	Route	1187	2021-04-25 22:58:24.97956	2021-04-25 22:58:24.97956
2477	history	\N	Route	1188	2021-04-25 22:58:25.043409	2021-04-25 22:58:25.043409
2478	gear	Cintas exprés, cuerda de 60m.	Route	1188	2021-04-25 22:58:25.048877	2021-04-25 22:58:25.048877
2479	history	\N	Route	1189	2021-04-25 22:58:25.126371	2021-04-25 22:58:25.126371
2480	gear	Cintas exprés, cuerda de 60m.	Route	1189	2021-04-25 22:58:25.131879	2021-04-25 22:58:25.131879
2481	history	\N	Route	1190	2021-04-25 22:58:25.19823	2021-04-25 22:58:25.19823
2482	gear	Cintas exprés, cuerda de 60m.	Route	1190	2021-04-25 22:58:25.203984	2021-04-25 22:58:25.203984
2483	history	\N	Route	1191	2021-04-25 22:58:25.280678	2021-04-25 22:58:25.280678
2484	gear	Cintas exprés, cuerda de 60m.	Route	1191	2021-04-25 22:58:25.291167	2021-04-25 22:58:25.291167
2485	history	\N	Route	1192	2021-04-25 22:58:25.360005	2021-04-25 22:58:25.360005
2486	gear	Cintas exprés, cuerda de 60m.	Route	1192	2021-04-25 22:58:25.379161	2021-04-25 22:58:25.379161
2487	history	\N	Route	1193	2021-04-25 22:58:25.461182	2021-04-25 22:58:25.461182
2488	gear	Cintas exprés, cuerda de 60m.	Route	1193	2021-04-25 22:58:25.466437	2021-04-25 22:58:25.466437
2489	history	\N	Route	1194	2021-04-25 22:58:25.541227	2021-04-25 22:58:25.541227
2490	gear	Cintas exprés, cuerda de 60m.	Route	1194	2021-04-25 22:58:25.546645	2021-04-25 22:58:25.546645
2491	history	\N	Route	1195	2021-04-25 22:58:25.623707	2021-04-25 22:58:25.623707
2492	gear	Cintas exprés, cuerda de 60m.	Route	1195	2021-04-25 22:58:25.631622	2021-04-25 22:58:25.631622
2493	history	\N	Route	1196	2021-04-25 22:58:25.717016	2021-04-25 22:58:25.717016
2494	gear	Cintas exprés, cuerda de 60m.	Route	1196	2021-04-25 22:58:25.724203	2021-04-25 22:58:25.724203
2495	history	\N	Route	1197	2021-04-25 22:58:25.794236	2021-04-25 22:58:25.794236
2496	gear	Cintas exprés, cuerda de 60m.	Route	1197	2021-04-25 22:58:25.799852	2021-04-25 22:58:25.799852
2497	history	\N	Route	1198	2021-04-25 22:58:25.861756	2021-04-25 22:58:25.861756
2498	gear	Cintas exprés, cuerda de 60m.	Route	1198	2021-04-25 22:58:25.868527	2021-04-25 22:58:25.868527
2499	history	\N	Route	1199	2021-04-25 22:58:25.933855	2021-04-25 22:58:25.933855
2500	gear	Cintas exprés, cuerda de 60m.	Route	1199	2021-04-25 22:58:25.939509	2021-04-25 22:58:25.939509
2501	history	\N	Route	1200	2021-04-25 22:58:26.002556	2021-04-25 22:58:26.002556
2502	gear	Cintas exprés, cuerda de 60m.	Route	1200	2021-04-25 22:58:26.007654	2021-04-25 22:58:26.007654
2503	history	\N	Route	1201	2021-04-25 22:58:26.06716	2021-04-25 22:58:26.06716
2504	gear	Cintas exprés, cuerda de 60m.	Route	1201	2021-04-25 22:58:26.073987	2021-04-25 22:58:26.073987
2505	history	\N	Route	1202	2021-04-25 22:58:26.135815	2021-04-25 22:58:26.135815
2506	gear	Cintas exprés, cuerda de 60m.	Route	1202	2021-04-25 22:58:26.141459	2021-04-25 22:58:26.141459
2507	history	\N	Route	1203	2021-04-25 22:58:26.201075	2021-04-25 22:58:26.201075
2508	gear	Cintas exprés, cuerda de 60m.	Route	1203	2021-04-25 22:58:26.206924	2021-04-25 22:58:26.206924
2509	history	\N	Route	1204	2021-04-25 22:58:26.293629	2021-04-25 22:58:26.293629
2510	gear	Cintas exprés, cuerda de 60m.	Route	1204	2021-04-25 22:58:26.304471	2021-04-25 22:58:26.304471
2511	history	\N	Route	1205	2021-04-25 22:58:26.380756	2021-04-25 22:58:26.380756
2512	gear	Cintas exprés, cuerda de 60m.	Route	1205	2021-04-25 22:58:26.399405	2021-04-25 22:58:26.399405
2513	history	\N	Route	1206	2021-04-25 22:58:26.48261	2021-04-25 22:58:26.48261
2514	gear	Cintas exprés, cuerda de 60m.	Route	1206	2021-04-25 22:58:26.48772	2021-04-25 22:58:26.48772
2515	history	\N	Route	1207	2021-04-25 22:58:26.546551	2021-04-25 22:58:26.546551
2516	gear	Cintas exprés, cuerda de 60m.	Route	1207	2021-04-25 22:58:26.55275	2021-04-25 22:58:26.55275
2517	history	\N	Route	1208	2021-04-25 22:58:26.612353	2021-04-25 22:58:26.612353
2518	gear	Cintas exprés, cuerda de 60m.	Route	1208	2021-04-25 22:58:26.61853	2021-04-25 22:58:26.61853
2519	history	\N	Route	1209	2021-04-25 22:58:26.722078	2021-04-25 22:58:26.722078
2520	gear	Cintas exprés, cuerda de 60m.	Route	1209	2021-04-25 22:58:26.727671	2021-04-25 22:58:26.727671
2521	history	\N	Route	1210	2021-04-25 22:58:26.809927	2021-04-25 22:58:26.809927
2522	gear	Cintas exprés, cuerda de 60m.	Route	1210	2021-04-25 22:58:26.816255	2021-04-25 22:58:26.816255
2523	history	\N	Route	1211	2021-04-25 22:58:26.915853	2021-04-25 22:58:26.915853
2524	gear	Cintas exprés, cuerda de 60m.	Route	1211	2021-04-25 22:58:26.92125	2021-04-25 22:58:26.92125
2525	history	\N	Route	1212	2021-04-25 22:58:26.996851	2021-04-25 22:58:26.996851
2526	gear	Cintas exprés, cuerda de 60m.	Route	1212	2021-04-25 22:58:27.002105	2021-04-25 22:58:27.002105
2527	history	\N	Route	1213	2021-04-25 22:58:27.093293	2021-04-25 22:58:27.093293
2528	gear	Cintas exprés, cuerda de 60m.	Route	1213	2021-04-25 22:58:27.100958	2021-04-25 22:58:27.100958
2529	history	\N	Route	1214	2021-04-25 22:58:27.19344	2021-04-25 22:58:27.19344
2530	gear	Cintas exprés, cuerda de 60m.	Route	1214	2021-04-25 22:58:27.20297	2021-04-25 22:58:27.20297
2531	history	\N	Route	1215	2021-04-25 22:58:27.281036	2021-04-25 22:58:27.281036
2532	gear	Cintas exprés, cuerda de 60m.	Route	1215	2021-04-25 22:58:27.288617	2021-04-25 22:58:27.288617
2533	history	\N	Route	1216	2021-04-25 22:58:27.401178	2021-04-25 22:58:27.401178
2534	gear	Cintas exprés, cuerda de 60m.	Route	1216	2021-04-25 22:58:27.406828	2021-04-25 22:58:27.406828
2535	history	\N	Route	1217	2021-04-25 22:58:27.471951	2021-04-25 22:58:27.471951
2536	gear	Cintas exprés, cuerda de 60m.	Route	1217	2021-04-25 22:58:27.477287	2021-04-25 22:58:27.477287
2537	history	\N	Route	1218	2021-04-25 22:58:27.542488	2021-04-25 22:58:27.542488
2538	gear	Cintas exprés, cuerda de 60m.	Route	1218	2021-04-25 22:58:27.547775	2021-04-25 22:58:27.547775
2539	history	\N	Route	1219	2021-04-25 22:58:27.621339	2021-04-25 22:58:27.621339
2540	gear	Cintas exprés, cuerda de 60m.	Route	1219	2021-04-25 22:58:27.627283	2021-04-25 22:58:27.627283
2541	history	\N	Route	1220	2021-04-25 22:58:27.706145	2021-04-25 22:58:27.706145
2542	gear	Cintas exprés, cuerda de 60m.	Route	1220	2021-04-25 22:58:27.713238	2021-04-25 22:58:27.713238
2543	history	\N	Route	1221	2021-04-25 22:58:27.820766	2021-04-25 22:58:27.820766
2544	gear	Cintas exprés, cuerda de 60m.	Route	1221	2021-04-25 22:58:27.826724	2021-04-25 22:58:27.826724
2545	history	\N	Route	1222	2021-04-25 22:58:27.888427	2021-04-25 22:58:27.888427
2546	gear	Cintas exprés, cuerda de 60m.	Route	1222	2021-04-25 22:58:27.893855	2021-04-25 22:58:27.893855
2547	history	\N	Route	1223	2021-04-25 22:58:27.98032	2021-04-25 22:58:27.98032
2548	gear	Cintas exprés, cuerda de 60m.	Route	1223	2021-04-25 22:58:27.98691	2021-04-25 22:58:27.98691
2549	history	\N	Route	1224	2021-04-25 22:58:28.0738	2021-04-25 22:58:28.0738
2550	gear	Cintas exprés, cuerda de 60m.	Route	1224	2021-04-25 22:58:28.080666	2021-04-25 22:58:28.080666
2551	history	\N	Route	1225	2021-04-25 22:58:28.160925	2021-04-25 22:58:28.160925
2552	gear	Cintas exprés, cuerda de 60m.	Route	1225	2021-04-25 22:58:28.166515	2021-04-25 22:58:28.166515
2553	history	\N	Route	1226	2021-04-25 22:58:28.249647	2021-04-25 22:58:28.249647
2554	gear	Cintas exprés, cuerda de 60m.	Route	1226	2021-04-25 22:58:28.255103	2021-04-25 22:58:28.255103
2555	history	\N	Route	1227	2021-04-25 22:58:28.354225	2021-04-25 22:58:28.354225
2556	gear	Cintas exprés, cuerda de 60m.	Route	1227	2021-04-25 22:58:28.366703	2021-04-25 22:58:28.366703
2557	history	\N	Route	1228	2021-04-25 22:58:28.425822	2021-04-25 22:58:28.425822
2558	gear	Cintas exprés, cuerda de 60m.	Route	1228	2021-04-25 22:58:28.431005	2021-04-25 22:58:28.431005
2559	history	\N	Route	1229	2021-04-25 22:58:28.498674	2021-04-25 22:58:28.498674
2560	gear	Cintas exprés, cuerda de 60m.	Route	1229	2021-04-25 22:58:28.505746	2021-04-25 22:58:28.505746
2561	history	\N	Route	1230	2021-04-25 22:58:28.562293	2021-04-25 22:58:28.562293
2562	gear	Cintas exprés, cuerda de 60m.	Route	1230	2021-04-25 22:58:28.567467	2021-04-25 22:58:28.567467
2563	history	\N	Route	1231	2021-04-25 22:58:28.660415	2021-04-25 22:58:28.660415
2564	gear	Cintas exprés, cuerda de 60m.	Route	1231	2021-04-25 22:58:28.671166	2021-04-25 22:58:28.671166
2565	history	\N	Route	1232	2021-04-25 22:58:28.741541	2021-04-25 22:58:28.741541
2566	gear	Cintas exprés, cuerda de 60m.	Route	1232	2021-04-25 22:58:28.748204	2021-04-25 22:58:28.748204
2567	history	\N	Route	1233	2021-04-25 22:58:28.842685	2021-04-25 22:58:28.842685
2568	gear	Cintas exprés, cuerda de 60m.	Route	1233	2021-04-25 22:58:28.849192	2021-04-25 22:58:28.849192
2569	history	\N	Route	1234	2021-04-25 22:58:28.926807	2021-04-25 22:58:28.926807
2570	gear	Cintas exprés, cuerda de 60m.	Route	1234	2021-04-25 22:58:28.937176	2021-04-25 22:58:28.937176
2571	history	\N	Route	1235	2021-04-25 22:58:29.005633	2021-04-25 22:58:29.005633
2572	gear	Cintas exprés, cuerda de 60m.	Route	1235	2021-04-25 22:58:29.011304	2021-04-25 22:58:29.011304
2573	history	\N	Route	1236	2021-04-25 22:58:29.095762	2021-04-25 22:58:29.095762
2574	gear	Cintas exprés, cuerda de 60m.	Route	1236	2021-04-25 22:58:29.101799	2021-04-25 22:58:29.101799
2575	history	\N	Route	1237	2021-04-25 22:58:29.173675	2021-04-25 22:58:29.173675
2576	gear	Cintas exprés, cuerda de 60m.	Route	1237	2021-04-25 22:58:29.179813	2021-04-25 22:58:29.179813
2577	history	\N	Route	1238	2021-04-25 22:58:29.24895	2021-04-25 22:58:29.24895
2578	gear	Cintas exprés, cuerda de 60m.	Route	1238	2021-04-25 22:58:29.255097	2021-04-25 22:58:29.255097
2579	history	\N	Route	1239	2021-04-25 22:58:29.334635	2021-04-25 22:58:29.334635
2580	gear	Cintas exprés, cuerda de 60m.	Route	1239	2021-04-25 22:58:29.343228	2021-04-25 22:58:29.343228
2581	history	\N	Route	1240	2021-04-25 22:58:29.412059	2021-04-25 22:58:29.412059
2582	gear	Cintas exprés, cuerda de 60m.	Route	1240	2021-04-25 22:58:29.417851	2021-04-25 22:58:29.417851
2583	history	\N	Route	1241	2021-04-25 22:58:29.517138	2021-04-25 22:58:29.517138
2584	gear	Cintas exprés, cuerda de 60m.	Route	1241	2021-04-25 22:58:29.523625	2021-04-25 22:58:29.523625
2585	history	\N	Route	1242	2021-04-25 22:58:29.582945	2021-04-25 22:58:29.582945
2586	gear	Cintas exprés, cuerda de 60m.	Route	1242	2021-04-25 22:58:29.588639	2021-04-25 22:58:29.588639
2587	history	\N	Route	1243	2021-04-25 22:58:29.65385	2021-04-25 22:58:29.65385
2588	gear	\N	Route	1243	2021-04-25 22:58:29.662572	2021-04-25 22:58:29.662572
2589	history	\N	Route	1244	2021-04-25 22:58:29.740113	2021-04-25 22:58:29.740113
2590	gear	Cintas exprés, cuerda de 60m.	Route	1244	2021-04-25 22:58:29.745667	2021-04-25 22:58:29.745667
2591	history	\N	Route	1245	2021-04-25 22:58:29.817254	2021-04-25 22:58:29.817254
2592	gear	\N	Route	1245	2021-04-25 22:58:29.821627	2021-04-25 22:58:29.821627
2593	history	\N	Route	1246	2021-04-25 22:58:29.874697	2021-04-25 22:58:29.874697
2594	gear	Cintas exprés, cuerda de 60m.	Route	1246	2021-04-25 22:58:29.880181	2021-04-25 22:58:29.880181
2595	history	\N	Route	1247	2021-04-25 22:58:29.963021	2021-04-25 22:58:29.963021
2596	gear	Cintas exprés, cuerda de 60m.	Route	1247	2021-04-25 22:58:29.968681	2021-04-25 22:58:29.968681
2597	history	\N	Route	1248	2021-04-25 22:58:30.072803	2021-04-25 22:58:30.072803
2598	gear	Cintas exprés, cuerda de 60m.	Route	1248	2021-04-25 22:58:30.079069	2021-04-25 22:58:30.079069
2599	history	\N	Route	1249	2021-04-25 22:58:30.138782	2021-04-25 22:58:30.138782
2600	gear	Cintas exprés, cuerda de 60m.	Route	1249	2021-04-25 22:58:30.14417	2021-04-25 22:58:30.14417
2601	history	\N	Route	1250	2021-04-25 22:58:30.219936	2021-04-25 22:58:30.219936
2602	gear	Cintas exprés, cuerda de 60m.	Route	1250	2021-04-25 22:58:30.227237	2021-04-25 22:58:30.227237
2603	history	\N	Route	1251	2021-04-25 22:58:30.301779	2021-04-25 22:58:30.301779
2604	gear	Cintas exprés, cuerda de 60m.	Route	1251	2021-04-25 22:58:30.311	2021-04-25 22:58:30.311
2605	history	\N	Route	1252	2021-04-25 22:58:30.380749	2021-04-25 22:58:30.380749
2606	gear	\N	Route	1252	2021-04-25 22:58:30.385083	2021-04-25 22:58:30.385083
2607	history	\N	Route	1253	2021-04-25 22:58:30.461016	2021-04-25 22:58:30.461016
2608	gear	Cintas exprés, cuerda de 60m.	Route	1253	2021-04-25 22:58:30.466779	2021-04-25 22:58:30.466779
2609	history	\N	Route	1254	2021-04-25 22:58:30.533772	2021-04-25 22:58:30.533772
2610	gear	Cintas exprés, cuerda de 60m.	Route	1254	2021-04-25 22:58:30.53957	2021-04-25 22:58:30.53957
2611	history	\N	Route	1255	2021-04-25 22:58:30.600188	2021-04-25 22:58:30.600188
2612	gear	Cintas exprés, cuerda de 60m.	Route	1255	2021-04-25 22:58:30.605687	2021-04-25 22:58:30.605687
2613	history	\N	Route	1256	2021-04-25 22:58:30.720652	2021-04-25 22:58:30.720652
2614	gear	Cintas exprés, cuerda de 60m.	Route	1256	2021-04-25 22:58:30.725965	2021-04-25 22:58:30.725965
2615	history	\N	Route	1257	2021-04-25 22:58:30.808667	2021-04-25 22:58:30.808667
2616	gear	Cintas exprés, cuerda de 60m.	Route	1257	2021-04-25 22:58:30.814263	2021-04-25 22:58:30.814263
2617	history	\N	Route	1258	2021-04-25 22:58:30.875408	2021-04-25 22:58:30.875408
2618	gear	Cintas exprés, cuerda de 60m.	Route	1258	2021-04-25 22:58:30.880954	2021-04-25 22:58:30.880954
2619	history	\N	Route	1259	2021-04-25 22:58:30.9741	2021-04-25 22:58:30.9741
2620	gear	Cintas exprés, cuerda de 60m.	Route	1259	2021-04-25 22:58:30.979957	2021-04-25 22:58:30.979957
2621	history	\N	Route	1260	2021-04-25 22:58:31.049601	2021-04-25 22:58:31.049601
2622	gear	Cintas exprés, cuerda de 60m.	Route	1260	2021-04-25 22:58:31.054286	2021-04-25 22:58:31.054286
2623	history	\N	Route	1261	2021-04-25 22:58:31.117751	2021-04-25 22:58:31.117751
2624	gear	Cintas exprés, cuerda de 60m.	Route	1261	2021-04-25 22:58:31.127256	2021-04-25 22:58:31.127256
2625	history	\N	Route	1262	2021-04-25 22:58:31.244839	2021-04-25 22:58:31.244839
2626	gear	Cintas exprés, cuerda de 60m.	Route	1262	2021-04-25 22:58:31.252566	2021-04-25 22:58:31.252566
2627	history	\N	Route	1263	2021-04-25 22:58:31.364829	2021-04-25 22:58:31.364829
2628	gear	Cintas exprés, cuerda de 60m.	Route	1263	2021-04-25 22:58:31.37293	2021-04-25 22:58:31.37293
2629	history	\N	Route	1264	2021-04-25 22:58:31.459365	2021-04-25 22:58:31.459365
2630	gear	Cintas exprés, cuerda de 60m.	Route	1264	2021-04-25 22:58:31.478312	2021-04-25 22:58:31.478312
2631	history	\N	Route	1265	2021-04-25 22:58:31.554017	2021-04-25 22:58:31.554017
2632	gear	Cintas exprés, cuerda de 60m.	Route	1265	2021-04-25 22:58:31.55995	2021-04-25 22:58:31.55995
2633	history	\N	Route	1266	2021-04-25 22:58:31.649795	2021-04-25 22:58:31.649795
2634	gear	Cintas exprés, cuerda de 60m.	Route	1266	2021-04-25 22:58:31.664567	2021-04-25 22:58:31.664567
2635	history	\N	Route	1267	2021-04-25 22:58:31.759195	2021-04-25 22:58:31.759195
2636	gear	Cintas exprés, cuerda de 60m.	Route	1267	2021-04-25 22:58:31.776364	2021-04-25 22:58:31.776364
2637	history	\N	Route	1268	2021-04-25 22:58:31.852781	2021-04-25 22:58:31.852781
2638	gear	Cintas exprés, cuerda de 60m.	Route	1268	2021-04-25 22:58:31.858652	2021-04-25 22:58:31.858652
2639	history	\N	Route	1269	2021-04-25 22:58:31.975701	2021-04-25 22:58:31.975701
2640	gear	Cintas exprés, cuerda de 60m.	Route	1269	2021-04-25 22:58:31.994626	2021-04-25 22:58:31.994626
2641	history	\N	Route	1270	2021-04-25 22:58:32.11433	2021-04-25 22:58:32.11433
2642	gear	Cintas exprés, cuerda de 60m.	Route	1270	2021-04-25 22:58:32.120787	2021-04-25 22:58:32.120787
2643	history	\N	Route	1271	2021-04-25 22:58:32.213189	2021-04-25 22:58:32.213189
2644	gear	Cintas exprés, cuerda de 60m.	Route	1271	2021-04-25 22:58:32.222804	2021-04-25 22:58:32.222804
2645	history	\N	Route	1272	2021-04-25 22:58:32.302223	2021-04-25 22:58:32.302223
2646	gear	Cintas exprés, cuerda de 60m.	Route	1272	2021-04-25 22:58:32.309351	2021-04-25 22:58:32.309351
2647	history	\N	Route	1273	2021-04-25 22:58:32.381698	2021-04-25 22:58:32.381698
2648	gear	Cintas exprés, cuerda de 60m.	Route	1273	2021-04-25 22:58:32.387076	2021-04-25 22:58:32.387076
2649	history	\N	Route	1274	2021-04-25 22:58:32.464776	2021-04-25 22:58:32.464776
2650	gear	Cintas exprés, cuerda de 60m.	Route	1274	2021-04-25 22:58:32.470087	2021-04-25 22:58:32.470087
2651	history	\N	Route	1275	2021-04-25 22:58:32.527002	2021-04-25 22:58:32.527002
2652	gear	Cintas exprés, cuerda de 60m.	Route	1275	2021-04-25 22:58:32.5327	2021-04-25 22:58:32.5327
2653	history	\N	Route	1276	2021-04-25 22:58:32.620569	2021-04-25 22:58:32.620569
2654	gear	Cintas exprés, cuerda de 60m.	Route	1276	2021-04-25 22:58:32.624944	2021-04-25 22:58:32.624944
2655	history	\N	Route	1277	2021-04-25 22:58:32.691853	2021-04-25 22:58:32.691853
2656	gear	Cintas exprés, cuerda de 60m.	Route	1277	2021-04-25 22:58:32.697353	2021-04-25 22:58:32.697353
2657	history	\N	Route	1278	2021-04-25 22:58:32.758336	2021-04-25 22:58:32.758336
2658	gear	Cintas exprés, cuerda de 60m.	Route	1278	2021-04-25 22:58:32.763566	2021-04-25 22:58:32.763566
2659	history	\N	Route	1279	2021-04-25 22:58:32.919803	2021-04-25 22:58:32.919803
2660	gear	Cintas exprés, cuerda de 60m.	Route	1279	2021-04-25 22:58:32.925112	2021-04-25 22:58:32.925112
2661	history	\N	Route	1280	2021-04-25 22:58:32.996966	2021-04-25 22:58:32.996966
2662	gear	Cintas exprés, cuerda de 60m.	Route	1280	2021-04-25 22:58:33.0026	2021-04-25 22:58:33.0026
2663	history	\N	Route	1281	2021-04-25 22:58:33.059113	2021-04-25 22:58:33.059113
2664	gear	Cintas exprés, cuerda de 60m.	Route	1281	2021-04-25 22:58:33.063865	2021-04-25 22:58:33.063865
2665	history	\N	Route	1282	2021-04-25 22:58:33.206617	2021-04-25 22:58:33.206617
2666	gear	Cintas exprés, cuerda de 60m.	Route	1282	2021-04-25 22:58:33.218164	2021-04-25 22:58:33.218164
2667	history	\N	Route	1283	2021-04-25 22:58:33.35705	2021-04-25 22:58:33.35705
2668	gear	Cintas exprés, cuerda de 60m.	Route	1283	2021-04-25 22:58:33.366111	2021-04-25 22:58:33.366111
2669	history	\N	Route	1284	2021-04-25 22:58:33.444661	2021-04-25 22:58:33.444661
2670	gear	Cintas exprés, cuerda de 60m.	Route	1284	2021-04-25 22:58:33.449528	2021-04-25 22:58:33.449528
2671	history	\N	Route	1285	2021-04-25 22:58:33.532776	2021-04-25 22:58:33.532776
2672	gear	Cintas exprés, cuerda de 60m.	Route	1285	2021-04-25 22:58:33.539166	2021-04-25 22:58:33.539166
2673	history	\N	Route	1286	2021-04-25 22:58:33.633796	2021-04-25 22:58:33.633796
2674	gear	Cintas exprés, cuerda de 60m.	Route	1286	2021-04-25 22:58:33.643599	2021-04-25 22:58:33.643599
2675	history	\N	Route	1287	2021-04-25 22:58:33.734006	2021-04-25 22:58:33.734006
2676	gear	Cintas exprés, cuerda de 60m.	Route	1287	2021-04-25 22:58:33.742913	2021-04-25 22:58:33.742913
2677	history	\N	Route	1288	2021-04-25 22:58:33.825011	2021-04-25 22:58:33.825011
2678	gear	Cintas exprés, cuerda de 60m.	Route	1288	2021-04-25 22:58:33.8309	2021-04-25 22:58:33.8309
2679	history	\N	Route	1289	2021-04-25 22:58:33.896263	2021-04-25 22:58:33.896263
2680	gear	Cintas exprés, cuerda de 60m.	Route	1289	2021-04-25 22:58:33.901463	2021-04-25 22:58:33.901463
2681	history	\N	Route	1290	2021-04-25 22:58:33.973328	2021-04-25 22:58:33.973328
2682	gear	Cintas exprés, cuerda de 60m.	Route	1290	2021-04-25 22:58:33.978722	2021-04-25 22:58:33.978722
2683	history	\N	Route	1291	2021-04-25 22:58:34.035364	2021-04-25 22:58:34.035364
2684	gear	Cintas exprés, cuerda de 60m.	Route	1291	2021-04-25 22:58:34.041345	2021-04-25 22:58:34.041345
2685	history	\N	Route	1292	2021-04-25 22:58:34.133771	2021-04-25 22:58:34.133771
2686	gear	Cintas exprés, cuerda de 60m.	Route	1292	2021-04-25 22:58:34.143111	2021-04-25 22:58:34.143111
2687	history	\N	Route	1293	2021-04-25 22:58:34.221212	2021-04-25 22:58:34.221212
2688	gear	Cintas exprés, cuerda de 60m.	Route	1293	2021-04-25 22:58:34.226741	2021-04-25 22:58:34.226741
2689	history	\N	Route	1294	2021-04-25 22:58:34.313089	2021-04-25 22:58:34.313089
2690	gear	Cintas exprés, cuerda de 60m.	Route	1294	2021-04-25 22:58:34.319721	2021-04-25 22:58:34.319721
2691	history	\N	Route	1295	2021-04-25 22:58:34.420626	2021-04-25 22:58:34.420626
2692	gear	Cintas exprés, cuerda de 60m.	Route	1295	2021-04-25 22:58:34.428814	2021-04-25 22:58:34.428814
2693	history	\N	Route	1296	2021-04-25 22:58:34.508539	2021-04-25 22:58:34.508539
2694	gear	Cintas exprés, cuerda de 60m.	Route	1296	2021-04-25 22:58:34.514165	2021-04-25 22:58:34.514165
2695	history	\N	Route	1297	2021-04-25 22:58:34.582692	2021-04-25 22:58:34.582692
2696	gear	Cintas exprés, cuerda de 60m.	Route	1297	2021-04-25 22:58:34.588477	2021-04-25 22:58:34.588477
2697	history	\N	Route	1298	2021-04-25 22:58:34.677656	2021-04-25 22:58:34.677656
2698	gear	Cintas exprés, cuerda de 60m.	Route	1298	2021-04-25 22:58:34.686875	2021-04-25 22:58:34.686875
2699	history	\N	Route	1299	2021-04-25 22:58:34.774875	2021-04-25 22:58:34.774875
2700	gear	Cintas exprés, cuerda de 60m.	Route	1299	2021-04-25 22:58:34.780518	2021-04-25 22:58:34.780518
2701	history	\N	Route	1300	2021-04-25 22:58:34.837228	2021-04-25 22:58:34.837228
2702	gear	Cintas exprés, cuerda de 60m.	Route	1300	2021-04-25 22:58:34.842918	2021-04-25 22:58:34.842918
2703	history	\N	Route	1301	2021-04-25 22:58:34.898222	2021-04-25 22:58:34.898222
2704	gear	Cintas exprés, cuerda de 60m.	Route	1301	2021-04-25 22:58:34.903483	2021-04-25 22:58:34.903483
2705	history	\N	Route	1302	2021-04-25 22:58:34.999927	2021-04-25 22:58:34.999927
2706	gear	Cintas exprés, cuerda de 60m.	Route	1302	2021-04-25 22:58:35.021531	2021-04-25 22:58:35.021531
2707	history	\N	Route	1303	2021-04-25 22:58:35.083243	2021-04-25 22:58:35.083243
2708	gear	Cintas exprés, cuerda de 60m.	Route	1303	2021-04-25 22:58:35.088776	2021-04-25 22:58:35.088776
2709	history	\N	Route	1304	2021-04-25 22:58:35.163051	2021-04-25 22:58:35.163051
2710	gear	Cintas exprés, cuerda de 60m.	Route	1304	2021-04-25 22:58:35.168486	2021-04-25 22:58:35.168486
2711	history	\N	Route	1305	2021-04-25 22:58:35.229562	2021-04-25 22:58:35.229562
2712	gear	Cintas exprés, cuerda de 60m.	Route	1305	2021-04-25 22:58:35.237452	2021-04-25 22:58:35.237452
2713	history	\N	Route	1306	2021-04-25 22:58:35.333802	2021-04-25 22:58:35.333802
2714	gear	Cintas exprés, cuerda de 60m.	Route	1306	2021-04-25 22:58:35.339347	2021-04-25 22:58:35.339347
2715	history	\N	Route	1307	2021-04-25 22:58:35.456028	2021-04-25 22:58:35.456028
2716	gear	Cintas exprés, cuerda de 60m.	Route	1307	2021-04-25 22:58:35.465287	2021-04-25 22:58:35.465287
2717	history	\N	Route	1308	2021-04-25 22:58:35.53545	2021-04-25 22:58:35.53545
2718	gear	Cintas exprés, cuerda de 60m.	Route	1308	2021-04-25 22:58:35.541231	2021-04-25 22:58:35.541231
2719	history	\N	Route	1309	2021-04-25 22:58:35.613043	2021-04-25 22:58:35.613043
2720	gear	Cintas exprés, cuerda de 60m.	Route	1309	2021-04-25 22:58:35.619157	2021-04-25 22:58:35.619157
2721	history	\N	Route	1310	2021-04-25 22:58:35.694799	2021-04-25 22:58:35.694799
2722	gear	Cintas exprés, cuerda de 60m.	Route	1310	2021-04-25 22:58:35.700458	2021-04-25 22:58:35.700458
2723	history	\N	Route	1311	2021-04-25 22:58:35.76684	2021-04-25 22:58:35.76684
2724	gear	Cintas exprés, cuerda de 60m.	Route	1311	2021-04-25 22:58:35.772922	2021-04-25 22:58:35.772922
2725	history	\N	Route	1312	2021-04-25 22:58:35.840487	2021-04-25 22:58:35.840487
2726	gear	Cintas exprés, cuerda de 60m.	Route	1312	2021-04-25 22:58:35.846813	2021-04-25 22:58:35.846813
2727	history	\N	Route	1313	2021-04-25 22:58:35.912701	2021-04-25 22:58:35.912701
2728	gear	Cintas exprés, cuerda de 60m.	Route	1313	2021-04-25 22:58:35.918819	2021-04-25 22:58:35.918819
2729	history	\N	Route	1314	2021-04-25 22:58:36.037631	2021-04-25 22:58:36.037631
2730	gear	Cintas exprés, cuerda de 60m.	Route	1314	2021-04-25 22:58:36.047167	2021-04-25 22:58:36.047167
2731	history	\N	Route	1315	2021-04-25 22:58:36.121711	2021-04-25 22:58:36.121711
2732	gear	Cintas exprés, cuerda de 60m.	Route	1315	2021-04-25 22:58:36.129597	2021-04-25 22:58:36.129597
2733	history	\N	Route	1316	2021-04-25 22:58:36.211999	2021-04-25 22:58:36.211999
2734	gear	Cintas exprés, cuerda de 60m.	Route	1316	2021-04-25 22:58:36.222042	2021-04-25 22:58:36.222042
2735	history	\N	Route	1317	2021-04-25 22:58:36.32564	2021-04-25 22:58:36.32564
2736	gear	Cintas exprés, cuerda de 60m.	Route	1317	2021-04-25 22:58:36.334459	2021-04-25 22:58:36.334459
2737	history	\N	Route	1318	2021-04-25 22:58:36.426314	2021-04-25 22:58:36.426314
2738	gear	Cintas exprés, cuerda de 60m.	Route	1318	2021-04-25 22:58:36.43523	2021-04-25 22:58:36.43523
2739	history	\N	Route	1319	2021-04-25 22:58:36.529463	2021-04-25 22:58:36.529463
2740	gear	Cintas exprés, cuerda de 60m.	Route	1319	2021-04-25 22:58:36.534949	2021-04-25 22:58:36.534949
2741	history	\N	Route	1320	2021-04-25 22:58:36.608242	2021-04-25 22:58:36.608242
2742	gear	Cintas exprés, cuerda de 60m.	Route	1320	2021-04-25 22:58:36.619909	2021-04-25 22:58:36.619909
2743	history	\N	Route	1321	2021-04-25 22:58:36.721942	2021-04-25 22:58:36.721942
2744	gear	Cintas exprés, cuerda de 60m.	Route	1321	2021-04-25 22:58:36.727837	2021-04-25 22:58:36.727837
2745	history	\N	Route	1322	2021-04-25 22:58:36.785499	2021-04-25 22:58:36.785499
2746	gear	Cintas exprés, cuerda de 60m.	Route	1322	2021-04-25 22:58:36.800715	2021-04-25 22:58:36.800715
2747	history	\N	Route	1323	2021-04-25 22:58:36.890713	2021-04-25 22:58:36.890713
2748	gear	Cintas exprés, cuerda de 60m.	Route	1323	2021-04-25 22:58:36.89672	2021-04-25 22:58:36.89672
2749	history	\N	Route	1324	2021-04-25 22:58:36.985615	2021-04-25 22:58:36.985615
2750	gear	Cintas exprés, cuerda de 60m.	Route	1324	2021-04-25 22:58:36.996244	2021-04-25 22:58:36.996244
\.


--
-- Data for Name: active_storage_attachments; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.active_storage_attachments (id, name, record_type, record_id, blob_id, created_at) FROM stdin;
1	image	Sponsor	1	1	2020-12-18 19:15:32.884942
196	main_picture	User	100	196	2021-04-27 14:49:56.452601
197	main_picture	User	101	197	2021-04-28 13:11:00.627418
198	main_picture	Wall	40	198	2021-05-03 14:07:17.294213
5	avatar	User	1	5	2020-12-18 19:15:35.346004
201	image	ActiveStorage::VariantRecord	128	201	2021-05-03 17:17:50.315037
202	main_picture	Wall	41	202	2021-05-03 17:19:39.794511
203	image	ActiveStorage::VariantRecord	129	203	2021-05-03 17:19:42.445002
204	main_picture	Wall	42	204	2021-05-03 17:20:07.466124
205	image	ActiveStorage::VariantRecord	130	205	2021-05-03 17:20:11.963588
206	main_picture	Wall	43	206	2021-05-03 17:21:15.993949
41	image	Picture	35	41	2021-02-17 19:15:55.447851
42	main_picture	Coalition	1	42	2021-02-18 13:31:34.541477
43	main_picture	Initiative	1	43	2021-02-18 13:34:29.328549
45	main_picture	Initiative	34	45	2021-02-19 14:24:43.36269
47	main_picture	Sponsor	1	47	2021-02-23 16:05:49.888552
53	image	Picture	36	53	2021-02-24 16:20:07.368582
59	image	Picture	37	59	2021-03-04 18:01:48.721807
60	image	Picture	38	60	2021-03-04 18:04:32.926454
61	image	Picture	39	61	2021-03-05 12:29:28.807007
62	image	Picture	40	62	2021-03-05 12:32:33.551997
63	image	Picture	41	63	2021-03-05 15:30:56.40868
64	main_picture	User	34	64	2021-03-05 21:56:43.275273
65	image	ActiveStorage::VariantRecord	1	65	2021-03-10 20:25:42.921946
66	image	ActiveStorage::VariantRecord	2	66	2021-03-10 20:25:45.539011
67	image	ActiveStorage::VariantRecord	4	67	2021-03-10 20:25:48.652781
68	image	ActiveStorage::VariantRecord	5	68	2021-03-11 12:08:45.258266
69	image	ActiveStorage::VariantRecord	6	69	2021-03-11 13:37:53.590823
70	image	ActiveStorage::VariantRecord	7	70	2021-03-15 19:11:56.58556
71	image	ActiveStorage::VariantRecord	8	71	2021-03-18 19:20:30.834727
72	image	ActiveStorage::VariantRecord	10	72	2021-03-18 19:29:54.196574
73	image	ActiveStorage::VariantRecord	11	73	2021-03-18 19:29:59.784409
74	image	ActiveStorage::VariantRecord	12	74	2021-03-18 19:29:59.935172
75	image	ActiveStorage::VariantRecord	13	75	2021-03-18 19:30:01.594125
76	image	ActiveStorage::VariantRecord	14	76	2021-03-18 19:30:25.867447
77	image	ActiveStorage::VariantRecord	17	77	2021-03-18 19:30:54.624901
78	image	ActiveStorage::VariantRecord	19	78	2021-03-18 19:31:10.513113
79	image	ActiveStorage::VariantRecord	22	79	2021-03-18 19:31:33.483187
80	image	ActiveStorage::VariantRecord	23	80	2021-03-18 19:31:43.735045
81	image	ActiveStorage::VariantRecord	24	81	2021-03-18 19:32:11.909001
82	image	ActiveStorage::VariantRecord	27	82	2021-03-18 21:35:20.100686
83	image	ActiveStorage::VariantRecord	28	83	2021-03-18 21:35:20.157593
84	image	ActiveStorage::VariantRecord	29	84	2021-03-18 21:35:20.279672
85	image	ActiveStorage::VariantRecord	30	85	2021-03-18 21:35:22.958383
86	image	ActiveStorage::VariantRecord	31	86	2021-03-18 21:36:32.254893
87	image	ActiveStorage::VariantRecord	34	87	2021-03-19 15:38:44.198006
88	image	ActiveStorage::VariantRecord	36	89	2021-03-19 15:39:00.437623
89	image	ActiveStorage::VariantRecord	35	88	2021-03-19 15:39:00.481574
90	image	ActiveStorage::VariantRecord	37	90	2021-03-19 15:39:00.559884
91	image	ActiveStorage::VariantRecord	38	91	2021-03-19 15:39:00.653574
92	image	ActiveStorage::VariantRecord	39	92	2021-03-19 18:48:34.090031
93	image	ActiveStorage::VariantRecord	42	93	2021-03-19 18:48:34.489496
94	image	ActiveStorage::VariantRecord	44	94	2021-03-19 19:07:06.003591
95	main_picture	Sponsor	34	95	2021-03-22 19:29:42.859975
96	image	ActiveStorage::VariantRecord	45	96	2021-03-22 19:29:47.041102
97	image	ActiveStorage::VariantRecord	46	97	2021-03-22 19:29:53.067481
98	image	ActiveStorage::VariantRecord	48	98	2021-03-23 13:01:09.68539
99	image	ActiveStorage::VariantRecord	49	99	2021-03-23 13:01:35.589479
101	image	ActiveStorage::VariantRecord	51	101	2021-03-23 13:03:48.816835
103	image	ActiveStorage::VariantRecord	52	103	2021-03-23 13:05:37.834568
104	image	ActiveStorage::VariantRecord	53	104	2021-03-23 21:38:28.695835
105	main_picture	Picture	39	105	2021-03-24 13:39:13.317408
106	image	ActiveStorage::VariantRecord	54	106	2021-03-24 13:39:22.431314
108	image	ActiveStorage::VariantRecord	55	108	2021-03-24 13:39:47.664248
109	main_picture	Initiative	35	109	2021-03-24 13:41:32.503748
110	image	ActiveStorage::VariantRecord	56	110	2021-03-24 13:41:37.300934
111	image	ActiveStorage::VariantRecord	57	111	2021-03-24 13:49:27.392084
112	image	ActiveStorage::VariantRecord	58	112	2021-03-24 13:49:29.886399
113	image	ActiveStorage::VariantRecord	59	113	2021-03-24 13:49:57.448682
114	image	ActiveStorage::VariantRecord	60	114	2021-03-24 13:53:57.109599
115	main_picture	Picture	40	115	2021-03-24 13:54:30.571816
116	image	ActiveStorage::VariantRecord	62	116	2021-03-24 13:54:37.621103
117	image	ActiveStorage::VariantRecord	63	117	2021-03-24 13:55:10.167838
118	image	ActiveStorage::VariantRecord	64	118	2021-03-24 13:55:44.945893
119	image	ActiveStorage::VariantRecord	65	119	2021-03-24 13:56:01.880211
120	image	ActiveStorage::VariantRecord	66	120	2021-03-24 13:56:13.806238
121	image	ActiveStorage::VariantRecord	67	121	2021-03-24 14:40:40.723275
122	image	ActiveStorage::VariantRecord	68	122	2021-03-24 15:03:11.823065
123	image	ActiveStorage::VariantRecord	69	123	2021-03-25 12:15:07.014413
124	image	ActiveStorage::VariantRecord	70	124	2021-03-29 18:23:10.456474
125	image	ActiveStorage::VariantRecord	71	125	2021-04-05 23:48:14.426152
126	image	ActiveStorage::VariantRecord	72	126	2021-04-07 01:43:38.094993
129	main_picture	User	49	129	2021-04-07 18:08:10.362884
130	image	ActiveStorage::VariantRecord	73	130	2021-04-07 18:08:16.333468
131	image	ActiveStorage::VariantRecord	74	131	2021-04-07 18:14:45.722756
132	image	ActiveStorage::VariantRecord	75	132	2021-04-07 18:21:50.051857
133	main_picture	User	51	133	2021-04-08 13:16:15.86878
199	main_picture	Zone	38	199	2021-05-03 17:10:13.582667
200	image	ActiveStorage::VariantRecord	127	200	2021-05-03 17:10:19.443971
136	image	ActiveStorage::VariantRecord	76	136	2021-04-08 15:44:41.441296
137	image	ActiveStorage::VariantRecord	77	137	2021-04-08 15:44:58.882019
168	main_picture	Route	39	168	2021-04-09 15:25:06.243799
169	image	ActiveStorage::VariantRecord	109	169	2021-04-09 15:25:10.876142
170	image	ActiveStorage::VariantRecord	110	170	2021-04-09 15:25:42.46518
207	image	ActiveStorage::VariantRecord	131	207	2021-05-03 17:21:18.418488
208	main_picture	Wall	44	208	2021-05-03 17:21:25.47124
173	main_picture	Zone	35	173	2021-04-13 19:36:51.116793
174	image	ActiveStorage::VariantRecord	111	174	2021-04-13 19:36:56.165029
175	main_picture	Picture	43	175	2021-04-13 19:38:00.32211
176	image	ActiveStorage::VariantRecord	112	176	2021-04-13 19:38:03.311256
177	image	ActiveStorage::VariantRecord	113	177	2021-04-13 19:38:10.090896
178	image	ActiveStorage::VariantRecord	114	178	2021-04-13 19:42:27.689456
179	image	ActiveStorage::VariantRecord	115	179	2021-04-13 19:42:28.334102
180	image	ActiveStorage::VariantRecord	117	180	2021-04-13 19:42:47.229502
181	main_picture	Picture	44	181	2021-04-13 19:43:19.939954
182	image	ActiveStorage::VariantRecord	118	182	2021-04-13 19:43:25.581744
183	image	ActiveStorage::VariantRecord	119	183	2021-04-13 19:44:04.902757
184	image	ActiveStorage::VariantRecord	120	184	2021-04-13 19:44:41.533976
185	image	ActiveStorage::VariantRecord	121	185	2021-04-13 19:44:48.732115
186	main_picture	User	87	186	2021-04-14 13:12:46.811417
187	image	ActiveStorage::VariantRecord	122	187	2021-04-14 14:36:41.409247
188	main_picture	User	86	188	2021-04-14 16:41:57.001875
209	image	ActiveStorage::VariantRecord	132	209	2021-05-03 17:21:28.462816
190	main_picture	User	94	190	2021-04-18 20:25:51.137587
191	main_picture	User	95	191	2021-04-18 20:26:47.931107
192	main_picture	User	50	192	2021-04-18 21:25:21.161907
193	image	ActiveStorage::VariantRecord	123	193	2021-04-18 21:25:25.807594
194	image	ActiveStorage::VariantRecord	124	194	2021-04-18 21:27:35.084453
195	main_picture	User	96	195	2021-04-23 19:58:24.384901
210	main_picture	Wall	45	210	2021-05-03 17:22:05.195591
211	image	ActiveStorage::VariantRecord	133	211	2021-05-03 17:22:11.66063
212	main_picture	Wall	46	212	2021-05-03 17:22:15.798887
213	image	ActiveStorage::VariantRecord	134	213	2021-05-03 17:22:58.414811
214	main_picture	Wall	49	214	2021-05-03 17:23:32.317014
215	image	ActiveStorage::VariantRecord	135	215	2021-05-03 17:23:36.862807
216	main_picture	Wall	47	216	2021-05-03 17:23:53.805001
217	image	ActiveStorage::VariantRecord	136	217	2021-05-03 17:23:57.553025
218	main_picture	Wall	48	218	2021-05-03 17:24:10.178944
219	image	ActiveStorage::VariantRecord	137	219	2021-05-03 17:24:13.567458
220	main_picture	Wall	50	220	2021-05-03 17:25:06.40723
221	image	ActiveStorage::VariantRecord	138	221	2021-05-03 17:25:08.978118
222	main_picture	Wall	51	222	2021-05-03 17:25:21.689234
223	image	ActiveStorage::VariantRecord	139	223	2021-05-03 17:25:25.118973
224	main_picture	Wall	52	224	2021-05-03 17:25:38.251711
225	image	ActiveStorage::VariantRecord	140	225	2021-05-03 17:25:41.05827
226	main_picture	Wall	53	226	2021-05-03 17:25:52.153999
227	image	ActiveStorage::VariantRecord	141	227	2021-05-03 17:25:55.384175
228	main_picture	Wall	54	228	2021-05-03 17:26:22.725396
229	image	ActiveStorage::VariantRecord	142	229	2021-05-03 17:26:25.567801
230	main_picture	Wall	55	230	2021-05-03 17:26:35.540128
231	image	ActiveStorage::VariantRecord	143	231	2021-05-03 17:26:44.012884
232	main_picture	Wall	56	232	2021-05-03 17:27:12.251117
233	image	ActiveStorage::VariantRecord	144	233	2021-05-03 17:27:16.602701
234	main_picture	Wall	57	234	2021-05-03 17:27:31.507944
235	image	ActiveStorage::VariantRecord	145	235	2021-05-03 17:27:34.266695
236	main_picture	Wall	58	236	2021-05-03 17:28:00.06825
237	image	ActiveStorage::VariantRecord	146	237	2021-05-03 17:28:06.227717
238	main_picture	Wall	60	238	2021-05-03 17:28:27.61841
239	image	ActiveStorage::VariantRecord	147	239	2021-05-03 17:28:30.639536
240	main_picture	Wall	59	240	2021-05-03 17:28:45.735234
241	image	ActiveStorage::VariantRecord	148	241	2021-05-03 17:28:48.698815
242	main_picture	Wall	231	242	2021-05-03 17:29:11.782381
243	image	ActiveStorage::VariantRecord	149	243	2021-05-03 17:30:31.453141
244	main_picture	Wall	61	244	2021-05-03 18:09:46.864061
245	image	ActiveStorage::VariantRecord	150	245	2021-05-03 18:09:59.948093
246	main_picture	Wall	62	246	2021-05-03 18:10:35.562083
247	image	ActiveStorage::VariantRecord	151	247	2021-05-03 18:10:37.583237
248	main_picture	Wall	63	248	2021-05-03 18:10:41.955605
249	image	ActiveStorage::VariantRecord	152	249	2021-05-03 18:10:43.496804
250	main_picture	Wall	64	250	2021-05-03 18:10:58.607508
251	main_picture	Wall	65	251	2021-05-03 18:11:19.371732
252	image	ActiveStorage::VariantRecord	153	252	2021-05-03 18:11:34.028282
253	image	ActiveStorage::VariantRecord	154	253	2021-05-03 18:11:50.636641
254	main_picture	Wall	66	254	2021-05-03 18:11:56.131666
255	main_picture	Wall	67	255	2021-05-03 18:11:58.535343
256	image	ActiveStorage::VariantRecord	155	256	2021-05-03 18:12:25.899774
257	image	ActiveStorage::VariantRecord	156	257	2021-05-03 18:12:28.130422
258	main_picture	Zone	39	258	2021-05-03 18:17:20.506594
259	image	ActiveStorage::VariantRecord	157	259	2021-05-03 18:17:22.737928
260	main_picture	Wall	69	260	2021-05-03 18:27:56.761453
261	image	ActiveStorage::VariantRecord	158	261	2021-05-03 18:28:00.877096
262	main_picture	Wall	70	262	2021-05-03 18:28:13.13259
263	image	ActiveStorage::VariantRecord	159	263	2021-05-03 18:28:15.923829
264	main_picture	Wall	71	264	2021-05-03 18:28:29.791914
265	image	ActiveStorage::VariantRecord	160	265	2021-05-03 18:28:32.856771
266	main_picture	Wall	72	266	2021-05-03 18:28:47.295834
267	image	ActiveStorage::VariantRecord	161	267	2021-05-03 18:29:08.557423
268	main_picture	Wall	73	268	2021-05-03 18:29:29.870048
269	image	ActiveStorage::VariantRecord	162	269	2021-05-03 18:29:34.706328
270	main_picture	Wall	68	270	2021-05-03 18:29:42.714442
271	image	ActiveStorage::VariantRecord	163	271	2021-05-03 18:30:47.398684
272	main_picture	Zone	40	272	2021-05-03 18:33:26.927255
273	image	ActiveStorage::VariantRecord	164	273	2021-05-03 18:33:30.067369
274	image	ActiveStorage::VariantRecord	165	274	2021-05-03 21:18:10.452107
275	image	ActiveStorage::VariantRecord	166	275	2021-05-03 21:18:11.473789
276	main_picture	Wall	75	276	2021-05-03 23:29:55.649551
277	main_picture	Wall	76	277	2021-05-03 23:29:59.474859
278	image	ActiveStorage::VariantRecord	167	278	2021-05-03 23:30:02.71316
279	image	ActiveStorage::VariantRecord	168	279	2021-05-03 23:30:03.436654
280	main_picture	Wall	77	280	2021-05-03 23:30:10.944568
281	image	ActiveStorage::VariantRecord	169	281	2021-05-03 23:30:23.811742
282	main_picture	Wall	78	282	2021-05-03 23:30:39.586943
283	image	ActiveStorage::VariantRecord	170	283	2021-05-03 23:30:42.091683
284	main_picture	Wall	79	284	2021-05-03 23:31:18.745776
285	image	ActiveStorage::VariantRecord	171	285	2021-05-03 23:31:21.37058
286	main_picture	Wall	80	286	2021-05-03 23:31:34.080921
287	image	ActiveStorage::VariantRecord	172	287	2021-05-03 23:31:36.906429
288	main_picture	Wall	81	288	2021-05-03 23:31:52.80672
289	image	ActiveStorage::VariantRecord	173	289	2021-05-03 23:31:55.242985
290	main_picture	Wall	82	290	2021-05-03 23:32:04.568662
291	image	ActiveStorage::VariantRecord	174	291	2021-05-03 23:32:07.398791
292	main_picture	Wall	83	292	2021-05-03 23:32:17.16805
293	image	ActiveStorage::VariantRecord	175	293	2021-05-03 23:32:20.328333
294	main_picture	Wall	84	294	2021-05-03 23:32:32.121796
295	image	ActiveStorage::VariantRecord	176	295	2021-05-03 23:32:35.080182
296	main_picture	Zone	41	296	2021-05-03 23:33:51.645063
297	image	ActiveStorage::VariantRecord	177	297	2021-05-03 23:33:54.902368
298	image	ActiveStorage::VariantRecord	178	298	2021-05-04 13:58:27.147947
299	image	ActiveStorage::VariantRecord	179	299	2021-05-05 01:42:03.957877
300	main_picture	User	114	300	2021-08-18 13:53:33.004426
301	main_picture	User	115	301	2021-08-18 14:04:58.223185
302	main_picture	User	118	302	2021-08-18 14:10:41.850846
303	main_picture	User	121	303	2021-08-27 03:06:55.009586
\.


--
-- Data for Name: active_storage_blobs; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.active_storage_blobs (id, key, filename, content_type, metadata, byte_size, checksum, created_at, service_name) FROM stdin;
196	080h57d6dlfzaf0rtlg12u43vgua	F2E533A6-DDBE-4A10-9A1D-F62B75F75BA6.jpg	image/jpeg	{"identified":true}	210	/NsgIaZYc5+mkqNyNPyA8A==	2021-04-27 14:49:56.450337	amazon
197	vmfr851iub6uyyxi3el71wfg4lqt	A4DEF2A2-EEE9-4FC1-8239-2DEC85DD3049.jpg	image/jpeg	{"identified":true}	210	gLrzNRfML/sr0HQcDZrwZw==	2021-04-28 13:11:00.624594	amazon
198	61lqgdkn17r2uzlwu717th2132rp	40 - cubo cara este.jpg	image/jpeg	{"identified":true}	169703	vWO9zGCWBZ4oWV7X6oABjQ==	2021-05-03 14:07:16.658085	amazon
201	m53sys089t9ux5gvozm2i3c6nnvt	40 - cubo cara este.jpg	image/jpeg	{"identified":true}	168250	Gr5r28WZxjqRX13X3xuNkA==	2021-05-03 17:17:50.313086	amazon
202	rq8q9ww163hosm04agal0g7z4opd	41 - cubo cara norte.jpg	image/jpeg	{"identified":true}	204179	N4vtJE+NfUfKFKbwJAPnQQ==	2021-05-03 17:19:39.79261	amazon
203	g0u8hqb2eswp70rfbxu5usaehug8	41 - cubo cara norte.jpg	image/jpeg	{"identified":true}	203916	RNidUxf7+XfyT16w76SGMg==	2021-05-03 17:19:42.443084	amazon
204	oa22j07mceqc7qa992lyg0e4z83q	42 - cubo cara oeste.jpg	image/jpeg	{"identified":true}	185678	9UogSXGRvSgjRp12U/44FA==	2021-05-03 17:20:07.464277	amazon
205	qkhvt49kcyleoedy8a45buwp2xit	42 - cubo cara oeste.jpg	image/jpeg	{"identified":true}	187031	LZlt+QQWLdOrcWFuQBVu2g==	2021-05-03 17:20:11.961661	amazon
206	7024xkjz2el8g4r1659d6mbehn6y	43 - cachupin.jpg	image/jpeg	{"identified":true}	50532	VD/FyDgVlVdF7oqc4FwuJA==	2021-05-03 17:21:15.992005	amazon
207	cpads93km1prrfpyph9d7egrdc6a	43 - cachupin.jpg	image/jpeg	{"identified":true}	48140	0MScdI+J32MrwxgCICRUOg==	2021-05-03 17:21:18.416442	amazon
208	5sj4susb4eiuzut7gmwbqnpxo1x5	44 - del espino.jpg	image/jpeg	{"identified":true}	162367	Leo0T/sPvq8SKlqoeMR3sA==	2021-05-03 17:21:25.46937	amazon
209	zhdl1ku99e6pu4kz126cvuc2b324	44 - del espino.jpg	image/jpeg	{"identified":true}	163437	SQet5kAXjg6LF8juGMS1qw==	2021-05-03 17:21:28.460136	amazon
210	q4h3vmfuset942cc3inikswg6of5	45 - zona circulo.jpg	image/jpeg	{"identified":true}	202066	iuQu2KHeDwCHqCfP8vg25w==	2021-05-03 17:22:05.193597	amazon
211	11vsqt0r5dc8h0cbbcvjod304nux	45 - zona circulo.jpg	image/jpeg	{"identified":true}	202841	BQLB88awd9oKi76uLdA5Gg==	2021-05-03 17:22:11.658663	amazon
212	b6i6okoau744vu73wdw7ccufefjc	46 zona de transilvania.jpg	image/jpeg	{"identified":true}	199167	42Rv/BnIdjTToYmx25mFQQ==	2021-05-03 17:22:15.796874	amazon
213	cc09o4otvkfotngbgxx3al7zllbk	46 zona de transilvania.jpg	image/jpeg	{"identified":true}	203615	A8OP5p++xNdEh6GwA91/3Q==	2021-05-03 17:22:58.412447	amazon
214	joutmorcn6tclxyhouzwnwvs2eb1	49 - Sampateste Multilargos.jpg	image/jpeg	{"identified":true}	801753	mXPNrgge4/B3fwPYZsh3CA==	2021-05-03 17:23:32.315024	amazon
215	2hkzvq4r5kc2yat8pcw7uiqzo8ix	49 - Sampateste Multilargos.jpg	image/jpeg	{"identified":true}	234570	ccJDGzSjtu2Q2vg0HqcdUQ==	2021-05-03 17:23:36.860805	amazon
216	ybtlu0exc36eeukz0f1vv3mjj3az	47 - zona diabolica.jpg	image/jpeg	{"identified":true}	171139	z/HgIN7JLa4IpvgO3vUMMQ==	2021-05-03 17:23:53.803193	amazon
217	52s08474pd3rvxo2boq5qf0j8fy1	47 - zona diabolica.jpg	image/jpeg	{"identified":true}	171692	+iizcarhSSlQvJtM69lAsA==	2021-05-03 17:23:57.551046	amazon
218	lstd991kap2h62mtcqcyrz2mq1yv	48 - plan zeta.jpg	image/jpeg	{"identified":true}	156600	a5mjupTBQFkrvA1lFm5CtA==	2021-05-03 17:24:10.177038	amazon
219	okum1gdnx6567rqka9ftt4l117u8	48 - plan zeta.jpg	image/jpeg	{"identified":true}	155173	PBXpNvqOZVUrXU0mbZ4s1g==	2021-05-03 17:24:13.56555	amazon
220	pdc7t2d691le7kl2feuyghceb1jn	50 - desplomilandia.jpg	image/jpeg	{"identified":true}	211097	kjd8NqEeIbxlG0uaEwXrVw==	2021-05-03 17:25:06.405056	amazon
221	gsivh598s2jsy87cbwwfbrsgx6ju	50 - desplomilandia.jpg	image/jpeg	{"identified":true}	200404	IyELNUpyYXP7n+rTyZ8NOw==	2021-05-03 17:25:08.975796	amazon
222	ggwugcyldg1wptgg951cjou7rdf6	51 - Bohemia.jpg	image/jpeg	{"identified":true}	350163	lBQzgJwTdh/L2DfXaCGj5g==	2021-05-03 17:25:21.686601	amazon
223	b9hqft7v7ot96jh0yt3pczha12bh	51 - Bohemia.jpg	image/jpeg	{"identified":true}	223743	GeBhL+2jRU+DdxhM6W8qQQ==	2021-05-03 17:25:25.116806	amazon
224	xg3uk4qge4g9dvs1n5neeax3ii63	52 - escondida (antisika).jpg	image/jpeg	{"identified":true}	157005	HvLXuufXEMRBTi+lYHZF1g==	2021-05-03 17:25:38.249892	amazon
225	bqozillul6onbxxah5zc8awilwzp	52 - escondida (antisika).jpg	image/jpeg	{"identified":true}	158461	6OATgnsOI8aUFbdEFFcJ1w==	2021-05-03 17:25:41.055841	amazon
226	nlcxdd15k488e0c4moqrh3amvi9s	53 - poetica Principal.jpg	image/jpeg	{"identified":true}	172529	JhbBbpQoDeR0nH1ngTa3Ag==	2021-05-03 17:25:52.151764	amazon
227	p7925qraot76zcxo33iosw7uz8pf	53 - poetica Principal.jpg	image/jpeg	{"identified":true}	174112	zm2FqrEPBymcuXE0OuMVZg==	2021-05-03 17:25:55.381939	amazon
228	41y7hn8o550t76814wknej6fp9dt	54 - poetica cara oeste.jpg	image/jpeg	{"identified":true}	127705	zzq5k8WdTATWdm3qW4Zssg==	2021-05-03 17:26:22.723489	amazon
1	5af0p102tl31gnix1lrrajx93qk3	The-North-Face-Logo.png	image/png	{"identified":true,"width":1280,"height":720,"analyzed":true}	35310	2oR70LjjAmul/hHBGvAR3Q==	2020-12-18 19:15:32.882181	amazon
49	x7n4afudivq7ib316ok76g8rbdbm	919CC0C1-36EB-47C8-8164-E908EED05AA3.jpg	image/jpeg	{"identified":true}	207	FSYC/JWsHbkhQvWBiHnK3w==	2021-02-24 13:07:31.443776	amazon
50	dedhl4b1635knkem69if3etssvg5	06092020-IMG_3163.jpg	image/jpeg	{"identified":true}	3261945	enlTi3d5q2yL75qOxG6S9g==	2021-02-24 15:46:27.654587	amazon
4	rubsfu01ush82li8il9lrtrbyotj	catedral+2.jpg	image/jpeg	{"identified":true,"width":640,"height":445,"analyzed":true}	129546	Lp18HUIw+FPN7B4iTthrRA==	2020-12-18 19:15:35.224991	amazon
5	opg4qvhcbxkd1vl1mh8ek1akx97w	pngtree-businessman-user-avatar-free-vector-png-image_1538405.jpg	image/jpeg	{"identified":true,"width":360,"height":360,"analyzed":true}	38524	CqhYHCywqpSNY8492tkMgQ==	2020-12-18 19:15:35.34232	amazon
6	54o8rz26zje4w5ogtayyo91gfj6n	zona+jabon.jpg	image/jpeg	{"identified":true,"width":640,"height":430,"analyzed":true}	103567	vzL7tg2233pQQRQlW7ZmFw==	2020-12-18 19:15:35.764767	amazon
51	6sjnnyn1599yib95lnylwyoqafq5	cabaña chile chico.jpg	image/jpeg	{"identified":true}	631205	peRefwlkZ7HLRXmrQgBdog==	2021-02-24 16:06:13.888744	amazon
52	1o4oqjt9vtx0787s3x63jyil2k6k	roca chile chico.jpg	image/jpeg	{"identified":true}	440900	/sWVb1nxvK/49esZATBFHw==	2021-02-24 16:13:06.627157	amazon
53	yl4nw7ukrezgav6tzpep70jnvaw2	foto 1 chile chico.png	image/png	{"identified":true}	860192	SN50U7doI9TlVHt4eqIiwQ==	2021-02-24 16:20:07.364022	amazon
54	grt7x2iu3ye00kemmkariaw0225v	15082020-IMG_2976.jpg	image/jpeg	{"identified":true}	4228674	cNYRBbcQOi9dmzigOPUJ0w==	2021-02-25 17:11:04.338858	amazon
38	y0svxlmhoppkoepwu8kqhjftsilp	perfil.jpg	image/jpeg	{"identified":true,"width":302,"height":320,"analyzed":true}	38375	CRMu6yfVhd+x1DESU8brQQ==	2021-02-09 12:56:17.157564	amazon
39	z4ek5st1vqaedcmvw383tjb9d3gx	coverPetorca.jpg	image/jpeg	{"identified":true,"width":3419,"height":2574,"analyzed":true}	1769183	0GiPcmKwSJ1RalBAAo7Pkw==	2021-02-09 13:57:37.164895	amazon
55	26a95d4n67x9wckmmhopegsdx1mc	15082020-IMG_2960.jpg	image/jpeg	{"identified":true}	1021493	sJeXn2bSBqLyHD9kZty/Xg==	2021-02-25 17:22:17.862614	amazon
41	qlygms28ywqlbwbq1oh0yq9vt3e1	16082020-IMG_3027.jpg	image/jpeg	{"identified":true,"width":5472,"height":3648,"analyzed":true}	3001271	EQ3PoOYF8j9ByU27ukAKxQ==	2021-02-17 19:15:55.444811	amazon
42	dp2ys2bu8q7xpxt6fsvcy1ecygfq	16082020-IMG_3004.jpg	image/jpeg	{"identified":true,"width":5472,"height":3648,"analyzed":true}	3068400	RCyuL7nt6eTnRMD/0zHe5w==	2021-02-18 13:31:34.53825	amazon
43	9lp0kpcl374bkxqrgazi7h03xk1w	15082020-IMG_2922.jpg	image/jpeg	{"identified":true,"width":5472,"height":3648,"analyzed":true}	2946030	ge9KQWX2hJPmvWkyt3OqvQ==	2021-02-18 13:34:29.325408	amazon
44	z6qme58pj9p5m4pcx4yymfxv4ar4	DSC_0793.NEF.jpg	image/jpeg	{"identified":true,"width":3265,"height":4898,"analyzed":true}	652102	3DD+slKCgF8OrjZvnF2lGA==	2021-02-18 13:38:49.31671	amazon
45	mjgcvfks1z91uw86wdyuzje9wa7g	15082020-IMG_2942.jpg	image/jpeg	{"identified":true,"width":3648,"height":5472,"analyzed":true}	3608409	kZb1z58jY58XGE34szljUQ==	2021-02-19 14:24:43.357261	amazon
46	a64h1tf5xut3p1vpfs3gpudk8ds4	the_north_face.png	image/png	{"identified":true}	40928	kWJ+At98zPN/rzjzIroyiA==	2021-02-23 16:05:42.428417	amazon
47	98i1rmv6lyz9z1bkxtbhvizjm9vm	the_north_face.png	image/png	{"identified":true}	40928	kWJ+At98zPN/rzjzIroyiA==	2021-02-23 16:05:49.884233	amazon
48	8movr45jp67v4etnz9n88erzzls7	6E71C27A-7440-4FD4-9BE3-67A8DB77B96F.jpg	image/jpeg	{"identified":true}	207	iB+M+N+Q5SIot48q6S/T6Q==	2021-02-24 13:03:00.093459	amazon
56	fa9ltvg2ghryobli3bwoqql68jnp	pefil cerro.JPG	image/jpeg	{"identified":true}	1615437	nIcMuaIMAu+Cjr+xD8LGDQ==	2021-02-26 16:43:04.135336	amazon
57	gt9jiikaqq9cckuefuf7njneoy41	paparella.jpeg	image/jpeg	{"identified":true}	101493	Hh8y2vRu/Cp6ic7AwxQ9fw==	2021-02-26 16:45:57.401311	amazon
58	l3ided2fhskcbt1cc8y4zp2m152m	IMG_0027.jpg	image/jpeg	{"identified":true}	2317567	EbQ2CBSf3+NKKOts02BSyw==	2021-03-01 18:00:35.751646	amazon
59	ztqomeduo5i3dzq3lqgvpndmhpkk	15082020-IMG_2960.jpg	image/jpeg	{"identified":true}	1021493	sJeXn2bSBqLyHD9kZty/Xg==	2021-03-04 18:01:48.718274	amazon
60	14o588wt09zc55tjdggw3v9cr0xe	16082020-IMG_3000.jpg	image/jpeg	{"identified":true}	4936703	QH+BRbVJtN6R1JHFOCliuw==	2021-03-04 18:04:32.923912	amazon
61	dmt417j1gxu4xqd9kybmdy77jfqf	09012021-IMG_4847.jpg	image/jpeg	{"identified":true}	7036711	hYdinOCULc4R04KPVoRnRg==	2021-03-05 12:29:28.798778	amazon
62	5gjzco9424r9x5odfybpr6qdutft	09012021-IMG_4819.jpg	image/jpeg	{"identified":true}	7490157	C75gBdU7zAWPWrQiKPGH2A==	2021-03-05 12:32:33.548036	amazon
63	4lfnyt8px3ijhewhh4jzav0kw2rh	Topos Sector 6 Viejo Continente.jpg	image/jpeg	{"identified":true}	3930959	sEC+vngNEWUb+Z0ELraRBQ==	2021-03-05 15:30:56.400584	amazon
64	34l9tcusyliuhnvhcdg0p5m88tps	paparella.jpeg	image/jpeg	{"identified":true}	101493	Hh8y2vRu/Cp6ic7AwxQ9fw==	2021-03-05 21:56:43.272423	amazon
65	m6wgqcovic86f26vl8qd3r86vw9s	16082020-IMG_3004.jpg	image/jpeg	{"identified":true}	212845	OVbkaMDBubW3xwMhV8KRgQ==	2021-03-10 20:25:42.914455	amazon
66	m3bkpos8ohhiei1q3ahjnj088j5b	09012021-IMG_4847.jpg	image/jpeg	{"identified":true}	58184	w8G+qDUf6Rl4Kkq5nJWHiA==	2021-03-10 20:25:45.530032	amazon
67	2std06r1zk682xl49nqycmvevf4g	09012021-IMG_4819.jpg	image/jpeg	{"identified":true}	66036	FMLxQ6h66t044o26BlwcRg==	2021-03-10 20:25:48.649447	amazon
68	0ybfb4qu4u0osndkr21w636ibrj6	15082020-IMG_2922.jpg	image/jpeg	{"identified":true}	205603	DVfVTmUfWLbCSQ3oYN3mHw==	2021-03-11 12:08:45.255221	amazon
69	8tqehtjs60bt2kpfmfj92k23u3qf	15082020-IMG_2942.jpg	image/jpeg	{"identified":true}	250075	hDQvlW5WXKf/ukBZon56xw==	2021-03-11 13:37:53.587551	amazon
70	mrog84c95jctfqnptzoivx7i4zso	the_north_face.png	image/png	{"identified":true}	39954	7G4SHdvstJpB7BDiLoKX+w==	2021-03-15 19:11:56.582757	amazon
71	xzg07s5izyrun7pz5fzkgwtw2btz	IMG_0027.jpg	image/jpeg	{"identified":true}	202817	Ofv+RIXCi81m8CP9K2V+GA==	2021-03-18 19:20:30.829815	amazon
72	1odlo7h66sh7jebdf01vuky3umq9	roca chile chico.jpg	image/jpeg	{"identified":true}	217033	hC3S4FGDQbhkNG1pfgiy4g==	2021-03-18 19:29:54.181877	amazon
73	1s4q8kurk24mo7eufobb0z8i4n7f	coverPetorca.jpg	image/jpeg	{"identified":true}	234349	HsnV1gkmQU2uu+UiU74DMg==	2021-03-18 19:29:59.772591	amazon
74	exgaue5fih8h0ens4jj4qi8v83ad	IMG_0027.jpg	image/jpeg	{"identified":true}	247578	fiad5vTtczxSrP0vlK3Q5w==	2021-03-18 19:29:59.925478	amazon
75	a32vcuma9jl835eulen631wct0q0	06092020-IMG_3163.jpg	image/jpeg	{"identified":true}	259215	mCadyWxFx9m/lAubdVhiuQ==	2021-03-18 19:30:01.589958	amazon
76	f88u6v1phkf1d439a8urx5cwz7q0	paparella.jpg	image/jpeg	{"identified":true}	113354	wd8XtLYMmfePPVX2caFAIQ==	2021-03-18 19:30:25.854012	amazon
77	uk2nx6tv8mzzah6aholtqlgfw8iz	16082020-IMG_3004.jpg	image/jpeg	{"identified":true}	242599	i3zzURe93i5p3OmRaZdQ2Q==	2021-03-18 19:30:54.591891	amazon
78	0ktcezuk31iw7fksihy4rv549sib	15082020-IMG_2942.jpg	image/jpeg	{"identified":true}	282766	CdLFhMxuFBmZ+E1S0PeMWg==	2021-03-18 19:31:10.501392	amazon
79	rhn6wuwk35ehh7dj5jgo94mehja5	DSC_0793.NEF.jpg	image/jpeg	{"identified":true}	138286	XW9zCDCEmxO+ImTzj+yhgw==	2021-03-18 19:31:33.471004	amazon
80	phppjy9nt5k6h3iono9hmn7sk51h	pefil cerro.jpg	image/jpeg	{"identified":true}	123999	Bx8CLCZ8iRijetGhq70/Dw==	2021-03-18 19:31:43.624618	amazon
81	92hrr9n2933lftm94xhqm3tz16an	15082020-IMG_2922.jpg	image/jpeg	{"identified":true}	214010	HLDWbTCl5jnAqj8uqiru0Q==	2021-03-18 19:32:11.896608	amazon
82	go4xog9ydlzunx3vnbwjkqanfo9q	roca chile chico.jpg	image/jpeg	{"identified":true}	12893	QPG7Qg3lH7pydmVzprBfig==	2021-03-18 21:35:20.085244	amazon
83	dm20fjj1luowr94sv4b3hqtor1rc	IMG_0027.jpg	image/jpeg	{"identified":true}	23056	29fQepIrk8Rhsr0yhRTyMw==	2021-03-18 21:35:20.145475	amazon
84	nsm57cm5y9bejkpwd27xha2mtosl	coverPetorca.jpg	image/jpeg	{"identified":true}	25732	F0Uc2Hxt26ob+X2bqDMQOw==	2021-03-18 21:35:20.271339	amazon
85	w0pbvxqywi3iuj2y63ebxw3d6k7c	06092020-IMG_3163.jpg	image/jpeg	{"identified":true}	60339	w3vOr8AY1pzpn9YWettFDw==	2021-03-18 21:35:22.949781	amazon
86	0xn7l57oxvpoplzeoet5eeoqvc0y	16082020-IMG_3004.jpg	image/jpeg	{"identified":true}	51041	tYedhpp1GTAhZC2q8tgbrQ==	2021-03-18 21:36:32.230359	amazon
87	28hpuuwqtlonxtrvrokz9k9ac053	paparella.jpeg	image/jpeg	{"identified":true}	5409	Ez5h0p4NPe4JhdmWp1A8UQ==	2021-03-19 15:38:44.154898	amazon
88	5jk2ye1gfqjcemoy5s58ru98sltx	DSC_0793.NEF.jpg	image/jpeg	{"identified":true}	10059	yTQ5tX92xTN+SUpy6rxF7w==	2021-03-19 15:39:00.186077	amazon
89	4zin7fdop2q1n250kc1js2vv95qs	coverPetorca.jpg	image/jpeg	{"identified":true}	14068	jEineNy7GO3TWcFfHhKoUw==	2021-03-19 15:39:00.313135	amazon
90	t1dyvvysvifn82axwwe63y4tydb9	pefil cerro.JPG	image/jpeg	{"identified":true}	10242	g/L6snSYYVOBl1pqCL7VCQ==	2021-03-19 15:39:00.356192	amazon
91	9u9cs5soihgh82dir8ppypkvxl6b	15082020-IMG_2942.jpg	image/jpeg	{"identified":true}	71569	imIu7gQf4XFs0uQ/lxHDvQ==	2021-03-19 15:39:00.542838	amazon
92	4g42b75z3amtnuvgqkeq0wqz0pkx	15082020-IMG_2922.jpg	image/jpeg	{"identified":true}	69615	3yoKz3V/yhgMplX3QRoooQ==	2021-03-19 18:48:34.036336	amazon
93	15d3gh39npleo7gvt941ocsxcnuk	16082020-IMG_3004.jpg	image/jpeg	{"identified":true}	58840	NpGkoipVeiXoiqoTkyctHw==	2021-03-19 18:48:34.301796	amazon
94	wg0eaci30ltymbgkpa78369e5els	the_north_face.png	image/png	{"identified":true}	4546	oNuAF1Ayzy2O+h7ulT2LLA==	2021-03-19 19:07:06.000893	amazon
95	1wareua1jsbrvb1qr7a9cl0kmcr7	Patagonia-Logo.png	image/png	{"identified":true}	44003	7zi3XL8UQDrJeCXpQ+ldFQ==	2021-03-22 19:29:42.846634	amazon
96	mekymosd3wzisz9q0k6o377oc4dr	Patagonia-Logo.png	image/png	{"identified":true}	16312	tM1NvSniSakzucmFXn5hCg==	2021-03-22 19:29:47.032029	amazon
97	xoj9tiojugtudds723tp9ebjtkja	Patagonia-Logo.png	image/png	{"identified":true}	1714	0DGIXL9togEg0nFtqyLvVg==	2021-03-22 19:29:53.050362	amazon
98	l4zvq4bf2c17j533agsb14ndkcxd	coverPetorca.jpg	image/jpeg	{"identified":true}	237452	+xDgLybzH7DHp3IKXPDxvw==	2021-03-23 13:01:09.675743	amazon
99	yy70o0tslozlm7rdkwgmlagxw2zl	06092020-IMG_3163.jpg	image/jpeg	{"identified":true}	230435	x09CElwJx3ZUbh1rC2zAgw==	2021-03-23 13:01:35.566664	amazon
100	9914cnmhno6gseoyc1nc76zah6ef	Melosas_08_2019.jpg	image/jpeg	{"identified":true}	1974525	bpf9BKL6VKHTmJwOAxy1uA==	2021-03-23 13:03:42.105087	amazon
101	4tulcltgsmo8txa3mirmin3k1ui9	Melosas_08_2019.jpg	image/jpeg	{"identified":true}	149423	rGljTknU1By/Qgvr7kkp+g==	2021-03-23 13:03:48.811109	amazon
102	gzn0vzu2phni95djuuzcwn6rjs0q	Melosas_08_2019.jpg	image/jpeg	{"identified":true}	1974525	bpf9BKL6VKHTmJwOAxy1uA==	2021-03-23 13:05:32.020226	amazon
103	y1dbyd8zoo493xrewzgjm6bg1c4w	Melosas_08_2019.jpg	image/jpeg	{"identified":true}	149423	rGljTknU1By/Qgvr7kkp+g==	2021-03-23 13:05:37.828347	amazon
104	eh9isl4kjsl8ex6ga8sshti9sjub	IMG_0027.jpg	image/jpeg	{"identified":true}	13989	oWGWHXLam+/nKhwOHFLpNA==	2021-03-23 21:38:28.692625	amazon
105	e7ngnqpop7pguon0bvntgs3lt1j4	16082020-IMG_3026.jpg	image/jpeg	{"identified":true}	4808369	eAhqkHfAMvx42mn/NQjXnQ==	2021-03-24 13:39:13.306587	amazon
106	6uocv3lbednal1tjhbvwalv01o3z	16082020-IMG_3026.jpg	image/jpeg	{"identified":true}	228549	z1Bplb7fupGiv29YdfhQpQ==	2021-03-24 13:39:22.422667	amazon
107	6cjsf9q0w4gpbw0w2790govitm9d	pexels-roman-pohorecki-23385.jpeg	image/jpeg	{"identified":true}	1474586	KMCQOVSXLtnm4g0o7vQogw==	2021-03-24 13:39:41.24063	amazon
108	kfh6q4o0mrganyrgdo7vr725efnl	pexels-roman-pohorecki-23385.jpeg	image/jpeg	{"identified":true}	136722	gLfD0Sz3gAuzbreLwSDAXg==	2021-03-24 13:39:47.660497	amazon
109	kdxw1lalnbdup9beg7ky52fz0oma	Screen Shot 2021-03-23 at 19.18.20.png	image/png	{"identified":true}	1423648	r9zQyinhLL0Q0n8oDixtfA==	2021-03-24 13:41:32.493287	amazon
110	aq63xcskacmuj6euee67rl2vw9wb	Screen Shot 2021-03-23 at 19.18.20.png	image/png	{"identified":true}	361179	Hpdbi5njug4UmcVUzJSDPg==	2021-03-24 13:41:37.297133	amazon
111	28xnf9bnso83bw6fxahqr6q9jgwn	pexels-roman-pohorecki-23385.jpeg	image/jpeg	{"identified":true}	9080	5MkEZpHhimFFKXDuPtpx2g==	2021-03-24 13:49:27.379299	amazon
112	xq0bvccp1ovub0okso1jobllxipo	16082020-IMG_3026.jpg	image/jpeg	{"identified":true}	54727	ci8dD4bzlhYwqysmyHE0RA==	2021-03-24 13:49:29.88204	amazon
113	b77zk8s9egs4f3vm0g93occv99pb	16082020-IMG_3026.jpg	image/jpeg	{"identified":true}	59549	p/N59ReU0KCZMRrU9detiQ==	2021-03-24 13:49:57.439084	amazon
114	76kpb619ui7jjpnccmxcnxqpaddy	16082020-IMG_3026.jpg	image/jpeg	{"identified":true}	239425	+f4JJXUlvhRZ6mukS23J8g==	2021-03-24 13:53:57.038831	amazon
115	afw8l5ulheykg1diyda72h0m4b1u	15082020-IMG_2976.jpg	image/jpeg	{"identified":true}	4228674	cNYRBbcQOi9dmzigOPUJ0w==	2021-03-24 13:54:30.560428	amazon
116	2aajw8e7jqjhka7w9y56kw0ykx0e	15082020-IMG_2976.jpg	image/jpeg	{"identified":true}	366075	2wFL6SjfUzVXZYtoFwHKFw==	2021-03-24 13:54:37.613777	amazon
117	ixhre4awmiusm1ts2oz7v2ll9ey2	15082020-IMG_2976.jpg	image/jpeg	{"identified":true}	86629	WZ0ppwtB/axo+xCAukbjvg==	2021-03-24 13:55:10.160713	amazon
118	cla11orq3uurujc8z52q08ozyog8	15082020-IMG_2976.jpg	image/jpeg	{"identified":true}	95244	n3ZPzQWHyqx1qr1+XVaVww==	2021-03-24 13:55:44.938272	amazon
119	38eqlk4a84yu1p59tr8k40gg0osn	15082020-IMG_2976.jpg	image/jpeg	{"identified":true}	246592	ffw7gopHeBm/a5B0D8EjOA==	2021-03-24 13:56:01.869311	amazon
120	gkrpgzri4pa6sdy1n2viu5tuo47y	Screen Shot 2021-03-23 at 19.18.20.png	image/png	{"identified":true}	38968	7yUxGujUK8q8C5L9qpfEPg==	2021-03-24 13:56:13.797247	amazon
121	zd6enqxfyhyuehugpux3qh5x0vip	pexels-roman-pohorecki-23385.jpeg	image/jpeg	{"identified":true}	13162	2Ulhb11owI/kePCimPiNHA==	2021-03-24 14:40:40.711983	amazon
122	7tw8f1018l9i8it028cppg3tajji	pexels-roman-pohorecki-23385.jpg	image/jpeg	{"identified":true}	308166	7G8sTUDYelUVlbyM4a/WIg==	2021-03-24 15:03:11.813178	amazon
123	7jwavfbpp29sgsr3j87t050p0piz	DSC_0793.NEF.jpg	image/jpeg	{"identified":true}	64184	7Qp7PspRj/BupaikAYFGFA==	2021-03-25 12:15:07.011608	amazon
124	bc6najm0i9c1up669ptnc3vzy2f3	Screen Shot 2021-03-23 at 19.18.20.jpg	image/jpeg	{"identified":true}	232886	XCEK5+gDW0ZGZdhwI4K4BQ==	2021-03-29 18:23:10.448661	amazon
125	1ryfi9j98d5md39p4xfmln5pa1t1	roca chile chico.jpg	image/jpeg	{"identified":true}	170793	gnjkW3IXbtE64RJAq4I2tQ==	2021-04-05 23:48:14.415374	amazon
126	3o1fibnobggcfb6gtnorxiv4i3kg	15082020-IMG_2960.jpg	image/jpeg	{"identified":true}	141317	/2kSzilOMuQ5/KvXpj4KXA==	2021-04-07 01:43:38.088108	amazon
127	3709a2zwwqir44qfdhim6d7fby3o	A2845A35-F38E-49EF-9F4E-7D7403D1F59A.jpg	image/jpeg	{"identified":true}	144	lnaDgjFxYfVu7w2zpMXSqg==	2021-04-07 16:27:16.755464	amazon
128	ehix361s42h94nsycnlrjx1gxpxz	81E0B2EA-463D-425C-89E1-0C2A8CF0B6B5.jpg	image/jpeg	{"identified":true}	144	o7KcXuNiU/cy5Wu6TJ9PdA==	2021-04-07 16:43:00.210665	amazon
129	p3dzl2angdx4z5jjro4i2bnu0rpw	IMG_6664.JPG	image/jpeg	{"identified":true}	2107574	VBH5+6jrXZ2f6+UOI5GJ0A==	2021-04-07 18:08:10.359624	amazon
130	sr04mftr1dzij6vtrazjb27v3ktl	IMG_6664.JPG	image/jpeg	{"identified":true}	281666	yYEjPwe4r+g8QPpqYXmreQ==	2021-04-07 18:08:16.331398	amazon
131	4rpu4sre1du6bdaguiofb07j6wir	IMG_6664.jpg	image/jpeg	{"identified":true}	196272	0/aGk1oG7EiamKaVx/BOTw==	2021-04-07 18:14:45.719391	amazon
132	o0ngqdbtfy23ggykvkqaswqfyt9t	IMG_6664.JPG	image/jpeg	{"identified":true}	38256	kKwLlshKE53DSOxxs79xmA==	2021-04-07 18:21:50.049776	amazon
133	y2codnf5wzhlm2v6qms6690fexal	1792260C-ED9C-476E-B389-762ADC147DA3.jpg	image/jpeg	{"identified":true}	207	Dx+Aw6wh2L2AMwkxB4jISg==	2021-04-08 13:16:15.857109	amazon
134	61d9yitus0a5rmsvjq6gkv0zr7jg	2AEB8E1E-52CE-4B0B-825E-D7B9E6F4EB26.jpg	image/jpeg	{"identified":true}	207	Q7xQ9HNf6KJ3iZ5B4Gpfwg==	2021-04-08 15:39:49.486779	amazon
135	334dt0c1ove0wehwfq61o3pabze0	IMG_6656.JPG	image/jpeg	{"identified":true}	2141884	I4eochrt3mVyt9Nm13jIrg==	2021-04-08 15:44:35.237077	amazon
136	rxueqgkp7nys36nbabpm34q59yaa	IMG_6656.JPG	image/jpeg	{"identified":true}	283378	hZ/fKg00A2sr/mCPHNWgAA==	2021-04-08 15:44:41.433982	amazon
137	mspplu5b4agxz2mz912bmhi0cp1f	IMG_6656.jpg	image/jpeg	{"identified":true}	199816	9lbe5fDEA6tlYpXZYj6BLg==	2021-04-08 15:44:58.878179	amazon
168	l5lg2jniqqmi8jrtmlivglhnkgle	IMG_6660.JPG	image/jpeg	{"identified":true}	2131754	F1/3dHhIBfaEVbjDc/NtMw==	2021-04-09 15:25:06.240396	amazon
169	fp6jhsoldcwlprk259cibvjuvquu	IMG_6660.JPG	image/jpeg	{"identified":true}	278227	XqPIu9iod/AhiA6NDZ37uA==	2021-04-09 15:25:10.870964	amazon
170	oky89oqjzx7la4lfbkfd6oqni0gd	IMG_6660.jpg	image/jpeg	{"identified":true}	193672	K5+7+DlaIzEB9vjLwpoNzA==	2021-04-09 15:25:42.46131	amazon
171	d53khp85yubznea2nfm6p2lo8ljw	0E0258D2-F4C3-49D1-B4E2-C1C1CA32A6AF.jpg	image/jpeg	{"identified":true}	144	FNUfTIfGxG/PQXPShYA1Fg==	2021-04-09 15:55:17.994823	amazon
172	0q520frtxtryyk1j0pap7jq63188	BE779948-BD68-4FFF-B909-9DE1E45A9B70.jpg	image/jpeg	{"identified":true}	144	27+MCpXEyJJ8WbBrMKx7pg==	2021-04-09 15:56:35.220638	amazon
173	jfhpdcspk84yuwwevbg5u3dtjiio	IMG_3449.jpeg	image/jpeg	{"identified":true}	1325454	ukAAQscG8WmmaeGLMNaj+w==	2021-04-13 19:36:51.112772	amazon
174	by9kg1cl8onvcp3azjoq7v4koqrq	IMG_3449.jpeg	image/jpeg	{"identified":true}	117776	/jtYesIPhHa8uGYgS0JsaQ==	2021-04-13 19:36:56.160932	amazon
175	yvbrvdzdh8om9a4gypn9yuzq2uc0	2b84149b-2737-4fde-8483-f49673d213a4.jpeg	image/jpeg	{"identified":true}	140089	gic7xcFgwi6CBaHz4S4dQg==	2021-04-13 19:38:00.316504	amazon
176	d1fc6ubo7rpanvzk90q5i1jv0anc	2b84149b-2737-4fde-8483-f49673d213a4.jpeg	image/jpeg	{"identified":true}	83039	wn7fD/y/zGrgAzyV+dkA3A==	2021-04-13 19:38:03.30505	amazon
177	4ylsj9kgvprhk9cp0kjm8u9k66ff	2b84149b-2737-4fde-8483-f49673d213a4.jpeg	image/jpeg	{"identified":true}	8185	lgv/fFSkI5YNq8+ODj3KYQ==	2021-04-13 19:38:10.08665	amazon
178	q0je43hc5539o5b0jkan5bj49oh4	2b84149b-2737-4fde-8483-f49673d213a4.jpeg	image/jpeg	{"identified":true}	10390	hPzvGlrU8kd2ecWfMldVOg==	2021-04-13 19:42:27.642941	amazon
179	p8rp9yd0uj1kifgabkcvn4af3l9a	IMG_3449.jpeg	image/jpeg	{"identified":true}	16104	57Nt3Fhk5SgXbIZu646+Nw==	2021-04-13 19:42:28.319561	amazon
180	xhw5ke5c3366h7vq73l6o2fpfgev	IMG_3449.jpg	image/jpeg	{"identified":true}	141052	Mp6IRBihL4gZICIpB8iBxw==	2021-04-13 19:42:45.691553	amazon
181	lsiky0s5uk0b4fayoib071odkg5d	IMG_3508.jpeg	image/jpeg	{"identified":true}	2629202	5+rzCXpqGmsaX/rdCFroAg==	2021-04-13 19:43:19.933857	amazon
182	gs77xqhb9hevffq74lnb6p1c4b0u	IMG_3508.jpeg	image/jpeg	{"identified":true}	224372	jjHci9HdEBkS/3bT2JIgbQ==	2021-04-13 19:43:25.572888	amazon
183	vddyatu6xtyhmcfpqfognihv11n7	2b84149b-2737-4fde-8483-f49673d213a4.jpg	image/jpeg	{"identified":true}	186552	/hObj7u72b5dvPfHCnfsmg==	2021-04-13 19:44:04.899193	amazon
184	mel4o2osj2p3mig3rnw5b6ygyb4y	IMG_3508.jpeg	image/jpeg	{"identified":true}	23966	T05t6AwTcTpwlLtyQoPTbg==	2021-04-13 19:44:41.528628	amazon
185	wexgcq0k7g592c4uuss491ht73zq	IMG_3508.jpg	image/jpeg	{"identified":true}	238883	1/ZGrdLETxhT/FMy1NEccA==	2021-04-13 19:44:48.728725	amazon
186	2xx1xmyxv2vuyojysp2cvb2m7oo7	ed384003-186f-4491-8356-0111398d4d67.jpg	image/jpeg	{"identified":true}	101	M+x92qpMDwanATtAZkY1iQ==	2021-04-14 13:12:46.809007	amazon
187	5w4rgj8t7cwhi4qettal68qx4jav	IMG_3508.jpeg	image/jpeg	{"identified":true}	18344	vevu8OXj4oesY+mjrLSaZw==	2021-04-14 14:36:41.407041	amazon
188	9y2rb2tljhstd8jukcx0cdh74m40	8985c2a8-8e7c-442e-9b88-158c2d60f919.jpg	image/jpeg	{"identified":true}	101	jwR3fZrm+o++G3RBrD6lYw==	2021-04-14 16:41:56.999384	amazon
189	tfof4m3mrtytou9129uoa8rj5t1v	10339C6A-956C-445D-AC42-F3A309C2C859.jpg	image/jpeg	{"identified":true}	171	I6sw4CYHZ1AQ0hsr1SgTmQ==	2021-04-14 18:16:10.941317	amazon
190	ye7yu8xywudmcn491045mgqbn4eu	86D23693-021B-451F-9709-EA48C6D56F2F.jpg	image/jpeg	{"identified":true}	148	8HQDmWnjSamGyCbEsSNqLg==	2021-04-18 20:25:51.114076	amazon
191	bhfd0dihvd9m1k3aqe7teizqqf47	A45AF66C-1FE4-4123-A079-79D13C3EAFB5.jpg	image/jpeg	{"identified":true}	144	ovR3cnDJcKUdqZI555O/xQ==	2021-04-18 20:26:47.920719	amazon
192	nidlioltkj6ivglzy6lgw4e0fbss	IMG_6642.JPG	image/jpeg	{"identified":true}	1845407	L7PYhaajx6gt3mxyJQqPMQ==	2021-04-18 21:25:21.156689	amazon
193	oiyln9hjrzfojkbfgfqd9nly4u87	IMG_6642.JPG	image/jpeg	{"identified":true}	258595	hCHgzGFHAYOefCdYn29ldw==	2021-04-18 21:25:25.797539	amazon
194	hy0v5otpzpyla8ds7j951qyqvgs4	IMG_6642.jpg	image/jpeg	{"identified":true}	177973	gVk94xqUWipG2UzA4AHokQ==	2021-04-18 21:27:35.052554	amazon
195	5vv8l7f2atpzk3st3u1zz22pfb3f	3503A7E1-F824-4F36-A2B8-19B8BD6889C2.jpg	image/jpeg	{"identified":true}	148	XBCm9sGREyZWquN3xVTvwg==	2021-04-23 19:58:24.382833	amazon
199	3xh511s5hh6oldxop5feo1xn46wq	General 3.jpg	image/jpeg	{"identified":true}	194074	pgg+91XJHikjv4zgMvAMpQ==	2021-05-03 17:10:13.580213	amazon
200	180q00a7vi5ztl52dk4osjea61rk	General 3.jpg	image/jpeg	{"identified":true}	129761	U1CBQam+D1Odv6aAnnNHeA==	2021-05-03 17:10:19.442019	amazon
229	31iomp3j8l8ytvrcjws19v3udjp2	54 - poetica cara oeste.jpg	image/jpeg	{"identified":true}	130671	BtdL4POiRU9Cjb73R0rpEw==	2021-05-03 17:26:25.565421	amazon
230	qnrdhblnjzxkzpxb295drtewbxs3	55 - muela mayor cara este.jpg	image/jpeg	{"identified":true}	177868	SfRw6lHQh7QuwCIOOqFKlg==	2021-05-03 17:26:35.537882	amazon
231	ovwn4aqjz6vdh78cpkf3u4ddn3vf	55 - muela mayor cara este.jpg	image/jpeg	{"identified":true}	182692	/uR0vfA8E0iI0YFB6TL9fw==	2021-05-03 17:26:44.011022	amazon
232	3usxe8b7ga410u0npj0ot1y81elm	56 - muela mayor cara sur.jpg	image/jpeg	{"identified":true}	209213	Q7iUnOZQX7oA6vi2sD53Uw==	2021-05-03 17:27:12.248811	amazon
233	6zp6gfzotccq13fblmolr41a6twz	56 - muela mayor cara sur.jpg	image/jpeg	{"identified":true}	212082	+NFBVPjjiFTl6hFb39HcVQ==	2021-05-03 17:27:16.600482	amazon
234	i3a6h97meqf86bpfsyg2gxzfboaf	57 - minicubo.jpg	image/jpeg	{"identified":true}	231864	VMXtrudnNTB1AQLM5awciA==	2021-05-03 17:27:31.505781	amazon
235	q82h7sxe565otzhdle1iu67xghcv	57 - minicubo.jpg	image/jpeg	{"identified":true}	223041	h3T6seHnDf8KxmFDoa6P3Q==	2021-05-03 17:27:34.264042	amazon
236	c7b92fzm9td4iokvx72fpnaxxq2x	58 - Señuelo.jpg	image/jpeg	{"identified":true}	622190	wZxCcFN3UZyX/6toODRrdQ==	2021-05-03 17:28:00.066044	amazon
237	oj0zp0hd64h88ce0kryybhdycy7z	58 - Señuelo.jpg	image/jpeg	{"identified":true}	260091	xMVE1ahIP6UyFbw5OtQENA==	2021-05-03 17:28:06.225533	amazon
238	10vgj79373e5v1jg0o3fghajq1e1	60 - La Cueva.jpg	image/jpeg	{"identified":true}	191132	Ta7YZRJQuU3pXCDRNBgTHw==	2021-05-03 17:28:27.615934	amazon
239	ood1stt4kdno2s0mmuxw70f646bc	60 - La Cueva.jpg	image/jpeg	{"identified":true}	186088	daANw6o2BNyrForUhco8+w==	2021-05-03 17:28:30.637469	amazon
240	6fjc8slgqgsio9jo0e7utb4clioo	59 - Piedra del Condor.jpg	image/jpeg	{"identified":true}	297806	KyH75zcGG+vEvRarOsw34A==	2021-05-03 17:28:45.73291	amazon
241	ao22lqfyj2xjoamafhyxl9f5iaud	59 - Piedra del Condor.jpg	image/jpeg	{"identified":true}	208070	t4kjOCY6zXkvSHPXiksujQ==	2021-05-03 17:28:48.69685	amazon
242	kvmxjr3cia53ha5a3tok1nsmusf2	231 - San Pateste Escuela.jpg	image/jpeg	{"identified":true}	733589	B9vFRdi2Dp1l8yo69joMKA==	2021-05-03 17:29:11.780059	amazon
243	r8bwpsm85dth0b94fyrhgn0von3x	231 - San Pateste Escuela.jpg	image/jpeg	{"identified":true}	269975	eR9hLzMfDaph9BWlUOVL9Q==	2021-05-03 17:30:31.451155	amazon
244	oydmpz4zl2se847cjh7ylofo7v9q	61 - todo por nada izq.jpg	image/jpeg	{"identified":true}	49665	iXAKvRLgCNQqOQZkRiqx5A==	2021-05-03 18:09:46.860086	amazon
245	ohujc98ge55a1c7kl56p16bol5tc	61 - todo por nada izq.jpg	image/jpeg	{"identified":true}	45116	SYnIJ4Qro8wCzpgfxfXjIA==	2021-05-03 18:09:59.945894	amazon
246	s9alot9koqj2crsr1lz79hgluait	62 - todo por nada centro.jpg	image/jpeg	{"identified":true}	35415	if+XK+E+F1DPyip6DEoVBA==	2021-05-03 18:10:35.559884	amazon
247	3d5d6ort4iuzst2noxpvo5kfj0qj	62 - todo por nada centro.jpg	image/jpeg	{"identified":true}	33944	lJ3e7iMB+xdSeawHMRYBbQ==	2021-05-03 18:10:37.581137	amazon
248	z1orf58tkpr9yt88ltnt2lvahnho	63 - todo por nada der.jpg	image/jpeg	{"identified":true}	38589	kvSYMZprs7HuW17S+ipB9Q==	2021-05-03 18:10:41.953577	amazon
249	wvp3ewub8pfrp4p4a6a9hn370pi7	63 - todo por nada der.jpg	image/jpeg	{"identified":true}	36631	Ai20My2InHl5HKPJgOBceQ==	2021-05-03 18:10:43.494703	amazon
250	zxox8nul40f6gkxf5io9rtk7zbtb	64 - hidrofobia.jpg	image/jpeg	{"identified":true}	108498	cinb4Ai2J2S7xdsmvzDtSQ==	2021-05-03 18:10:58.16219	amazon
251	oj4hkcg0v7d0fxvucmoks73m1oiu	65 - popeye.jpg	image/jpeg	{"identified":true}	109334	XgdANGCVJxgMWJlTcy1/zA==	2021-05-03 18:11:18.650514	amazon
252	8u08x67gmckcynof299vop0287i5	64 - hidrofobia.jpg	image/jpeg	{"identified":true}	125608	if0e3bb2UZIRvy2Q1y1puA==	2021-05-03 18:11:33.12483	amazon
253	l28nc7b8eedo1ad2wsp9fwczkb73	65 - popeye.jpg	image/jpeg	{"identified":true}	130623	MTg4WdYUgl1qIDHyoIiIFg==	2021-05-03 18:11:50.044598	amazon
254	fx7mo4sjhqgj8ckznpab0v39ty6k	66 - la fogata.jpg	image/jpeg	{"identified":true}	115784	ryYC5+mksS6OkTZltkaTSw==	2021-05-03 18:11:55.760269	amazon
255	3i7xbct71bppi8w17r6rto7sx1th	67 - constelacionas.jpg	image/jpeg	{"identified":true}	102287	DFTuohzauN4xjdcaNNJAEQ==	2021-05-03 18:11:57.911177	amazon
256	vxdjhbs7zan49evjapi4k28g7kji	66 - la fogata.jpg	image/jpeg	{"identified":true}	132663	kNjjnVKto888AAq59GAUmQ==	2021-05-03 18:12:25.172718	amazon
257	0znbtqygo5qznra38xrnxernvttv	67 - constelacionas.jpg	image/jpeg	{"identified":true}	125362	R8Xq0Xd0irPINmRxnLIjlg==	2021-05-03 18:12:27.945427	amazon
258	g3x1ji8xslbb04zywf0z1gg812gl	General Palestras.jpg	image/jpeg	{"identified":true}	42765	2rUUbKTmig+enL70dNqymw==	2021-05-03 18:17:20.504173	amazon
259	kvqu6trx6vonc016k61zv9o62ezx	General Palestras.jpg	image/jpeg	{"identified":true}	42039	Xx2RGk9eRZkUKUaf1arTaA==	2021-05-03 18:17:22.735671	amazon
260	kuymn6hw8pqt76dagihdb2jwmwdj	69 - Piola Izquierda.jpg	image/jpeg	{"identified":true}	119816	9AXkD2wod95zIjCp0aqMNg==	2021-05-03 18:27:56.758848	amazon
261	609iwqf0pbtnkt0e941nlczuvhaz	69 - Piola Izquierda.jpg	image/jpeg	{"identified":true}	114247	eEgyE8rnPqsBcXB2VygVbA==	2021-05-03 18:28:00.874696	amazon
262	7befr667993wck8rkou3zg06c1ay	70 - Piola Derecha.jpg	image/jpeg	{"identified":true}	48091	fG5dGvRFiEj6jAdvuV47uA==	2021-05-03 18:28:13.12028	amazon
263	ajxilx7kw852lcrc58s0px3h9pvf	70 - Piola Derecha.jpg	image/jpeg	{"identified":true}	45970	nPZs8O9++tn5duqL6NCiyQ==	2021-05-03 18:28:15.920606	amazon
264	ex5wvfpe81ujs78dblqkf5nslroo	71 - Marmol Derecha.jpg	image/jpeg	{"identified":true}	60205	4CUGdG4dcxVb9FdFJtiaeQ==	2021-05-03 18:28:29.7899	amazon
265	jgiwdb43t4sfamtz9omzb3xxndjz	71 - Marmol Derecha.jpg	image/jpeg	{"identified":true}	57597	99asLEVOUPLWZBZUEVI2WQ==	2021-05-03 18:28:32.854624	amazon
266	vvrgfp8tjovz327htndv48g84hik	72 - Marmol Principal.jpg	image/jpeg	{"identified":true}	53120	mhjFlNDO5thSDizEcrKlBQ==	2021-05-03 18:28:47.293435	amazon
267	p5vu822sqpfl0eaiacq3xclkk1aa	72 - Marmol Principal.jpg	image/jpeg	{"identified":true}	50997	Dqra35CuwxP3EdyERKN4AA==	2021-05-03 18:29:08.533396	amazon
268	oblmpbvux05oct8n8f23xh4ogvro	73 - Multilargos.jpg	image/jpeg	{"identified":true}	245165	65ZjHa3Chri8+4EdFTahrQ==	2021-05-03 18:29:29.867496	amazon
269	fwf4yj4xonrxetay1igg7d2srf2b	73 - Multilargos.jpg	image/jpeg	{"identified":true}	244955	wOS1Vr6tDydGU+KQlkLoxw==	2021-05-03 18:29:34.703645	amazon
270	xmsfd4fviqlpy0qtr1ok1eyjbdxb	68 - Porno.jpg	image/jpeg	{"identified":true}	2526961	5YM2naINM007NUQCihI5Rw==	2021-05-03 18:29:42.712076	amazon
271	sko5m5yvy10qez8s9z4p4ktmof6d	68 - Porno.jpg	image/jpeg	{"identified":true}	907519	NmR6SoN78lwnlx0n3L2dwg==	2021-05-03 18:30:47.396412	amazon
272	ww3iywc3zxvw075irpwo4xloy1q2	General Chacabuco.jpg	image/jpeg	{"identified":true}	405987	fOzjIevdbmL8xdTp+QowkA==	2021-05-03 18:33:26.925155	amazon
273	k7e317gyh0f0j7gfwiumc0knvhnb	General Chacabuco.jpg	image/jpeg	{"identified":true}	154358	PncvLGNhgaH4fzyj89bPEg==	2021-05-03 18:33:30.065177	amazon
274	ztqxslzmmohzmhtia6jjal64bz1e	General Palestras.jpg	image/jpeg	{"identified":true}	7790	sdm8zZyo6t//YbvHA1Qx+A==	2021-05-03 21:18:10.449845	amazon
275	5xryj1wk91ogvaoay23mbcqydp3u	General 3.jpg	image/jpeg	{"identified":true}	11618	lPscUQXkVjwvs3svhnRfnQ==	2021-05-03 21:18:11.471795	amazon
276	yxevymonde4bpcayv1y05sevr8q6	75 - Zona Polaca.jpg	image/jpeg	{"identified":true}	190455	V3hL802H9kRvR+z1Cdsavg==	2021-05-03 23:29:55.647298	amazon
277	m318brube3af6nfk16kqhwr8tf4t	76 - Zona Escuela.jpg	image/jpeg	{"identified":true}	206115	iirPsPgiMdECBbSlyZP9bA==	2021-05-03 23:29:59.47299	amazon
278	jkzux8md3r7xvqncxivyl9exvpdj	75 - Zona Polaca.jpg	image/jpeg	{"identified":true}	175999	tcjFMDG3P84fsbKt12I1IQ==	2021-05-03 23:30:02.711272	amazon
279	yari11vd8ep3seskow5ui3p0114c	76 - Zona Escuela.jpg	image/jpeg	{"identified":true}	197077	UlIVHfaaAjlrnX452h7vdA==	2021-05-03 23:30:03.434555	amazon
280	is7xugmhlzvb5ioafj8vv9bmqk96	77 - Café Paris.jpg	image/jpeg	{"identified":true}	185966	Ap7FMiPeJ/d+7bF0fzhjcw==	2021-05-03 23:30:10.942329	amazon
281	hjl7akvnkf9whe0x381hagzrp8yk	77 - Café Paris.jpg	image/jpeg	{"identified":true}	178610	yiMTp9glc/H24VXCcnQhng==	2021-05-03 23:30:23.809673	amazon
282	hq9s6m18810t3mquaoakr5gop9dt	78 - Gran Monolito Cara Oeste.jpg	image/jpeg	{"identified":true}	77602	3FlId+9ofi3xi98/pVPcvQ==	2021-05-03 23:30:39.584697	amazon
283	2t7xv4xofq5ywkuhz8k14bwyxnlw	78 - Gran Monolito Cara Oeste.jpg	image/jpeg	{"identified":true}	73110	kuzAna17L3ZjB7HBt/8wLA==	2021-05-03 23:30:42.089633	amazon
284	2bie3p1gk5r6p4knpbrzqbllwjbu	79 - Gran Monolito Cara Sur-Oeste.jpg	image/jpeg	{"identified":true}	88190	PnV1zA7ZujuBHUWXOzFUzw==	2021-05-03 23:31:18.743618	amazon
285	rbpcpk1qfm6g2eybazwknbqhlkmy	79 - Gran Monolito Cara Sur-Oeste.jpg	image/jpeg	{"identified":true}	83715	da18Pm3dt431B6n4zU0t8Q==	2021-05-03 23:31:21.367358	amazon
286	wj97t5toa85dxlxaun6wrf2san6a	80 - Gran Monolito Cara Sur.jpg	image/jpeg	{"identified":true}	148171	QWIVN2peMdb1lFpG3U/rxg==	2021-05-03 23:31:34.078451	amazon
287	ruy8j5o8hng4cjwnzb5ande150zo	80 - Gran Monolito Cara Sur.jpg	image/jpeg	{"identified":true}	141203	R9Jvy4unfjJoMkJrpFez6g==	2021-05-03 23:31:36.904505	amazon
288	tp3n54ws9s2104etkta64p1865tx	81 - Gran Monolito Cara Norte.jpg	image/jpeg	{"identified":true}	65437	PIoI4dnUbyc8kkrcxIxYvA==	2021-05-03 23:31:52.804352	amazon
289	0hq1anrdk4fef098pfw93vp03jnx	81 - Gran Monolito Cara Norte.jpg	image/jpeg	{"identified":true}	62257	QfJZzqPP1s21nDkwdbb4Qw==	2021-05-03 23:31:55.241066	amazon
290	zzwognvylmmaflya083p3yovtdxc	82 - Arriero.jpg	image/jpeg	{"identified":true}	194648	xgqADDFr1DQHjXkIxEdg1Q==	2021-05-03 23:32:04.566634	amazon
291	cyvssbncui6jumfxeev1j95971yk	82 - Arriero.jpg	image/jpeg	{"identified":true}	105752	dwDQQvkDgHEwM0kR1w4MHA==	2021-05-03 23:32:07.396534	amazon
292	ayt57ocewzfuw2x4b0zpj2qnc0qa	83 - Multilargos Izquierda.jpg	image/jpeg	{"identified":true}	247430	DrtKAYTfhIDw7x+70ya79g==	2021-05-03 23:32:17.166094	amazon
293	v6jrtp1i9xpuw0x5kaf73c9u1dey	83 - Multilargos Izquierda.jpg	image/jpeg	{"identified":true}	204160	djU0pco4oFcPAX3HICUQ3g==	2021-05-03 23:32:20.326312	amazon
294	bgsdcg0sau1oh2guka22de06zxgv	84 - Multilargos Aguja.jpg	image/jpeg	{"identified":true}	130363	musFqXNSU8e4D4DxAesAYw==	2021-05-03 23:32:32.119726	amazon
295	30hoiq3jdg5q1am5e2t4hgdfz9q7	84 - Multilargos Aguja.jpg	image/jpeg	{"identified":true}	123743	svx2yZmAr2wv4DICJRp3aw==	2021-05-03 23:32:35.078087	amazon
296	z8nnog1amc3sdmc6oj4y0eswpjya	Melosas Principal.jpg	image/jpeg	{"identified":true}	104436	/MfcJDA6t3ck9zUl07uEcw==	2021-05-03 23:33:51.643141	amazon
297	qgv3ta0p1k0o2dg18ift6xfnpp69	Melosas Principal.jpg	image/jpeg	{"identified":true}	79212	FB5onoypYrFdbGrZ8mNELA==	2021-05-03 23:33:54.900438	amazon
298	l8ywk56xrpbdornj7vk7l2x6ezg3	General 3.jpg	image/jpeg	{"identified":true}	150479	Bbm+UkAUsB2/yuhvA1XvRg==	2021-05-04 13:58:27.145872	amazon
299	77wdf0cpi2h2gw0p3l3rcsybxqr7	Melosas Principal.jpg	image/jpeg	{"identified":true}	123730	C/IAYzKs4H/xP2Vt6HY7fQ==	2021-05-05 01:42:03.954657	amazon
300	zzw9n7iud1s0f51mcsg1rlhilwnq	C0C34E46-7EAB-40DE-B3E2-E57C2FE34B5C.jpg	image/jpeg	{"identified":true}	235	Alfzlu0MYL8Keb/izg4pNA==	2021-08-18 13:53:33.002931	amazon
301	saskamwvrdpidaw6wo6d34540m97	149470C8-EC05-444A-AF77-DB147D09B2FE.jpg	image/jpeg	{"identified":true}	171	JYa0QoT5Oafc5R5hMw0s9g==	2021-08-18 14:04:58.22178	amazon
302	xxv3codth2xblbe97a7p382okbi1	1B3D2B7A-B88C-4E95-836D-0A8D437219EF.jpg	image/jpeg	{"identified":true}	235	ojfdK4G+w37FesCt0CN7fg==	2021-08-18 14:10:41.849347	amazon
303	qrfad05pxuedzblq2x74h0oxjeiw	7C5BFEDD-222A-4A6F-8F8F-2C394D6782C3.jpg	image/jpeg	{"identified":true}	6394480	mCHYjDlsKwqKMPCLxsfkhA==	2021-08-27 03:06:55.00825	amazon
\.


--
-- Data for Name: active_storage_variant_records; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.active_storage_variant_records (id, blob_id, variation_digest) FROM stdin;
1	42	B62VV7bY7IWpNU2HcpGzeHQxcSo=
2	61	W3rQbiDVl3RX0dJoKIDlgkZ9b4A=
127	199	B62VV7bY7IWpNU2HcpGzeHQxcSo=
4	62	W3rQbiDVl3RX0dJoKIDlgkZ9b4A=
5	43	B62VV7bY7IWpNU2HcpGzeHQxcSo=
6	45	B62VV7bY7IWpNU2HcpGzeHQxcSo=
7	47	oVj7i/n+6fv54/e/IrAmwBJg5hA=
8	58	B62VV7bY7IWpNU2HcpGzeHQxcSo=
128	198	B62VV7bY7IWpNU2HcpGzeHQxcSo=
10	52	RwfvjUmoCX8Hz/UChslbk+dfysc=
11	39	RwfvjUmoCX8Hz/UChslbk+dfysc=
12	58	RwfvjUmoCX8Hz/UChslbk+dfysc=
13	50	RwfvjUmoCX8Hz/UChslbk+dfysc=
14	64	RwfvjUmoCX8Hz/UChslbk+dfysc=
129	202	B62VV7bY7IWpNU2HcpGzeHQxcSo=
130	204	B62VV7bY7IWpNU2HcpGzeHQxcSo=
17	42	RwfvjUmoCX8Hz/UChslbk+dfysc=
131	206	B62VV7bY7IWpNU2HcpGzeHQxcSo=
19	45	RwfvjUmoCX8Hz/UChslbk+dfysc=
132	208	B62VV7bY7IWpNU2HcpGzeHQxcSo=
133	210	B62VV7bY7IWpNU2HcpGzeHQxcSo=
22	44	RwfvjUmoCX8Hz/UChslbk+dfysc=
23	56	RwfvjUmoCX8Hz/UChslbk+dfysc=
24	43	RwfvjUmoCX8Hz/UChslbk+dfysc=
134	212	B62VV7bY7IWpNU2HcpGzeHQxcSo=
135	214	B62VV7bY7IWpNU2HcpGzeHQxcSo=
27	52	6x8KFtM/8O22vFlQ4EVqBuGjN8Q=
28	58	6x8KFtM/8O22vFlQ4EVqBuGjN8Q=
29	39	6x8KFtM/8O22vFlQ4EVqBuGjN8Q=
30	50	6x8KFtM/8O22vFlQ4EVqBuGjN8Q=
31	42	58nLvjR5lLpeOdoWw8+s844W40I=
136	216	B62VV7bY7IWpNU2HcpGzeHQxcSo=
137	218	B62VV7bY7IWpNU2HcpGzeHQxcSo=
34	64	6/MbmLdOctrj7ukuFyVm7nWShm4=
35	44	58nLvjR5lLpeOdoWw8+s844W40I=
36	39	58nLvjR5lLpeOdoWw8+s844W40I=
37	56	Gyj87HB3iiR69qv3Z2338vXOV/k=
38	45	6x8KFtM/8O22vFlQ4EVqBuGjN8Q=
39	43	6x8KFtM/8O22vFlQ4EVqBuGjN8Q=
138	220	B62VV7bY7IWpNU2HcpGzeHQxcSo=
139	222	B62VV7bY7IWpNU2HcpGzeHQxcSo=
42	42	6x8KFtM/8O22vFlQ4EVqBuGjN8Q=
140	224	B62VV7bY7IWpNU2HcpGzeHQxcSo=
44	47	uyx6Kcit1Aa78Mrn7bVgZ7OZn0Y=
45	95	oVj7i/n+6fv54/e/IrAmwBJg5hA=
46	95	uyx6Kcit1Aa78Mrn7bVgZ7OZn0Y=
141	226	B62VV7bY7IWpNU2HcpGzeHQxcSo=
48	39	B62VV7bY7IWpNU2HcpGzeHQxcSo=
49	50	B62VV7bY7IWpNU2HcpGzeHQxcSo=
142	228	B62VV7bY7IWpNU2HcpGzeHQxcSo=
51	100	B62VV7bY7IWpNU2HcpGzeHQxcSo=
52	102	B62VV7bY7IWpNU2HcpGzeHQxcSo=
53	58	58nLvjR5lLpeOdoWw8+s844W40I=
54	105	B62VV7bY7IWpNU2HcpGzeHQxcSo=
55	107	pyLviDWX04C+UUbhLvzku5ELF5Q=
56	109	oVj7i/n+6fv54/e/IrAmwBJg5hA=
57	107	7GSB7XKiQxDNPaQRLwPzuOQWE9k=
58	105	W3rQbiDVl3RX0dJoKIDlgkZ9b4A=
59	105	6x8KFtM/8O22vFlQ4EVqBuGjN8Q=
60	105	RwfvjUmoCX8Hz/UChslbk+dfysc=
143	230	B62VV7bY7IWpNU2HcpGzeHQxcSo=
62	115	B62VV7bY7IWpNU2HcpGzeHQxcSo=
63	115	W3rQbiDVl3RX0dJoKIDlgkZ9b4A=
64	115	6x8KFtM/8O22vFlQ4EVqBuGjN8Q=
65	115	RwfvjUmoCX8Hz/UChslbk+dfysc=
66	109	AA1hMxeHtZHx9jhAS20K7zXw2cQ=
67	107	vrA3GLlzlwMjSEe6cE8VrJKWxds=
68	107	RwfvjUmoCX8Hz/UChslbk+dfysc=
69	44	B62VV7bY7IWpNU2HcpGzeHQxcSo=
70	109	RwfvjUmoCX8Hz/UChslbk+dfysc=
71	52	B62VV7bY7IWpNU2HcpGzeHQxcSo=
72	55	B62VV7bY7IWpNU2HcpGzeHQxcSo=
73	129	2I8lOixQ28+LxxfoEBLqKClamkQ=
74	129	RwfvjUmoCX8Hz/UChslbk+dfysc=
75	129	Gyj87HB3iiR69qv3Z2338vXOV/k=
76	135	2I8lOixQ28+LxxfoEBLqKClamkQ=
77	135	RwfvjUmoCX8Hz/UChslbk+dfysc=
109	168	2I8lOixQ28+LxxfoEBLqKClamkQ=
110	168	RwfvjUmoCX8Hz/UChslbk+dfysc=
111	173	pyLviDWX04C+UUbhLvzku5ELF5Q=
112	175	pyLviDWX04C+UUbhLvzku5ELF5Q=
113	175	7GSB7XKiQxDNPaQRLwPzuOQWE9k=
114	175	vrA3GLlzlwMjSEe6cE8VrJKWxds=
115	173	vrA3GLlzlwMjSEe6cE8VrJKWxds=
144	232	B62VV7bY7IWpNU2HcpGzeHQxcSo=
117	173	RwfvjUmoCX8Hz/UChslbk+dfysc=
118	181	pyLviDWX04C+UUbhLvzku5ELF5Q=
119	175	RwfvjUmoCX8Hz/UChslbk+dfysc=
120	181	vrA3GLlzlwMjSEe6cE8VrJKWxds=
121	181	RwfvjUmoCX8Hz/UChslbk+dfysc=
122	181	7GSB7XKiQxDNPaQRLwPzuOQWE9k=
123	192	2I8lOixQ28+LxxfoEBLqKClamkQ=
124	192	RwfvjUmoCX8Hz/UChslbk+dfysc=
145	234	B62VV7bY7IWpNU2HcpGzeHQxcSo=
146	236	B62VV7bY7IWpNU2HcpGzeHQxcSo=
147	238	B62VV7bY7IWpNU2HcpGzeHQxcSo=
148	240	B62VV7bY7IWpNU2HcpGzeHQxcSo=
149	242	B62VV7bY7IWpNU2HcpGzeHQxcSo=
150	244	B62VV7bY7IWpNU2HcpGzeHQxcSo=
151	246	B62VV7bY7IWpNU2HcpGzeHQxcSo=
152	248	B62VV7bY7IWpNU2HcpGzeHQxcSo=
153	250	B62VV7bY7IWpNU2HcpGzeHQxcSo=
154	251	B62VV7bY7IWpNU2HcpGzeHQxcSo=
155	254	B62VV7bY7IWpNU2HcpGzeHQxcSo=
156	255	B62VV7bY7IWpNU2HcpGzeHQxcSo=
157	258	B62VV7bY7IWpNU2HcpGzeHQxcSo=
158	260	B62VV7bY7IWpNU2HcpGzeHQxcSo=
159	262	B62VV7bY7IWpNU2HcpGzeHQxcSo=
160	264	B62VV7bY7IWpNU2HcpGzeHQxcSo=
161	266	B62VV7bY7IWpNU2HcpGzeHQxcSo=
162	268	B62VV7bY7IWpNU2HcpGzeHQxcSo=
163	270	B62VV7bY7IWpNU2HcpGzeHQxcSo=
164	272	B62VV7bY7IWpNU2HcpGzeHQxcSo=
165	258	6x8KFtM/8O22vFlQ4EVqBuGjN8Q=
166	199	6x8KFtM/8O22vFlQ4EVqBuGjN8Q=
167	276	B62VV7bY7IWpNU2HcpGzeHQxcSo=
168	277	B62VV7bY7IWpNU2HcpGzeHQxcSo=
169	280	B62VV7bY7IWpNU2HcpGzeHQxcSo=
170	282	B62VV7bY7IWpNU2HcpGzeHQxcSo=
171	284	B62VV7bY7IWpNU2HcpGzeHQxcSo=
172	286	B62VV7bY7IWpNU2HcpGzeHQxcSo=
173	288	B62VV7bY7IWpNU2HcpGzeHQxcSo=
174	290	B62VV7bY7IWpNU2HcpGzeHQxcSo=
175	292	B62VV7bY7IWpNU2HcpGzeHQxcSo=
176	294	B62VV7bY7IWpNU2HcpGzeHQxcSo=
177	296	B62VV7bY7IWpNU2HcpGzeHQxcSo=
178	199	RwfvjUmoCX8Hz/UChslbk+dfysc=
179	296	RwfvjUmoCX8Hz/UChslbk+dfysc=
\.


--
-- Data for Name: ar_internal_metadata; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.ar_internal_metadata (key, value, created_at, updated_at) FROM stdin;
environment	development	2020-12-18 19:14:58.368653	2021-08-17 12:38:24.622683
\.


--
-- Data for Name: climbed_routes; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.climbed_routes (id, route_id, user_id, created_at, updated_at) FROM stdin;
88	39	50	2021-04-29 16:16:32.871053	2021-04-29 16:16:32.871053
92	563	111	2021-05-02 02:19:32.458051	2021-05-02 02:19:32.458051
93	561	111	2021-05-02 02:19:53.808606	2021-05-02 02:19:53.808606
94	372	111	2021-05-02 02:20:22.868922	2021-05-02 02:20:22.868922
96	81	90	2021-05-05 01:40:38.729264	2021-05-05 01:40:38.729264
70	39	49	2021-04-12 20:07:05.511671	2021-04-12 20:07:05.511671
71	74	49	2021-04-13 15:51:08.43001	2021-04-13 15:51:08.43001
72	75	49	2021-04-13 15:54:29.091124	2021-04-13 15:54:29.091124
73	77	49	2021-04-13 15:54:51.864513	2021-04-13 15:54:51.864513
74	73	49	2021-04-13 15:55:11.075482	2021-04-13 15:55:11.075482
75	37	49	2021-04-13 16:01:05.050889	2021-04-13 16:01:05.050889
76	36	88	2021-04-14 14:27:26.243805	2021-04-14 14:27:26.243805
77	39	88	2021-04-14 14:30:31.795904	2021-04-14 14:30:31.795904
81	36	93	2021-04-16 14:58:26.765904	2021-04-16 14:58:26.765904
83	36	50	2021-04-19 21:21:51.883935	2021-04-19 21:21:51.883935
85	36	89	2021-04-22 23:09:45.618349	2021-04-22 23:09:45.618349
87	74	96	2021-04-25 23:31:57.115862	2021-04-25 23:31:57.115862
97	81	49	2021-08-28 17:35:49.617202	2021-08-28 17:35:49.617202
\.


--
-- Data for Name: climbing_types; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.climbing_types (id, name, created_at, updated_at) FROM stdin;
1	0	2020-12-18 19:15:29.965452	2020-12-18 19:15:29.965452
2	1	2020-12-18 19:15:29.979466	2020-12-18 19:15:29.979466
3	2	2020-12-18 19:15:29.985009	2020-12-18 19:15:29.985009
\.


--
-- Data for Name: coalition_members; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.coalition_members (id, coalition_id, user_id, created_at, updated_at, approved) FROM stdin;
36	1	49	2021-04-07 18:08:10.277626	2021-04-07 18:08:10.277626	f
\.


--
-- Data for Name: coalitions; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.coalitions (id, name, email, twitter, instagram, youtube, tiktok, facebook, description, created_at, updated_at, initiatives_count) FROM stdin;
1	Amigos de petorca			https://instagram.com/andescalada			https://facebook.com/andescalada	Somos los mejores amigos que Petorca puede tener, nos preocupamos del que el lugar se mantenga increíble, las rutas seguras y protegemos el frágil bosque que nos alberga. 	2020-12-18 19:15:31.830578	2021-03-11 01:33:35.27259	3
\.


--
-- Data for Name: collaborated_routes; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.collaborated_routes (id, route_id, user_id, created_at, updated_at) FROM stdin;
36	39	49	2021-04-08 15:44:35.132384	2021-04-08 15:44:35.132384
69	36	49	2021-04-09 15:57:52.598912	2021-04-09 15:57:52.598912
70	36	50	2021-04-09 15:57:52.604865	2021-04-09 15:57:52.604865
\.


--
-- Data for Name: countries; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.countries (id, name, created_at, updated_at) FROM stdin;
1	Chile	2020-12-18 19:15:29.427255	2020-12-18 19:15:29.427255
\.


--
-- Data for Name: descent_alternatives; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.descent_alternatives (id, route_id, descent_id, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: descents; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.descents (id, name, created_at, updated_at) FROM stdin;
1	0	2020-12-18 19:15:30.381964	2020-12-18 19:15:30.381964
2	1	2020-12-18 19:15:30.395777	2020-12-18 19:15:30.395777
3	2	2020-12-18 19:15:30.402057	2020-12-18 19:15:30.402057
\.


--
-- Data for Name: downloaded_zones; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.downloaded_zones (id, user_id, zone_id, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: equipped_routes; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.equipped_routes (id, route_id, user_id, date, created_at, updated_at) FROM stdin;
34	39	49	\N	2021-04-09 15:44:11.661335	2021-04-09 15:44:11.661335
35	36	50	\N	2021-04-09 15:57:52.625413	2021-04-09 15:57:52.625413
\.


--
-- Data for Name: initiative_participants; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.initiative_participants (id, initiative_id, user_id, created_at, updated_at) FROM stdin;
9	34	49	2021-04-07 18:08:10.299446	2021-04-07 18:08:10.299446
\.


--
-- Data for Name: initiative_sponsors; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.initiative_sponsors (id, initiative_id, sponsor_id, created_at, updated_at) FROM stdin;
34	34	1	2021-02-19 14:24:42.841711	2021-02-19 14:24:42.841711
36	1	1	2021-03-22 19:31:42.898521	2021-03-22 19:31:42.898521
37	1	34	2021-03-22 19:31:42.913321	2021-03-22 19:31:42.913321
\.


--
-- Data for Name: initiatives; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.initiatives (id, donatable, joinable, start_date, end_date, donated, coalition_id, name, email, twitter, instagram, youtube, tiktok, facebook, description, created_at, updated_at, active) FROM stdin;
1	f	t	2021-03-11 18:00:00	2021-01-27 22:15:31	0	1	Limpiatón		https://twitter.com/andescalada	https://instagram.com/andescalada				Únete a limpiar Petorca con nosotros. Nos reuniremos este sábado a las 13:30 hrs para darle con todo y dejar el lugar impecable. 	2020-12-18 19:15:31.9251	2021-03-15 14:41:05.546814	t
34	t	t	2021-02-24 15:00:00	2021-04-30 16:00:00	0	1	Cambio de chapas						https://facebook.com/andescalada	Hay chapas que ya necesitan un retiro digno y una pensión suficiente,  para dar paso a unas mejores y más brillantes. 	2021-02-19 14:24:42.786178	2021-03-15 19:18:35.038593	t
35	t	t	2021-04-27 16:00:00	2021-05-04 16:00:00	0	1	Montaña Limpia							El Club Andino Bariloche invita a sumarse a una nueva jornada de Montañas Limpias que se realizará este año el 27 de abril, con el slogan La basura no vuelve sola.	2021-03-11 13:55:59.728976	2021-03-24 13:41:32.509006	t
\.


--
-- Data for Name: nesting_seasons; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.nesting_seasons (id, start_date, end_date, route_id, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: owners; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.owners (id, company, government, name, email, phone_number, additional_info, created_at, updated_at) FROM stdin;
1	f	f	Dueñx de prueba	dueno@duena.cl	+56912345678	\N	2020-12-18 19:15:29.778136	2020-12-18 19:15:29.778136
\.


--
-- Data for Name: pictures; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.pictures (id, downloaded, imageable_type, imageable_id, created_at, updated_at, description) FROM stdin;
39	f	Initiative	1	2021-03-05 12:29:28.622746	2021-03-24 13:39:13.322956	
40	f	Initiative	1	2021-03-05 12:32:33.473652	2021-03-24 13:54:30.575506	
43	f	Zone	35	2021-04-13 19:38:00.299247	2021-04-13 19:38:00.327976	Jumareando al cielo
44	f	Zone	35	2021-04-13 19:43:19.919693	2021-04-13 19:43:19.949478	Hermosa Toba
\.


--
-- Data for Name: recent_zones; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.recent_zones (id, user_id, zone_id, created_at, updated_at) FROM stdin;
1355	90	62	2021-04-28 12:24:27.133848	2021-04-28 12:24:27.133848
1356	90	42	2021-04-28 12:24:51.381872	2021-04-28 12:24:51.381872
1357	49	42	2021-04-28 12:25:00.482082	2021-04-28 12:25:00.482082
1358	90	38	2021-04-28 12:25:09.620755	2021-04-28 12:25:09.620755
1406	90	41	2021-05-05 01:42:02.269397	2021-05-05 01:42:02.269397
1360	90	63	2021-04-28 12:25:41.684954	2021-04-28 12:25:41.684954
1361	90	61	2021-04-28 12:25:46.913194	2021-04-28 12:25:46.913194
1362	90	39	2021-04-28 12:26:29.584879	2021-04-28 12:26:29.584879
1364	105	49	2021-04-29 15:54:56.65716	2021-04-29 15:54:56.65716
1365	104	35	2021-04-29 15:56:21.792119	2021-04-29 15:56:21.792119
1367	104	38	2021-04-29 15:56:35.365013	2021-04-29 15:56:35.365013
1316	49	35	2021-04-09 15:14:38.932641	2021-04-09 15:14:38.932641
1317	86	35	2021-04-12 14:00:43.357983	2021-04-12 14:00:43.357983
1369	105	41	2021-04-29 15:58:32.708361	2021-04-29 15:58:32.708361
1400	112	35	2021-04-29 20:30:56.293922	2021-04-29 20:30:56.293922
1345	96	35	2021-04-23 19:59:10.507539	2021-04-23 19:59:10.507539
1347	96	38	2021-04-25 23:00:11.258626	2021-04-25 23:00:11.258626
1348	96	64	2021-04-25 23:02:17.372455	2021-04-25 23:02:17.372455
1402	112	42	2021-04-29 20:31:57.905653	2021-04-29 20:31:57.905653
1363	49	54	2021-04-28 13:59:57.688906	2021-04-28 13:59:57.688906
1370	106	49	2021-04-29 15:59:15.011979	2021-04-29 15:59:15.011979
1405	113	35	2021-04-30 01:43:14.734165	2021-04-30 01:43:14.734165
1318	49	64	2021-04-12 20:09:39.251222	2021-04-12 20:09:39.251222
1319	49	63	2021-04-12 20:09:51.699249	2021-04-12 20:09:51.699249
1320	49	47	2021-04-12 20:09:58.675165	2021-04-12 20:09:58.675165
1336	92	48	2021-04-15 16:46:36.572132	2021-04-15 16:46:36.572132
1349	96	44	2021-04-25 23:31:16.691133	2021-04-25 23:31:16.691133
1351	96	41	2021-04-25 23:33:55.209833	2021-04-25 23:33:55.209833
1371	106	38	2021-04-29 16:00:22.865262	2021-04-29 16:00:22.865262
1372	106	35	2021-04-29 16:01:13.091385	2021-04-29 16:01:13.091385
1321	49	38	2021-04-13 13:44:42.279251	2021-04-13 13:44:42.279251
1337	93	35	2021-04-16 14:58:23.232111	2021-04-16 14:58:23.232111
1352	99	35	2021-04-26 14:57:14.407377	2021-04-26 14:57:14.407377
1340	89	64	2021-04-18 16:06:04.577947	2021-04-18 16:06:04.577947
1375	107	38	2021-04-29 16:19:44.410851	2021-04-29 16:19:44.410851
1377	107	35	2021-04-29 16:20:10.280928	2021-04-29 16:20:10.280928
1324	87	35	2021-04-14 13:13:30.353855	2021-04-14 13:13:30.353855
1341	95	48	2021-04-18 20:33:28.180673	2021-04-18 20:33:28.180673
1342	95	62	2021-04-18 20:35:48.911874	2021-04-18 20:35:48.911874
1344	50	35	2021-04-19 19:44:43.213639	2021-04-19 19:44:43.213639
1379	109	46	2021-04-29 17:12:47.899038	2021-04-29 17:12:47.899038
1380	109	70	2021-04-29 17:15:01.67162	2021-04-29 17:15:01.67162
1381	109	43	2021-04-29 17:15:58.275171	2021-04-29 17:15:58.275171
1326	88	35	2021-04-14 14:18:16.38	2021-04-14 14:18:16.38
1329	89	35	2021-04-14 14:26:07.951003	2021-04-14 14:26:07.951003
1382	109	49	2021-04-29 17:16:14.338063	2021-04-29 17:16:14.338063
1385	109	42	2021-04-29 17:20:45.479421	2021-04-29 17:20:45.479421
1387	109	50	2021-04-29 17:23:47.48713	2021-04-29 17:23:47.48713
1388	109	52	2021-04-29 17:24:01.217448	2021-04-29 17:24:01.217448
1389	109	35	2021-04-29 17:24:29.327028	2021-04-29 17:24:29.327028
1390	109	68	2021-04-29 17:26:03.912564	2021-04-29 17:26:03.912564
1391	110	35	2021-04-29 17:26:18.428146	2021-04-29 17:26:18.428146
1392	109	67	2021-04-29 17:26:54.919795	2021-04-29 17:26:54.919795
1393	109	48	2021-04-29 17:28:17.249802	2021-04-29 17:28:17.249802
1394	110	39	2021-04-29 17:29:56.569205	2021-04-29 17:29:56.569205
1395	110	38	2021-04-29 17:31:04.754378	2021-04-29 17:31:04.754378
1396	110	42	2021-04-29 17:31:35.951296	2021-04-29 17:31:35.951296
1397	111	49	2021-04-29 19:06:29.47402	2021-04-29 19:06:29.47402
1398	111	41	2021-04-29 19:07:30.286546	2021-04-29 19:07:30.286546
1332	90	35	2021-04-14 18:09:52.924155	2021-04-14 18:09:52.924155
1407	116	35	2021-08-18 14:09:23.623377	2021-08-18 14:09:23.623377
\.


--
-- Data for Name: recommended_descents; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.recommended_descents (id, route_id, descent_id, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: recommended_seasons; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.recommended_seasons (id, wall_id, season_id, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: regions; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.regions (id, name, country_id, created_at, updated_at) FROM stdin;
1	Región de Arica y Parinacota	1	2020-12-18 19:15:29.489185	2020-12-18 19:15:29.489185
2	Región de Tarapacá	1	2020-12-18 19:15:29.497206	2020-12-18 19:15:29.497206
3	Región de Antofagasta	1	2020-12-18 19:15:29.505425	2020-12-18 19:15:29.505425
4	Región de Atacama	1	2020-12-18 19:15:29.512386	2020-12-18 19:15:29.512386
5	Región de Coquimbo	1	2020-12-18 19:15:29.519609	2020-12-18 19:15:29.519609
6	Región de Valparaíso	1	2020-12-18 19:15:29.525391	2020-12-18 19:15:29.525391
7	Región Metropolitana de Santiago	1	2020-12-18 19:15:29.534466	2020-12-18 19:15:29.534466
8	Región del Libertador General Bernardo O'Higgins	1	2020-12-18 19:15:29.559556	2020-12-18 19:15:29.559556
9	Región del Maule	1	2020-12-18 19:15:29.575227	2020-12-18 19:15:29.575227
10	Región de Ñuble	1	2020-12-18 19:15:29.581148	2020-12-18 19:15:29.581148
11	Región del Biobío	1	2020-12-18 19:15:29.594068	2020-12-18 19:15:29.594068
12	Región de La Araucanía	1	2020-12-18 19:15:29.680478	2020-12-18 19:15:29.680478
13	Región de Los Ríos	1	2020-12-18 19:15:29.714892	2020-12-18 19:15:29.714892
14	Región de Los Lagos	1	2020-12-18 19:15:29.728151	2020-12-18 19:15:29.728151
15	Región Aysén del General Carlos Ibáñez del Campo	1	2020-12-18 19:15:29.736097	2020-12-18 19:15:29.736097
16	Región de Magallanes y de la Antártica Chilena	1	2020-12-18 19:15:29.745708	2020-12-18 19:15:29.745708
\.


--
-- Data for Name: roles; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.roles (id, name, resource_type, resource_id, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: route_climbing_types; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.route_climbing_types (id, route_id, climbing_type_id, created_at, updated_at) FROM stdin;
36	36	1	2021-02-25 14:22:13.709412	2021-02-25 14:22:13.709412
37	39	1	2021-04-08 15:44:35.137259	2021-04-08 15:44:35.137259
70	37	1	2021-04-13 14:01:54.222912	2021-04-13 14:01:54.222912
71	72	1	2021-04-13 14:12:10.400239	2021-04-13 14:12:10.400239
72	73	1	2021-04-13 14:13:54.151281	2021-04-13 14:13:54.151281
73	74	1	2021-04-13 14:15:02.32168	2021-04-13 14:15:02.32168
74	75	1	2021-04-13 14:16:00.479198	2021-04-13 14:16:00.479198
75	76	1	2021-04-13 14:17:09.391705	2021-04-13 14:17:09.391705
76	77	1	2021-04-13 14:18:30.57355	2021-04-13 14:18:30.57355
77	78	1	2021-04-25 22:56:50.863838	2021-04-25 22:56:50.863838
78	79	1	2021-04-25 22:56:50.981001	2021-04-25 22:56:50.981001
79	80	1	2021-04-25 22:56:51.098519	2021-04-25 22:56:51.098519
80	81	1	2021-04-25 22:56:51.222657	2021-04-25 22:56:51.222657
81	82	1	2021-04-25 22:56:51.316186	2021-04-25 22:56:51.316186
82	83	1	2021-04-25 22:56:51.410938	2021-04-25 22:56:51.410938
83	84	1	2021-04-25 22:56:51.553678	2021-04-25 22:56:51.553678
84	85	1	2021-04-25 22:56:51.681672	2021-04-25 22:56:51.681672
85	86	1	2021-04-25 22:56:51.82167	2021-04-25 22:56:51.82167
86	87	1	2021-04-25 22:56:51.919652	2021-04-25 22:56:51.919652
87	88	1	2021-04-25 22:56:51.987574	2021-04-25 22:56:51.987574
88	89	1	2021-04-25 22:56:52.049921	2021-04-25 22:56:52.049921
89	90	1	2021-04-25 22:56:52.141633	2021-04-25 22:56:52.141633
90	91	1	2021-04-25 22:56:52.203487	2021-04-25 22:56:52.203487
91	92	1	2021-04-25 22:56:52.332407	2021-04-25 22:56:52.332407
92	93	1	2021-04-25 22:56:52.401766	2021-04-25 22:56:52.401766
93	94	1	2021-04-25 22:56:52.466528	2021-04-25 22:56:52.466528
94	95	1	2021-04-25 22:56:52.560591	2021-04-25 22:56:52.560591
95	96	1	2021-04-25 22:56:52.641502	2021-04-25 22:56:52.641502
96	97	1	2021-04-25 22:56:52.786214	2021-04-25 22:56:52.786214
97	98	1	2021-04-25 22:56:52.892986	2021-04-25 22:56:52.892986
98	99	1	2021-04-25 22:56:52.951783	2021-04-25 22:56:52.951783
99	100	1	2021-04-25 22:56:53.018492	2021-04-25 22:56:53.018492
100	101	1	2021-04-25 22:56:53.135005	2021-04-25 22:56:53.135005
101	102	1	2021-04-25 22:56:53.239629	2021-04-25 22:56:53.239629
102	103	1	2021-04-25 22:56:53.312813	2021-04-25 22:56:53.312813
103	104	1	2021-04-25 22:56:53.402448	2021-04-25 22:56:53.402448
104	105	1	2021-04-25 22:56:53.471628	2021-04-25 22:56:53.471628
105	106	1	2021-04-25 22:56:53.571524	2021-04-25 22:56:53.571524
106	107	1	2021-04-25 22:56:53.664741	2021-04-25 22:56:53.664741
107	108	1	2021-04-25 22:56:53.75761	2021-04-25 22:56:53.75761
108	109	1	2021-04-25 22:56:53.851471	2021-04-25 22:56:53.851471
109	110	1	2021-04-25 22:56:53.925896	2021-04-25 22:56:53.925896
110	111	1	2021-04-25 22:56:53.998509	2021-04-25 22:56:53.998509
111	112	1	2021-04-25 22:56:54.060473	2021-04-25 22:56:54.060473
112	113	1	2021-04-25 22:56:54.154373	2021-04-25 22:56:54.154373
113	114	1	2021-04-25 22:56:54.237647	2021-04-25 22:56:54.237647
114	115	1	2021-04-25 22:56:54.30347	2021-04-25 22:56:54.30347
115	116	1	2021-04-25 22:56:54.371929	2021-04-25 22:56:54.371929
116	117	1	2021-04-25 22:56:54.435216	2021-04-25 22:56:54.435216
117	118	1	2021-04-25 22:56:54.526358	2021-04-25 22:56:54.526358
118	119	1	2021-04-25 22:56:54.593987	2021-04-25 22:56:54.593987
119	120	1	2021-04-25 22:56:54.704362	2021-04-25 22:56:54.704362
120	121	1	2021-04-25 22:56:54.818495	2021-04-25 22:56:54.818495
121	122	1	2021-04-25 22:56:54.909874	2021-04-25 22:56:54.909874
122	123	1	2021-04-25 22:56:55.026574	2021-04-25 22:56:55.026574
123	124	1	2021-04-25 22:56:55.102421	2021-04-25 22:56:55.102421
124	125	1	2021-04-25 22:56:55.183877	2021-04-25 22:56:55.183877
125	126	1	2021-04-25 22:56:55.27589	2021-04-25 22:56:55.27589
126	127	1	2021-04-25 22:56:55.395346	2021-04-25 22:56:55.395346
127	128	1	2021-04-25 22:56:55.490298	2021-04-25 22:56:55.490298
128	129	1	2021-04-25 22:56:55.57968	2021-04-25 22:56:55.57968
129	130	1	2021-04-25 22:56:55.661222	2021-04-25 22:56:55.661222
130	131	1	2021-04-25 22:56:55.741178	2021-04-25 22:56:55.741178
131	132	1	2021-04-25 22:56:55.806445	2021-04-25 22:56:55.806445
132	133	1	2021-04-25 22:56:55.888327	2021-04-25 22:56:55.888327
133	134	1	2021-04-25 22:56:55.952561	2021-04-25 22:56:55.952561
134	135	1	2021-04-25 22:56:56.034003	2021-04-25 22:56:56.034003
135	136	1	2021-04-25 22:56:56.121296	2021-04-25 22:56:56.121296
136	137	1	2021-04-25 22:56:56.209489	2021-04-25 22:56:56.209489
137	138	1	2021-04-25 22:56:56.281682	2021-04-25 22:56:56.281682
138	139	1	2021-04-25 22:56:56.346787	2021-04-25 22:56:56.346787
139	140	1	2021-04-25 22:56:56.415348	2021-04-25 22:56:56.415348
140	141	1	2021-04-25 22:56:56.508115	2021-04-25 22:56:56.508115
141	142	1	2021-04-25 22:56:56.576911	2021-04-25 22:56:56.576911
142	143	1	2021-04-25 22:56:56.649377	2021-04-25 22:56:56.649377
143	144	1	2021-04-25 22:56:56.738227	2021-04-25 22:56:56.738227
144	145	1	2021-04-25 22:56:56.795582	2021-04-25 22:56:56.795582
145	146	1	2021-04-25 22:56:56.855414	2021-04-25 22:56:56.855414
146	147	1	2021-04-25 22:56:56.913155	2021-04-25 22:56:56.913155
147	148	1	2021-04-25 22:56:56.9707	2021-04-25 22:56:56.9707
148	149	1	2021-04-25 22:56:57.032897	2021-04-25 22:56:57.032897
149	150	1	2021-04-25 22:56:57.095321	2021-04-25 22:56:57.095321
150	151	1	2021-04-25 22:56:57.198716	2021-04-25 22:56:57.198716
151	152	1	2021-04-25 22:56:57.259464	2021-04-25 22:56:57.259464
152	153	1	2021-04-25 22:56:57.320953	2021-04-25 22:56:57.320953
153	154	1	2021-04-25 22:56:57.381659	2021-04-25 22:56:57.381659
154	155	1	2021-04-25 22:56:57.457264	2021-04-25 22:56:57.457264
155	156	1	2021-04-25 22:56:57.532724	2021-04-25 22:56:57.532724
156	157	1	2021-04-25 22:56:57.60493	2021-04-25 22:56:57.60493
157	158	1	2021-04-25 22:56:57.710251	2021-04-25 22:56:57.710251
158	159	1	2021-04-25 22:56:57.814382	2021-04-25 22:56:57.814382
159	160	1	2021-04-25 22:56:57.88451	2021-04-25 22:56:57.88451
160	161	1	2021-04-25 22:56:57.960606	2021-04-25 22:56:57.960606
161	162	1	2021-04-25 22:56:58.038305	2021-04-25 22:56:58.038305
162	163	1	2021-04-25 22:56:58.116605	2021-04-25 22:56:58.116605
163	164	1	2021-04-25 22:56:58.1834	2021-04-25 22:56:58.1834
164	165	1	2021-04-25 22:56:58.268846	2021-04-25 22:56:58.268846
165	166	1	2021-04-25 22:56:58.346564	2021-04-25 22:56:58.346564
166	167	1	2021-04-25 22:56:58.407891	2021-04-25 22:56:58.407891
167	168	1	2021-04-25 22:56:58.474588	2021-04-25 22:56:58.474588
168	169	1	2021-04-25 22:56:58.559641	2021-04-25 22:56:58.559641
169	170	1	2021-04-25 22:56:58.619658	2021-04-25 22:56:58.619658
170	171	1	2021-04-25 22:56:58.701688	2021-04-25 22:56:58.701688
171	172	1	2021-04-25 22:56:58.781026	2021-04-25 22:56:58.781026
172	173	1	2021-04-25 22:56:58.858956	2021-04-25 22:56:58.858956
173	174	1	2021-04-25 22:56:59.024824	2021-04-25 22:56:59.024824
174	175	1	2021-04-25 22:56:59.11297	2021-04-25 22:56:59.11297
175	176	1	2021-04-25 22:56:59.203244	2021-04-25 22:56:59.203244
176	177	1	2021-04-25 22:56:59.277113	2021-04-25 22:56:59.277113
177	178	1	2021-04-25 22:56:59.346002	2021-04-25 22:56:59.346002
178	179	1	2021-04-25 22:56:59.410599	2021-04-25 22:56:59.410599
179	180	1	2021-04-25 22:56:59.478711	2021-04-25 22:56:59.478711
180	181	1	2021-04-25 22:56:59.560506	2021-04-25 22:56:59.560506
181	182	1	2021-04-25 22:56:59.628758	2021-04-25 22:56:59.628758
182	183	1	2021-04-25 22:56:59.714024	2021-04-25 22:56:59.714024
183	184	1	2021-04-25 22:56:59.793996	2021-04-25 22:56:59.793996
184	185	1	2021-04-25 22:56:59.869708	2021-04-25 22:56:59.869708
185	186	1	2021-04-25 22:56:59.940581	2021-04-25 22:56:59.940581
186	187	1	2021-04-25 22:57:00.009552	2021-04-25 22:57:00.009552
187	188	1	2021-04-25 22:57:00.084427	2021-04-25 22:57:00.084427
188	189	1	2021-04-25 22:57:00.167557	2021-04-25 22:57:00.167557
189	190	1	2021-04-25 22:57:00.235494	2021-04-25 22:57:00.235494
190	191	1	2021-04-25 22:57:00.318679	2021-04-25 22:57:00.318679
191	193	1	2021-04-25 22:57:00.441408	2021-04-25 22:57:00.441408
192	194	1	2021-04-25 22:57:00.527914	2021-04-25 22:57:00.527914
193	195	1	2021-04-25 22:57:00.615713	2021-04-25 22:57:00.615713
194	196	1	2021-04-25 22:57:00.705378	2021-04-25 22:57:00.705378
195	197	1	2021-04-25 22:57:00.831556	2021-04-25 22:57:00.831556
196	198	1	2021-04-25 22:57:00.913194	2021-04-25 22:57:00.913194
197	199	1	2021-04-25 22:57:00.995171	2021-04-25 22:57:00.995171
198	200	1	2021-04-25 22:57:01.062917	2021-04-25 22:57:01.062917
199	201	1	2021-04-25 22:57:01.139066	2021-04-25 22:57:01.139066
200	202	1	2021-04-25 22:57:01.220936	2021-04-25 22:57:01.220936
201	203	1	2021-04-25 22:57:01.293529	2021-04-25 22:57:01.293529
202	204	1	2021-04-25 22:57:01.392912	2021-04-25 22:57:01.392912
203	205	1	2021-04-25 22:57:01.457799	2021-04-25 22:57:01.457799
204	206	1	2021-04-25 22:57:01.554612	2021-04-25 22:57:01.554612
205	207	1	2021-04-25 22:57:01.639298	2021-04-25 22:57:01.639298
206	208	1	2021-04-25 22:57:01.710983	2021-04-25 22:57:01.710983
207	209	1	2021-04-25 22:57:01.795123	2021-04-25 22:57:01.795123
208	210	1	2021-04-25 22:57:01.86954	2021-04-25 22:57:01.86954
209	211	1	2021-04-25 22:57:01.938992	2021-04-25 22:57:01.938992
210	212	1	2021-04-25 22:57:02.009816	2021-04-25 22:57:02.009816
211	213	1	2021-04-25 22:57:02.130906	2021-04-25 22:57:02.130906
212	214	1	2021-04-25 22:57:02.215583	2021-04-25 22:57:02.215583
213	215	1	2021-04-25 22:57:02.316688	2021-04-25 22:57:02.316688
214	216	1	2021-04-25 22:57:02.392749	2021-04-25 22:57:02.392749
215	217	1	2021-04-25 22:57:02.474024	2021-04-25 22:57:02.474024
216	218	1	2021-04-25 22:57:02.586775	2021-04-25 22:57:02.586775
217	219	1	2021-04-25 22:57:02.655934	2021-04-25 22:57:02.655934
218	220	1	2021-04-25 22:57:02.727796	2021-04-25 22:57:02.727796
219	221	1	2021-04-25 22:57:02.82348	2021-04-25 22:57:02.82348
220	222	1	2021-04-25 22:57:02.901521	2021-04-25 22:57:02.901521
221	223	1	2021-04-25 22:57:03.05995	2021-04-25 22:57:03.05995
222	224	1	2021-04-25 22:57:03.148668	2021-04-25 22:57:03.148668
223	225	1	2021-04-25 22:57:03.210027	2021-04-25 22:57:03.210027
224	226	1	2021-04-25 22:57:03.286176	2021-04-25 22:57:03.286176
225	227	1	2021-04-25 22:57:03.354451	2021-04-25 22:57:03.354451
226	228	1	2021-04-25 22:57:03.439594	2021-04-25 22:57:03.439594
227	229	1	2021-04-25 22:57:03.526666	2021-04-25 22:57:03.526666
228	230	1	2021-04-25 22:57:03.628452	2021-04-25 22:57:03.628452
229	231	1	2021-04-25 22:57:03.700705	2021-04-25 22:57:03.700705
230	232	1	2021-04-25 22:57:03.783618	2021-04-25 22:57:03.783618
231	233	1	2021-04-25 22:57:03.870258	2021-04-25 22:57:03.870258
232	234	1	2021-04-25 22:57:03.949545	2021-04-25 22:57:03.949545
233	235	1	2021-04-25 22:57:04.017446	2021-04-25 22:57:04.017446
234	236	1	2021-04-25 22:57:04.143355	2021-04-25 22:57:04.143355
235	237	1	2021-04-25 22:57:04.208444	2021-04-25 22:57:04.208444
236	238	1	2021-04-25 22:57:04.281106	2021-04-25 22:57:04.281106
237	239	1	2021-04-25 22:57:04.364133	2021-04-25 22:57:04.364133
238	240	1	2021-04-25 22:57:04.45019	2021-04-25 22:57:04.45019
239	241	1	2021-04-25 22:57:04.555485	2021-04-25 22:57:04.555485
240	242	1	2021-04-25 22:57:04.622787	2021-04-25 22:57:04.622787
241	243	1	2021-04-25 22:57:04.686873	2021-04-25 22:57:04.686873
242	244	1	2021-04-25 22:57:04.786611	2021-04-25 22:57:04.786611
243	245	1	2021-04-25 22:57:04.888508	2021-04-25 22:57:04.888508
244	246	1	2021-04-25 22:57:04.971525	2021-04-25 22:57:04.971525
245	247	1	2021-04-25 22:57:05.053193	2021-04-25 22:57:05.053193
246	248	1	2021-04-25 22:57:05.162667	2021-04-25 22:57:05.162667
247	249	1	2021-04-25 22:57:05.253067	2021-04-25 22:57:05.253067
248	250	1	2021-04-25 22:57:05.329251	2021-04-25 22:57:05.329251
249	251	1	2021-04-25 22:57:05.415503	2021-04-25 22:57:05.415503
250	252	1	2021-04-25 22:57:05.484721	2021-04-25 22:57:05.484721
251	253	1	2021-04-25 22:57:05.613683	2021-04-25 22:57:05.613683
252	254	1	2021-04-25 22:57:05.697864	2021-04-25 22:57:05.697864
253	255	1	2021-04-25 22:57:05.781864	2021-04-25 22:57:05.781864
254	256	1	2021-04-25 22:57:05.861943	2021-04-25 22:57:05.861943
255	257	1	2021-04-25 22:57:05.927318	2021-04-25 22:57:05.927318
256	258	1	2021-04-25 22:57:06.029312	2021-04-25 22:57:06.029312
257	259	1	2021-04-25 22:57:06.106452	2021-04-25 22:57:06.106452
258	260	1	2021-04-25 22:57:06.191002	2021-04-25 22:57:06.191002
259	261	1	2021-04-25 22:57:06.277284	2021-04-25 22:57:06.277284
260	262	1	2021-04-25 22:57:06.340802	2021-04-25 22:57:06.340802
261	263	1	2021-04-25 22:57:06.411713	2021-04-25 22:57:06.411713
262	264	1	2021-04-25 22:57:06.493362	2021-04-25 22:57:06.493362
263	265	1	2021-04-25 22:57:06.583058	2021-04-25 22:57:06.583058
264	266	1	2021-04-25 22:57:06.66136	2021-04-25 22:57:06.66136
265	267	1	2021-04-25 22:57:06.771983	2021-04-25 22:57:06.771983
266	268	1	2021-04-25 22:57:06.844538	2021-04-25 22:57:06.844538
267	269	1	2021-04-25 22:57:06.978476	2021-04-25 22:57:06.978476
268	270	1	2021-04-25 22:57:07.045283	2021-04-25 22:57:07.045283
269	271	1	2021-04-25 22:57:07.146556	2021-04-25 22:57:07.146556
270	272	1	2021-04-25 22:57:07.230087	2021-04-25 22:57:07.230087
271	273	1	2021-04-25 22:57:07.301905	2021-04-25 22:57:07.301905
272	274	1	2021-04-25 22:57:07.372558	2021-04-25 22:57:07.372558
273	275	1	2021-04-25 22:57:07.460633	2021-04-25 22:57:07.460633
274	276	1	2021-04-25 22:57:07.538786	2021-04-25 22:57:07.538786
275	277	1	2021-04-25 22:57:07.630712	2021-04-25 22:57:07.630712
276	278	1	2021-04-25 22:57:07.732262	2021-04-25 22:57:07.732262
277	279	1	2021-04-25 22:57:07.810569	2021-04-25 22:57:07.810569
278	280	1	2021-04-25 22:57:07.913163	2021-04-25 22:57:07.913163
279	281	1	2021-04-25 22:57:08.00288	2021-04-25 22:57:08.00288
280	282	1	2021-04-25 22:57:08.094771	2021-04-25 22:57:08.094771
281	283	1	2021-04-25 22:57:08.183996	2021-04-25 22:57:08.183996
282	284	1	2021-04-25 22:57:08.258273	2021-04-25 22:57:08.258273
283	285	1	2021-04-25 22:57:08.317763	2021-04-25 22:57:08.317763
284	286	1	2021-04-25 22:57:08.387571	2021-04-25 22:57:08.387571
285	287	1	2021-04-25 22:57:08.483811	2021-04-25 22:57:08.483811
286	288	1	2021-04-25 22:57:08.557525	2021-04-25 22:57:08.557525
287	289	1	2021-04-25 22:57:08.633237	2021-04-25 22:57:08.633237
288	290	1	2021-04-25 22:57:08.712607	2021-04-25 22:57:08.712607
289	291	1	2021-04-25 22:57:08.773113	2021-04-25 22:57:08.773113
290	292	1	2021-04-25 22:57:08.850062	2021-04-25 22:57:08.850062
291	293	1	2021-04-25 22:57:08.925867	2021-04-25 22:57:08.925867
292	294	1	2021-04-25 22:57:08.997456	2021-04-25 22:57:08.997456
293	295	1	2021-04-25 22:57:09.073614	2021-04-25 22:57:09.073614
294	296	1	2021-04-25 22:57:09.178762	2021-04-25 22:57:09.178762
295	297	1	2021-04-25 22:57:09.276331	2021-04-25 22:57:09.276331
296	298	1	2021-04-25 22:57:09.339357	2021-04-25 22:57:09.339357
297	299	1	2021-04-25 22:57:09.43295	2021-04-25 22:57:09.43295
298	300	1	2021-04-25 22:57:09.540165	2021-04-25 22:57:09.540165
299	301	1	2021-04-25 22:57:09.597862	2021-04-25 22:57:09.597862
300	302	1	2021-04-25 22:57:09.667717	2021-04-25 22:57:09.667717
301	303	1	2021-04-25 22:57:09.817472	2021-04-25 22:57:09.817472
302	304	1	2021-04-25 22:57:09.920715	2021-04-25 22:57:09.920715
303	305	1	2021-04-25 22:57:09.998111	2021-04-25 22:57:09.998111
304	306	1	2021-04-25 22:57:10.086095	2021-04-25 22:57:10.086095
305	307	1	2021-04-25 22:57:10.186068	2021-04-25 22:57:10.186068
306	308	1	2021-04-25 22:57:10.248032	2021-04-25 22:57:10.248032
307	309	1	2021-04-25 22:57:10.326735	2021-04-25 22:57:10.326735
308	310	1	2021-04-25 22:57:10.42087	2021-04-25 22:57:10.42087
309	311	1	2021-04-25 22:57:10.53488	2021-04-25 22:57:10.53488
310	312	1	2021-04-25 22:57:10.642098	2021-04-25 22:57:10.642098
311	313	1	2021-04-25 22:57:10.707712	2021-04-25 22:57:10.707712
312	314	1	2021-04-25 22:57:10.789566	2021-04-25 22:57:10.789566
313	315	1	2021-04-25 22:57:10.86963	2021-04-25 22:57:10.86963
314	316	1	2021-04-25 22:57:10.999333	2021-04-25 22:57:10.999333
315	317	1	2021-04-25 22:57:11.061274	2021-04-25 22:57:11.061274
316	318	1	2021-04-25 22:57:11.142936	2021-04-25 22:57:11.142936
317	319	1	2021-04-25 22:57:11.223285	2021-04-25 22:57:11.223285
318	320	1	2021-04-25 22:57:11.318716	2021-04-25 22:57:11.318716
319	321	1	2021-04-25 22:57:11.410474	2021-04-25 22:57:11.410474
320	322	1	2021-04-25 22:57:11.478826	2021-04-25 22:57:11.478826
321	323	1	2021-04-25 22:57:11.559601	2021-04-25 22:57:11.559601
322	324	1	2021-04-25 22:57:11.623286	2021-04-25 22:57:11.623286
323	325	1	2021-04-25 22:57:11.691484	2021-04-25 22:57:11.691484
324	326	1	2021-04-25 22:57:11.793505	2021-04-25 22:57:11.793505
325	327	1	2021-04-25 22:57:11.882134	2021-04-25 22:57:11.882134
326	328	1	2021-04-25 22:57:12.001873	2021-04-25 22:57:12.001873
327	329	1	2021-04-25 22:57:12.140653	2021-04-25 22:57:12.140653
328	330	1	2021-04-25 22:57:12.211814	2021-04-25 22:57:12.211814
329	331	1	2021-04-25 22:57:12.306619	2021-04-25 22:57:12.306619
330	332	1	2021-04-25 22:57:12.400615	2021-04-25 22:57:12.400615
331	333	1	2021-04-25 22:57:12.495093	2021-04-25 22:57:12.495093
332	334	1	2021-04-25 22:57:12.580719	2021-04-25 22:57:12.580719
333	335	1	2021-04-25 22:57:12.668391	2021-04-25 22:57:12.668391
334	336	1	2021-04-25 22:57:12.80651	2021-04-25 22:57:12.80651
335	337	1	2021-04-25 22:57:12.889012	2021-04-25 22:57:12.889012
336	338	1	2021-04-25 22:57:12.969068	2021-04-25 22:57:12.969068
337	339	1	2021-04-25 22:57:13.068271	2021-04-25 22:57:13.068271
338	340	1	2021-04-25 22:57:13.17981	2021-04-25 22:57:13.17981
339	341	1	2021-04-25 22:57:13.307423	2021-04-25 22:57:13.307423
340	342	1	2021-04-25 22:57:13.390003	2021-04-25 22:57:13.390003
341	343	1	2021-04-25 22:57:13.477993	2021-04-25 22:57:13.477993
342	344	1	2021-04-25 22:57:13.557749	2021-04-25 22:57:13.557749
343	345	1	2021-04-25 22:57:13.637181	2021-04-25 22:57:13.637181
344	346	1	2021-04-25 22:57:13.714977	2021-04-25 22:57:13.714977
345	347	1	2021-04-25 22:57:13.80079	2021-04-25 22:57:13.80079
346	348	1	2021-04-25 22:57:13.872203	2021-04-25 22:57:13.872203
347	349	1	2021-04-25 22:57:13.948964	2021-04-25 22:57:13.948964
348	350	1	2021-04-25 22:57:14.020975	2021-04-25 22:57:14.020975
349	351	1	2021-04-25 22:57:14.096584	2021-04-25 22:57:14.096584
350	352	1	2021-04-25 22:57:14.181995	2021-04-25 22:57:14.181995
351	353	1	2021-04-25 22:57:14.249188	2021-04-25 22:57:14.249188
352	354	1	2021-04-25 22:57:14.324489	2021-04-25 22:57:14.324489
353	355	1	2021-04-25 22:57:14.40792	2021-04-25 22:57:14.40792
354	356	1	2021-04-25 22:57:14.477999	2021-04-25 22:57:14.477999
355	357	1	2021-04-25 22:57:14.581925	2021-04-25 22:57:14.581925
356	358	1	2021-04-25 22:57:14.647844	2021-04-25 22:57:14.647844
357	359	1	2021-04-25 22:57:14.719144	2021-04-25 22:57:14.719144
358	360	1	2021-04-25 22:57:14.80949	2021-04-25 22:57:14.80949
359	361	1	2021-04-25 22:57:14.877339	2021-04-25 22:57:14.877339
360	362	1	2021-04-25 22:57:14.956412	2021-04-25 22:57:14.956412
361	363	1	2021-04-25 22:57:15.05141	2021-04-25 22:57:15.05141
362	364	2	2021-04-25 22:57:15.130588	2021-04-25 22:57:15.130588
363	365	2	2021-04-25 22:57:15.222918	2021-04-25 22:57:15.222918
364	366	2	2021-04-25 22:57:15.298524	2021-04-25 22:57:15.298524
365	367	2	2021-04-25 22:57:15.400358	2021-04-25 22:57:15.400358
366	368	2	2021-04-25 22:57:15.472711	2021-04-25 22:57:15.472711
367	369	2	2021-04-25 22:57:15.555729	2021-04-25 22:57:15.555729
368	370	2	2021-04-25 22:57:15.659885	2021-04-25 22:57:15.659885
369	371	1	2021-04-25 22:57:15.750444	2021-04-25 22:57:15.750444
370	372	1	2021-04-25 22:57:15.873365	2021-04-25 22:57:15.873365
371	373	1	2021-04-25 22:57:15.969461	2021-04-25 22:57:15.969461
372	374	1	2021-04-25 22:57:16.058608	2021-04-25 22:57:16.058608
373	375	1	2021-04-25 22:57:16.126113	2021-04-25 22:57:16.126113
374	376	1	2021-04-25 22:57:16.214763	2021-04-25 22:57:16.214763
375	377	1	2021-04-25 22:57:16.302519	2021-04-25 22:57:16.302519
376	378	1	2021-04-25 22:57:16.384135	2021-04-25 22:57:16.384135
377	379	1	2021-04-25 22:57:16.455233	2021-04-25 22:57:16.455233
378	380	1	2021-04-25 22:57:16.521959	2021-04-25 22:57:16.521959
379	381	1	2021-04-25 22:57:16.613877	2021-04-25 22:57:16.613877
380	382	1	2021-04-25 22:57:16.673356	2021-04-25 22:57:16.673356
381	383	1	2021-04-25 22:57:16.765939	2021-04-25 22:57:16.765939
382	384	1	2021-04-25 22:57:17.072134	2021-04-25 22:57:17.072134
383	385	1	2021-04-25 22:57:17.158778	2021-04-25 22:57:17.158778
384	386	1	2021-04-25 22:57:17.244392	2021-04-25 22:57:17.244392
385	387	1	2021-04-25 22:57:17.315253	2021-04-25 22:57:17.315253
386	388	1	2021-04-25 22:57:17.385042	2021-04-25 22:57:17.385042
387	389	1	2021-04-25 22:57:17.481438	2021-04-25 22:57:17.481438
388	390	1	2021-04-25 22:57:17.602831	2021-04-25 22:57:17.602831
389	391	1	2021-04-25 22:57:17.71863	2021-04-25 22:57:17.71863
390	392	1	2021-04-25 22:57:17.835499	2021-04-25 22:57:17.835499
391	393	1	2021-04-25 22:57:17.928673	2021-04-25 22:57:17.928673
392	394	1	2021-04-25 22:57:18.078673	2021-04-25 22:57:18.078673
393	395	1	2021-04-25 22:57:18.206144	2021-04-25 22:57:18.206144
394	396	1	2021-04-25 22:57:18.274763	2021-04-25 22:57:18.274763
395	397	1	2021-04-25 22:57:18.382098	2021-04-25 22:57:18.382098
396	398	1	2021-04-25 22:57:18.462528	2021-04-25 22:57:18.462528
397	399	1	2021-04-25 22:57:18.569029	2021-04-25 22:57:18.569029
398	400	1	2021-04-25 22:57:18.669455	2021-04-25 22:57:18.669455
399	401	1	2021-04-25 22:57:18.789359	2021-04-25 22:57:18.789359
400	402	1	2021-04-25 22:57:18.908907	2021-04-25 22:57:18.908907
401	403	1	2021-04-25 22:57:18.997262	2021-04-25 22:57:18.997262
402	404	1	2021-04-25 22:57:19.095702	2021-04-25 22:57:19.095702
403	405	1	2021-04-25 22:57:19.214587	2021-04-25 22:57:19.214587
404	406	1	2021-04-25 22:57:19.286105	2021-04-25 22:57:19.286105
405	407	1	2021-04-25 22:57:19.352114	2021-04-25 22:57:19.352114
406	408	1	2021-04-25 22:57:19.43745	2021-04-25 22:57:19.43745
407	409	1	2021-04-25 22:57:19.516589	2021-04-25 22:57:19.516589
408	410	1	2021-04-25 22:57:19.642434	2021-04-25 22:57:19.642434
409	411	1	2021-04-25 22:57:19.716259	2021-04-25 22:57:19.716259
410	412	1	2021-04-25 22:57:19.790203	2021-04-25 22:57:19.790203
411	413	1	2021-04-25 22:57:20.004971	2021-04-25 22:57:20.004971
412	414	1	2021-04-25 22:57:20.113805	2021-04-25 22:57:20.113805
413	415	1	2021-04-25 22:57:20.231806	2021-04-25 22:57:20.231806
414	416	1	2021-04-25 22:57:20.346655	2021-04-25 22:57:20.346655
415	417	1	2021-04-25 22:57:20.449745	2021-04-25 22:57:20.449745
416	418	1	2021-04-25 22:57:20.519829	2021-04-25 22:57:20.519829
417	419	1	2021-04-25 22:57:20.614241	2021-04-25 22:57:20.614241
418	420	1	2021-04-25 22:57:20.683311	2021-04-25 22:57:20.683311
419	421	1	2021-04-25 22:57:20.774663	2021-04-25 22:57:20.774663
420	422	1	2021-04-25 22:57:20.837371	2021-04-25 22:57:20.837371
421	423	1	2021-04-25 22:57:20.909637	2021-04-25 22:57:20.909637
422	424	1	2021-04-25 22:57:20.972172	2021-04-25 22:57:20.972172
423	425	1	2021-04-25 22:57:21.034603	2021-04-25 22:57:21.034603
424	426	1	2021-04-25 22:57:21.102947	2021-04-25 22:57:21.102947
425	427	1	2021-04-25 22:57:21.174272	2021-04-25 22:57:21.174272
426	428	1	2021-04-25 22:57:21.266345	2021-04-25 22:57:21.266345
427	429	1	2021-04-25 22:57:21.338834	2021-04-25 22:57:21.338834
428	430	1	2021-04-25 22:57:21.4093	2021-04-25 22:57:21.4093
429	431	1	2021-04-25 22:57:21.476072	2021-04-25 22:57:21.476072
430	432	1	2021-04-25 22:57:21.544528	2021-04-25 22:57:21.544528
431	433	1	2021-04-25 22:57:21.620499	2021-04-25 22:57:21.620499
432	434	1	2021-04-25 22:57:21.693563	2021-04-25 22:57:21.693563
433	435	1	2021-04-25 22:57:21.76703	2021-04-25 22:57:21.76703
434	436	1	2021-04-25 22:57:21.857709	2021-04-25 22:57:21.857709
435	437	1	2021-04-25 22:57:21.921812	2021-04-25 22:57:21.921812
436	438	1	2021-04-25 22:57:21.985572	2021-04-25 22:57:21.985572
437	439	1	2021-04-25 22:57:22.053497	2021-04-25 22:57:22.053497
438	440	1	2021-04-25 22:57:22.131485	2021-04-25 22:57:22.131485
439	441	1	2021-04-25 22:57:22.207131	2021-04-25 22:57:22.207131
440	442	1	2021-04-25 22:57:22.285561	2021-04-25 22:57:22.285561
441	443	1	2021-04-25 22:57:22.376835	2021-04-25 22:57:22.376835
442	444	1	2021-04-25 22:57:22.441407	2021-04-25 22:57:22.441407
443	445	1	2021-04-25 22:57:22.510588	2021-04-25 22:57:22.510588
444	446	1	2021-04-25 22:57:22.598116	2021-04-25 22:57:22.598116
445	447	1	2021-04-25 22:57:22.684668	2021-04-25 22:57:22.684668
446	448	1	2021-04-25 22:57:22.813486	2021-04-25 22:57:22.813486
447	449	1	2021-04-25 22:57:22.908175	2021-04-25 22:57:22.908175
448	450	1	2021-04-25 22:57:22.982012	2021-04-25 22:57:22.982012
449	451	1	2021-04-25 22:57:23.05803	2021-04-25 22:57:23.05803
450	452	1	2021-04-25 22:57:23.158718	2021-04-25 22:57:23.158718
451	453	1	2021-04-25 22:57:23.237557	2021-04-25 22:57:23.237557
452	454	1	2021-04-25 22:57:23.33062	2021-04-25 22:57:23.33062
453	455	1	2021-04-25 22:57:23.406887	2021-04-25 22:57:23.406887
454	456	1	2021-04-25 22:57:23.47359	2021-04-25 22:57:23.47359
455	457	1	2021-04-25 22:57:23.597261	2021-04-25 22:57:23.597261
456	458	1	2021-04-25 22:57:23.690367	2021-04-25 22:57:23.690367
457	459	1	2021-04-25 22:57:23.822802	2021-04-25 22:57:23.822802
458	460	1	2021-04-25 22:57:23.901149	2021-04-25 22:57:23.901149
459	461	1	2021-04-25 22:57:23.992614	2021-04-25 22:57:23.992614
460	462	1	2021-04-25 22:57:24.083253	2021-04-25 22:57:24.083253
461	463	1	2021-04-25 22:57:24.177215	2021-04-25 22:57:24.177215
462	464	1	2021-04-25 22:57:24.264191	2021-04-25 22:57:24.264191
463	465	1	2021-04-25 22:57:24.34244	2021-04-25 22:57:24.34244
464	466	1	2021-04-25 22:57:24.426542	2021-04-25 22:57:24.426542
465	467	1	2021-04-25 22:57:24.529549	2021-04-25 22:57:24.529549
466	468	1	2021-04-25 22:57:24.630712	2021-04-25 22:57:24.630712
467	469	1	2021-04-25 22:57:24.709368	2021-04-25 22:57:24.709368
468	470	1	2021-04-25 22:57:24.811054	2021-04-25 22:57:24.811054
469	471	1	2021-04-25 22:57:24.914413	2021-04-25 22:57:24.914413
470	472	1	2021-04-25 22:57:24.984243	2021-04-25 22:57:24.984243
471	473	1	2021-04-25 22:57:25.065391	2021-04-25 22:57:25.065391
472	474	2	2021-04-25 22:57:25.140518	2021-04-25 22:57:25.140518
473	475	1	2021-04-25 22:57:25.214916	2021-04-25 22:57:25.214916
474	476	1	2021-04-25 22:57:25.330836	2021-04-25 22:57:25.330836
475	477	2	2021-04-25 22:57:25.413953	2021-04-25 22:57:25.413953
476	478	1	2021-04-25 22:57:25.4872	2021-04-25 22:57:25.4872
477	479	1	2021-04-25 22:57:25.572844	2021-04-25 22:57:25.572844
478	480	1	2021-04-25 22:57:25.650827	2021-04-25 22:57:25.650827
479	481	1	2021-04-25 22:57:25.71748	2021-04-25 22:57:25.71748
480	482	1	2021-04-25 22:57:25.796324	2021-04-25 22:57:25.796324
481	483	1	2021-04-25 22:57:25.872288	2021-04-25 22:57:25.872288
482	484	2	2021-04-25 22:57:25.962503	2021-04-25 22:57:25.962503
483	485	1	2021-04-25 22:57:26.035869	2021-04-25 22:57:26.035869
484	486	1	2021-04-25 22:57:26.097841	2021-04-25 22:57:26.097841
485	487	1	2021-04-25 22:57:26.198783	2021-04-25 22:57:26.198783
486	488	2	2021-04-25 22:57:26.25655	2021-04-25 22:57:26.25655
487	489	1	2021-04-25 22:57:26.348051	2021-04-25 22:57:26.348051
488	490	1	2021-04-25 22:57:26.428027	2021-04-25 22:57:26.428027
489	491	1	2021-04-25 22:57:26.51215	2021-04-25 22:57:26.51215
490	492	1	2021-04-25 22:57:26.593462	2021-04-25 22:57:26.593462
491	493	1	2021-04-25 22:57:26.657619	2021-04-25 22:57:26.657619
492	494	1	2021-04-25 22:57:26.73343	2021-04-25 22:57:26.73343
493	495	1	2021-04-25 22:57:26.83988	2021-04-25 22:57:26.83988
494	496	1	2021-04-25 22:57:26.957232	2021-04-25 22:57:26.957232
495	497	1	2021-04-25 22:57:27.029584	2021-04-25 22:57:27.029584
496	498	1	2021-04-25 22:57:27.124145	2021-04-25 22:57:27.124145
497	499	1	2021-04-25 22:57:27.201235	2021-04-25 22:57:27.201235
498	500	1	2021-04-25 22:57:27.270181	2021-04-25 22:57:27.270181
499	501	2	2021-04-25 22:57:27.337454	2021-04-25 22:57:27.337454
500	502	1	2021-04-25 22:57:27.432834	2021-04-25 22:57:27.432834
501	503	1	2021-04-25 22:57:27.499839	2021-04-25 22:57:27.499839
502	504	1	2021-04-25 22:57:27.594784	2021-04-25 22:57:27.594784
503	505	1	2021-04-25 22:57:27.686939	2021-04-25 22:57:27.686939
504	506	1	2021-04-25 22:57:27.776901	2021-04-25 22:57:27.776901
505	507	1	2021-04-25 22:57:27.94891	2021-04-25 22:57:27.94891
506	508	1	2021-04-25 22:57:28.034449	2021-04-25 22:57:28.034449
507	509	3	2021-04-25 22:57:28.114762	2021-04-25 22:57:28.114762
508	510	3	2021-04-25 22:57:28.19347	2021-04-25 22:57:28.19347
509	511	3	2021-04-25 22:57:28.291689	2021-04-25 22:57:28.291689
510	512	3	2021-04-25 22:57:28.381857	2021-04-25 22:57:28.381857
511	513	3	2021-04-25 22:57:28.464905	2021-04-25 22:57:28.464905
512	514	1	2021-04-25 22:57:28.553184	2021-04-25 22:57:28.553184
513	515	1	2021-04-25 22:57:28.65616	2021-04-25 22:57:28.65616
514	516	1	2021-04-25 22:57:28.750602	2021-04-25 22:57:28.750602
515	517	1	2021-04-25 22:57:28.858158	2021-04-25 22:57:28.858158
516	518	1	2021-04-25 22:57:28.960848	2021-04-25 22:57:28.960848
517	519	1	2021-04-25 22:57:29.028149	2021-04-25 22:57:29.028149
518	520	1	2021-04-25 22:57:29.140696	2021-04-25 22:57:29.140696
519	521	1	2021-04-25 22:57:29.230278	2021-04-25 22:57:29.230278
520	522	1	2021-04-25 22:57:29.295574	2021-04-25 22:57:29.295574
521	523	1	2021-04-25 22:57:29.379143	2021-04-25 22:57:29.379143
522	524	1	2021-04-25 22:57:29.462554	2021-04-25 22:57:29.462554
523	525	1	2021-04-25 22:57:29.550611	2021-04-25 22:57:29.550611
524	526	1	2021-04-25 22:57:29.615809	2021-04-25 22:57:29.615809
525	527	1	2021-04-25 22:57:29.685095	2021-04-25 22:57:29.685095
526	528	1	2021-04-25 22:57:29.751099	2021-04-25 22:57:29.751099
527	529	1	2021-04-25 22:57:29.831486	2021-04-25 22:57:29.831486
528	530	1	2021-04-25 22:57:29.893258	2021-04-25 22:57:29.893258
529	531	1	2021-04-25 22:57:29.986584	2021-04-25 22:57:29.986584
530	532	1	2021-04-25 22:57:30.065167	2021-04-25 22:57:30.065167
531	533	1	2021-04-25 22:57:30.151396	2021-04-25 22:57:30.151396
532	534	1	2021-04-25 22:57:30.218258	2021-04-25 22:57:30.218258
533	535	1	2021-04-25 22:57:30.30654	2021-04-25 22:57:30.30654
534	536	1	2021-04-25 22:57:30.406536	2021-04-25 22:57:30.406536
535	537	1	2021-04-25 22:57:30.488967	2021-04-25 22:57:30.488967
536	538	1	2021-04-25 22:57:30.573849	2021-04-25 22:57:30.573849
537	539	1	2021-04-25 22:57:30.644648	2021-04-25 22:57:30.644648
538	540	1	2021-04-25 22:57:30.723954	2021-04-25 22:57:30.723954
539	541	1	2021-04-25 22:57:30.843942	2021-04-25 22:57:30.843942
540	542	1	2021-04-25 22:57:30.949631	2021-04-25 22:57:30.949631
541	543	1	2021-04-25 22:57:31.022925	2021-04-25 22:57:31.022925
542	544	1	2021-04-25 22:57:31.095553	2021-04-25 22:57:31.095553
543	545	1	2021-04-25 22:57:31.179725	2021-04-25 22:57:31.179725
544	546	1	2021-04-25 22:57:31.267675	2021-04-25 22:57:31.267675
545	547	1	2021-04-25 22:57:31.348307	2021-04-25 22:57:31.348307
546	548	1	2021-04-25 22:57:31.4372	2021-04-25 22:57:31.4372
547	549	1	2021-04-25 22:57:31.512687	2021-04-25 22:57:31.512687
548	550	1	2021-04-25 22:57:31.594796	2021-04-25 22:57:31.594796
549	551	1	2021-04-25 22:57:31.683685	2021-04-25 22:57:31.683685
550	552	1	2021-04-25 22:57:31.751397	2021-04-25 22:57:31.751397
551	553	1	2021-04-25 22:57:31.817322	2021-04-25 22:57:31.817322
552	554	1	2021-04-25 22:57:31.878265	2021-04-25 22:57:31.878265
553	555	1	2021-04-25 22:57:31.943255	2021-04-25 22:57:31.943255
554	556	1	2021-04-25 22:57:32.017467	2021-04-25 22:57:32.017467
555	557	1	2021-04-25 22:57:32.09789	2021-04-25 22:57:32.09789
556	558	1	2021-04-25 22:57:32.172984	2021-04-25 22:57:32.172984
557	559	1	2021-04-25 22:57:32.256444	2021-04-25 22:57:32.256444
558	560	1	2021-04-25 22:57:32.333116	2021-04-25 22:57:32.333116
559	561	1	2021-04-25 22:57:32.397076	2021-04-25 22:57:32.397076
560	562	1	2021-04-25 22:57:32.465916	2021-04-25 22:57:32.465916
561	563	1	2021-04-25 22:57:32.56818	2021-04-25 22:57:32.56818
562	564	1	2021-04-25 22:57:32.64297	2021-04-25 22:57:32.64297
563	565	1	2021-04-25 22:57:32.735679	2021-04-25 22:57:32.735679
564	566	1	2021-04-25 22:57:32.80329	2021-04-25 22:57:32.80329
565	567	1	2021-04-25 22:57:32.889236	2021-04-25 22:57:32.889236
566	568	1	2021-04-25 22:57:32.968108	2021-04-25 22:57:32.968108
567	569	1	2021-04-25 22:57:33.044931	2021-04-25 22:57:33.044931
568	570	1	2021-04-25 22:57:33.114338	2021-04-25 22:57:33.114338
569	571	1	2021-04-25 22:57:33.221329	2021-04-25 22:57:33.221329
570	572	1	2021-04-25 22:57:33.313373	2021-04-25 22:57:33.313373
571	573	1	2021-04-25 22:57:33.386865	2021-04-25 22:57:33.386865
572	574	1	2021-04-25 22:57:33.474526	2021-04-25 22:57:33.474526
573	575	1	2021-04-25 22:57:33.543757	2021-04-25 22:57:33.543757
574	576	1	2021-04-25 22:57:33.646663	2021-04-25 22:57:33.646663
575	577	1	2021-04-25 22:57:33.731493	2021-04-25 22:57:33.731493
576	578	1	2021-04-25 22:57:33.825834	2021-04-25 22:57:33.825834
577	579	1	2021-04-25 22:57:33.900387	2021-04-25 22:57:33.900387
578	580	1	2021-04-25 22:57:33.970913	2021-04-25 22:57:33.970913
579	581	1	2021-04-25 22:57:34.046643	2021-04-25 22:57:34.046643
580	582	1	2021-04-25 22:57:34.134892	2021-04-25 22:57:34.134892
581	583	1	2021-04-25 22:57:34.218441	2021-04-25 22:57:34.218441
582	584	1	2021-04-25 22:57:34.288998	2021-04-25 22:57:34.288998
583	585	1	2021-04-25 22:57:34.358904	2021-04-25 22:57:34.358904
584	586	1	2021-04-25 22:57:34.443673	2021-04-25 22:57:34.443673
585	587	1	2021-04-25 22:57:34.532676	2021-04-25 22:57:34.532676
586	588	1	2021-04-25 22:57:34.620247	2021-04-25 22:57:34.620247
587	589	1	2021-04-25 22:57:34.686831	2021-04-25 22:57:34.686831
588	590	1	2021-04-25 22:57:34.766152	2021-04-25 22:57:34.766152
589	591	1	2021-04-25 22:57:34.841867	2021-04-25 22:57:34.841867
590	592	1	2021-04-25 22:57:34.929593	2021-04-25 22:57:34.929593
591	593	1	2021-04-25 22:57:35.019319	2021-04-25 22:57:35.019319
592	594	1	2021-04-25 22:57:35.106564	2021-04-25 22:57:35.106564
593	602	1	2021-04-25 22:57:35.626674	2021-04-25 22:57:35.626674
594	603	1	2021-04-25 22:57:35.70268	2021-04-25 22:57:35.70268
595	604	1	2021-04-25 22:57:35.776103	2021-04-25 22:57:35.776103
596	605	1	2021-04-25 22:57:35.885526	2021-04-25 22:57:35.885526
597	606	1	2021-04-25 22:57:35.985778	2021-04-25 22:57:35.985778
598	607	1	2021-04-25 22:57:36.06914	2021-04-25 22:57:36.06914
599	608	1	2021-04-25 22:57:36.161435	2021-04-25 22:57:36.161435
600	609	1	2021-04-25 22:57:36.257076	2021-04-25 22:57:36.257076
601	610	1	2021-04-25 22:57:36.348064	2021-04-25 22:57:36.348064
602	611	2	2021-04-25 22:57:36.41157	2021-04-25 22:57:36.41157
603	612	1	2021-04-25 22:57:36.483862	2021-04-25 22:57:36.483862
604	613	1	2021-04-25 22:57:36.548183	2021-04-25 22:57:36.548183
605	614	1	2021-04-25 22:57:36.65262	2021-04-25 22:57:36.65262
606	615	1	2021-04-25 22:57:36.735032	2021-04-25 22:57:36.735032
607	616	1	2021-04-25 22:57:36.818239	2021-04-25 22:57:36.818239
608	617	1	2021-04-25 22:57:36.906341	2021-04-25 22:57:36.906341
609	618	1	2021-04-25 22:57:36.98134	2021-04-25 22:57:36.98134
610	619	1	2021-04-25 22:57:37.050989	2021-04-25 22:57:37.050989
611	620	1	2021-04-25 22:57:37.118126	2021-04-25 22:57:37.118126
612	621	1	2021-04-25 22:57:37.228392	2021-04-25 22:57:37.228392
613	622	1	2021-04-25 22:57:37.293715	2021-04-25 22:57:37.293715
614	623	1	2021-04-25 22:57:37.368742	2021-04-25 22:57:37.368742
615	624	1	2021-04-25 22:57:37.446695	2021-04-25 22:57:37.446695
616	625	1	2021-04-25 22:57:37.533991	2021-04-25 22:57:37.533991
617	626	1	2021-04-25 22:57:37.630406	2021-04-25 22:57:37.630406
618	627	1	2021-04-25 22:57:37.714873	2021-04-25 22:57:37.714873
619	628	1	2021-04-25 22:57:37.782971	2021-04-25 22:57:37.782971
620	629	1	2021-04-25 22:57:37.855135	2021-04-25 22:57:37.855135
621	630	2	2021-04-25 22:57:37.920666	2021-04-25 22:57:37.920666
622	631	2	2021-04-25 22:57:37.990954	2021-04-25 22:57:37.990954
623	632	1	2021-04-25 22:57:38.055914	2021-04-25 22:57:38.055914
624	633	1	2021-04-25 22:57:38.149786	2021-04-25 22:57:38.149786
625	634	1	2021-04-25 22:57:38.236979	2021-04-25 22:57:38.236979
626	635	2	2021-04-25 22:57:38.302556	2021-04-25 22:57:38.302556
627	636	1	2021-04-25 22:57:38.365774	2021-04-25 22:57:38.365774
628	637	1	2021-04-25 22:57:38.445705	2021-04-25 22:57:38.445705
629	638	1	2021-04-25 22:57:38.514744	2021-04-25 22:57:38.514744
630	639	1	2021-04-25 22:57:38.60247	2021-04-25 22:57:38.60247
631	640	1	2021-04-25 22:57:38.67343	2021-04-25 22:57:38.67343
632	641	1	2021-04-25 22:57:38.898641	2021-04-25 22:57:38.898641
633	642	1	2021-04-25 22:57:38.973481	2021-04-25 22:57:38.973481
634	643	1	2021-04-25 22:57:39.054134	2021-04-25 22:57:39.054134
635	644	1	2021-04-25 22:57:39.123224	2021-04-25 22:57:39.123224
636	645	1	2021-04-25 22:57:39.240569	2021-04-25 22:57:39.240569
637	646	1	2021-04-25 22:57:39.304433	2021-04-25 22:57:39.304433
638	647	2	2021-04-25 22:57:39.369619	2021-04-25 22:57:39.369619
639	648	1	2021-04-25 22:57:39.43896	2021-04-25 22:57:39.43896
640	649	1	2021-04-25 22:57:39.528969	2021-04-25 22:57:39.528969
641	650	1	2021-04-25 22:57:39.63678	2021-04-25 22:57:39.63678
642	651	1	2021-04-25 22:57:39.706808	2021-04-25 22:57:39.706808
643	652	1	2021-04-25 22:57:39.780423	2021-04-25 22:57:39.780423
644	653	1	2021-04-25 22:57:39.865708	2021-04-25 22:57:39.865708
645	654	1	2021-04-25 22:57:39.930891	2021-04-25 22:57:39.930891
646	655	1	2021-04-25 22:57:40.003946	2021-04-25 22:57:40.003946
647	656	1	2021-04-25 22:57:40.06793	2021-04-25 22:57:40.06793
648	657	1	2021-04-25 22:57:40.132392	2021-04-25 22:57:40.132392
649	658	1	2021-04-25 22:57:40.214101	2021-04-25 22:57:40.214101
650	659	1	2021-04-25 22:57:40.289596	2021-04-25 22:57:40.289596
651	660	1	2021-04-25 22:57:40.369153	2021-04-25 22:57:40.369153
652	661	1	2021-04-25 22:57:40.450898	2021-04-25 22:57:40.450898
653	662	1	2021-04-25 22:57:40.529969	2021-04-25 22:57:40.529969
654	663	1	2021-04-25 22:57:40.614464	2021-04-25 22:57:40.614464
655	664	1	2021-04-25 22:57:40.722691	2021-04-25 22:57:40.722691
656	665	1	2021-04-25 22:57:40.808405	2021-04-25 22:57:40.808405
657	666	1	2021-04-25 22:57:40.901563	2021-04-25 22:57:40.901563
658	667	1	2021-04-25 22:57:40.978959	2021-04-25 22:57:40.978959
659	668	2	2021-04-25 22:57:41.038921	2021-04-25 22:57:41.038921
660	669	1	2021-04-25 22:57:41.106286	2021-04-25 22:57:41.106286
661	670	1	2021-04-25 22:57:41.176277	2021-04-25 22:57:41.176277
662	671	1	2021-04-25 22:57:41.240629	2021-04-25 22:57:41.240629
663	672	1	2021-04-25 22:57:41.327165	2021-04-25 22:57:41.327165
664	673	1	2021-04-25 22:57:41.388384	2021-04-25 22:57:41.388384
665	674	1	2021-04-25 22:57:41.462538	2021-04-25 22:57:41.462538
666	675	1	2021-04-25 22:57:41.561194	2021-04-25 22:57:41.561194
667	676	1	2021-04-25 22:57:41.651474	2021-04-25 22:57:41.651474
668	677	1	2021-04-25 22:57:41.729028	2021-04-25 22:57:41.729028
669	678	1	2021-04-25 22:57:41.806319	2021-04-25 22:57:41.806319
670	679	1	2021-04-25 22:57:41.890359	2021-04-25 22:57:41.890359
671	680	1	2021-04-25 22:57:41.960167	2021-04-25 22:57:41.960167
672	681	1	2021-04-25 22:57:42.028239	2021-04-25 22:57:42.028239
673	682	1	2021-04-25 22:57:42.103124	2021-04-25 22:57:42.103124
674	683	1	2021-04-25 22:57:42.170094	2021-04-25 22:57:42.170094
675	684	1	2021-04-25 22:57:42.265528	2021-04-25 22:57:42.265528
676	685	1	2021-04-25 22:57:42.345415	2021-04-25 22:57:42.345415
677	686	1	2021-04-25 22:57:42.403866	2021-04-25 22:57:42.403866
678	687	1	2021-04-25 22:57:42.467538	2021-04-25 22:57:42.467538
679	688	1	2021-04-25 22:57:42.529833	2021-04-25 22:57:42.529833
680	689	1	2021-04-25 22:57:42.60279	2021-04-25 22:57:42.60279
681	690	1	2021-04-25 22:57:42.664977	2021-04-25 22:57:42.664977
682	691	1	2021-04-25 22:57:42.726831	2021-04-25 22:57:42.726831
683	692	1	2021-04-25 22:57:42.796073	2021-04-25 22:57:42.796073
684	693	1	2021-04-25 22:57:42.878002	2021-04-25 22:57:42.878002
685	694	1	2021-04-25 22:57:42.948575	2021-04-25 22:57:42.948575
686	695	1	2021-04-25 22:57:43.012726	2021-04-25 22:57:43.012726
687	696	1	2021-04-25 22:57:43.084441	2021-04-25 22:57:43.084441
688	697	1	2021-04-25 22:57:43.160614	2021-04-25 22:57:43.160614
689	698	1	2021-04-25 22:57:43.250312	2021-04-25 22:57:43.250312
690	699	1	2021-04-25 22:57:43.331792	2021-04-25 22:57:43.331792
691	700	1	2021-04-25 22:57:43.402292	2021-04-25 22:57:43.402292
692	701	1	2021-04-25 22:57:43.480715	2021-04-25 22:57:43.480715
693	702	1	2021-04-25 22:57:43.548368	2021-04-25 22:57:43.548368
694	703	1	2021-04-25 22:57:43.64577	2021-04-25 22:57:43.64577
695	704	1	2021-04-25 22:57:43.706572	2021-04-25 22:57:43.706572
696	705	1	2021-04-25 22:57:43.773452	2021-04-25 22:57:43.773452
697	706	1	2021-04-25 22:57:43.863526	2021-04-25 22:57:43.863526
698	707	1	2021-04-25 22:57:43.940243	2021-04-25 22:57:43.940243
699	708	1	2021-04-25 22:57:44.045711	2021-04-25 22:57:44.045711
700	709	1	2021-04-25 22:57:44.12008	2021-04-25 22:57:44.12008
701	710	1	2021-04-25 22:57:44.213123	2021-04-25 22:57:44.213123
702	711	1	2021-04-25 22:57:44.306951	2021-04-25 22:57:44.306951
703	712	1	2021-04-25 22:57:44.406744	2021-04-25 22:57:44.406744
704	713	1	2021-04-25 22:57:44.470077	2021-04-25 22:57:44.470077
705	714	1	2021-04-25 22:57:44.543161	2021-04-25 22:57:44.543161
706	715	1	2021-04-25 22:57:44.625742	2021-04-25 22:57:44.625742
707	716	1	2021-04-25 22:57:44.700394	2021-04-25 22:57:44.700394
708	717	3	2021-04-25 22:57:44.803243	2021-04-25 22:57:44.803243
709	718	1	2021-04-25 22:57:44.89457	2021-04-25 22:57:44.89457
710	719	1	2021-04-25 22:57:44.958161	2021-04-25 22:57:44.958161
711	720	1	2021-04-25 22:57:45.025621	2021-04-25 22:57:45.025621
712	721	1	2021-04-25 22:57:45.113863	2021-04-25 22:57:45.113863
713	722	1	2021-04-25 22:57:45.233251	2021-04-25 22:57:45.233251
714	723	1	2021-04-25 22:57:45.306639	2021-04-25 22:57:45.306639
715	724	1	2021-04-25 22:57:45.421424	2021-04-25 22:57:45.421424
716	725	1	2021-04-25 22:57:45.51271	2021-04-25 22:57:45.51271
717	726	1	2021-04-25 22:57:45.588311	2021-04-25 22:57:45.588311
718	727	1	2021-04-25 22:57:45.657565	2021-04-25 22:57:45.657565
719	728	1	2021-04-25 22:57:45.747047	2021-04-25 22:57:45.747047
720	729	1	2021-04-25 22:57:45.859216	2021-04-25 22:57:45.859216
721	730	1	2021-04-25 22:57:45.958597	2021-04-25 22:57:45.958597
722	731	2	2021-04-25 22:57:46.048869	2021-04-25 22:57:46.048869
723	732	1	2021-04-25 22:57:46.132164	2021-04-25 22:57:46.132164
724	733	1	2021-04-25 22:57:46.218622	2021-04-25 22:57:46.218622
725	734	1	2021-04-25 22:57:46.298198	2021-04-25 22:57:46.298198
726	735	2	2021-04-25 22:57:46.35783	2021-04-25 22:57:46.35783
727	736	2	2021-04-25 22:57:46.429426	2021-04-25 22:57:46.429426
728	737	2	2021-04-25 22:57:46.499207	2021-04-25 22:57:46.499207
729	738	1	2021-04-25 22:57:46.59082	2021-04-25 22:57:46.59082
730	740	1	2021-04-25 22:57:46.709772	2021-04-25 22:57:46.709772
731	741	1	2021-04-25 22:57:46.788478	2021-04-25 22:57:46.788478
732	742	2	2021-04-25 22:57:46.863675	2021-04-25 22:57:46.863675
733	743	2	2021-04-25 22:57:46.929769	2021-04-25 22:57:46.929769
734	744	1	2021-04-25 22:57:46.998339	2021-04-25 22:57:46.998339
735	745	1	2021-04-25 22:57:47.082506	2021-04-25 22:57:47.082506
736	746	1	2021-04-25 22:57:47.156028	2021-04-25 22:57:47.156028
737	747	1	2021-04-25 22:57:47.246301	2021-04-25 22:57:47.246301
738	748	1	2021-04-25 22:57:47.308919	2021-04-25 22:57:47.308919
739	749	1	2021-04-25 22:57:47.39111	2021-04-25 22:57:47.39111
740	750	1	2021-04-25 22:57:47.468256	2021-04-25 22:57:47.468256
741	751	1	2021-04-25 22:57:47.539596	2021-04-25 22:57:47.539596
742	752	1	2021-04-25 22:57:47.636489	2021-04-25 22:57:47.636489
743	753	1	2021-04-25 22:57:47.704535	2021-04-25 22:57:47.704535
744	754	1	2021-04-25 22:57:47.773663	2021-04-25 22:57:47.773663
745	755	1	2021-04-25 22:57:47.882525	2021-04-25 22:57:47.882525
746	756	1	2021-04-25 22:57:47.949343	2021-04-25 22:57:47.949343
747	757	1	2021-04-25 22:57:48.041798	2021-04-25 22:57:48.041798
748	758	1	2021-04-25 22:57:48.130933	2021-04-25 22:57:48.130933
749	759	1	2021-04-25 22:57:48.209521	2021-04-25 22:57:48.209521
750	760	1	2021-04-25 22:57:48.402509	2021-04-25 22:57:48.402509
751	761	1	2021-04-25 22:57:48.490547	2021-04-25 22:57:48.490547
752	762	1	2021-04-25 22:57:48.585675	2021-04-25 22:57:48.585675
753	763	1	2021-04-25 22:57:48.662708	2021-04-25 22:57:48.662708
754	764	1	2021-04-25 22:57:48.756141	2021-04-25 22:57:48.756141
755	765	1	2021-04-25 22:57:48.874788	2021-04-25 22:57:48.874788
756	766	1	2021-04-25 22:57:48.968909	2021-04-25 22:57:48.968909
757	767	1	2021-04-25 22:57:49.052604	2021-04-25 22:57:49.052604
758	768	1	2021-04-25 22:57:49.158	2021-04-25 22:57:49.158
759	769	1	2021-04-25 22:57:49.294515	2021-04-25 22:57:49.294515
760	770	1	2021-04-25 22:57:49.370337	2021-04-25 22:57:49.370337
761	771	1	2021-04-25 22:57:49.4534	2021-04-25 22:57:49.4534
762	772	1	2021-04-25 22:57:49.528325	2021-04-25 22:57:49.528325
763	773	1	2021-04-25 22:57:49.594519	2021-04-25 22:57:49.594519
764	774	1	2021-04-25 22:57:49.666506	2021-04-25 22:57:49.666506
765	775	1	2021-04-25 22:57:49.770337	2021-04-25 22:57:49.770337
766	776	1	2021-04-25 22:57:49.858857	2021-04-25 22:57:49.858857
767	777	1	2021-04-25 22:57:49.936601	2021-04-25 22:57:49.936601
768	778	1	2021-04-25 22:57:49.99645	2021-04-25 22:57:49.99645
769	779	1	2021-04-25 22:57:50.066583	2021-04-25 22:57:50.066583
770	780	1	2021-04-25 22:57:50.134748	2021-04-25 22:57:50.134748
771	781	1	2021-04-25 22:57:50.270607	2021-04-25 22:57:50.270607
772	782	1	2021-04-25 22:57:50.370417	2021-04-25 22:57:50.370417
773	783	1	2021-04-25 22:57:50.431933	2021-04-25 22:57:50.431933
774	784	1	2021-04-25 22:57:50.498644	2021-04-25 22:57:50.498644
775	785	1	2021-04-25 22:57:50.618237	2021-04-25 22:57:50.618237
776	786	1	2021-04-25 22:57:50.686498	2021-04-25 22:57:50.686498
777	787	1	2021-04-25 22:57:50.747234	2021-04-25 22:57:50.747234
778	788	1	2021-04-25 22:57:50.827828	2021-04-25 22:57:50.827828
779	789	1	2021-04-25 22:57:50.89861	2021-04-25 22:57:50.89861
780	790	2	2021-04-25 22:57:50.955773	2021-04-25 22:57:50.955773
781	791	1	2021-04-25 22:57:51.05255	2021-04-25 22:57:51.05255
782	792	1	2021-04-25 22:57:51.13766	2021-04-25 22:57:51.13766
783	793	1	2021-04-25 22:57:51.226451	2021-04-25 22:57:51.226451
784	794	1	2021-04-25 22:57:51.306518	2021-04-25 22:57:51.306518
785	795	1	2021-04-25 22:57:51.370374	2021-04-25 22:57:51.370374
786	796	1	2021-04-25 22:57:51.433475	2021-04-25 22:57:51.433475
787	797	1	2021-04-25 22:57:51.494588	2021-04-25 22:57:51.494588
788	798	1	2021-04-25 22:57:51.555118	2021-04-25 22:57:51.555118
789	799	1	2021-04-25 22:57:51.615869	2021-04-25 22:57:51.615869
790	800	1	2021-04-25 22:57:51.68048	2021-04-25 22:57:51.68048
791	801	2	2021-04-25 22:57:51.814067	2021-04-25 22:57:51.814067
792	802	1	2021-04-25 22:57:51.920976	2021-04-25 22:57:51.920976
793	803	1	2021-04-25 22:57:51.98174	2021-04-25 22:57:51.98174
794	804	2	2021-04-25 22:57:52.042519	2021-04-25 22:57:52.042519
795	805	1	2021-04-25 22:57:52.105168	2021-04-25 22:57:52.105168
796	806	1	2021-04-25 22:57:52.20674	2021-04-25 22:57:52.20674
797	807	1	2021-04-25 22:57:52.286156	2021-04-25 22:57:52.286156
798	808	1	2021-04-25 22:57:52.362176	2021-04-25 22:57:52.362176
799	809	1	2021-04-25 22:57:52.443298	2021-04-25 22:57:52.443298
800	810	2	2021-04-25 22:57:52.519753	2021-04-25 22:57:52.519753
801	811	1	2021-04-25 22:57:52.586009	2021-04-25 22:57:52.586009
802	812	1	2021-04-25 22:57:52.664638	2021-04-25 22:57:52.664638
803	813	1	2021-04-25 22:57:52.722005	2021-04-25 22:57:52.722005
804	814	2	2021-04-25 22:57:52.798617	2021-04-25 22:57:52.798617
805	815	2	2021-04-25 22:57:52.878845	2021-04-25 22:57:52.878845
806	816	2	2021-04-25 22:57:52.973805	2021-04-25 22:57:52.973805
807	817	2	2021-04-25 22:57:53.04466	2021-04-25 22:57:53.04466
808	818	1	2021-04-25 22:57:53.134518	2021-04-25 22:57:53.134518
809	819	1	2021-04-25 22:57:53.224063	2021-04-25 22:57:53.224063
810	820	1	2021-04-25 22:57:53.297962	2021-04-25 22:57:53.297962
811	821	1	2021-04-25 22:57:53.365014	2021-04-25 22:57:53.365014
812	822	1	2021-04-25 22:57:53.432417	2021-04-25 22:57:53.432417
813	823	1	2021-04-25 22:57:53.500152	2021-04-25 22:57:53.500152
814	824	1	2021-04-25 22:57:53.57908	2021-04-25 22:57:53.57908
815	825	1	2021-04-25 22:57:53.672816	2021-04-25 22:57:53.672816
816	826	1	2021-04-25 22:57:53.733949	2021-04-25 22:57:53.733949
817	827	1	2021-04-25 22:57:53.819223	2021-04-25 22:57:53.819223
818	828	1	2021-04-25 22:57:53.921455	2021-04-25 22:57:53.921455
819	829	1	2021-04-25 22:57:53.985026	2021-04-25 22:57:53.985026
820	830	2	2021-04-25 22:57:54.051478	2021-04-25 22:57:54.051478
821	831	1	2021-04-25 22:57:54.141729	2021-04-25 22:57:54.141729
822	832	1	2021-04-25 22:57:54.213001	2021-04-25 22:57:54.213001
823	833	1	2021-04-25 22:57:54.278755	2021-04-25 22:57:54.278755
824	834	2	2021-04-25 22:57:54.340883	2021-04-25 22:57:54.340883
825	835	2	2021-04-25 22:57:54.426391	2021-04-25 22:57:54.426391
826	836	2	2021-04-25 22:57:54.4861	2021-04-25 22:57:54.4861
827	849	1	2021-04-25 22:57:55.221083	2021-04-25 22:57:55.221083
828	850	1	2021-04-25 22:57:55.300953	2021-04-25 22:57:55.300953
829	851	1	2021-04-25 22:57:55.406282	2021-04-25 22:57:55.406282
830	852	1	2021-04-25 22:57:55.474645	2021-04-25 22:57:55.474645
831	853	1	2021-04-25 22:57:55.537141	2021-04-25 22:57:55.537141
832	854	1	2021-04-25 22:57:55.622051	2021-04-25 22:57:55.622051
833	855	1	2021-04-25 22:57:55.702497	2021-04-25 22:57:55.702497
834	856	1	2021-04-25 22:57:55.773355	2021-04-25 22:57:55.773355
835	857	1	2021-04-25 22:57:55.846153	2021-04-25 22:57:55.846153
836	858	1	2021-04-25 22:57:55.938276	2021-04-25 22:57:55.938276
837	859	1	2021-04-25 22:57:56.007015	2021-04-25 22:57:56.007015
838	860	2	2021-04-25 22:57:56.068389	2021-04-25 22:57:56.068389
839	861	2	2021-04-25 22:57:56.180712	2021-04-25 22:57:56.180712
840	862	3	2021-04-25 22:57:56.261782	2021-04-25 22:57:56.261782
841	863	3	2021-04-25 22:57:56.321146	2021-04-25 22:57:56.321146
842	864	3	2021-04-25 22:57:56.386672	2021-04-25 22:57:56.386672
843	865	1	2021-04-25 22:57:56.480486	2021-04-25 22:57:56.480486
844	866	1	2021-04-25 22:57:56.562651	2021-04-25 22:57:56.562651
845	867	1	2021-04-25 22:57:56.654347	2021-04-25 22:57:56.654347
846	868	1	2021-04-25 22:57:56.737912	2021-04-25 22:57:56.737912
847	869	2	2021-04-25 22:57:56.842136	2021-04-25 22:57:56.842136
848	870	1	2021-04-25 22:57:56.954504	2021-04-25 22:57:56.954504
849	871	2	2021-04-25 22:57:57.021214	2021-04-25 22:57:57.021214
850	872	1	2021-04-25 22:57:57.129597	2021-04-25 22:57:57.129597
851	873	2	2021-04-25 22:57:57.196259	2021-04-25 22:57:57.196259
852	874	1	2021-04-25 22:57:57.290471	2021-04-25 22:57:57.290471
853	875	2	2021-04-25 22:57:57.39356	2021-04-25 22:57:57.39356
854	876	2	2021-04-25 22:57:57.463473	2021-04-25 22:57:57.463473
855	877	1	2021-04-25 22:57:57.542663	2021-04-25 22:57:57.542663
856	878	2	2021-04-25 22:57:57.612447	2021-04-25 22:57:57.612447
857	879	2	2021-04-25 22:57:57.707605	2021-04-25 22:57:57.707605
858	880	2	2021-04-25 22:57:57.793792	2021-04-25 22:57:57.793792
859	881	2	2021-04-25 22:57:57.893746	2021-04-25 22:57:57.893746
860	882	2	2021-04-25 22:57:57.983165	2021-04-25 22:57:57.983165
861	883	2	2021-04-25 22:57:58.068925	2021-04-25 22:57:58.068925
862	884	2	2021-04-25 22:57:58.139624	2021-04-25 22:57:58.139624
863	885	2	2021-04-25 22:57:58.233422	2021-04-25 22:57:58.233422
864	886	2	2021-04-25 22:57:58.319846	2021-04-25 22:57:58.319846
865	887	2	2021-04-25 22:57:58.392124	2021-04-25 22:57:58.392124
866	888	1	2021-04-25 22:57:58.465037	2021-04-25 22:57:58.465037
867	889	1	2021-04-25 22:57:58.53252	2021-04-25 22:57:58.53252
868	890	1	2021-04-25 22:57:58.626914	2021-04-25 22:57:58.626914
869	891	1	2021-04-25 22:57:58.726214	2021-04-25 22:57:58.726214
870	892	2	2021-04-25 22:57:58.788988	2021-04-25 22:57:58.788988
871	893	2	2021-04-25 22:57:58.856771	2021-04-25 22:57:58.856771
872	894	2	2021-04-25 22:57:58.954625	2021-04-25 22:57:58.954625
873	895	2	2021-04-25 22:57:59.022192	2021-04-25 22:57:59.022192
874	896	2	2021-04-25 22:57:59.118505	2021-04-25 22:57:59.118505
875	897	1	2021-04-25 22:57:59.183935	2021-04-25 22:57:59.183935
876	898	2	2021-04-25 22:57:59.305741	2021-04-25 22:57:59.305741
877	899	1	2021-04-25 22:57:59.373611	2021-04-25 22:57:59.373611
878	900	1	2021-04-25 22:57:59.437778	2021-04-25 22:57:59.437778
879	901	1	2021-04-25 22:57:59.500675	2021-04-25 22:57:59.500675
880	902	2	2021-04-25 22:57:59.56357	2021-04-25 22:57:59.56357
881	903	2	2021-04-25 22:57:59.661519	2021-04-25 22:57:59.661519
882	904	1	2021-04-25 22:57:59.731802	2021-04-25 22:57:59.731802
883	905	1	2021-04-25 22:57:59.801096	2021-04-25 22:57:59.801096
884	906	2	2021-04-25 22:57:59.866703	2021-04-25 22:57:59.866703
885	907	1	2021-04-25 22:57:59.95923	2021-04-25 22:57:59.95923
886	908	1	2021-04-25 22:58:00.068518	2021-04-25 22:58:00.068518
887	909	1	2021-04-25 22:58:00.14975	2021-04-25 22:58:00.14975
888	910	1	2021-04-25 22:58:00.231202	2021-04-25 22:58:00.231202
889	911	1	2021-04-25 22:58:00.369306	2021-04-25 22:58:00.369306
890	912	1	2021-04-25 22:58:00.454817	2021-04-25 22:58:00.454817
891	913	1	2021-04-25 22:58:00.518497	2021-04-25 22:58:00.518497
892	914	1	2021-04-25 22:58:00.593449	2021-04-25 22:58:00.593449
893	915	1	2021-04-25 22:58:00.757121	2021-04-25 22:58:00.757121
894	916	1	2021-04-25 22:58:00.903334	2021-04-25 22:58:00.903334
895	917	1	2021-04-25 22:58:00.983813	2021-04-25 22:58:00.983813
896	918	1	2021-04-25 22:58:01.068665	2021-04-25 22:58:01.068665
897	919	1	2021-04-25 22:58:01.162804	2021-04-25 22:58:01.162804
898	920	1	2021-04-25 22:58:01.251361	2021-04-25 22:58:01.251361
899	921	1	2021-04-25 22:58:01.361789	2021-04-25 22:58:01.361789
900	922	1	2021-04-25 22:58:01.468005	2021-04-25 22:58:01.468005
901	923	1	2021-04-25 22:58:01.557093	2021-04-25 22:58:01.557093
902	924	1	2021-04-25 22:58:01.665755	2021-04-25 22:58:01.665755
903	925	1	2021-04-25 22:58:01.791202	2021-04-25 22:58:01.791202
904	926	1	2021-04-25 22:58:01.887823	2021-04-25 22:58:01.887823
905	927	1	2021-04-25 22:58:02.000892	2021-04-25 22:58:02.000892
906	928	1	2021-04-25 22:58:02.106561	2021-04-25 22:58:02.106561
907	929	1	2021-04-25 22:58:02.219794	2021-04-25 22:58:02.219794
908	930	1	2021-04-25 22:58:02.302702	2021-04-25 22:58:02.302702
909	931	1	2021-04-25 22:58:02.425963	2021-04-25 22:58:02.425963
910	932	1	2021-04-25 22:58:02.543573	2021-04-25 22:58:02.543573
911	933	1	2021-04-25 22:58:02.647536	2021-04-25 22:58:02.647536
912	934	1	2021-04-25 22:58:02.751334	2021-04-25 22:58:02.751334
913	935	1	2021-04-25 22:58:02.89441	2021-04-25 22:58:02.89441
914	936	1	2021-04-25 22:58:03.001745	2021-04-25 22:58:03.001745
915	937	1	2021-04-25 22:58:03.107532	2021-04-25 22:58:03.107532
916	938	1	2021-04-25 22:58:03.226521	2021-04-25 22:58:03.226521
917	939	1	2021-04-25 22:58:03.360278	2021-04-25 22:58:03.360278
918	940	1	2021-04-25 22:58:03.490609	2021-04-25 22:58:03.490609
919	941	1	2021-04-25 22:58:03.623755	2021-04-25 22:58:03.623755
920	942	1	2021-04-25 22:58:03.742235	2021-04-25 22:58:03.742235
921	943	1	2021-04-25 22:58:03.830731	2021-04-25 22:58:03.830731
922	944	1	2021-04-25 22:58:03.923887	2021-04-25 22:58:03.923887
923	945	1	2021-04-25 22:58:03.993783	2021-04-25 22:58:03.993783
924	946	1	2021-04-25 22:58:04.0971	2021-04-25 22:58:04.0971
925	947	1	2021-04-25 22:58:04.169396	2021-04-25 22:58:04.169396
926	948	1	2021-04-25 22:58:04.247697	2021-04-25 22:58:04.247697
927	949	1	2021-04-25 22:58:04.330095	2021-04-25 22:58:04.330095
928	950	1	2021-04-25 22:58:04.418483	2021-04-25 22:58:04.418483
929	951	1	2021-04-25 22:58:04.496858	2021-04-25 22:58:04.496858
930	952	1	2021-04-25 22:58:04.580541	2021-04-25 22:58:04.580541
931	953	1	2021-04-25 22:58:04.692135	2021-04-25 22:58:04.692135
932	954	1	2021-04-25 22:58:04.790941	2021-04-25 22:58:04.790941
933	955	1	2021-04-25 22:58:04.890364	2021-04-25 22:58:04.890364
934	956	1	2021-04-25 22:58:04.964921	2021-04-25 22:58:04.964921
935	957	1	2021-04-25 22:58:05.0344	2021-04-25 22:58:05.0344
936	958	1	2021-04-25 22:58:05.101961	2021-04-25 22:58:05.101961
937	959	1	2021-04-25 22:58:05.16742	2021-04-25 22:58:05.16742
938	960	1	2021-04-25 22:58:05.234911	2021-04-25 22:58:05.234911
939	961	1	2021-04-25 22:58:05.333073	2021-04-25 22:58:05.333073
940	962	1	2021-04-25 22:58:05.435363	2021-04-25 22:58:05.435363
941	963	1	2021-04-25 22:58:05.535703	2021-04-25 22:58:05.535703
942	964	1	2021-04-25 22:58:05.621825	2021-04-25 22:58:05.621825
943	965	1	2021-04-25 22:58:05.703053	2021-04-25 22:58:05.703053
944	966	1	2021-04-25 22:58:05.808485	2021-04-25 22:58:05.808485
945	967	1	2021-04-25 22:58:05.878514	2021-04-25 22:58:05.878514
946	968	1	2021-04-25 22:58:05.979496	2021-04-25 22:58:05.979496
947	969	1	2021-04-25 22:58:06.085486	2021-04-25 22:58:06.085486
948	970	1	2021-04-25 22:58:06.179808	2021-04-25 22:58:06.179808
949	971	1	2021-04-25 22:58:06.306766	2021-04-25 22:58:06.306766
950	972	1	2021-04-25 22:58:06.398368	2021-04-25 22:58:06.398368
951	973	1	2021-04-25 22:58:06.465818	2021-04-25 22:58:06.465818
952	974	1	2021-04-25 22:58:06.571249	2021-04-25 22:58:06.571249
953	975	1	2021-04-25 22:58:06.661744	2021-04-25 22:58:06.661744
954	976	1	2021-04-25 22:58:06.739175	2021-04-25 22:58:06.739175
955	977	1	2021-04-25 22:58:06.857899	2021-04-25 22:58:06.857899
956	978	1	2021-04-25 22:58:06.955788	2021-04-25 22:58:06.955788
957	979	1	2021-04-25 22:58:07.060827	2021-04-25 22:58:07.060827
958	980	1	2021-04-25 22:58:07.162387	2021-04-25 22:58:07.162387
959	981	1	2021-04-25 22:58:07.254586	2021-04-25 22:58:07.254586
960	982	1	2021-04-25 22:58:07.356031	2021-04-25 22:58:07.356031
961	983	1	2021-04-25 22:58:07.434463	2021-04-25 22:58:07.434463
962	984	1	2021-04-25 22:58:07.510271	2021-04-25 22:58:07.510271
963	985	1	2021-04-25 22:58:07.58847	2021-04-25 22:58:07.58847
964	986	1	2021-04-25 22:58:07.662639	2021-04-25 22:58:07.662639
965	987	1	2021-04-25 22:58:07.732173	2021-04-25 22:58:07.732173
966	988	1	2021-04-25 22:58:07.802672	2021-04-25 22:58:07.802672
967	989	1	2021-04-25 22:58:07.899225	2021-04-25 22:58:07.899225
968	990	1	2021-04-25 22:58:07.963083	2021-04-25 22:58:07.963083
969	991	1	2021-04-25 22:58:08.027874	2021-04-25 22:58:08.027874
970	992	1	2021-04-25 22:58:08.142327	2021-04-25 22:58:08.142327
971	993	1	2021-04-25 22:58:08.213499	2021-04-25 22:58:08.213499
972	994	1	2021-04-25 22:58:08.305741	2021-04-25 22:58:08.305741
973	995	1	2021-04-25 22:58:08.372724	2021-04-25 22:58:08.372724
974	996	1	2021-04-25 22:58:08.450904	2021-04-25 22:58:08.450904
975	997	1	2021-04-25 22:58:08.520774	2021-04-25 22:58:08.520774
976	998	1	2021-04-25 22:58:08.640157	2021-04-25 22:58:08.640157
977	999	1	2021-04-25 22:58:08.737777	2021-04-25 22:58:08.737777
978	1000	1	2021-04-25 22:58:08.822261	2021-04-25 22:58:08.822261
979	1001	1	2021-04-25 22:58:08.913293	2021-04-25 22:58:08.913293
980	1002	1	2021-04-25 22:58:08.983454	2021-04-25 22:58:08.983454
981	1003	1	2021-04-25 22:58:09.065932	2021-04-25 22:58:09.065932
982	1004	1	2021-04-25 22:58:09.147596	2021-04-25 22:58:09.147596
983	1005	1	2021-04-25 22:58:09.215396	2021-04-25 22:58:09.215396
984	1006	1	2021-04-25 22:58:09.31114	2021-04-25 22:58:09.31114
985	1007	1	2021-04-25 22:58:09.390805	2021-04-25 22:58:09.390805
986	1008	1	2021-04-25 22:58:09.480024	2021-04-25 22:58:09.480024
987	1009	1	2021-04-25 22:58:09.576055	2021-04-25 22:58:09.576055
988	1010	1	2021-04-25 22:58:09.666626	2021-04-25 22:58:09.666626
989	1011	1	2021-04-25 22:58:09.742476	2021-04-25 22:58:09.742476
990	1012	1	2021-04-25 22:58:09.8088	2021-04-25 22:58:09.8088
991	1013	1	2021-04-25 22:58:09.907239	2021-04-25 22:58:09.907239
992	1014	1	2021-04-25 22:58:09.982126	2021-04-25 22:58:09.982126
993	1015	1	2021-04-25 22:58:10.068683	2021-04-25 22:58:10.068683
994	1016	1	2021-04-25 22:58:10.155188	2021-04-25 22:58:10.155188
995	1017	1	2021-04-25 22:58:10.239305	2021-04-25 22:58:10.239305
996	1018	1	2021-04-25 22:58:10.387888	2021-04-25 22:58:10.387888
997	1019	1	2021-04-25 22:58:10.451847	2021-04-25 22:58:10.451847
998	1020	1	2021-04-25 22:58:10.513529	2021-04-25 22:58:10.513529
999	1021	1	2021-04-25 22:58:10.589957	2021-04-25 22:58:10.589957
1000	1022	1	2021-04-25 22:58:10.713603	2021-04-25 22:58:10.713603
1001	1023	1	2021-04-25 22:58:10.810672	2021-04-25 22:58:10.810672
1002	1024	1	2021-04-25 22:58:10.909001	2021-04-25 22:58:10.909001
1003	1025	1	2021-04-25 22:58:10.983107	2021-04-25 22:58:10.983107
1004	1026	1	2021-04-25 22:58:11.174824	2021-04-25 22:58:11.174824
1005	1027	1	2021-04-25 22:58:11.293002	2021-04-25 22:58:11.293002
1006	1028	1	2021-04-25 22:58:11.366847	2021-04-25 22:58:11.366847
1007	1029	1	2021-04-25 22:58:11.44416	2021-04-25 22:58:11.44416
1008	1030	1	2021-04-25 22:58:11.533706	2021-04-25 22:58:11.533706
1009	1031	1	2021-04-25 22:58:11.614681	2021-04-25 22:58:11.614681
1010	1032	1	2021-04-25 22:58:11.733551	2021-04-25 22:58:11.733551
1011	1033	1	2021-04-25 22:58:11.83355	2021-04-25 22:58:11.83355
1012	1034	1	2021-04-25 22:58:11.909948	2021-04-25 22:58:11.909948
1013	1035	2	2021-04-25 22:58:11.969763	2021-04-25 22:58:11.969763
1014	1036	2	2021-04-25 22:58:12.046582	2021-04-25 22:58:12.046582
1015	1037	1	2021-04-25 22:58:12.114461	2021-04-25 22:58:12.114461
1016	1038	1	2021-04-25 22:58:12.2017	2021-04-25 22:58:12.2017
1017	1039	1	2021-04-25 22:58:12.270736	2021-04-25 22:58:12.270736
1018	1040	1	2021-04-25 22:58:12.405801	2021-04-25 22:58:12.405801
1019	1041	1	2021-04-25 22:58:12.502347	2021-04-25 22:58:12.502347
1020	1042	1	2021-04-25 22:58:12.569457	2021-04-25 22:58:12.569457
1021	1043	1	2021-04-25 22:58:12.663088	2021-04-25 22:58:12.663088
1022	1044	1	2021-04-25 22:58:12.751882	2021-04-25 22:58:12.751882
1023	1045	1	2021-04-25 22:58:12.832537	2021-04-25 22:58:12.832537
1024	1046	1	2021-04-25 22:58:12.948606	2021-04-25 22:58:12.948606
1025	1047	1	2021-04-25 22:58:13.07405	2021-04-25 22:58:13.07405
1026	1048	1	2021-04-25 22:58:13.210003	2021-04-25 22:58:13.210003
1027	1049	1	2021-04-25 22:58:13.326412	2021-04-25 22:58:13.326412
1028	1050	1	2021-04-25 22:58:13.438784	2021-04-25 22:58:13.438784
1029	1051	1	2021-04-25 22:58:13.539732	2021-04-25 22:58:13.539732
1030	1052	1	2021-04-25 22:58:13.676518	2021-04-25 22:58:13.676518
1031	1053	1	2021-04-25 22:58:13.802091	2021-04-25 22:58:13.802091
1032	1054	1	2021-04-25 22:58:13.881498	2021-04-25 22:58:13.881498
1033	1055	1	2021-04-25 22:58:13.975105	2021-04-25 22:58:13.975105
1034	1056	1	2021-04-25 22:58:14.054439	2021-04-25 22:58:14.054439
1035	1057	1	2021-04-25 22:58:14.1463	2021-04-25 22:58:14.1463
1036	1058	1	2021-04-25 22:58:14.23733	2021-04-25 22:58:14.23733
1037	1059	1	2021-04-25 22:58:14.376852	2021-04-25 22:58:14.376852
1038	1060	1	2021-04-25 22:58:14.465037	2021-04-25 22:58:14.465037
1039	1061	1	2021-04-25 22:58:14.547149	2021-04-25 22:58:14.547149
1040	1062	1	2021-04-25 22:58:14.665636	2021-04-25 22:58:14.665636
1041	1063	1	2021-04-25 22:58:14.761284	2021-04-25 22:58:14.761284
1042	1064	1	2021-04-25 22:58:14.885683	2021-04-25 22:58:14.885683
1043	1065	1	2021-04-25 22:58:14.977047	2021-04-25 22:58:14.977047
1044	1066	1	2021-04-25 22:58:15.079684	2021-04-25 22:58:15.079684
1045	1067	1	2021-04-25 22:58:15.150302	2021-04-25 22:58:15.150302
1046	1068	1	2021-04-25 22:58:15.226508	2021-04-25 22:58:15.226508
1047	1069	1	2021-04-25 22:58:15.309663	2021-04-25 22:58:15.309663
1048	1070	1	2021-04-25 22:58:15.382304	2021-04-25 22:58:15.382304
1049	1071	1	2021-04-25 22:58:15.454547	2021-04-25 22:58:15.454547
1050	1072	1	2021-04-25 22:58:15.523802	2021-04-25 22:58:15.523802
1051	1073	1	2021-04-25 22:58:15.603122	2021-04-25 22:58:15.603122
1052	1074	1	2021-04-25 22:58:15.690762	2021-04-25 22:58:15.690762
1053	1075	1	2021-04-25 22:58:15.774161	2021-04-25 22:58:15.774161
1054	1076	1	2021-04-25 22:58:15.868468	2021-04-25 22:58:15.868468
1055	1077	1	2021-04-25 22:58:15.963494	2021-04-25 22:58:15.963494
1056	1078	1	2021-04-25 22:58:16.039801	2021-04-25 22:58:16.039801
1057	1079	1	2021-04-25 22:58:16.148166	2021-04-25 22:58:16.148166
1058	1080	1	2021-04-25 22:58:16.250271	2021-04-25 22:58:16.250271
1059	1081	1	2021-04-25 22:58:16.412937	2021-04-25 22:58:16.412937
1060	1082	2	2021-04-25 22:58:16.489151	2021-04-25 22:58:16.489151
1061	1083	2	2021-04-25 22:58:16.552887	2021-04-25 22:58:16.552887
1062	1084	1	2021-04-25 22:58:16.652659	2021-04-25 22:58:16.652659
1063	1085	1	2021-04-25 22:58:16.73906	2021-04-25 22:58:16.73906
1064	1086	2	2021-04-25 22:58:16.804409	2021-04-25 22:58:16.804409
1065	1087	1	2021-04-25 22:58:16.902784	2021-04-25 22:58:16.902784
1066	1088	2	2021-04-25 22:58:16.982749	2021-04-25 22:58:16.982749
1067	1089	1	2021-04-25 22:58:17.087352	2021-04-25 22:58:17.087352
1068	1090	1	2021-04-25 22:58:17.179018	2021-04-25 22:58:17.179018
1069	1091	2	2021-04-25 22:58:17.248785	2021-04-25 22:58:17.248785
1070	1092	2	2021-04-25 22:58:17.331908	2021-04-25 22:58:17.331908
1071	1093	2	2021-04-25 22:58:17.402898	2021-04-25 22:58:17.402898
1072	1094	2	2021-04-25 22:58:17.480682	2021-04-25 22:58:17.480682
1073	1095	2	2021-04-25 22:58:17.554805	2021-04-25 22:58:17.554805
1074	1096	1	2021-04-25 22:58:17.629619	2021-04-25 22:58:17.629619
1075	1097	1	2021-04-25 22:58:17.702802	2021-04-25 22:58:17.702802
1076	1098	1	2021-04-25 22:58:17.783854	2021-04-25 22:58:17.783854
1077	1099	2	2021-04-25 22:58:17.841415	2021-04-25 22:58:17.841415
1078	1100	2	2021-04-25 22:58:17.908546	2021-04-25 22:58:17.908546
1079	1101	1	2021-04-25 22:58:17.975902	2021-04-25 22:58:17.975902
1080	1102	2	2021-04-25 22:58:18.054943	2021-04-25 22:58:18.054943
1081	1103	2	2021-04-25 22:58:18.121682	2021-04-25 22:58:18.121682
1082	1104	1	2021-04-25 22:58:18.189587	2021-04-25 22:58:18.189587
1083	1105	1	2021-04-25 22:58:18.267217	2021-04-25 22:58:18.267217
1084	1106	1	2021-04-25 22:58:18.349272	2021-04-25 22:58:18.349272
1085	1107	1	2021-04-25 22:58:18.450876	2021-04-25 22:58:18.450876
1086	1108	1	2021-04-25 22:58:18.521144	2021-04-25 22:58:18.521144
1087	1109	2	2021-04-25 22:58:18.590447	2021-04-25 22:58:18.590447
1088	1110	2	2021-04-25 22:58:18.664678	2021-04-25 22:58:18.664678
1089	1111	2	2021-04-25 22:58:18.723951	2021-04-25 22:58:18.723951
1090	1112	1	2021-04-25 22:58:18.860351	2021-04-25 22:58:18.860351
1091	1113	1	2021-04-25 22:58:18.949406	2021-04-25 22:58:18.949406
1092	1114	2	2021-04-25 22:58:19.022196	2021-04-25 22:58:19.022196
1093	1115	2	2021-04-25 22:58:19.097123	2021-04-25 22:58:19.097123
1094	1116	1	2021-04-25 22:58:19.17552	2021-04-25 22:58:19.17552
1095	1117	2	2021-04-25 22:58:19.241942	2021-04-25 22:58:19.241942
1096	1118	1	2021-04-25 22:58:19.318524	2021-04-25 22:58:19.318524
1097	1119	2	2021-04-25 22:58:19.389258	2021-04-25 22:58:19.389258
1098	1120	1	2021-04-25 22:58:19.459913	2021-04-25 22:58:19.459913
1099	1121	1	2021-04-25 22:58:19.525505	2021-04-25 22:58:19.525505
1100	1122	1	2021-04-25 22:58:19.597854	2021-04-25 22:58:19.597854
1101	1123	1	2021-04-25 22:58:19.68677	2021-04-25 22:58:19.68677
1102	1124	2	2021-04-25 22:58:19.755941	2021-04-25 22:58:19.755941
1103	1125	2	2021-04-25 22:58:19.817752	2021-04-25 22:58:19.817752
1104	1126	2	2021-04-25 22:58:19.890721	2021-04-25 22:58:19.890721
1105	1127	2	2021-04-25 22:58:19.974446	2021-04-25 22:58:19.974446
1106	1128	2	2021-04-25 22:58:20.150216	2021-04-25 22:58:20.150216
1107	1129	1	2021-04-25 22:58:20.218126	2021-04-25 22:58:20.218126
1108	1130	2	2021-04-25 22:58:20.294795	2021-04-25 22:58:20.294795
1109	1131	2	2021-04-25 22:58:20.372167	2021-04-25 22:58:20.372167
1110	1132	2	2021-04-25 22:58:20.457744	2021-04-25 22:58:20.457744
1111	1133	2	2021-04-25 22:58:20.546363	2021-04-25 22:58:20.546363
1112	1134	1	2021-04-25 22:58:20.646303	2021-04-25 22:58:20.646303
1113	1135	2	2021-04-25 22:58:20.707458	2021-04-25 22:58:20.707458
1114	1136	2	2021-04-25 22:58:20.777377	2021-04-25 22:58:20.777377
1115	1137	2	2021-04-25 22:58:20.837926	2021-04-25 22:58:20.837926
1116	1138	1	2021-04-25 22:58:20.930513	2021-04-25 22:58:20.930513
1117	1139	1	2021-04-25 22:58:21.00581	2021-04-25 22:58:21.00581
1118	1140	1	2021-04-25 22:58:21.097842	2021-04-25 22:58:21.097842
1119	1141	1	2021-04-25 22:58:21.162618	2021-04-25 22:58:21.162618
1120	1142	1	2021-04-25 22:58:21.230139	2021-04-25 22:58:21.230139
1121	1143	2	2021-04-25 22:58:21.31496	2021-04-25 22:58:21.31496
1122	1144	1	2021-04-25 22:58:21.384193	2021-04-25 22:58:21.384193
1123	1145	1	2021-04-25 22:58:21.482514	2021-04-25 22:58:21.482514
1124	1146	2	2021-04-25 22:58:21.546438	2021-04-25 22:58:21.546438
1125	1147	2	2021-04-25 22:58:21.608539	2021-04-25 22:58:21.608539
1126	1148	1	2021-04-25 22:58:21.687271	2021-04-25 22:58:21.687271
1127	1149	1	2021-04-25 22:58:21.765946	2021-04-25 22:58:21.765946
1128	1150	1	2021-04-25 22:58:21.894856	2021-04-25 22:58:21.894856
1129	1151	2	2021-04-25 22:58:22.002228	2021-04-25 22:58:22.002228
1130	1152	1	2021-04-25 22:58:22.084115	2021-04-25 22:58:22.084115
1131	1153	1	2021-04-25 22:58:22.144191	2021-04-25 22:58:22.144191
1132	1154	1	2021-04-25 22:58:22.214125	2021-04-25 22:58:22.214125
1133	1155	1	2021-04-25 22:58:22.299504	2021-04-25 22:58:22.299504
1134	1156	1	2021-04-25 22:58:22.421368	2021-04-25 22:58:22.421368
1135	1157	1	2021-04-25 22:58:22.502537	2021-04-25 22:58:22.502537
1136	1158	1	2021-04-25 22:58:22.565614	2021-04-25 22:58:22.565614
1137	1159	1	2021-04-25 22:58:22.662589	2021-04-25 22:58:22.662589
1138	1160	1	2021-04-25 22:58:22.738773	2021-04-25 22:58:22.738773
1139	1161	1	2021-04-25 22:58:22.813536	2021-04-25 22:58:22.813536
1140	1162	1	2021-04-25 22:58:22.881136	2021-04-25 22:58:22.881136
1141	1163	1	2021-04-25 22:58:22.955172	2021-04-25 22:58:22.955172
1142	1164	1	2021-04-25 22:58:23.018663	2021-04-25 22:58:23.018663
1143	1165	1	2021-04-25 22:58:23.092294	2021-04-25 22:58:23.092294
1144	1166	1	2021-04-25 22:58:23.24249	2021-04-25 22:58:23.24249
1145	1167	1	2021-04-25 22:58:23.356056	2021-04-25 22:58:23.356056
1146	1168	1	2021-04-25 22:58:23.460179	2021-04-25 22:58:23.460179
1147	1169	1	2021-04-25 22:58:23.529783	2021-04-25 22:58:23.529783
1148	1170	1	2021-04-25 22:58:23.610866	2021-04-25 22:58:23.610866
1149	1171	1	2021-04-25 22:58:23.688325	2021-04-25 22:58:23.688325
1150	1172	1	2021-04-25 22:58:23.784002	2021-04-25 22:58:23.784002
1151	1173	2	2021-04-25 22:58:23.858528	2021-04-25 22:58:23.858528
1152	1174	2	2021-04-25 22:58:23.933811	2021-04-25 22:58:23.933811
1153	1175	1	2021-04-25 22:58:24.023587	2021-04-25 22:58:24.023587
1154	1176	1	2021-04-25 22:58:24.106744	2021-04-25 22:58:24.106744
1155	1177	1	2021-04-25 22:58:24.211771	2021-04-25 22:58:24.211771
1156	1178	2	2021-04-25 22:58:24.273991	2021-04-25 22:58:24.273991
1157	1179	2	2021-04-25 22:58:24.362558	2021-04-25 22:58:24.362558
1158	1180	2	2021-04-25 22:58:24.442029	2021-04-25 22:58:24.442029
1159	1181	2	2021-04-25 22:58:24.513265	2021-04-25 22:58:24.513265
1160	1182	1	2021-04-25 22:58:24.587195	2021-04-25 22:58:24.587195
1161	1183	1	2021-04-25 22:58:24.698137	2021-04-25 22:58:24.698137
1162	1184	2	2021-04-25 22:58:24.789152	2021-04-25 22:58:24.789152
1163	1185	2	2021-04-25 22:58:24.848572	2021-04-25 22:58:24.848572
1164	1186	1	2021-04-25 22:58:24.947869	2021-04-25 22:58:24.947869
1165	1187	2	2021-04-25 22:58:25.016248	2021-04-25 22:58:25.016248
1166	1188	1	2021-04-25 22:58:25.10254	2021-04-25 22:58:25.10254
1167	1189	1	2021-04-25 22:58:25.169375	2021-04-25 22:58:25.169375
1168	1190	1	2021-04-25 22:58:25.250356	2021-04-25 22:58:25.250356
1169	1191	1	2021-04-25 22:58:25.331898	2021-04-25 22:58:25.331898
1170	1192	1	2021-04-25 22:58:25.434831	2021-04-25 22:58:25.434831
1171	1193	1	2021-04-25 22:58:25.514699	2021-04-25 22:58:25.514699
1172	1194	1	2021-04-25 22:58:25.595799	2021-04-25 22:58:25.595799
1173	1195	1	2021-04-25 22:58:25.687414	2021-04-25 22:58:25.687414
1174	1196	1	2021-04-25 22:58:25.761157	2021-04-25 22:58:25.761157
1175	1197	1	2021-04-25 22:58:25.837319	2021-04-25 22:58:25.837319
1176	1198	1	2021-04-25 22:58:25.90657	2021-04-25 22:58:25.90657
1177	1199	1	2021-04-25 22:58:25.980935	2021-04-25 22:58:25.980935
1178	1200	1	2021-04-25 22:58:26.04144	2021-04-25 22:58:26.04144
1179	1201	1	2021-04-25 22:58:26.109948	2021-04-25 22:58:26.109948
1180	1202	1	2021-04-25 22:58:26.177949	2021-04-25 22:58:26.177949
1181	1203	1	2021-04-25 22:58:26.256764	2021-04-25 22:58:26.256764
1182	1204	1	2021-04-25 22:58:26.35534	2021-04-25 22:58:26.35534
1183	1205	1	2021-04-25 22:58:26.450704	2021-04-25 22:58:26.450704
1184	1206	1	2021-04-25 22:58:26.523297	2021-04-25 22:58:26.523297
1185	1207	1	2021-04-25 22:58:26.589689	2021-04-25 22:58:26.589689
1186	1208	1	2021-04-25 22:58:26.679745	2021-04-25 22:58:26.679745
1187	1209	1	2021-04-25 22:58:26.774754	2021-04-25 22:58:26.774754
1188	1210	1	2021-04-25 22:58:26.86943	2021-04-25 22:58:26.86943
1189	1211	1	2021-04-25 22:58:26.97306	2021-04-25 22:58:26.97306
1190	1212	1	2021-04-25 22:58:27.050645	2021-04-25 22:58:27.050645
1191	1213	1	2021-04-25 22:58:27.166168	2021-04-25 22:58:27.166168
1192	1214	1	2021-04-25 22:58:27.258289	2021-04-25 22:58:27.258289
1193	1215	1	2021-04-25 22:58:27.358224	2021-04-25 22:58:27.358224
1194	1216	1	2021-04-25 22:58:27.449646	2021-04-25 22:58:27.449646
1195	1217	1	2021-04-25 22:58:27.518423	2021-04-25 22:58:27.518423
1196	1218	1	2021-04-25 22:58:27.590085	2021-04-25 22:58:27.590085
1197	1219	1	2021-04-25 22:58:27.676464	2021-04-25 22:58:27.676464
1198	1220	1	2021-04-25 22:58:27.793344	2021-04-25 22:58:27.793344
1199	1221	1	2021-04-25 22:58:27.8642	2021-04-25 22:58:27.8642
1200	1222	1	2021-04-25 22:58:27.945468	2021-04-25 22:58:27.945468
1201	1223	1	2021-04-25 22:58:28.049804	2021-04-25 22:58:28.049804
1202	1224	1	2021-04-25 22:58:28.125032	2021-04-25 22:58:28.125032
1203	1225	1	2021-04-25 22:58:28.22245	2021-04-25 22:58:28.22245
1204	1226	1	2021-04-25 22:58:28.314999	2021-04-25 22:58:28.314999
1205	1227	1	2021-04-25 22:58:28.403387	2021-04-25 22:58:28.403387
1206	1228	1	2021-04-25 22:58:28.464762	2021-04-25 22:58:28.464762
1207	1229	1	2021-04-25 22:58:28.540116	2021-04-25 22:58:28.540116
1208	1230	1	2021-04-25 22:58:28.615491	2021-04-25 22:58:28.615491
1209	1231	1	2021-04-25 22:58:28.711987	2021-04-25 22:58:28.711987
1210	1232	1	2021-04-25 22:58:28.798127	2021-04-25 22:58:28.798127
1211	1233	1	2021-04-25 22:58:28.893717	2021-04-25 22:58:28.893717
1212	1234	1	2021-04-25 22:58:28.983877	2021-04-25 22:58:28.983877
1213	1235	1	2021-04-25 22:58:29.070838	2021-04-25 22:58:29.070838
1214	1236	1	2021-04-25 22:58:29.149279	2021-04-25 22:58:29.149279
1215	1237	1	2021-04-25 22:58:29.228005	2021-04-25 22:58:29.228005
1216	1238	1	2021-04-25 22:58:29.297231	2021-04-25 22:58:29.297231
1217	1239	1	2021-04-25 22:58:29.385147	2021-04-25 22:58:29.385147
1218	1240	1	2021-04-25 22:58:29.49089	2021-04-25 22:58:29.49089
1219	1241	1	2021-04-25 22:58:29.560113	2021-04-25 22:58:29.560113
1220	1242	1	2021-04-25 22:58:29.626899	2021-04-25 22:58:29.626899
1221	1243	2	2021-04-25 22:58:29.710283	2021-04-25 22:58:29.710283
1222	1244	1	2021-04-25 22:58:29.793101	2021-04-25 22:58:29.793101
1223	1245	2	2021-04-25 22:58:29.852705	2021-04-25 22:58:29.852705
1224	1246	1	2021-04-25 22:58:29.934658	2021-04-25 22:58:29.934658
1225	1247	1	2021-04-25 22:58:30.005965	2021-04-25 22:58:30.005965
1226	1248	1	2021-04-25 22:58:30.115299	2021-04-25 22:58:30.115299
1227	1249	1	2021-04-25 22:58:30.19795	2021-04-25 22:58:30.19795
1228	1250	1	2021-04-25 22:58:30.273482	2021-04-25 22:58:30.273482
1229	1251	1	2021-04-25 22:58:30.35777	2021-04-25 22:58:30.35777
1230	1252	1	2021-04-25 22:58:30.434808	2021-04-25 22:58:30.434808
1231	1253	1	2021-04-25 22:58:30.5028	2021-04-25 22:58:30.5028
1232	1254	1	2021-04-25 22:58:30.577794	2021-04-25 22:58:30.577794
1233	1255	1	2021-04-25 22:58:30.686647	2021-04-25 22:58:30.686647
1234	1256	1	2021-04-25 22:58:30.767628	2021-04-25 22:58:30.767628
1235	1257	1	2021-04-25 22:58:30.85245	2021-04-25 22:58:30.85245
1236	1258	1	2021-04-25 22:58:30.935173	2021-04-25 22:58:30.935173
1237	1259	1	2021-04-25 22:58:31.022436	2021-04-25 22:58:31.022436
1238	1260	1	2021-04-25 22:58:31.093142	2021-04-25 22:58:31.093142
1239	1261	1	2021-04-25 22:58:31.209275	2021-04-25 22:58:31.209275
1240	1262	1	2021-04-25 22:58:31.329664	2021-04-25 22:58:31.329664
1241	1263	1	2021-04-25 22:58:31.418824	2021-04-25 22:58:31.418824
1242	1264	1	2021-04-25 22:58:31.531795	2021-04-25 22:58:31.531795
1243	1265	1	2021-04-25 22:58:31.608518	2021-04-25 22:58:31.608518
1244	1266	1	2021-04-25 22:58:31.712995	2021-04-25 22:58:31.712995
1245	1267	1	2021-04-25 22:58:31.818978	2021-04-25 22:58:31.818978
1246	1268	1	2021-04-25 22:58:31.921951	2021-04-25 22:58:31.921951
1247	1269	1	2021-04-25 22:58:32.069984	2021-04-25 22:58:32.069984
1248	1270	1	2021-04-25 22:58:32.171601	2021-04-25 22:58:32.171601
1249	1271	1	2021-04-25 22:58:32.269983	2021-04-25 22:58:32.269983
1250	1272	1	2021-04-25 22:58:32.352494	2021-04-25 22:58:32.352494
1251	1273	1	2021-04-25 22:58:32.420651	2021-04-25 22:58:32.420651
1252	1274	1	2021-04-25 22:58:32.505311	2021-04-25 22:58:32.505311
1253	1275	1	2021-04-25 22:58:32.565461	2021-04-25 22:58:32.565461
1254	1276	1	2021-04-25 22:58:32.667347	2021-04-25 22:58:32.667347
1255	1277	1	2021-04-25 22:58:32.736735	2021-04-25 22:58:32.736735
1256	1278	1	2021-04-25 22:58:32.891797	2021-04-25 22:58:32.891797
1257	1279	1	2021-04-25 22:58:32.965843	2021-04-25 22:58:32.965843
1258	1280	1	2021-04-25 22:58:33.039212	2021-04-25 22:58:33.039212
1259	1281	1	2021-04-25 22:58:33.153154	2021-04-25 22:58:33.153154
1260	1282	1	2021-04-25 22:58:33.297682	2021-04-25 22:58:33.297682
1261	1283	1	2021-04-25 22:58:33.408994	2021-04-25 22:58:33.408994
1262	1284	1	2021-04-25 22:58:33.502287	2021-04-25 22:58:33.502287
1263	1285	1	2021-04-25 22:58:33.596714	2021-04-25 22:58:33.596714
1264	1286	1	2021-04-25 22:58:33.698182	2021-04-25 22:58:33.698182
1265	1287	1	2021-04-25 22:58:33.790237	2021-04-25 22:58:33.790237
1266	1288	1	2021-04-25 22:58:33.873588	2021-04-25 22:58:33.873588
1267	1289	1	2021-04-25 22:58:33.948862	2021-04-25 22:58:33.948862
1268	1290	1	2021-04-25 22:58:34.012934	2021-04-25 22:58:34.012934
1269	1291	1	2021-04-25 22:58:34.094871	2021-04-25 22:58:34.094871
1270	1292	1	2021-04-25 22:58:34.194244	2021-04-25 22:58:34.194244
1271	1293	1	2021-04-25 22:58:34.267343	2021-04-25 22:58:34.267343
1272	1294	1	2021-04-25 22:58:34.383823	2021-04-25 22:58:34.383823
1273	1295	1	2021-04-25 22:58:34.484048	2021-04-25 22:58:34.484048
1274	1296	1	2021-04-25 22:58:34.551577	2021-04-25 22:58:34.551577
1275	1297	1	2021-04-25 22:58:34.651026	2021-04-25 22:58:34.651026
1276	1298	1	2021-04-25 22:58:34.754594	2021-04-25 22:58:34.754594
1277	1299	1	2021-04-25 22:58:34.816669	2021-04-25 22:58:34.816669
1278	1300	1	2021-04-25 22:58:34.875928	2021-04-25 22:58:34.875928
1279	1301	1	2021-04-25 22:58:34.958471	2021-04-25 22:58:34.958471
1280	1302	1	2021-04-25 22:58:35.061786	2021-04-25 22:58:35.061786
1281	1303	1	2021-04-25 22:58:35.141701	2021-04-25 22:58:35.141701
1282	1304	1	2021-04-25 22:58:35.205859	2021-04-25 22:58:35.205859
1283	1305	1	2021-04-25 22:58:35.296524	2021-04-25 22:58:35.296524
1284	1306	1	2021-04-25 22:58:35.418421	2021-04-25 22:58:35.418421
1285	1307	1	2021-04-25 22:58:35.500186	2021-04-25 22:58:35.500186
1286	1308	1	2021-04-25 22:58:35.586954	2021-04-25 22:58:35.586954
1287	1309	1	2021-04-25 22:58:35.673108	2021-04-25 22:58:35.673108
1288	1310	1	2021-04-25 22:58:35.73918	2021-04-25 22:58:35.73918
1289	1311	1	2021-04-25 22:58:35.813594	2021-04-25 22:58:35.813594
1290	1312	1	2021-04-25 22:58:35.890298	2021-04-25 22:58:35.890298
1291	1313	1	2021-04-25 22:58:35.990773	2021-04-25 22:58:35.990773
1292	1314	1	2021-04-25 22:58:36.094526	2021-04-25 22:58:36.094526
1293	1315	1	2021-04-25 22:58:36.186351	2021-04-25 22:58:36.186351
1294	1316	1	2021-04-25 22:58:36.289251	2021-04-25 22:58:36.289251
1295	1317	1	2021-04-25 22:58:36.404721	2021-04-25 22:58:36.404721
1296	1318	1	2021-04-25 22:58:36.50333	2021-04-25 22:58:36.50333
1297	1319	1	2021-04-25 22:58:36.570243	2021-04-25 22:58:36.570243
1298	1320	1	2021-04-25 22:58:36.681817	2021-04-25 22:58:36.681817
1299	1321	1	2021-04-25 22:58:36.763567	2021-04-25 22:58:36.763567
1300	1322	1	2021-04-25 22:58:36.850911	2021-04-25 22:58:36.850911
1301	1323	1	2021-04-25 22:58:36.95074	2021-04-25 22:58:36.95074
1302	1324	1	2021-04-25 22:58:37.048928	2021-04-25 22:58:37.048928
\.


--
-- Data for Name: route_reviews; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.route_reviews (id, climbing_type_id, protection_rating, stars, route_id, user_id, grade, comment, created_at, updated_at) FROM stdin;
71	\N	\N	5	36	50	6c		2021-04-29 16:16:13.122077	2021-04-29 16:16:13.122077
72	\N	\N	5	39	50	7a		2021-04-29 16:16:41.835775	2021-04-29 16:16:41.835775
75	\N	\N	5	81	90	7b		2021-05-05 01:40:52.926259	2021-05-05 01:40:52.926259
61	\N	\N	3	74	49	6a		2021-04-13 15:51:14.665133	2021-04-13 15:51:14.665133
62	\N	\N	5	75	49	6b+		2021-04-13 15:54:37.154697	2021-04-13 15:54:37.154697
63	\N	\N	4	77	49	7b		2021-04-13 15:55:01.650238	2021-04-13 15:55:01.650238
64	\N	\N	4	73	49	7b+		2021-04-13 15:55:15.708624	2021-04-13 15:55:15.708624
65	\N	\N	5	37	49	7b+		2021-04-13 16:01:08.863409	2021-04-13 16:01:08.863409
66	\N	\N	\N	36	88	6c		2021-04-14 14:28:24.635928	2021-04-14 14:28:24.635928
67	\N	\N	5	39	88	7a		2021-04-14 14:30:49.211954	2021-04-14 14:30:49.211954
60	\N	\N	5	39	49	7a+	No apta para ascensiones por cuerda	2021-04-12 20:07:25.480636	2021-04-22 23:24:27.217076
70	\N	\N	3	74	96	6a		2021-04-25 23:32:09.222155	2021-04-25 23:32:09.222155
76	\N	\N	4	81	49	7a+		2021-08-28 17:36:00.268823	2021-08-28 17:36:00.268823
\.


--
-- Data for Name: routes; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.routes (id, rains, classic, published, status, protection_ranking, slope, pitch_num, wind, topo_num, length, reviews_count, wall_id, left_route_id, name, grade, community_grade, quickdraws, status_title, status_description, created_at, updated_at) FROM stdin;
39	f	t	t	2	0	2	1	0	\N	20	3	34	\N	No hay lugar para la duda	7a		10	Caida de roca	Ruta nueva, atentos a la caída de roca. 	2021-04-08 15:44:35.109078	2021-04-29 16:16:41.8405
36	f	t	t	0	0	2	1	2	1	20	2	34	39	Roquefort	6c					2021-02-25 14:22:13.70436	2021-06-01 13:24:37.874434
78	t	f	t	0	0	1	1	0	1	\N	0	50	\N	Hippie Hippie Hop	7-	\N	\N	\N	\N	2021-04-25 22:56:49.52888	2021-04-25 22:56:50.586944
79	t	f	t	0	0	1	1	0	2	\N	0	50	\N	Happy Ending	7a	\N	\N	\N	\N	2021-04-25 22:56:50.890406	2021-04-25 22:56:50.911948
80	t	f	t	0	0	1	1	0	3	\N	0	50	\N	Pichichi	7b+	\N	\N	\N	\N	2021-04-25 22:56:50.999204	2021-04-25 22:56:51.046195
82	t	f	t	0	0	1	1	0	5	\N	0	50	\N	Coliseo	7-	\N	\N	\N	\N	2021-04-25 22:56:51.253215	2021-04-25 22:56:51.267674
83	t	f	t	0	0	1	1	0	6	\N	0	50	\N	De Mano a Mono	7b	\N	\N	\N	\N	2021-04-25 22:56:51.3503	2021-04-25 22:56:51.367511
97	t	f	t	0	2	2	1	0	1	32	0	51	\N	Gringa Loca	6b	\N	\N	\N	\N	2021-04-25 22:56:52.726341	2021-04-25 22:56:52.740459
84	t	f	t	0	0	1	1	0	7	\N	0	50	\N	De Mono a Mano	7-	\N	\N	\N	\N	2021-04-25 22:56:51.448323	2021-04-25 22:56:51.48074
85	t	t	t	0	0	1	1	0	8	\N	0	50	\N	Escorpión	7a+	\N	\N	\N	\N	2021-04-25 22:56:51.577146	2021-04-25 22:56:51.611667
72	f	f	t	0	0	0	1	0	\N	30	0	34	37	Venga Moni	7c+		13			2021-04-13 14:12:10.384929	2021-04-13 14:12:10.472171
86	t	t	t	0	0	1	1	0	9	\N	0	50	\N	We Tripantu	7c+/8a	\N	\N	\N	\N	2021-04-25 22:56:51.713764	2021-04-25 22:56:51.737355
87	t	t	t	0	0	1	1	0	10	\N	0	50	\N	Circo Romano	7c	\N	\N	\N	\N	2021-04-25 22:56:51.847259	2021-04-25 22:56:51.871717
88	t	t	t	0	0	1	1	0	11	\N	0	50	\N	Har Magedón	7c+	\N	\N	\N	\N	2021-04-25 22:56:51.937376	2021-04-25 22:56:51.951074
76	f	f	t	0	0	1	1	0	\N	20	0	34	75	Dos Monos	7b		10			2021-04-13 14:17:09.382004	2021-04-13 15:53:48.542366
75	f	f	t	0	0	0	1	0	\N	30	1	34	74	El Queso	6b	6b+	12			2021-04-13 14:16:00.471792	2021-04-13 15:54:37.177062
77	f	f	t	0	0	0	1	0	\N	20	1	34	76	Heavy Many	7b		10			2021-04-13 14:18:30.561163	2021-04-13 15:55:01.678796
89	t	t	t	0	0	1	1	0	12	\N	0	50	\N	Luna Creciente	7c+	\N	\N	\N	\N	2021-04-25 22:56:52.004467	2021-04-25 22:56:52.018057
73	f	f	t	0	0	2	1	0	\N	20	1	34	72	Topo Bozzolo	7b		9			2021-04-13 14:13:54.143812	2021-04-13 15:55:15.759646
37	f	f	t	0	0	1	1	2	\N	35	1	34	36	Baila Negro Baila	7b+		14	Cuidado con el decenso	Al bajar ten cuidado de caer sobre la mata de calafate	2021-02-25 14:23:36.995465	2021-04-14 12:19:34.17578
90	t	t	t	0	0	1	1	0	13	\N	0	50	\N	Los Sueños de Morgana	7c+	\N	\N	\N	\N	2021-04-25 22:56:52.065904	2021-04-25 22:56:52.081536
91	t	t	t	0	0	1	2	0	14	\N	0	50	\N	Los Trapecistas	7b	\N	\N	\N	\N	2021-04-25 22:56:52.159462	2021-04-25 22:56:52.172644
92	t	t	t	0	0	1	1	0	15	\N	0	50	\N	Chagasic Park	8a	\N	\N	\N	\N	2021-04-25 22:56:52.281423	2021-04-25 22:56:52.297073
93	t	t	t	0	0	0	1	0	16	\N	0	50	\N	Chubaca	7b+	\N	\N	\N	\N	2021-04-25 22:56:52.354739	2021-04-25 22:56:52.36827
94	t	f	t	0	0	1	1	0	17	\N	0	50	\N	Con Sangre en el Ojo	7b	\N	\N	\N	\N	2021-04-25 22:56:52.417938	2021-04-25 22:56:52.43048
95	t	f	t	0	0	1	1	0	18	\N	0	50	\N	Yoda	7b+	\N	\N	\N	\N	2021-04-25 22:56:52.49485	2021-04-25 22:56:52.52605
96	t	f	t	0	0	1	1	0	19	\N	0	50	\N	Citripio	6c+	\N	\N	\N	\N	2021-04-25 22:56:52.576892	2021-04-25 22:56:52.589841
98	t	f	t	0	1	2	1	0	2	32	0	51	\N	Pasao a Caca	6a+	\N	\N	\N	\N	2021-04-25 22:56:52.817539	2021-04-25 22:56:52.840171
99	t	f	t	0	0	2	1	0	3	32	0	51	\N	Los Batidos de Ariel	6c	\N	\N	\N	\N	2021-04-25 22:56:52.909393	2021-04-25 22:56:52.92176
100	t	f	t	0	0	2	1	0	4	32	0	51	\N	Chorizo Corredor	6c	\N	\N	\N	\N	2021-04-25 22:56:52.971635	2021-04-25 22:56:52.98603
101	t	f	t	0	0	2	1	0	5	30	0	51	\N	Papurri, no me has Depositado	7a+	\N	\N	\N	\N	2021-04-25 22:56:53.037755	2021-04-25 22:56:53.052367
102	t	f	t	0	0	2	1	0	6	30	0	51	\N	Estilo Greco	7a	\N	\N	\N	\N	2021-04-25 22:56:53.172138	2021-04-25 22:56:53.187364
103	t	f	t	0	0	2	1	0	7	30	0	51	\N	La Carlita	6c+	\N	\N	\N	\N	2021-04-25 22:56:53.25732	2021-04-25 22:56:53.270054
104	t	f	t	0	0	2	1	0	8	30	0	51	\N	Zorrones al Sol	6b+	\N	\N	\N	\N	2021-04-25 22:56:53.336753	2021-04-25 22:56:53.350019
105	t	f	t	0	0	2	3	0	9	\N	0	51	\N	San Guchito	6b+	\N	\N	\N	\N	2021-04-25 22:56:53.427244	2021-04-25 22:56:53.440767
106	t	f	t	0	0	2	3	0	1	83	0	49	\N	San Guchito	6b+	\N	\N	\N	\N	2021-04-25 22:56:53.513134	2021-04-25 22:56:53.536129
107	t	f	t	0	0	2	3	0	2	88	0	49	\N	San Chopo	6b	\N	\N	\N	\N	2021-04-25 22:56:53.597344	2021-04-25 22:56:53.621094
108	t	f	t	0	0	2	3	0	3	90	0	49	\N	San Pamela	6c	\N	\N	\N	\N	2021-04-25 22:56:53.697752	2021-04-25 22:56:53.723081
109	t	t	t	0	0	2	5	1	4	\N	0	49	\N	San Pateste	6c+	\N	\N	\N	\N	2021-04-25 22:56:53.781309	2021-04-25 22:56:53.805541
110	t	f	t	0	0	3	1	\N	1	\N	0	231	\N	Ni lo Uno ni lo Otro, Sino Todo lo Contario 	5+	\N	\N	\N	\N	2021-04-25 22:56:53.874192	2021-04-25 22:56:53.890247
111	t	f	t	0	1	3	1	\N	2	\N	0	231	\N	Laidimar	5+/6a	\N	\N	\N	\N	2021-04-25 22:56:53.951397	2021-04-25 22:56:53.967869
112	t	f	t	0	2	3	1	\N	3	\N	0	231	\N	Osteo Fito	5+	\N	\N	\N	\N	2021-04-25 22:56:54.015238	2021-04-25 22:56:54.028666
113	t	t	t	0	3	3	1	\N	4	\N	0	231	\N	San Pateste Primer Largo	5-	\N	\N	\N	\N	2021-04-25 22:56:54.101191	2021-04-25 22:56:54.118679
114	t	f	t	0	4	3	1	\N	5	\N	0	231	\N	Unas Paya	5-	\N	\N	\N	\N	2021-04-25 22:56:54.172174	2021-04-25 22:56:54.18538
115	t	f	t	0	4	3	1	\N	6	\N	0	231	\N	Pepita Azul	5-	\N	\N	\N	\N	2021-04-25 22:56:54.25493	2021-04-25 22:56:54.270799
116	t	f	t	0	0	2	1	0	1	\N	0	52	\N	Tripolar	6b+	\N	\N	\N	\N	2021-04-25 22:56:54.326308	2021-04-25 22:56:54.339864
117	t	f	t	0	0	2	1	0	2	\N	0	52	\N	Aurora	6b+	\N	\N	\N	\N	2021-04-25 22:56:54.391092	2021-04-25 22:56:54.404835
118	t	f	t	0	0	2	1	0	3	\N	0	52	\N	Virginie	6c	\N	\N	\N	\N	2021-04-25 22:56:54.451328	2021-04-25 22:56:54.482523
119	t	f	t	0	0	2	1	0	4	\N	0	52	\N	Diente Sikado	6b+	\N	\N	\N	\N	2021-04-25 22:56:54.543784	2021-04-25 22:56:54.55645
120	t	f	t	0	0	2	1	0	5	\N	0	52	\N	Las Señoritas no Existen	6c	\N	\N	\N	\N	2021-04-25 22:56:54.610693	2021-04-25 22:56:54.645129
121	t	f	t	0	0	2	1	0	6	\N	0	52	\N	Ze pequenho	6b	\N	\N	\N	\N	2021-04-25 22:56:54.736537	2021-04-25 22:56:54.755517
122	t	f	t	0	0	3	1	0	7	\N	0	52	\N	Ruta de Acceso	4-	\N	\N	\N	\N	2021-04-25 22:56:54.856082	2021-04-25 22:56:54.877331
123	t	f	t	0	0	1	1	0	1	\N	0	55	\N	Luchín	8b	\N	\N	\N	\N	2021-04-25 22:56:54.937501	2021-04-25 22:56:54.961154
74	f	f	t	0	0	2	1	0	\N	10	2	34	73	Viraje de Laucha	6a		6			2021-04-13 14:15:02.272835	2021-04-25 23:32:09.231441
124	t	f	t	0	0	1	1	0	2	\N	0	55	\N	Cristo Llegó	7c	\N	\N	\N	\N	2021-04-25 22:56:55.051685	2021-04-25 22:56:55.064661
125	t	f	t	0	0	1	1	0	1	\N	0	56	\N	Rigor Mortis	7c	\N	\N	\N	\N	2021-04-25 22:56:55.127385	2021-04-25 22:56:55.149315
126	t	f	t	0	0	1	1	0	2	\N	0	56	\N	Luchoca	7b+	\N	\N	\N	\N	2021-04-25 22:56:55.201858	2021-04-25 22:56:55.229323
127	t	f	t	0	0	1	1	0	3	\N	0	56	\N	Será po	7b+	\N	\N	\N	\N	2021-04-25 22:56:55.321321	2021-04-25 22:56:55.352573
128	t	f	t	0	0	1	1	0	4	\N	0	56	\N	Mañosín	7a+	\N	\N	\N	\N	2021-04-25 22:56:55.416542	2021-04-25 22:56:55.446109
129	t	f	t	0	0	1	1	0	1	\N	0	53	\N	Asikalador	8b	\N	\N	\N	\N	2021-04-25 22:56:55.529562	2021-04-25 22:56:55.549125
130	t	t	t	0	0	1	1	0	2	\N	0	53	\N	Acción Vital	7c+	\N	\N	\N	\N	2021-04-25 22:56:55.596577	2021-04-25 22:56:55.629951
131	t	f	t	0	0	1	1	0	3	\N	0	53	\N	Días y Vías	8a	\N	\N	\N	\N	2021-04-25 22:56:55.682449	2021-04-25 22:56:55.705337
132	t	f	t	0	0	1	1	0	1	\N	0	54	\N	Me Gustan Cuando Calla	8b	\N	\N	\N	\N	2021-04-25 22:56:55.762093	2021-04-25 22:56:55.775277
133	t	t	t	0	0	1	1	0	2	\N	0	54	\N	Si los Perros Ladran es porque Cabalgamos	8c	\N	\N	\N	\N	2021-04-25 22:56:55.822018	2021-04-25 22:56:55.84391
134	t	t	t	0	0	1	1	0	3	\N	0	54	\N	Herejía	8b+	\N	\N	\N	\N	2021-04-25 22:56:55.909322	2021-04-25 22:56:55.922203
135	t	f	t	0	0	1	1	0	4	\N	0	54	\N	Escaramujo	7c+	\N	\N	\N	\N	2021-04-25 22:56:55.969576	2021-04-25 22:56:55.983882
136	t	f	t	0	0	2	1	0	1	\N	0	40	\N	Zona de Incertidumbre	6b	\N	\N	\N	\N	2021-04-25 22:56:56.067091	2021-04-25 22:56:56.091712
137	t	f	t	0	0	2	1	0	2	\N	0	40	\N	Y tú Quien Eres	6c	\N	\N	\N	\N	2021-04-25 22:56:56.147452	2021-04-25 22:56:56.176835
138	t	f	t	0	0	2	1	0	3	\N	0	40	\N	Me da lo Mismo	6c	\N	\N	\N	\N	2021-04-25 22:56:56.236604	2021-04-25 22:56:56.249185
139	t	f	t	0	0	2	1	0	4	\N	0	40	\N	Esperanza	6+	\N	\N	\N	\N	2021-04-25 22:56:56.303886	2021-04-25 22:56:56.316276
140	t	f	t	0	0	2	1	0	5	\N	0	40	\N	Unknown	Unknown	\N	\N	\N	\N	2021-04-25 22:56:56.364651	2021-04-25 22:56:56.38037
141	t	t	t	0	0	1	1	1	1	\N	0	41	\N	Un Arranque Feroz	8a	\N	\N	\N	\N	2021-04-25 22:56:56.44497	2021-04-25 22:56:56.458518
142	t	t	t	0	0	1	1	1	2	\N	0	41	\N	La Pata del Diablo	7c+	\N	\N	\N	\N	2021-04-25 22:56:56.533261	2021-04-25 22:56:56.545113
143	t	t	t	0	0	1	1	1	3	\N	0	41	\N	Kamadi	7b+	\N	\N	\N	\N	2021-04-25 22:56:56.595179	2021-04-25 22:56:56.609179
144	t	t	t	0	0	1	1	1	4	\N	0	41	\N	Doble Discurso	7c+	\N	\N	\N	\N	2021-04-25 22:56:56.667217	2021-04-25 22:56:56.679774
145	t	f	t	0	0	1	1	1	5	\N	0	41	\N	La Pura Puntita	8a+	\N	\N	\N	\N	2021-04-25 22:56:56.754949	2021-04-25 22:56:56.767276
146	t	t	t	0	0	1	1	1	6	\N	0	41	\N	Don Nadie	7b	\N	\N	\N	\N	2021-04-25 22:56:56.813135	2021-04-25 22:56:56.825461
147	t	f	t	0	0	1	1	1	7	\N	0	41	\N	Hay que Pensarlo	6c	\N	\N	\N	\N	2021-04-25 22:56:56.871838	2021-04-25 22:56:56.884523
148	t	f	t	0	0	1	1	1	8	\N	0	41	\N	Menjunje	6c+	\N	\N	\N	\N	2021-04-25 22:56:56.929268	2021-04-25 22:56:56.94187
149	t	f	t	0	0	1	1	1	9	\N	0	41	\N	Con Permiso	6c	\N	\N	\N	\N	2021-04-25 22:56:56.98764	2021-04-25 22:56:57.002414
150	t	t	t	0	0	1	1	1	10	\N	0	41	\N	La Furia del Ermitaño	6b+	\N	\N	\N	\N	2021-04-25 22:56:57.048701	2021-04-25 22:56:57.065747
151	t	t	t	0	0	1	1	1	11	\N	0	41	\N	Hazme si Puedes	7b+	\N	\N	\N	\N	2021-04-25 22:56:57.112183	2021-04-25 22:56:57.12501
152	t	t	t	0	0	1	1	1	12	\N	0	41	\N	Puro Contacto	8c+	\N	\N	\N	\N	2021-04-25 22:56:57.215059	2021-04-25 22:56:57.227866
153	t	f	t	0	0	1	1	1	13	\N	0	41	\N	Contacto	8b+	\N	\N	\N	\N	2021-04-25 22:56:57.276091	2021-04-25 22:56:57.290007
154	t	f	t	0	0	1	1	1	14	\N	0	41	\N	Unknown	Unknown	\N	\N	\N	\N	2021-04-25 22:56:57.339249	2021-04-25 22:56:57.352654
155	t	f	t	0	0	1	1	1	15	\N	0	41	\N	Unknown	7c+	\N	\N	\N	\N	2021-04-25 22:56:57.39869	2021-04-25 22:56:57.427446
156	t	f	t	0	0	1	1	1	16	\N	0	41	\N	Unknown	Unknown	\N	\N	\N	\N	2021-04-25 22:56:57.478266	2021-04-25 22:56:57.4956
157	t	f	t	0	0	2	1	1	17	\N	0	41	\N	Unknown	Unknown	\N	\N	\N	\N	2021-04-25 22:56:57.555222	2021-04-25 22:56:57.572111
158	t	f	t	0	0	2	1	0	1	\N	0	42	\N	No Puedor	7b+	\N	\N	\N	\N	2021-04-25 22:56:57.626449	2021-04-25 22:56:57.656819
159	t	f	t	0	0	2	1	0	2	\N	0	42	\N	Queda Ud. Despedido	7a	\N	\N	\N	\N	2021-04-25 22:56:57.737317	2021-04-25 22:56:57.751499
160	t	t	t	0	0	2	1	0	3	\N	0	42	\N	No Mames Güei	6c	\N	\N	\N	\N	2021-04-25 22:56:57.840205	2021-04-25 22:56:57.853827
161	t	t	t	0	0	2	2	0	4	\N	0	42	\N	Pajeros en su Tinta	6b+	\N	\N	\N	\N	2021-04-25 22:56:57.9056	2021-04-25 22:56:57.919479
162	t	f	t	0	0	2	1	0	5	\N	0	42	\N	Karma	6a+	\N	\N	\N	\N	2021-04-25 22:56:57.989883	2021-04-25 22:56:58.002866
163	t	f	t	0	0	2	1	0	6	\N	0	42	\N	El Principicio	6c	\N	\N	\N	\N	2021-04-25 22:56:58.059368	2021-04-25 22:56:58.072531
164	t	f	t	0	0	2	1	0	7	\N	0	42	\N	Suplicio Chino	6c	\N	\N	\N	\N	2021-04-25 22:56:58.138125	2021-04-25 22:56:58.152108
165	t	t	t	0	0	2	1	0	8	\N	0	42	\N	Cabro Culiao	6b+	\N	\N	\N	\N	2021-04-25 22:56:58.206875	2021-04-25 22:56:58.221055
166	t	f	t	0	0	2	1	0	9	\N	0	42	\N	Sin Semilla	6c	\N	\N	\N	\N	2021-04-25 22:56:58.289707	2021-04-25 22:56:58.311444
167	t	f	t	0	0	2	1	0	10	\N	0	42	\N	Buena Tela	6b	\N	\N	\N	\N	2021-04-25 22:56:58.365078	2021-04-25 22:56:58.378156
168	t	f	t	0	0	2	1	0	11	\N	0	42	\N	Meteorito	6b	\N	\N	\N	\N	2021-04-25 22:56:58.42644	2021-04-25 22:56:58.439275
169	t	f	t	0	0	2	1	0	1	\N	0	43	\N	Unknown	6+	\N	\N	\N	\N	2021-04-25 22:56:58.513412	2021-04-25 22:56:58.526019
170	t	t	t	0	0	2	1	0	2	\N	0	43	\N	Cachupín	5+	\N	\N	\N	\N	2021-04-25 22:56:58.576086	2021-04-25 22:56:58.588893
171	t	f	t	0	0	2	1	0	3	\N	0	43	\N	Engendro	6b+	\N	\N	\N	\N	2021-04-25 22:56:58.652412	2021-04-25 22:56:58.665477
172	t	f	t	0	0	2	1	0	1	\N	0	44	\N	Eso no Mas	4-	\N	\N	\N	\N	2021-04-25 22:56:58.733172	2021-04-25 22:56:58.74521
173	t	f	t	0	0	2	1	0	2	\N	0	44	\N	Eso Menos	6a+	\N	\N	\N	\N	2021-04-25 22:56:58.797561	2021-04-25 22:56:58.813274
174	t	t	t	0	0	2	1	0	3	\N	0	44	\N	Cauto	7b	\N	\N	\N	\N	2021-04-25 22:56:58.879441	2021-04-25 22:56:58.98895
175	t	f	t	0	0	2	1	0	4	\N	0	44	\N	Blanca Nieves y los 7 Polvitos	8a+	\N	\N	\N	\N	2021-04-25 22:56:59.045875	2021-04-25 22:56:59.061616
176	t	t	t	0	0	2	1	0	5	\N	0	44	\N	Derremifasol	8a	\N	\N	\N	\N	2021-04-25 22:56:59.138617	2021-04-25 22:56:59.152252
177	t	t	t	0	0	2	1	0	6	\N	0	44	\N	Vuelo a Ciegas	7a+	\N	\N	\N	\N	2021-04-25 22:56:59.228504	2021-04-25 22:56:59.244809
178	t	f	t	0	0	2	1	0	7	\N	0	44	\N	Suerte de un Principiante	5+	\N	\N	\N	\N	2021-04-25 22:56:59.295915	2021-04-25 22:56:59.309356
179	t	f	t	0	0	2	1	0	8	\N	0	44	\N	Ruta Escuela	4+	\N	\N	\N	\N	2021-04-25 22:56:59.364431	2021-04-25 22:56:59.377811
180	t	f	t	0	0	2	1	0	9	\N	0	44	\N	Sin Permiso	7a+	\N	\N	\N	\N	2021-04-25 22:56:59.429506	2021-04-25 22:56:59.442607
181	t	f	t	0	0	2	1	0	10	\N	0	44	\N	La Cagué	6c+	\N	\N	\N	\N	2021-04-25 22:56:59.50562	2021-04-25 22:56:59.521292
182	t	f	t	0	0	2	1	0	11	\N	0	44	\N	Tal Cual	7a	\N	\N	\N	\N	2021-04-25 22:56:59.578053	2021-04-25 22:56:59.594799
183	t	f	t	0	0	2	1	0	1	\N	0	45	\N	Sexo Sentido	6c+	\N	\N	\N	\N	2021-04-25 22:56:59.652705	2021-04-25 22:56:59.673172
184	t	f	t	0	0	2	1	0	2	\N	0	45	\N	El Poder de la Mente	7c+	\N	\N	\N	\N	2021-04-25 22:56:59.733628	2021-04-25 22:56:59.756455
185	t	t	t	0	0	2	1	0	3	\N	0	45	\N	Emilio's Way	7b	\N	\N	\N	\N	2021-04-25 22:56:59.819934	2021-04-25 22:56:59.837576
186	t	t	t	0	0	2	1	0	4	\N	0	45	\N	Círculo Vicioso	7a	\N	\N	\N	\N	2021-04-25 22:56:59.896407	2021-04-25 22:56:59.909757
187	t	t	t	0	0	2	1	0	5	\N	0	45	\N	Um Araña	7b	\N	\N	\N	\N	2021-04-25 22:56:59.959155	2021-04-25 22:56:59.973719
188	t	f	t	0	0	2	1	0	6	\N	0	45	\N	E'no e'	7b	\N	\N	\N	\N	2021-04-25 22:57:00.031503	2021-04-25 22:57:00.04792
189	t	f	t	0	0	2	1	0	7	\N	0	45	\N	Vinchueca	6c+	\N	\N	\N	\N	2021-04-25 22:57:00.108007	2021-04-25 22:57:00.129396
190	t	f	t	0	0	2	1	0	8	\N	0	45	\N	Tripanosoma	6c	\N	\N	\N	\N	2021-04-25 22:57:00.186856	2021-04-25 22:57:00.204602
191	t	f	t	0	0	2	1	0	9	\N	0	45	\N	Mefisto	7b	\N	\N	\N	\N	2021-04-25 22:57:00.254454	2021-04-25 22:57:00.274997
192	t	f	t	0	0	2	1	0	1	\N	0	46	\N	Cuajinais	6b+	\N	\N	\N	\N	2021-04-25 22:57:00.34284	2021-04-25 22:57:00.357606
193	t	t	t	0	0	2	1	0	2	\N	0	46	\N	Barnabas Colins	6c+	\N	\N	\N	\N	2021-04-25 22:57:00.394328	2021-04-25 22:57:00.409082
194	t	t	t	0	0	2	1	0	3	\N	0	46	\N	Por la Boca Muere el Pez	7a	\N	\N	\N	\N	2021-04-25 22:57:00.464466	2021-04-25 22:57:00.481146
195	t	f	t	0	0	2	1	0	4	\N	0	46	\N	Gato por Liebre	6c+	\N	\N	\N	\N	2021-04-25 22:57:00.54946	2021-04-25 22:57:00.565467
196	t	f	t	0	0	1	1	0	5	\N	0	46	\N	Poseidón	7b	\N	\N	\N	\N	2021-04-25 22:57:00.635389	2021-04-25 22:57:00.648348
197	t	f	t	0	0	1	1	0	6	\N	0	46	\N	Nosferatus	7a	\N	\N	\N	\N	2021-04-25 22:57:00.741766	2021-04-25 22:57:00.777154
198	t	f	t	0	0	1	1	0	7	\N	0	46	\N	Tango del Chango	7a+	\N	\N	\N	\N	2021-04-25 22:57:00.863758	2021-04-25 22:57:00.877558
199	t	f	t	0	0	2	1	0	1	\N	0	47	\N	Tótem	6a	\N	\N	\N	\N	2021-04-25 22:57:00.934384	2021-04-25 22:57:00.94803
200	t	t	t	0	0	1	1	0	2	\N	0	47	\N	Capeta	6c	\N	\N	\N	\N	2021-04-25 22:57:01.013414	2021-04-25 22:57:01.030626
201	t	f	t	0	0	1	1	0	3	\N	0	47	\N	Presagios	7b+	\N	\N	\N	\N	2021-04-25 22:57:01.08136	2021-04-25 22:57:01.101853
202	t	t	t	0	0	1	1	0	4	\N	0	47	\N	Simpatía por el Diablo	7c+	\N	\N	\N	\N	2021-04-25 22:57:01.167088	2021-04-25 22:57:01.187313
203	t	t	t	0	0	1	1	0	5	\N	0	47	\N	Maleficio	7a+	\N	\N	\N	\N	2021-04-25 22:57:01.240414	2021-04-25 22:57:01.258673
204	t	f	t	0	0	3	1	0	6	\N	0	47	\N	Unknown	6a	\N	\N	\N	\N	2021-04-25 22:57:01.323876	2021-04-25 22:57:01.349354
205	t	f	t	0	0	3	1	0	7	\N	0	47	\N	Unknown	6a	\N	\N	\N	\N	2021-04-25 22:57:01.411944	2021-04-25 22:57:01.425996
206	t	f	t	0	0	2	1	0	1	\N	0	48	\N	La Burla	6a	\N	\N	\N	\N	2021-04-25 22:57:01.479911	2021-04-25 22:57:01.500755
207	t	f	t	0	0	2	1	0	2	\N	0	48	\N	Felix el Chato	6a	\N	\N	\N	\N	2021-04-25 22:57:01.580497	2021-04-25 22:57:01.600594
208	t	f	t	0	0	2	1	0	3	\N	0	48	\N	Plan Z	6a+	\N	\N	\N	\N	2021-04-25 22:57:01.659485	2021-04-25 22:57:01.673079
209	t	f	t	0	0	2	1	0	4	\N	0	48	\N	Unknown	6a	\N	\N	\N	\N	2021-04-25 22:57:01.732437	2021-04-25 22:57:01.757148
210	t	f	t	0	0	2	1	0	5	\N	0	48	\N	Unknown	6a	\N	\N	\N	\N	2021-04-25 22:57:01.819527	2021-04-25 22:57:01.836054
211	t	f	t	0	0	1	1	0	1	\N	0	57	\N	Equipatrón	8?	\N	\N	\N	\N	2021-04-25 22:57:01.891954	2021-04-25 22:57:01.906678
212	t	f	t	0	0	1	1	0	2	\N	0	57	\N	El Porfiado de Parral	7b	\N	\N	\N	\N	2021-04-25 22:57:01.95632	2021-04-25 22:57:01.975015
213	t	\N	t	0	0	2	1	0	1	\N	0	58	\N	Unknown	6a	\N	\N	\N	\N	2021-04-25 22:57:02.03629	2021-04-25 22:57:02.062917
214	t	\N	t	0	0	2	1	0	2	\N	0	58	\N	Rodilla de Bronce	6a	\N	\N	\N	\N	2021-04-25 22:57:02.154334	2021-04-25 22:57:02.168749
215	t	\N	t	0	0	2	1	0	3	\N	0	58	\N	Pimienta y Merquén	6a	\N	\N	\N	\N	2021-04-25 22:57:02.24492	2021-04-25 22:57:02.260713
216	t	\N	t	0	0	2	1	0	1	\N	0	59	\N	Su Majestad el Jerry	6c+	\N	\N	\N	\N	2021-04-25 22:57:02.338407	2021-04-25 22:57:02.351877
217	t	\N	t	0	0	2	1	0	2	\N	0	59	\N	El Especialista	7c	\N	\N	\N	\N	2021-04-25 22:57:02.422645	2021-04-25 22:57:02.443179
218	t	\N	t	0	0	2	1	0	3	\N	0	59	\N	Proyecto Cristóbal	Proyecto	\N	\N	\N	\N	2021-04-25 22:57:02.514241	2021-04-25 22:57:02.554688
219	t	\N	t	0	0	2	1	0	4	\N	0	59	\N	Control Machete	7a+	\N	\N	\N	\N	2021-04-25 22:57:02.605097	2021-04-25 22:57:02.623313
220	t	\N	t	0	0	2	1	0	5	\N	0	59	\N	Be Water	6c	\N	\N	\N	\N	2021-04-25 22:57:02.677121	2021-04-25 22:57:02.693882
221	t	\N	t	0	0	2	1	0	6	\N	0	59	\N	Se Vino	6b+	\N	\N	\N	\N	2021-04-25 22:57:02.748996	2021-04-25 22:57:02.768046
222	t	\N	t	0	0	2	1	0	7	\N	0	59	\N	La Escandalosa	6c+	\N	\N	\N	\N	2021-04-25 22:57:02.840967	2021-04-25 22:57:02.858711
223	t	\N	t	0	0	1	1	0	1	\N	0	60	\N	Capitán Cavernícola	7a+/b	\N	\N	\N	\N	2021-04-25 22:57:02.931535	2021-04-25 22:57:02.945615
224	t	\N	t	0	0	1	1	0	2	\N	0	60	\N	Humosapiens	7b+/c	\N	\N	\N	\N	2021-04-25 22:57:03.081252	2021-04-25 22:57:03.098539
225	t	\N	t	0	0	1	1	0	3	\N	0	60	\N	Pica Aquí Pica Acá Pica Flor	Proyecto	\N	\N	\N	\N	2021-04-25 22:57:03.165602	2021-04-25 22:57:03.179009
226	t	\N	t	0	0	1	1	0	4	\N	0	60	\N	Obsesión	Proyecto	\N	\N	\N	\N	2021-04-25 22:57:03.234406	2021-04-25 22:57:03.248575
227	t	\N	t	0	0	1	1	0	5	\N	0	60	\N	Emoushooon	7c/+	\N	\N	\N	\N	2021-04-25 22:57:03.302927	2021-04-25 22:57:03.315625
228	t	\N	t	0	0	1	1	0	6	\N	0	60	\N	Cuatrero	Proyecto	\N	\N	\N	\N	2021-04-25 22:57:03.381339	2021-04-25 22:57:03.404991
229	t	\N	t	0	0	1	1	0	7	\N	0	60	\N	Variante Cuatrero	Proyecto	\N	\N	\N	\N	2021-04-25 22:57:03.475017	2021-04-25 22:57:03.488902
230	t	\N	t	0	0	1	1	0	8	\N	0	60	\N	Ruta del Juanjo	8a	\N	\N	\N	\N	2021-04-25 22:57:03.557327	2021-04-25 22:57:03.575204
231	t	\N	t	0	0	2	1	1	1	\N	0	61	\N	Colódromo	6a	\N	\N	\N	\N	2021-04-25 22:57:03.651224	2021-04-25 22:57:03.667143
232	t	\N	t	0	0	2	1	1	2	\N	0	61	\N	Paranoia	6c+	\N	\N	\N	\N	2021-04-25 22:57:03.719057	2021-04-25 22:57:03.732915
233	t	\N	t	0	0	2	1	1	3	\N	0	61	\N	Esquizofrenia	6c	\N	\N	\N	\N	2021-04-25 22:57:03.807507	2021-04-25 22:57:03.824709
234	t	\N	t	0	0	2	1	1	4	\N	0	61	\N	Anchimaprens	6c	\N	\N	\N	\N	2021-04-25 22:57:03.893202	2021-04-25 22:57:03.910251
235	t	\N	t	0	0	2	1	1	5	\N	0	61	\N	Con olor a Once	6c	\N	\N	\N	\N	2021-04-25 22:57:03.96801	2021-04-25 22:57:03.981605
236	t	\N	t	0	0	2	1	1	1	\N	0	62	\N	De Kiruza	7c	\N	\N	\N	\N	2021-04-25 22:57:04.045764	2021-04-25 22:57:04.068628
237	t	\N	t	0	0	2	1	1	2	\N	0	62	\N	Topo Gigio	6a	\N	\N	\N	\N	2021-04-25 22:57:04.160622	2021-04-25 22:57:04.173928
238	t	\N	t	0	0	2	1	1	1	\N	0	63	\N	Todo por Nada	5+	\N	\N	\N	\N	2021-04-25 22:57:04.231148	2021-04-25 22:57:04.244774
239	t	\N	t	0	0	2	1	1	2	\N	0	63	\N	Copihue	7a	\N	\N	\N	\N	2021-04-25 22:57:04.312835	2021-04-25 22:57:04.325283
240	t	\N	t	0	0	2	1	1	3	\N	0	63	\N	Michelín	7a	\N	\N	\N	\N	2021-04-25 22:57:04.38685	2021-04-25 22:57:04.41717
241	t	\N	t	0	0	2	1	1	1	\N	0	64	\N	Marullo	8a+	\N	\N	\N	\N	2021-04-25 22:57:04.477346	2021-04-25 22:57:04.513297
242	t	\N	t	0	0	2	1	1	2	\N	0	64	\N	Luna Roja	6c+	\N	\N	\N	\N	2021-04-25 22:57:04.574061	2021-04-25 22:57:04.590337
243	t	\N	t	0	0	2	1	1	3	\N	0	64	\N	Macho Man	7a	\N	\N	\N	\N	2021-04-25 22:57:04.640822	2021-04-25 22:57:04.654518
244	t	\N	t	0	0	2	1	1	4	\N	0	64	\N	El Cartucho	7b	\N	\N	\N	\N	2021-04-25 22:57:04.709707	2021-04-25 22:57:04.735851
245	t	\N	t	0	0	2	1	1	5	\N	0	64	\N	Adicción	7a+	\N	\N	\N	\N	2021-04-25 22:57:04.815729	2021-04-25 22:57:04.833194
246	t	\N	t	0	0	2	1	1	6	\N	0	64	\N	El Escultor	7b+	\N	\N	\N	\N	2021-04-25 22:57:04.911485	2021-04-25 22:57:04.930839
247	t	\N	t	0	0	2	1	1	7	\N	0	64	\N	Entre Cejas	7c+	\N	\N	\N	\N	2021-04-25 22:57:04.996618	2021-04-25 22:57:05.010365
248	t	t	t	0	0	2	1	1	8	\N	0	64	\N	Manjar de Dedos	7c	\N	\N	\N	\N	2021-04-25 22:57:05.074967	2021-04-25 22:57:05.113888
249	t	t	t	0	0	2	1	1	9	\N	0	64	\N	Hidrofobia	7a+	\N	\N	\N	\N	2021-04-25 22:57:05.204297	2021-04-25 22:57:05.221276
250	t	t	t	0	0	2	1	1	1	\N	0	65	\N	Tu Hermana	7a	\N	\N	\N	\N	2021-04-25 22:57:05.27522	2021-04-25 22:57:05.290973
251	t	\N	t	0	0	1	1	1	2	\N	0	65	\N	El Araucano	7c	\N	\N	\N	\N	2021-04-25 22:57:05.355276	2021-04-25 22:57:05.374232
557	t	f	t	0	0	2	1	0	1	\N	0	117	\N	Escuela 1	5-	\N	\N	\N	\N	2021-04-25 22:57:32.050314	2021-04-29 17:22:49.858642
252	t	t	t	0	0	1	1	1	3	\N	0	65	\N	Leproso	7a+	\N	\N	\N	\N	2021-04-25 22:57:05.436036	2021-04-25 22:57:05.452417
253	t	t	t	0	0	1	1	1	4	\N	0	65	\N	Popeye	6c	\N	\N	\N	\N	2021-04-25 22:57:05.513646	2021-04-25 22:57:05.537252
254	t	t	t	0	0	2	1	1	1	\N	0	66	\N	Tutti Fruti	6b	\N	\N	\N	\N	2021-04-25 22:57:05.634938	2021-04-25 22:57:05.650301
255	t	t	t	0	0	2	1	1	2	\N	0	66	\N	La Fogata	6a	\N	\N	\N	\N	2021-04-25 22:57:05.717117	2021-04-25 22:57:05.738201
256	t	t	t	0	0	2	1	1	3	\N	0	66	\N	Venus	6b+	\N	\N	\N	\N	2021-04-25 22:57:05.799563	2021-04-25 22:57:05.813104
257	t	t	t	0	0	2	1	1	4	\N	0	66	\N	Mamagallo	6a+	\N	\N	\N	\N	2021-04-25 22:57:05.882007	2021-04-25 22:57:05.895505
258	t	t	t	0	0	2	1	1	5	\N	0	66	\N	La Peta	6a+	\N	\N	\N	\N	2021-04-25 22:57:05.951058	2021-04-25 22:57:05.973156
259	t	t	t	0	0	2	1	1	6	\N	0	66	\N	Espirales	6b+	\N	\N	\N	\N	2021-04-25 22:57:06.046827	2021-04-25 22:57:06.059824
260	t	t	t	0	0	2	1	1	7	\N	0	66	\N	Icaro	6c+	\N	\N	\N	\N	2021-04-25 22:57:06.133562	2021-04-25 22:57:06.155152
261	t	t	t	0	0	2	1	1	8	\N	0	66	\N	Cochero Pare	6c	\N	\N	\N	\N	2021-04-25 22:57:06.213556	2021-04-25 22:57:06.242197
262	t	t	t	0	0	2	1	1	9	\N	0	66	\N	X Nada hacia la Eternidad	6c	\N	\N	\N	\N	2021-04-25 22:57:06.296798	2021-04-25 22:57:06.310375
263	t	t	t	0	0	2	1	1	10	\N	0	66	\N	Alucinaciones	6c	\N	\N	\N	\N	2021-04-25 22:57:06.366199	2021-04-25 22:57:06.381578
264	t	t	t	0	0	2	1	1	11	\N	0	66	\N	Sambomba	6c	\N	\N	\N	\N	2021-04-25 22:57:06.433619	2021-04-25 22:57:06.449264
265	t	t	t	0	0	2	1	1	12	\N	0	66	\N	Ocho Pinocho	6c	\N	\N	\N	\N	2021-04-25 22:57:06.510413	2021-04-25 22:57:06.525603
266	t	t	t	0	0	2	1	1	13	\N	0	66	\N	Exponencial	5+	\N	\N	\N	\N	2021-04-25 22:57:06.61466	2021-04-25 22:57:06.628933
267	t	\N	t	0	0	2	1	1	1	\N	0	67	\N	Estrecho de Magallanes	4+	\N	\N	\N	\N	2021-04-25 22:57:06.686053	2021-04-25 22:57:06.699526
268	t	\N	t	0	0	2	1	1	2	\N	0	67	\N	Principiante	4-	\N	\N	\N	\N	2021-04-25 22:57:06.79817	2021-04-25 22:57:06.813041
269	t	\N	t	0	0	2	1	1	3	\N	0	67	\N	Sueños Catabáticos	6a	\N	\N	\N	\N	2021-04-25 22:57:06.864576	2021-04-25 22:57:06.889271
270	t	\N	t	0	0	2	1	1	4	\N	0	67	\N	Ratonil	5+	\N	\N	\N	\N	2021-04-25 22:57:06.99719	2021-04-25 22:57:07.010245
271	t	\N	t	0	0	2	1	1	5	\N	0	67	\N	Inspiraciones	5+ (A1)	\N	\N	\N	\N	2021-04-25 22:57:07.079693	2021-04-25 22:57:07.099604
272	t	\N	t	0	0	1	1	1	6	\N	0	67	\N	Quetzal	8a	\N	\N	\N	\N	2021-04-25 22:57:07.172283	2021-04-25 22:57:07.187705
273	t	\N	t	0	0	1	1	1	7	\N	0	67	\N	Capitán Pingaloca	7b+	\N	\N	\N	\N	2021-04-25 22:57:07.254567	2021-04-25 22:57:07.26801
274	t	\N	t	0	0	1	1	1	8	\N	0	67	\N	Geisha	7a	\N	\N	\N	\N	2021-04-25 22:57:07.322369	2021-04-25 22:57:07.337511
275	t	\N	t	0	0	2	1	1	9	\N	0	67	\N	Presto	6b+	\N	\N	\N	\N	2021-04-25 22:57:07.391875	2021-04-25 22:57:07.410853
276	t	\N	t	0	0	2	1	1	10	\N	0	67	\N	Metoluis	6b	\N	\N	\N	\N	2021-04-25 22:57:07.481826	2021-04-25 22:57:07.496472
277	t	\N	t	0	0	3	1	1	11	\N	0	67	\N	Constelaciones	5+	\N	\N	\N	\N	2021-04-25 22:57:07.5651	2021-04-25 22:57:07.585408
278	t	\N	t	0	0	3	1	1	12	\N	0	67	\N	Pajaritos	5-	\N	\N	\N	\N	2021-04-25 22:57:07.674889	2021-04-25 22:57:07.697699
279	t	\N	t	0	0	3	2	1	13	\N	0	67	\N	Ruta Escuela	4+	\N	\N	\N	\N	2021-04-25 22:57:07.756629	2021-04-25 22:57:07.768967
280	t	\N	t	0	0	3	2	1	14	\N	0	67	\N	Ruta Escuela	4+	\N	\N	\N	\N	2021-04-25 22:57:07.85276	2021-04-25 22:57:07.872022
281	t	\N	t	0	0	2	1	0	1	\N	0	68	\N	Sopla Hoyo	6-	\N	\N	\N	\N	2021-04-25 22:57:07.938832	2021-04-25 22:57:07.960656
282	t	\N	t	0	0	2	1	0	2	\N	0	68	\N	Papel con Caca	6+	\N	\N	\N	\N	2021-04-25 22:57:08.027962	2021-04-25 22:57:08.047398
283	t	\N	t	0	0	2	1	0	3	\N	0	68	\N	Trabajo Manual	6-	\N	\N	\N	\N	2021-04-25 22:57:08.111459	2021-04-25 22:57:08.124507
284	t	\N	t	0	0	2	1	0	4	\N	0	68	\N	Ortigazo en la Ingle	6a	\N	\N	\N	\N	2021-04-25 22:57:08.214126	2021-04-25 22:57:08.228327
285	t	\N	t	0	0	2	1	0	5	\N	0	68	\N	La mas Larga	6a+	\N	\N	\N	\N	2021-04-25 22:57:08.274344	2021-04-25 22:57:08.287705
286	t	\N	t	0	0	2	1	0	6	\N	0	68	\N	Cicciolina	6b	\N	\N	\N	\N	2021-04-25 22:57:08.337617	2021-04-25 22:57:08.355858
287	t	\N	t	0	0	2	1	0	7	\N	0	68	\N	Sport Detroit	6b/6b+	\N	\N	\N	\N	2021-04-25 22:57:08.40557	2021-04-25 22:57:08.435699
288	t	t	t	0	0	2	1	0	8	\N	0	68	\N	TPN3	6c+	\N	\N	\N	\N	2021-04-25 22:57:08.499632	2021-04-25 22:57:08.514346
289	t	t	t	0	0	1	1	0	1	\N	0	69	\N	Cuático	7a	\N	\N	\N	\N	2021-04-25 22:57:08.584463	2021-04-25 22:57:08.600185
290	t	t	t	0	0	0	1	0	2	\N	0	69	\N	Penetreitor	7c	\N	\N	\N	\N	2021-04-25 22:57:08.657425	2021-04-25 22:57:08.678764
291	t	t	t	0	0	2	1	0	3	\N	0	69	\N	Hoy no se Fía	7a	\N	9+2	\N	\N	2021-04-25 22:57:08.730067	2021-04-25 22:57:08.742567
292	t	t	t	0	0	1	1	0	4	\N	0	69	\N	Camino de Tierra	7a	\N	\N	\N	\N	2021-04-25 22:57:08.794743	2021-04-25 22:57:08.816188
293	t	t	t	0	0	2	1	0	5	\N	0	69	\N	Factor Polvo	6c+	\N	7+2	\N	\N	2021-04-25 22:57:08.868452	2021-04-25 22:57:08.88949
294	t	t	t	0	0	2	1	0	6	\N	0	69	\N	Patanes	6c	\N	6+2	\N	\N	2021-04-25 22:57:08.944078	2021-04-25 22:57:08.958509
295	t	f	t	0	0	2	1	0	7	\N	0	69	\N	Combo en lo Hocico	6a	\N	6+2	\N	\N	2021-04-25 22:57:09.015458	2021-04-25 22:57:09.029937
296	t	f	t	0	0	3	1	0	8	\N	0	69	\N	Escurre Machucao	5-	\N	\N	\N	\N	2021-04-25 22:57:09.092404	2021-04-25 22:57:09.108895
297	t	f	t	0	0	2	1	0	1	\N	0	70	\N	Bicho Psicótico	5+	\N	\N	\N	\N	2021-04-25 22:57:09.224768	2021-04-25 22:57:09.238439
298	t	f	t	0	0	2	1	0	2	\N	0	70	\N	Gases del Orificio	6a	\N	\N	\N	\N	2021-04-25 22:57:09.29455	2021-04-25 22:57:09.308031
299	t	f	t	0	0	2	1	0	3	\N	0	70	\N	Maca Conceptual	6a	\N	\N	\N	\N	2021-04-25 22:57:09.387914	2021-04-25 22:57:09.40054
300	t	f	t	0	0	2	1	0	4	\N	0	70	\N	Piola	6a	\N	\N	\N	\N	2021-04-25 22:57:09.449884	2021-04-25 22:57:09.488042
301	t	f	t	0	0	2	1	0	5	\N	0	70	\N	Chaucha	6b+	\N	\N	\N	\N	2021-04-25 22:57:09.556691	2021-04-25 22:57:09.569491
302	t	f	t	0	0	2	1	0	6	\N	0	70	\N	La Ley del Chico	5+	\N	\N	\N	\N	2021-04-25 22:57:09.613513	2021-04-25 22:57:09.625926
303	t	f	t	0	0	2	1	0	7	\N	0	70	\N	Voy y Vuelvo	6a+	\N	\N	\N	\N	2021-04-25 22:57:09.696004	2021-04-25 22:57:09.74401
304	t	t	t	0	0	2	1	0	8	\N	0	70	\N	Camboyanas Party	6a	\N	\N	\N	\N	2021-04-25 22:57:09.85366	2021-04-25 22:57:09.877314
305	t	f	t	0	0	2	1	0	9	\N	0	70	\N	Quiltro Virtual	6c+	\N	\N	\N	\N	2021-04-25 22:57:09.936119	2021-04-25 22:57:09.948873
306	t	f	t	0	0	2	1	0	1	\N	0	71	\N	Vía Crucis	6b+	\N	\N	\N	\N	2021-04-25 22:57:10.028465	2021-04-25 22:57:10.041735
307	t	t	t	0	0	2	1	0	2	\N	0	71	\N	Delirio Hemorroidal	5+	\N	\N	\N	\N	2021-04-25 22:57:10.111688	2021-04-25 22:57:10.139975
308	t	f	t	0	0	2	1	0	3	\N	0	71	\N	Ipso Facto	6c	\N	\N	\N	\N	2021-04-25 22:57:10.202789	2021-04-25 22:57:10.21652
309	t	f	t	0	0	2	1	0	4	\N	0	71	\N	Potencia Fatal	5-	\N	\N	\N	\N	2021-04-25 22:57:10.267438	2021-04-25 22:57:10.284015
310	t	f	t	0	0	2	1	0	5	\N	0	71	\N	Ultra Carnaza	5-	\N	\N	\N	\N	2021-04-25 22:57:10.345446	2021-04-25 22:57:10.359928
311	t	f	t	0	0	2	1	0	1	\N	0	72	\N	El Minotauro Fifón	6a	\N	\N	\N	\N	2021-04-25 22:57:10.451774	2021-04-25 22:57:10.479769
312	t	t	t	0	0	2	1	0	2	\N	0	72	\N	Directa Marmol	7c	\N	\N	\N	\N	2021-04-25 22:57:10.581955	2021-04-25 22:57:10.596782
313	t	t	t	0	0	2	1	0	3	\N	0	72	\N	Plop	6c	\N	\N	\N	\N	2021-04-25 22:57:10.662805	2021-04-25 22:57:10.676061
314	t	f	t	0	0	2	1	0	4	\N	0	72	\N	Kamasutra	6c	\N	\N	\N	\N	2021-04-25 22:57:10.727217	2021-04-25 22:57:10.743999
315	t	f	t	0	0	2	1	0	5	\N	0	72	\N	El Enano Quiere Nabo	6c	\N	\N	\N	\N	2021-04-25 22:57:10.813896	2021-04-25 22:57:10.828765
316	t	f	t	0	0	3	1	0	1	\N	0	73	\N	Escuela	5-	\N	\N	\N	\N	2021-04-25 22:57:10.90268	2021-04-25 22:57:10.934692
317	t	f	t	0	0	3	1	0	2	\N	0	73	\N	Wena Natty	5+	\N	\N	\N	\N	2021-04-25 22:57:11.016913	2021-04-25 22:57:11.029643
318	t	f	t	0	0	3	1	0	3	\N	0	73	\N	Gohan	5+	\N	\N	\N	\N	2021-04-25 22:57:11.085354	2021-04-25 22:57:11.098614
319	t	f	t	0	0	3	1	0	4	\N	0	73	\N	Gato Callejero	5+	\N	\N	\N	\N	2021-04-25 22:57:11.174555	2021-04-25 22:57:11.188012
320	t	f	t	0	0	3	3	0	5	\N	0	73	\N	La Petarda	5+	\N	\N	\N	\N	2021-04-25 22:57:11.252143	2021-04-25 22:57:11.266385
321	t	f	t	0	0	3	1	0	6	\N	0	73	\N	Escuelita II	5-	\N	\N	\N	\N	2021-04-25 22:57:11.33919	2021-04-25 22:57:11.3533
322	t	f	t	0	0	3	1	0	7	\N	0	73	\N	Escuelita I	4+	\N	\N	\N	\N	2021-04-25 22:57:11.43076	2021-04-25 22:57:11.444763
323	t	f	t	0	0	3	2	0	8	\N	0	73	\N	Marmo	6a	\N	\N	\N	\N	2021-04-25 22:57:11.503484	2021-04-25 22:57:11.522645
324	t	f	t	0	0	3	3	0	9	\N	0	73	\N	De Todo CSM	6a+	\N	\N	\N	\N	2021-04-25 22:57:11.579779	2021-04-25 22:57:11.5936
325	t	f	t	0	0	3	1	0	10	\N	0	73	\N	Duende Garrapata	6a	\N	\N	\N	\N	2021-04-25 22:57:11.640294	2021-04-25 22:57:11.656321
326	t	f	t	0	0	3	1	0	11	\N	0	73	\N	Los Deligüentes	6a	\N	\N	\N	\N	2021-04-25 22:57:11.720308	2021-04-25 22:57:11.746789
327	t	f	t	0	0	3	1	0	12	\N	0	73	\N	Unknown	3+	\N	\N	\N	\N	2021-04-25 22:57:11.814544	2021-04-25 22:57:11.828385
328	t	f	t	0	0	3	1	0	13	\N	0	73	\N	Unknown	3+	\N	\N	\N	\N	2021-04-25 22:57:11.92166	2021-04-25 22:57:11.94527
329	t	t	t	0	0	2	1	0	1	\N	0	75	\N	Unknown	6a+	\N	\N	\N	\N	2021-04-25 22:57:12.029925	2021-04-25 22:57:12.069197
330	t	t	t	0	0	2	1	0	2	\N	0	75	\N	El Sacramento	6c+	\N	\N	\N	\N	2021-04-25 22:57:12.16418	2021-04-25 22:57:12.177099
331	t	f	t	0	0	2	1	0	3	\N	0	75	\N	El Petit Paradis	6b+	\N	\N	\N	\N	2021-04-25 22:57:12.237471	2021-04-25 22:57:12.261232
332	t	f	t	0	0	3	1	0	1	\N	0	76	\N	Primeros Pasos	4+	\N	\N	\N	\N	2021-04-25 22:57:12.330494	2021-04-25 22:57:12.348965
333	t	f	t	0	0	3	1	0	2	\N	0	76	\N	Next Step	5-	\N	\N	\N	\N	2021-04-25 22:57:12.419181	2021-04-25 22:57:12.454183
334	t	f	t	0	0	3	1	0	3	\N	0	76	\N	Bailando al Sol	5-	\N	\N	\N	\N	2021-04-25 22:57:12.522052	2021-04-25 22:57:12.545221
335	t	f	t	0	0	3	1	0	4	\N	0	76	\N	Mon Amour	5-	\N	\N	\N	\N	2021-04-25 22:57:12.599123	2021-04-25 22:57:12.613541
336	t	\N	t	0	0	1	1	0	1	\N	0	77	\N	Café París	7c+	\N	\N	\N	\N	2021-04-25 22:57:12.709538	2021-04-25 22:57:12.733279
337	t	\N	t	0	0	1	1	0	2	\N	0	77	\N	Rumba	7b	\N	\N	\N	\N	2021-04-25 22:57:12.833019	2021-04-25 22:57:12.848076
338	t	\N	t	0	0	1	1	0	3	\N	0	77	\N	La Sonrisa de Monalisa	6b+	\N	\N	\N	\N	2021-04-25 22:57:12.911747	2021-04-25 22:57:12.928144
339	t	\N	t	0	0	1	1	0	4	\N	0	77	\N	El Jorobado	6a+	\N	\N	\N	\N	2021-04-25 22:57:12.99562	2021-04-25 22:57:13.012505
340	t	\N	t	0	0	1	1	0	5	\N	0	77	\N	Unknown	Unknown	\N	\N	\N	\N	2021-04-25 22:57:13.100351	2021-04-25 22:57:13.126255
341	t	t	t	0	0	3	1	0	1	\N	0	78	\N	Tay Vivo Lui	6a+	\N	\N	\N	\N	2021-04-25 22:57:13.214054	2021-04-25 22:57:13.261143
342	t	t	t	0	0	3	1	0	2	\N	0	78	\N	Abril Cogoyos Mil y un Poco de Adrenalina	6b	\N	\N	\N	\N	2021-04-25 22:57:13.326074	2021-04-25 22:57:13.349841
343	t	t	t	0	0	3	1	0	3	\N	0	78	\N	La Boleadora	6a+	\N	\N	\N	\N	2021-04-25 22:57:13.416065	2021-04-25 22:57:13.43216
344	t	t	t	0	0	3	1	0	4	\N	0	78	\N	Unknown	Unknown	\N	\N	\N	\N	2021-04-25 22:57:13.497783	2021-04-25 22:57:13.517143
345	t	t	t	0	0	3	1	0	5	\N	0	78	\N	Unknown	6b+	\N	\N	\N	\N	2021-04-25 22:57:13.574434	2021-04-25 22:57:13.590475
346	t	f	t	0	0	3	1	0	6	\N	0	78	\N	Unknown	6c	\N	\N	\N	\N	2021-04-25 22:57:13.666081	2021-04-25 22:57:13.680486
347	t	t	t	0	0	2	1	0	1	\N	0	79	\N	Jalapeños del Infierno	7c	\N	\N	\N	\N	2021-04-25 22:57:13.74155	2021-04-25 22:57:13.761621
348	t	t	t	0	0	2	1	0	2	\N	0	79	\N	Unknown	7c	\N	\N	\N	\N	2021-04-25 22:57:13.826206	2021-04-25 22:57:13.839733
349	t	t	t	0	0	2	1	0	3	\N	0	79	\N	Siganme los Buenos	7a	\N	\N	\N	\N	2021-04-25 22:57:13.891163	2021-04-25 22:57:13.905123
350	t	t	t	0	0	2	1	0	1	\N	0	80	\N	Mujeres al Poder	7b	\N	\N	\N	\N	2021-04-25 22:57:13.97429	2021-04-25 22:57:13.988318
351	t	t	t	0	0	2	1	0	2	\N	0	80	\N	Hombres Topos en tu Casa	7a+	\N	\N	\N	\N	2021-04-25 22:57:14.038204	2021-04-25 22:57:14.061114
352	t	f	t	0	0	2	1	0	3	\N	0	80	\N	Unknown	6c+	\N	\N	\N	\N	2021-04-25 22:57:14.117391	2021-04-25 22:57:14.129235
353	t	f	t	0	0	1	1	0	4	\N	0	80	\N	Butterfly On Fire	8-	\N	\N	\N	\N	2021-04-25 22:57:14.198819	2021-04-25 22:57:14.213351
354	t	f	t	0	0	1	1	0	5	\N	0	80	\N	Capitán Tapioca	7c	\N	\N	\N	\N	2021-04-25 22:57:14.272136	2021-04-25 22:57:14.286357
355	t	f	t	0	0	1	1	0	1	\N	0	81	\N	Puta Mafia	7a	\N	\N	\N	\N	2021-04-25 22:57:14.346184	2021-04-25 22:57:14.359698
356	t	f	t	0	0	1	1	0	2	\N	0	81	\N	Unknown	Unknown	\N	\N	\N	\N	2021-04-25 22:57:14.428093	2021-04-25 22:57:14.441625
357	t	f	t	0	0	1	1	0	3	\N	0	81	\N	Directo a Canada	7b+	\N	\N	\N	\N	2021-04-25 22:57:14.495692	2021-04-25 22:57:14.509236
358	t	f	t	0	0	1	1	0	4	\N	0	81	\N	Unknown	Unknown	\N	\N	\N	\N	2021-04-25 22:57:14.599791	2021-04-25 22:57:14.613331
359	t	f	t	0	0	2	1	0	1	\N	0	82	\N	Unknown	6b	\N	\N	\N	\N	2021-04-25 22:57:14.67229	2021-04-25 22:57:14.686062
360	t	f	t	0	0	2	1	0	2	\N	0	82	\N	Unknown	Unknown	\N	\N	\N	\N	2021-04-25 22:57:14.749452	2021-04-25 22:57:14.76686
361	t	f	t	0	0	2	1	0	3	\N	0	82	\N	Unknown	Unknown	\N	\N	\N	\N	2021-04-25 22:57:14.825499	2021-04-25 22:57:14.845877
362	t	t	t	0	0	0	2	0	4	\N	0	82	\N	Contratiempo	7b+	\N	\N	\N	\N	2021-04-25 22:57:14.894801	2021-04-25 22:57:14.908837
363	t	t	t	0	0	2	4	1	1	\N	0	83	\N	Happy Hour	6b	\N	17	\N	\N	2021-04-25 22:57:14.979719	2021-04-25 22:57:14.994793
364	t	f	t	0	0	3	4	1	2	\N	0	83	\N	Millenials	6a+	\N	Rack Simple	\N	\N	2021-04-25 22:57:15.073605	2021-04-25 22:57:15.088733
365	t	t	t	0	0	2	4	1	3	\N	0	83	\N	El Bacile	6b+	\N	Rack Doble	\N	\N	2021-04-25 22:57:15.156651	2021-04-25 22:57:15.179386
366	t	\N	t	0	0	2	4	1	4	\N	0	83	\N	La Boca del Lobo	6c+	\N	Rack Simple	\N	\N	2021-04-25 22:57:15.239623	2021-04-25 22:57:15.257401
367	t	\N	t	0	0	2	0	1	5	\N	0	83	\N	Ruta del Casete	5+	\N	Rack Simple	\N	\N	2021-04-25 22:57:15.329512	2021-04-25 22:57:15.34978
368	t	\N	t	0	0	2	3	1	6	\N	0	83	\N	El Despabile	6c	\N	Rack Simple	\N	\N	2021-04-25 22:57:15.420556	2021-04-25 22:57:15.436201
369	t	\N	t	0	0	2	5	1	7	\N	0	83	\N	El Aleje	6b	\N	Rack Simple	\N	\N	2021-04-25 22:57:15.497958	2021-04-25 22:57:15.517081
370	t	\N	t	0	0	2	5	1	8	\N	0	83	\N	El Despertar	6a/6a+	\N	Rack Simple	\N	\N	2021-04-25 22:57:15.576083	2021-04-25 22:57:15.596899
371	t	\N	t	0	0	2	4	1	9	\N	0	83	\N	Mate y Pan de Chocolate	6c+	\N	17	\N	\N	2021-04-25 22:57:15.684182	2021-04-25 22:57:15.705335
372	t	t	t	0	0	2	7	1	10	\N	0	83	\N	El Zorro y el Minero	6b	\N	\N	\N	\N	2021-04-25 22:57:15.800352	2021-04-25 22:57:15.83558
373	f	t	t	0	0	1	3	1	1	\N	0	84	\N	Sentido Común	8a	\N	\N	\N	\N	2021-04-25 22:57:15.914097	2021-04-25 22:57:15.935129
374	f	t	t	0	0	1	4	1	2	\N	0	84	\N	El Código de Bushido	7b	\N	\N	\N	\N	2021-04-25 22:57:15.993617	2021-04-25 22:57:16.023745
375	f	t	t	0	0	1	3	1	3	\N	0	84	\N	Barlobento	7b+	\N	\N	\N	\N	2021-04-25 22:57:16.076877	2021-04-25 22:57:16.091599
376	t	t	t	0	0	2	1	0	1	\N	0	85	\N	Azulito Campero	7a	\N	\N	\N	\N	2021-04-25 22:57:16.161699	2021-04-25 22:57:16.181057
377	t	t	t	0	0	2	1	0	2	\N	0	85	\N	Pitufo Gruñon Pero Puntual	6a+	\N	\N	\N	\N	2021-04-25 22:57:16.239059	2021-04-25 22:57:16.263294
378	t	\N	t	0	0	2	1	0	1	\N	0	86	\N	Felino Andino	7+	\N	\N	\N	\N	2021-04-25 22:57:16.33052	2021-04-25 22:57:16.343904
379	t	\N	t	0	0	2	1	0	2	\N	0	86	\N	Memociono	7+	\N	\N	\N	\N	2021-04-25 22:57:16.406238	2021-04-25 22:57:16.423836
380	t	f	t	0	0	3	1	0	1	\N	0	87	\N	La Geicha	6a+	\N	\N	\N	\N	2021-04-25 22:57:16.476979	2021-04-25 22:57:16.4903
381	t	f	t	0	0	3	1	0	2	\N	0	87	\N	Hermanos al Pilpil	6a+	\N	\N	\N	\N	2021-04-25 22:57:16.551471	2021-04-25 22:57:16.572983
382	t	f	t	0	0	2	1	0	3	\N	0	87	\N	Te Cruje	6a	\N	\N	\N	\N	2021-04-25 22:57:16.629878	2021-04-25 22:57:16.642506
383	t	t	t	0	0	2	1	0	4	\N	0	87	\N	Cochinillo Veneciano	6b+	\N	\N	\N	\N	2021-04-25 22:57:16.689356	2021-04-25 22:57:16.70228
384	t	t	t	0	0	2	1	0	5	\N	0	87	\N	Solo Para Cobardes	6c	\N	\N	\N	\N	2021-04-25 22:57:16.817975	2021-04-25 22:57:16.865168
385	t	\N	t	0	0	2	1	0	1	\N	0	88	\N	Rescatando a Vinchuca	6c+	\N	\N	\N	\N	2021-04-25 22:57:17.09578	2021-04-25 22:57:17.109055
386	t	t	t	0	0	2	1	0	2	\N	0	88	\N	Dulce Camote	6c+	\N	\N	\N	\N	2021-04-25 22:57:17.183315	2021-04-25 22:57:17.205119
387	t	\N	t	0	0	2	1	0	3	\N	0	88	\N	Vagisil	7c+/8a	\N	\N	\N	\N	2021-04-25 22:57:17.26558	2021-04-25 22:57:17.282918
388	t	\N	t	0	0	2	1	0	4	\N	0	88	\N	Road to Zion	Proyecto	\N	\N	\N	\N	2021-04-25 22:57:17.340026	2021-04-25 22:57:17.353803
389	t	\N	t	0	0	2	1	0	5	\N	0	88	\N	Faraón Rapsag	7b+	\N	\N	\N	\N	2021-04-25 22:57:17.413678	2021-04-25 22:57:17.43772
390	t	\N	t	0	0	2	1	0	6	\N	0	88	\N	Poder del Ahora	8a	\N	\N	\N	\N	2021-04-25 22:57:17.507939	2021-04-25 22:57:17.527453
391	t	\N	t	0	0	2	1	0	7	\N	0	88	\N	José Zion	8a	\N	\N	\N	\N	2021-04-25 22:57:17.634761	2021-04-25 22:57:17.657183
392	t	\N	t	0	0	2	1	0	8	\N	0	88	\N	La Nueva Fechoría	7c	\N	\N	\N	\N	2021-04-25 22:57:17.753941	2021-04-25 22:57:17.781124
393	t	\N	t	0	0	2	1	0	1	\N	0	89	\N	Welcom tu Petorcas	6c+	\N	\N	\N	\N	2021-04-25 22:57:17.861906	2021-04-25 22:57:17.878732
394	t	\N	t	0	0	2	1	0	2	\N	0	89	\N	Longamán	8	\N	\N	\N	\N	2021-04-25 22:57:17.972997	2021-04-25 22:57:18.01017
395	t	\N	t	0	0	2	1	0	3	\N	0	89	\N	Monina	8	\N	\N	\N	\N	2021-04-25 22:57:18.111211	2021-04-25 22:57:18.136915
396	t	\N	t	0	0	2	1	0	4	\N	0	89	\N	Jabón Popeye	8	\N	\N	\N	\N	2021-04-25 22:57:18.227626	2021-04-25 22:57:18.240633
397	t	\N	t	0	0	2	1	0	5	\N	0	89	\N	Chocolate	7b	\N	\N	\N	\N	2021-04-25 22:57:18.31262	2021-04-25 22:57:18.330087
398	t	t	t	0	0	2	1	0	6	\N	0	89	\N	Como Para Calentar	7a	\N	\N	\N	\N	2021-04-25 22:57:18.399092	2021-04-25 22:57:18.41362
399	t	f	t	0	0	2	1	0	7	\N	0	89	\N	Congo Bongo	6a	\N	\N	\N	\N	2021-04-25 22:57:18.48942	2021-04-25 22:57:18.51334
400	t	t	t	0	0	2	1	0	8	\N	0	89	\N	Tela Pum!	7a	\N	\N	\N	\N	2021-04-25 22:57:18.599776	2021-04-25 22:57:18.625261
401	t	f	t	0	0	2	1	0	9	\N	0	89	\N	Catedral	7b+	\N	\N	\N	\N	2021-04-25 22:57:18.691183	2021-04-25 22:57:18.729591
402	t	\N	t	0	0	2	1	0	10	\N	0	89	\N	Pura Vida	7c/7c+	\N	\N	\N	\N	2021-04-25 22:57:18.821621	2021-04-25 22:57:18.845422
403	t	f	t	0	0	2	1	0	1	\N	0	90	\N	Nawe Nawe	6b+	\N	5+2	\N	\N	2021-04-25 22:57:18.930598	2021-04-25 22:57:18.944477
404	t	t	t	0	0	2	1	0	2	\N	0	90	\N	Verde de la Buena	6a+	\N	8+2	\N	\N	2021-04-25 22:57:19.018552	2021-04-25 22:57:19.034709
405	t	t	t	0	0	2	1	0	3	\N	0	90	\N	42 Frases	6b	\N	9+2	\N	\N	2021-04-25 22:57:19.137387	2021-04-25 22:57:19.181156
406	t	t	t	0	0	2	1	0	4	\N	0	90	\N	Con la Calma	6b+	\N	7+2	\N	\N	2021-04-25 22:57:19.231653	2021-04-25 22:57:19.246279
407	t	t	t	0	0	2	1	0	5	\N	0	90	\N	Matón	6b	\N	\N	\N	\N	2021-04-25 22:57:19.303132	2021-04-25 22:57:19.317722
408	t	t	t	0	0	2	1	0	6	\N	0	90	\N	Vaca Muerta	6b	\N	\N	\N	\N	2021-04-25 22:57:19.36877	2021-04-25 22:57:19.383657
409	t	t	t	0	0	2	1	0	7	\N	0	90	\N	Memo	6b	\N	\N	\N	\N	2021-04-25 22:57:19.455817	2021-04-25 22:57:19.469598
410	t	t	t	0	0	2	1	0	8	\N	0	90	\N	Gran Angular	6c	\N	\N	\N	\N	2021-04-25 22:57:19.565128	2021-04-25 22:57:19.593396
411	t	f	t	0	0	1	1	0	1	\N	0	91	\N	Occipucio	7a+	\N	6+2	\N	\N	2021-04-25 22:57:19.666477	2021-04-25 22:57:19.682032
412	t	t	t	0	0	1	1	0	2	\N	0	91	\N	Macoña	6c+	\N	6+2	\N	\N	2021-04-25 22:57:19.734157	2021-04-25 22:57:19.75043
413	t	t	t	0	0	1	1	0	3	\N	0	91	\N	Fito	6c	\N	6+2	\N	\N	2021-04-25 22:57:19.930107	2021-04-25 22:57:19.946337
414	t	t	t	0	0	1	1	0	4	\N	0	91	\N	Tolueno	6c+	\N	5+2	\N	\N	2021-04-25 22:57:20.033512	2021-04-25 22:57:20.054003
415	t	t	t	0	0	1	1	0	5	\N	0	91	\N	Perro Marciano	5+	\N	\N	\N	\N	2021-04-25 22:57:20.141593	2021-04-25 22:57:20.161916
416	t	f	t	0	0	1	1	0	6	\N	0	91	\N	Trilogía	6b+	\N	5+2	\N	\N	2021-04-25 22:57:20.257845	2021-04-25 22:57:20.273382
417	t	t	t	0	0	1	1	0	7	\N	0	91	\N	Panspermia	7c+	\N	6+2	\N	\N	2021-04-25 22:57:20.371577	2021-04-25 22:57:20.405109
418	t	f	t	0	0	1	1	0	8	\N	0	91	\N	Super Ocho	8a	\N	5+2	\N	\N	2021-04-25 22:57:20.469615	2021-04-25 22:57:20.484535
419	t	t	t	0	0	1	1	0	9	\N	0	91	\N	El Dictador	6a+	\N	6+2	\N	\N	2021-04-25 22:57:20.549646	2021-04-25 22:57:20.572078
420	t	t	t	0	0	1	1	0	10	\N	0	91	\N	Desde Aquí se ve tu Casa	5+	\N	8+2	\N	\N	2021-04-25 22:57:20.633034	2021-04-25 22:57:20.649308
421	t	t	t	0	0	2	1	0	1	\N	0	92	\N	Baby Snake	6c	\N	5+2	\N	\N	2021-04-25 22:57:20.716277	2021-04-25 22:57:20.729961
422	t	t	t	0	0	2	1	0	2	\N	0	92	\N	Unknown	6b+	\N	4+2	\N	\N	2021-04-25 22:57:20.793493	2021-04-25 22:57:20.806362
423	t	t	t	0	0	2	1	0	3	\N	0	92	\N	Unknown	6a	\N	4+2	\N	\N	2021-04-25 22:57:20.854681	2021-04-25 22:57:20.868644
424	t	f	t	0	0	2	1	0	4	\N	0	92	\N	Govindas	7b	\N	5+2	\N	\N	2021-04-25 22:57:20.927749	2021-04-25 22:57:20.94177
425	t	f	t	0	0	2	1	0	5	\N	0	92	\N	Shalo Bless	7c+	\N	6+2	\N	\N	2021-04-25 22:57:20.991559	2021-04-25 22:57:21.004503
426	t	f	t	0	0	2	1	0	6	\N	0	92	\N	Unknown	7b+/c	\N	Unknown	\N	\N	2021-04-25 22:57:21.056356	2021-04-25 22:57:21.070717
427	t	f	t	0	0	2	1	0	7	\N	0	92	\N	Unknown	Unknown	\N	Unknown	\N	\N	2021-04-25 22:57:21.11993	2021-04-25 22:57:21.137175
428	t	\N	t	0	0	3	1	0	1	\N	0	93	\N	Concha tu Fito	6b+	\N	\N	\N	\N	2021-04-25 22:57:21.216136	2021-04-25 22:57:21.230576
429	t	\N	t	0	0	3	1	0	2	\N	0	93	\N	Unknown	5+	\N	\N	\N	\N	2021-04-25 22:57:21.285811	2021-04-25 22:57:21.301279
430	t	\N	t	0	0	3	1	0	3	\N	0	93	\N	Unknown	5-	\N	\N	\N	\N	2021-04-25 22:57:21.356529	2021-04-25 22:57:21.37378
431	t	\N	t	0	0	2	1	0	4	\N	0	93	\N	Criminal con Taladro	5-	\N	\N	\N	\N	2021-04-25 22:57:21.428317	2021-04-25 22:57:21.442308
432	t	\N	t	0	0	2	1	0	5	\N	0	93	\N	A Vista y Limpiando	5-	\N	\N	\N	\N	2021-04-25 22:57:21.493454	2021-04-25 22:57:21.507059
433	t	t	t	0	0	1	1	0	1	\N	0	94	\N	Herejes	6b+	\N	11+2	\N	\N	2021-04-25 22:57:21.575719	2021-04-25 22:57:21.58913
434	t	f	t	0	0	1	1	0	2	\N	0	94	\N	Unknown	Unknown	\N	6+2	\N	\N	2021-04-25 22:57:21.636124	2021-04-25 22:57:21.66254
435	t	t	t	0	0	2	1	0	3	\N	0	94	\N	Todos los Dulfers Llegan al Cielo	6b	\N	6+2	\N	\N	2021-04-25 22:57:21.711856	2021-04-25 22:57:21.725811
436	t	f	t	0	0	2	1	0	4	\N	0	94	\N	Unknown	7a+	\N	4+2	\N	\N	2021-04-25 22:57:21.797722	2021-04-25 22:57:21.815617
437	t	f	t	0	0	2	1	0	5	\N	0	94	\N	Renacuajo	7c	\N	4+2	\N	\N	2021-04-25 22:57:21.876113	2021-04-25 22:57:21.889794
438	t	f	t	0	0	2	1	0	6	\N	0	94	\N	Transpetorca	7b	\N	12+2	\N	\N	2021-04-25 22:57:21.939525	2021-04-25 22:57:21.952761
439	t	f	t	0	0	2	1	0	7	\N	0	94	\N	Como vos Querai	6c+	\N	8+2	\N	\N	2021-04-25 22:57:22.004829	2021-04-25 22:57:22.02252
440	t	t	t	0	0	2	1	0	8	\N	0	94	\N	Con la fe de un Creyente	6c	\N	9+2	\N	\N	2021-04-25 22:57:22.071062	2021-04-25 22:57:22.089317
441	t	t	t	0	0	2	1	0	9	\N	0	94	\N	No Tengais Miedo de Equiparlo a Él	7a+	\N	6+2	\N	\N	2021-04-25 22:57:22.157441	2021-04-25 22:57:22.174612
442	t	f	t	0	0	2	1	0	1	\N	0	95	\N	Multi Cordín	8b+	\N	\N	\N	\N	2021-04-25 22:57:22.230705	2021-04-25 22:57:22.246663
443	t	f	t	0	0	2	1	0	2	\N	0	95	\N	Solo Top	6a+	\N	\N	\N	\N	2021-04-25 22:57:22.305121	2021-04-25 22:57:22.325276
444	t	f	t	0	0	2	1	0	3	\N	0	95	\N	Unknown	Unknown	\N	\N	\N	\N	2021-04-25 22:57:22.395886	2021-04-25 22:57:22.411339
445	t	f	t	0	0	2	1	0	4	\N	0	95	\N	Unknown	Unknown	\N	\N	\N	\N	2021-04-25 22:57:22.457762	2021-04-25 22:57:22.47912
446	t	f	t	0	0	2	1	0	5	\N	0	95	\N	Presa Mala	8b	\N	\N	\N	\N	2021-04-25 22:57:22.530401	2021-04-25 22:57:22.553589
447	t	\N	t	0	0	2	1	0	1	\N	0	96	\N	Unknown	4+	\N	\N	\N	\N	2021-04-25 22:57:22.630309	2021-04-25 22:57:22.650392
448	t	\N	t	0	0	2	1	0	2	\N	0	96	\N	Unknown	4+	\N	\N	\N	\N	2021-04-25 22:57:22.720839	2021-04-25 22:57:22.741179
449	t	\N	t	0	0	2	1	0	3	\N	0	96	\N	Consejos de Arriero	6b+	\N	\N	\N	\N	2021-04-25 22:57:22.834133	2021-04-25 22:57:22.849496
450	t	\N	t	0	0	2	1	0	1	\N	0	97	\N	Techito	6b	\N	\N	\N	\N	2021-04-25 22:57:22.932736	2021-04-25 22:57:22.949175
451	t	\N	t	0	0	2	1	0	1	\N	0	98	\N	La Vida es Larga y Dura	6b+	\N	\N	\N	\N	2021-04-25 22:57:23.008372	2021-04-25 22:57:23.023143
452	t	\N	t	0	0	2	1	0	2	\N	0	98	\N	Burbruja	7c	\N	\N	\N	\N	2021-04-25 22:57:23.095773	2021-04-25 22:57:23.117199
453	t	\N	t	0	0	2	1	0	3	\N	0	98	\N	Dinamita Show	6c	\N	\N	\N	\N	2021-04-25 22:57:23.18781	2021-04-25 22:57:23.20381
454	t	\N	t	0	0	2	1	0	4	\N	0	98	\N	Death Battery	6c	\N	\N	\N	\N	2021-04-25 22:57:23.273063	2021-04-25 22:57:23.296691
455	t	\N	t	0	0	2	1	0	5	\N	0	98	\N	En Honor a la Langosta	6c	\N	\N	\N	\N	2021-04-25 22:57:23.360368	2021-04-25 22:57:23.374644
456	t	\N	t	0	0	2	1	0	6	\N	0	98	\N	Santo Lango	7b+	\N	\N	\N	\N	2021-04-25 22:57:23.423895	2021-04-25 22:57:23.436915
457	t	\N	t	0	0	2	1	0	7	\N	0	98	\N	Santo Gotario	7c	\N	\N	\N	\N	2021-04-25 22:57:23.495105	2021-04-25 22:57:23.524939
458	t	\N	t	0	0	2	1	0	8	\N	0	98	\N	Crónicas de una Muerte Anunciada	7c+	\N	\N	\N	\N	2021-04-25 22:57:23.625668	2021-04-25 22:57:23.641955
459	t	\N	t	0	0	2	1	0	9	\N	0	98	\N	La Comadreja	6b	\N	\N	\N	\N	2021-04-25 22:57:23.725391	2021-04-25 22:57:23.760979
460	t	\N	t	0	0	2	1	0	1	\N	0	99	\N	Sherporrazo	8-	\N	\N	\N	\N	2021-04-25 22:57:23.850514	2021-04-25 22:57:23.86613
461	f	\N	t	0	0	0	1	\N	1	\N	0	100	\N	La Repostera	6c	\N	\N	\N	\N	2021-04-25 22:57:23.924646	2021-04-25 22:57:23.941003
462	f	\N	t	0	0	2	1	\N	2	\N	0	100	\N	La Camboyana	6c+	\N	\N	\N	\N	2021-04-25 22:57:24.016688	2021-04-25 22:57:24.03825
463	f	\N	t	0	0	2	1	\N	1	\N	0	101	\N	Quiborax	7a+	\N	\N	\N	\N	2021-04-25 22:57:24.103398	2021-04-25 22:57:24.121891
464	f	\N	t	0	0	2	1	\N	1	\N	0	102	\N	Umpa Lumpa	5+	\N	\N	\N	\N	2021-04-25 22:57:24.197741	2021-04-25 22:57:24.212652
465	f	\N	t	0	0	2	1	\N	1	\N	0	103	\N	Guate Foca	5+	\N	\N	\N	\N	2021-04-25 22:57:24.297415	2021-04-25 22:57:24.310742
466	f	\N	t	0	0	2	1	\N	2	\N	0	103	\N	Wecosito	6c+	\N	\N	\N	\N	2021-04-25 22:57:24.361014	2021-04-25 22:57:24.373481
467	f	\N	t	0	0	2	1	\N	3	\N	0	103	\N	Garycon	6a	\N	\N	\N	\N	2021-04-25 22:57:24.457283	2021-04-25 22:57:24.493153
468	f	\N	t	0	0	1	1	\N	1	\N	0	104	\N	TueTue	Proyecto	\N	5+2	\N	\N	2021-04-25 22:57:24.565717	2021-04-25 22:57:24.584732
469	f	\N	t	0	0	1	1	\N	2	\N	0	104	\N	En las Patas de los Guanacos	Proyecto	\N	8+2	\N	\N	2021-04-25 22:57:24.655781	2021-04-25 22:57:24.670192
470	f	\N	t	0	0	1	1	\N	3	\N	0	104	\N	Pacto con el Diablo	Proyecto	\N	7+2	\N	\N	2021-04-25 22:57:24.745654	2021-04-25 22:57:24.765186
471	f	\N	t	0	0	1	1	\N	4	\N	0	104	\N	Care Cuero	7c	\N	8+2	\N	\N	2021-04-25 22:57:24.845681	2021-04-25 22:57:24.869358
472	f	\N	t	0	0	3	1	\N	1	\N	0	105	\N	Tarántula Seca	6a+	\N	9+2	\N	\N	2021-04-25 22:57:24.937404	2021-04-25 22:57:24.952799
473	f	\N	t	0	0	2	1	\N	2	\N	0	105	\N	Dirty Alacrán	6a	\N	9+2	\N	\N	2021-04-25 22:57:25.003023	2021-04-25 22:57:25.023686
474	t	\N	t	0	0	3	1	0	1	\N	0	106	\N	Lobo Estepario	6a	\N	trad	\N	\N	2021-04-25 22:57:25.089643	2021-04-25 22:57:25.101627
475	t	\N	t	0	0	3	1	0	2	\N	0	106	\N	Gato Montés	6b	\N	\N	\N	\N	2021-04-25 22:57:25.171101	2021-04-25 22:57:25.184901
476	t	\N	t	0	0	3	1	0	3	\N	0	106	\N	Águila Mora	6b+	\N	\N	\N	\N	2021-04-25 22:57:25.231601	2021-04-25 22:57:25.245091
477	t	\N	t	0	0	3	1	0	4	\N	0	106	\N	Torre de Flores	6a	\N	trad	\N	\N	2021-04-25 22:57:25.361516	2021-04-25 22:57:25.377047
478	t	\N	t	0	0	3	1	0	5	\N	0	106	\N	Unknown	Unknown	\N	\N	\N	\N	2021-04-25 22:57:25.431595	2021-04-25 22:57:25.446649
479	t	\N	t	0	0	3	1	0	6	\N	0	106	\N	Calafate	6b	\N	\N	\N	\N	2021-04-25 22:57:25.505012	2021-04-25 22:57:25.523743
480	t	\N	t	0	0	3	1	0	7	\N	0	106	\N	Ataque Arácnido	7a	\N	\N	\N	\N	2021-04-25 22:57:25.59233	2021-04-25 22:57:25.611753
481	t	\N	t	0	0	3	1	0	8	\N	0	106	\N	Manjarate	6b	\N	\N	\N	\N	2021-04-25 22:57:25.668488	2021-04-25 22:57:25.682806
482	t	\N	t	0	0	3	1	0	9	\N	0	106	\N	Lenguaje Corporal	6b	\N	\N	\N	\N	2021-04-25 22:57:25.735289	2021-04-25 22:57:25.748865
483	t	\N	t	0	0	3	1	0	10	\N	0	106	\N	Teorema de Pitágoras	6a	\N	\N	\N	\N	2021-04-25 22:57:25.813601	2021-04-25 22:57:25.827265
484	t	\N	t	0	0	3	1	0	11	\N	0	106	\N	Newen	6a	\N	trad	\N	\N	2021-04-25 22:57:25.896627	2021-04-25 22:57:25.912708
485	t	\N	t	0	0	3	1	0	12	\N	0	106	\N	Patagonia sin Represas	6a	\N	\N	\N	\N	2021-04-25 22:57:25.991774	2021-04-25 22:57:26.005144
486	t	\N	t	0	0	3	1	0	13	\N	0	106	\N	Última Esperanza	6a	\N	\N	\N	\N	2021-04-25 22:57:26.053017	2021-04-25 22:57:26.066666
487	t	\N	t	0	0	3	1	0	14	\N	0	106	\N	Estrecho de Magallanes	6a+	\N	\N	\N	\N	2021-04-25 22:57:26.119078	2021-04-25 22:57:26.134786
488	t	\N	t	0	0	3	1	0	15	\N	0	106	\N	Histeria Colectiva	6b+	\N	trad	\N	\N	2021-04-25 22:57:26.216838	2021-04-25 22:57:26.228857
489	t	\N	t	0	0	3	1	0	16	\N	0	106	\N	Filosofía del Patrón	6c	\N	mixta	\N	\N	2021-04-25 22:57:26.275271	2021-04-25 22:57:26.289372
490	t	\N	t	0	0	3	1	0	1	\N	0	107	\N	Hidromoke	6c+	\N	\N	\N	\N	2021-04-25 22:57:26.374335	2021-04-25 22:57:26.387983
491	t	\N	t	0	0	3	1	0	2	\N	0	107	\N	Bandera Tibetana	6c	\N	\N	\N	\N	2021-04-25 22:57:26.462799	2021-04-25 22:57:26.476502
492	t	\N	t	0	0	3	1	0	3	\N	0	107	\N	Santa Ocha	5+	\N	\N	\N	\N	2021-04-25 22:57:26.539513	2021-04-25 22:57:26.559364
493	t	\N	t	0	0	3	1	0	4	\N	0	107	\N	Maitén	5+	\N	\N	\N	\N	2021-04-25 22:57:26.610874	2021-04-25 22:57:26.62478
494	t	\N	t	0	0	3	1	0	5	\N	0	107	\N	Colmillo de Mamut	6a	\N	\N	\N	\N	2021-04-25 22:57:26.681911	2021-04-25 22:57:26.698286
495	t	\N	t	0	0	3	1	0	6	\N	0	107	\N	Gallito Inglés	6b	\N	\N	\N	\N	2021-04-25 22:57:26.764562	2021-04-25 22:57:26.801181
496	t	\N	t	0	0	3	1	0	7	\N	0	107	\N	Crucificado	6a+	\N	\N	\N	\N	2021-04-25 22:57:26.85689	2021-04-25 22:57:26.867789
497	t	\N	t	0	0	3	1	0	8	\N	0	107	\N	Chercán Desalojado	6b+	\N	\N	\N	\N	2021-04-25 22:57:26.979664	2021-04-25 22:57:26.992716
498	t	\N	t	0	0	3	1	0	9	\N	0	107	\N	Contra Peso	6b+	\N	\N	\N	\N	2021-04-25 22:57:27.05091	2021-04-25 22:57:27.063564
499	t	\N	t	0	0	3	1	0	10	\N	0	107	\N	Entre Pullas	6a	\N	\N	\N	\N	2021-04-25 22:57:27.148642	2021-04-25 22:57:27.165584
500	t	\N	t	0	0	3	1	0	11	\N	0	107	\N	De Nako a Mono	7b+	\N	\N	\N	\N	2021-04-25 22:57:27.219774	2021-04-25 22:57:27.237407
501	t	\N	t	0	0	3	1	0	12	\N	0	107	\N	Talón Criollo	6b+	\N	trad	\N	\N	2021-04-25 22:57:27.292786	2021-04-25 22:57:27.305001
502	t	\N	t	0	0	3	1	0	13	\N	0	107	\N	Unknown	5+	\N	\N	\N	\N	2021-04-25 22:57:27.356062	2021-04-25 22:57:27.386586
503	t	\N	t	0	0	3	1	0	14	\N	0	107	\N	Unknown	6-	\N	\N	\N	\N	2021-04-25 22:57:27.452114	2021-04-25 22:57:27.4667
504	f	\N	t	0	0	2	1	\N	1	\N	0	108	\N	Proyecto	Proyecto	\N	\N	\N	\N	2021-04-25 22:57:27.527509	2021-04-25 22:57:27.549502
505	f	\N	t	0	0	2	1	\N	2	\N	0	108	\N	Obituario	6c+	\N	\N	\N	\N	2021-04-25 22:57:27.612062	2021-04-25 22:57:27.626084
506	f	\N	t	0	0	2	1	\N	3	\N	0	108	\N	No Somos Nada	6c	\N	\N	\N	\N	2021-04-25 22:57:27.703702	2021-04-25 22:57:27.722898
507	f	\N	t	0	0	2	1	\N	4	\N	0	108	\N	Vida de Perros	6b	\N	\N	\N	\N	2021-04-25 22:57:27.821838	2021-04-25 22:57:27.883316
508	f	\N	t	0	0	2	1	\N	5	\N	0	108	\N	Mal Augurio	6b/+	\N	\N	\N	\N	2021-04-25 22:57:27.973102	2021-04-25 22:57:27.997591
509	f	\N	t	0	0	0	0	\N	1	\N	0	109	\N	Obsolescencia Programada	Unknown	\N	\N	\N	\N	2021-04-25 22:57:28.063929	2021-04-25 22:57:28.076948
510	f	\N	t	0	0	0	0	\N	2	\N	0	109	\N	Remo Chueco	6c	\N	\N	\N	\N	2021-04-25 22:57:28.138514	2021-04-25 22:57:28.156382
511	f	\N	t	0	0	0	0	\N	3	\N	0	109	\N	Aquí Nace un Amor	6c+	\N	\N	\N	\N	2021-04-25 22:57:28.231456	2021-04-25 22:57:28.262687
512	f	\N	t	0	0	0	0	\N	4	\N	0	109	\N	Estúpida y Sensual	7a+	\N	\N	\N	\N	2021-04-25 22:57:28.309653	2021-04-25 22:57:28.323235
513	f	\N	t	0	0	0	0	\N	5	\N	0	109	\N	Compresión	7a	\N	\N	\N	\N	2021-04-25 22:57:28.399141	2021-04-25 22:57:28.425684
514	f	\N	t	0	0	2	1	\N	1	\N	0	110	\N	Canálisis	6a+/b	\N	\N	\N	\N	2021-04-25 22:57:28.490491	2021-04-25 22:57:28.50471
515	f	\N	t	0	0	2	1	\N	2	\N	0	110	\N	Amordelejos	6a+	\N	\N	\N	\N	2021-04-25 22:57:28.573692	2021-04-25 22:57:28.59511
516	f	\N	t	0	0	2	1	\N	1	\N	0	111	\N	Nagobot	5+	\N	\N	\N	\N	2021-04-25 22:57:28.693616	2021-04-25 22:57:28.709219
517	f	\N	t	0	0	2	1	\N	2	\N	0	111	\N	Pequeño Gecko	6b	\N	\N	\N	\N	2021-04-25 22:57:28.777373	2021-04-25 22:57:28.801084
518	f	\N	t	0	0	2	1	\N	3	\N	0	111	\N	Entre Raíces	6c	\N	\N	\N	\N	2021-04-25 22:57:28.882745	2021-04-25 22:57:28.894683
519	f	\N	t	0	0	2	1	\N	4	\N	0	111	\N	Sueños de Hermanos	6b	\N	\N	\N	\N	2021-04-25 22:57:28.978937	2021-04-25 22:57:28.995216
520	f	\N	t	0	0	2	1	\N	5	\N	0	111	\N	Diógenes	6a+/b	\N	\N	\N	\N	2021-04-25 22:57:29.045285	2021-04-25 22:57:29.061369
521	t	\N	t	0	0	3	1	1	1	\N	0	112	\N	Kala	10c	\N	\N	\N	\N	2021-04-25 22:57:29.175198	2021-04-25 22:57:29.197369
522	t	\N	t	0	0	3	1	1	2	35	0	112	\N	Rampa al Cielo	5-	\N	\N	\N	\N	2021-04-25 22:57:29.247493	2021-04-25 22:57:29.261972
523	t	\N	t	0	0	2	1	1	3	\N	0	112	\N	Patas Negras	6c+/7a	\N	\N	\N	\N	2021-04-25 22:57:29.313363	2021-04-25 22:57:29.330258
524	t	\N	t	0	0	2	1	1	4	\N	0	112	\N	Tiruriru	6b+	\N	\N	\N	\N	2021-04-25 22:57:29.408319	2021-04-25 22:57:29.42172
525	t	\N	t	0	0	1	1	1	1	\N	0	113	\N	Tiranosaurio	8a	\N	\N	\N	\N	2021-04-25 22:57:29.486201	2021-04-25 22:57:29.50199
526	t	\N	t	0	0	1	1	1	2	\N	0	113	\N	Choro Mingram	7b+	\N	\N	\N	\N	2021-04-25 22:57:29.572316	2021-04-25 22:57:29.584521
527	t	\N	t	0	0	1	1	1	3	\N	0	113	\N	Back to Choliana	8a	\N	\N	Ruta con Nido	\N	2021-04-25 22:57:29.633384	2021-04-25 22:57:29.648984
528	t	\N	t	0	0	1	1	1	4	\N	0	113	\N	Cimarrón	7b+	\N	\N	\N	\N	2021-04-25 22:57:29.703473	2021-04-25 22:57:29.71772
529	t	\N	t	0	0	1	1	1	5	\N	0	113	\N	100 Pies	7a+/b	\N	\N	\N	\N	2021-04-25 22:57:29.77385	2021-04-25 22:57:29.787735
530	t	\N	t	0	0	1	1	1	6	\N	0	113	\N	Pancholenko	7b+	\N	\N	\N	\N	2021-04-25 22:57:29.847882	2021-04-25 22:57:29.860931
531	t	\N	t	0	0	1	1	1	7	\N	0	113	\N	Chelenko	7a	\N	\N	\N	\N	2021-04-25 22:57:29.936365	2021-04-25 22:57:29.951291
532	t	\N	t	0	0	1	1	1	8	\N	0	113	\N	Los Dientes de Anubis	7c	\N	\N	\N	\N	2021-04-25 22:57:30.004199	2021-04-25 22:57:30.028068
533	t	\N	t	0	0	1	1	1	9	\N	0	113	\N	Del Cielo al Suelo y Viceversa	7c+	\N	\N	\N	\N	2021-04-25 22:57:30.093682	2021-04-25 22:57:30.113153
534	t	t	t	0	0	1	1	1	10	\N	0	113	\N	Actitud Alpina	7c	\N	\N	\N	\N	2021-04-25 22:57:30.168664	2021-04-25 22:57:30.182055
535	t	t	t	0	0	1	1	1	11	\N	0	113	\N	Jeiliana	7a+	\N	\N	\N	\N	2021-04-25 22:57:30.245475	2021-04-25 22:57:30.265087
536	t	\N	t	0	0	2	1	1	1	\N	0	114	\N	Rey Zombi	7b+	\N	\N	\N	\N	2021-04-25 22:57:30.349555	2021-04-25 22:57:30.364764
537	t	\N	t	0	0	2	1	1	2	\N	0	114	\N	Petit Gatou	7a	\N	\N	\N	\N	2021-04-25 22:57:30.437644	2021-04-25 22:57:30.457411
538	t	\N	t	0	0	2	1	1	3	\N	0	114	\N	Pan Chocolat	6c+	\N	\N	\N	\N	2021-04-25 22:57:30.508598	2021-04-25 22:57:30.521547
539	\N	t	\N	\N	\N	2	2	1	4	\N	0	114	\N	Patagón Sin Bombilla	6c+	\N	\N	El segundo largo no aumenta el grado de la vía.	\N	2021-04-25 22:57:30.594176	2021-04-25 22:57:30.610343
540	t	\N	t	0	0	2	1	1	5	\N	0	114	\N	Samastitihi	6b	\N	\N	\N	\N	2021-04-25 22:57:30.662852	2021-04-25 22:57:30.679654
541	t	t	t	0	0	2	1	1	6	\N	0	114	\N	Rocarelatividad	6c	\N	\N	\N	\N	2021-04-25 22:57:30.757694	2021-04-25 22:57:30.77736
542	t	t	t	0	0	2	1	1	7	\N	0	114	\N	Wekereke	6c	\N	\N	\N	\N	2021-04-25 22:57:30.891345	2021-04-25 22:57:30.909707
543	t	t	t	0	0	2	1	1	8	\N	0	114	\N	Cachipun	6c	\N	\N	\N	\N	2021-04-25 22:57:30.969652	2021-04-25 22:57:30.98339
544	t	\N	t	0	0	2	1	1	9	\N	0	114	\N	Boyaina	6c+	\N	\N	\N	\N	2021-04-25 22:57:31.042298	2021-04-25 22:57:31.057961
545	t	t	t	0	0	2	1	1	10	\N	0	114	\N	Astroplaca	6c+	\N	\N	\N	\N	2021-04-25 22:57:31.127997	2021-04-25 22:57:31.142698
546	t	t	t	0	0	2	1	1	11	\N	0	114	\N	La Gran Sopapo	6c	\N	\N	\N	\N	2021-04-25 22:57:31.208125	2021-04-25 22:57:31.230624
547	t	\N	t	0	0	2	1	1	12	\N	0	114	\N	Huachitorito	6c	\N	\N	\N	\N	2021-04-25 22:57:31.286202	2021-04-25 22:57:31.299815
548	t	\N	t	0	0	\N	1	1	1	\N	0	115	\N	Desapercibida	7c	\N	\N	\N	\N	2021-04-25 22:57:31.373222	2021-04-25 22:57:31.390169
549	t	\N	t	0	0	\N	1	1	2	\N	0	115	\N	Aprete Cuántico	7c+	\N	\N	\N	\N	2021-04-25 22:57:31.463789	2021-04-25 22:57:31.482175
550	t	\N	t	0	0	\N	1	1	3	\N	0	115	\N	Padawan	7b+	\N	\N	\N	\N	2021-04-25 22:57:31.530624	2021-04-25 22:57:31.550355
551	t	\N	t	0	0	\N	1	1	4	\N	0	115	\N	El Chimuelo	7a	\N	\N	\N	\N	2021-04-25 22:57:31.62199	2021-04-25 22:57:31.653818
552	t	\N	t	0	0	\N	1	1	5	40	0	115	\N	La Joya del Maipo	7a+	\N	\N	\N	\N	2021-04-25 22:57:31.7002	2021-04-25 22:57:31.713617
553	t	\N	t	0	0	\N	1	1	6	\N	0	115	\N	Chorrillana	7a+	\N	\N	\N	\N	2021-04-25 22:57:31.768761	2021-04-25 22:57:31.781709
554	t	\N	t	0	0	\N	1	1	7	\N	0	115	\N	Toucher Le Mien	Unknown	\N	\N	\N	\N	2021-04-25 22:57:31.833209	2021-04-25 22:57:31.84702
555	t	\N	t	0	0	\N	1	1	8	\N	0	115	\N	nakeman	Unknown	\N	\N	Vía incompleta y que no ha sido terminada de equipar.	\N	2021-04-25 22:57:31.894183	2021-04-25 22:57:31.907245
556	t	\N	t	0	0	\N	1	1	1	\N	0	116	\N	Relevo	6c	\N	\N	\N	\N	2021-04-25 22:57:31.965389	2021-04-25 22:57:31.98001
558	t	f	t	0	0	2	1	0	2	\N	0	117	\N	Escuela 2	5-	\N	\N	\N	\N	2021-04-25 22:57:32.115587	2021-04-25 22:57:32.130609
559	t	t	t	0	0	3	1	0	3	\N	0	117	\N	Escuela 3	5-	\N	\N	\N	\N	2021-04-25 22:57:32.193496	2021-04-25 22:57:32.212135
560	t	t	t	0	0	2	1	0	4	\N	0	117	\N	Sopaipa Pasá	6a	\N	10+2	Se recomienda rapel debido al roce.	\N	2021-04-25 22:57:32.275715	2021-04-25 22:57:32.29181
561	t	t	t	0	0	2	1	0	5	\N	0	117	\N	No Llorí Culiao	6b	\N	7+2	Se recomienda rapel debido al roce.	\N	2021-04-25 22:57:32.350398	2021-04-25 22:57:32.363954
562	t	f	t	0	0	2	1	0	6	\N	0	117	\N	Unknown	6b+	\N	8+2	Descuelgue	\N	2021-04-25 22:57:32.413767	2021-04-25 22:57:32.431883
563	t	t	t	0	0	1	1	0	7	\N	0	117	\N	Inactivo	6+/7-	\N	5+2	Descuelgue	\N	2021-04-25 22:57:32.490617	2021-04-25 22:57:32.507826
564	t	f	t	0	0	1	1	0	8	\N	0	117	\N	Wena Cholu	6b+	\N	\N	\N	\N	2021-04-25 22:57:32.593506	2021-04-25 22:57:32.607512
565	t	f	t	0	0	2	1	0	9	\N	0	117	\N	Wena Pame	6a+	\N	\N	\N	\N	2021-04-25 22:57:32.669483	2021-04-25 22:57:32.694807
566	t	f	t	0	0	1	1	0	10	\N	0	117	\N	Wena Kumaju	6c	\N	\N	\N	\N	2021-04-25 22:57:32.753246	2021-04-25 22:57:32.766728
567	t	f	t	0	0	2	1	0	11	\N	0	117	\N	Unknown	6-	\N	\N	\N	\N	2021-04-25 22:57:32.841733	2021-04-25 22:57:32.856361
568	t	f	t	0	0	3	1	0	12	\N	0	117	\N	Clásica	5+	\N	\N	\N	\N	2021-04-25 22:57:32.910459	2021-04-25 22:57:32.924269
569	t	f	t	0	0	3	1	0	13	\N	0	117	\N	Travesía Rey León	5-	\N	\N	\N	\N	2021-04-25 22:57:32.992403	2021-04-25 22:57:33.006542
570	t	f	t	0	0	2	1	0	14	\N	0	117	\N	90 Degrees	6c+	\N	6+2	Si se realiza partiendo debajo en la cueva es un 7b.	\N	2021-04-25 22:57:33.070725	2021-04-25 22:57:33.084416
571	t	f	t	0	0	2	1	0	15	\N	0	117	\N	La Desconocida	5+	\N	\N	\N	\N	2021-04-25 22:57:33.145817	2021-04-25 22:57:33.169387
572	t	f	t	0	0	2	\N	\N	1	\N	0	118	\N	Cíclope	7a+	\N	\N	\N	\N	2021-04-25 22:57:33.246444	2021-04-25 22:57:33.260888
573	t	f	t	0	0	2	1	0	1	\N	0	119	\N	Planeador	6a	\N	4+2	Descuelgue	\N	2021-04-25 22:57:33.339395	2021-04-25 22:57:33.353518
574	t	f	t	0	0	2	1	0	2	\N	0	119	\N	Mechon Koala	6a+	\N	8+2	Descuelgue	\N	2021-04-25 22:57:33.412356	2021-04-25 22:57:33.430658
575	t	f	t	0	0	2	1	0	3	\N	0	119	\N	Galán al Final	6a	\N	8+2	Descuelgue	\N	2021-04-25 22:57:33.492951	2021-04-25 22:57:33.506474
576	t	f	t	0	0	2	1	0	4	\N	0	119	\N	Unknown	6b	\N	\N	\N	\N	2021-04-25 22:57:33.57049	2021-04-25 22:57:33.60893
577	t	f	t	0	0	2	1	0	5	\N	0	119	\N	Kung Fu Panda	6b	\N	\N	\N	\N	2021-04-25 22:57:33.673489	2021-04-25 22:57:33.690264
578	t	f	t	0	0	2	1	0	1	\N	0	120	\N	4x4	5+	\N	\N	\N	\N	2021-04-25 22:57:33.765682	2021-04-25 22:57:33.78538
579	t	f	t	0	0	2	1	0	2	\N	0	120	\N	Nano Ruta	5-	\N	\N	\N	\N	2021-04-25 22:57:33.848633	2021-04-25 22:57:33.869093
580	t	f	t	0	0	2	1	0	1	\N	0	121	\N	Unknown	5-	\N	6+2	Se recomienda rapel debido al roce	Avispas ente chapas 1 y 2.	2021-04-25 22:57:33.925455	2021-04-25 22:57:33.938765
581	t	f	t	0	0	2	1	0	2	\N	0	121	\N	Unknown	5+	\N	7+2	Se recomienda rapel debido al roce	Avispas ente chapas 1 y 2.	2021-04-25 22:57:33.988323	2021-04-25 22:57:34.002018
582	t	f	t	0	0	2	1	0	3	\N	0	122	\N	Back in Time	6b	\N	8+2	Descuelgue	\N	2021-04-25 22:57:34.073624	2021-04-25 22:57:34.093622
583	t	f	t	0	0	2	1	0	4	\N	0	122	\N	Mas Roce que tu Hermana	7c	\N	5+2	Descuelgue	\N	2021-04-25 22:57:34.152036	2021-04-25 22:57:34.177397
584	t	f	t	0	0	2	1	0	5	\N	0	122	\N	Mas Roce que tu Hermana Variante Izquierda	Unknown	\N	7+2	Descuelgue	\N	2021-04-25 22:57:34.239894	2021-04-25 22:57:34.253619
585	t	f	t	0	0	2	1	0	6	\N	0	122	\N	Mr. Green	7b+	\N	7+2	Descuelgue	\N	2021-04-25 22:57:34.311055	2021-04-25 22:57:34.324749
586	t	f	t	0	0	2	1	0	7	\N	0	122	\N	Cahuelmo	7a	\N	4+2	Descuelgue	\N	2021-04-25 22:57:34.387466	2021-04-25 22:57:34.407014
587	t	t	t	0	0	2	1	0	8	\N	0	122	\N	Endurance	6c+	\N	5+2	Descuelgue	\N	2021-04-25 22:57:34.461079	2021-04-25 22:57:34.484564
588	t	f	t	0	0	2	1	0	9	\N	0	122	\N	La Unión	8a	\N	7+2	Descuelgue	\N	2021-04-25 22:57:34.557389	2021-04-25 22:57:34.5826
589	t	f	t	0	0	2	1	0	10	\N	0	122	\N	Cahuelmo  Friends 1	7b	\N	4+2	Descuelgue	\N	2021-04-25 22:57:34.637462	2021-04-25 22:57:34.651501
590	t	f	t	0	0	2	1	0	11	\N	0	122	\N	Cahuelmo Friends 2	7b	\N	4+2	Descuelgue	\N	2021-04-25 22:57:34.705656	2021-04-25 22:57:34.721314
591	t	f	t	0	0	2	1	0	12	\N	0	122	\N	Unknown	6b+/6c	\N	5+2	Se recomienda rapel debido al roce	\N	2021-04-25 22:57:34.79736	2021-04-25 22:57:34.810211
592	t	f	t	0	0	2	1	0	13	\N	0	122	\N	Unknown	Unknown	\N	5+2	Descuelgue	\N	2021-04-25 22:57:34.861326	2021-04-25 22:57:34.878733
593	t	f	t	0	0	2	1	0	14	\N	0	122	\N	Su Nombre es Joaquín	6a	\N	5+2	Se recomienda rapel debido al roce	\N	2021-04-25 22:57:34.949618	2021-04-25 22:57:34.964645
594	t	f	t	0	0	2	1	0	15	\N	0	122	\N	Calentín	5+	\N	5+2	Se recomienda rapel debido al roce	\N	2021-04-25 22:57:35.052244	2021-04-25 22:57:35.067479
595	f	\N	t	0	0	2	1	\N	1	20	0	123	\N	Soplale el Hoyo	6+	\N	8+2	\N	\N	2021-04-25 22:57:35.127348	2021-04-25 22:57:35.143197
596	f	\N	t	0	0	2	1	\N	2	20	0	123	\N	Alo si, ya Chao	6+	\N	9+2	\N	\N	2021-04-25 22:57:35.19626	2021-04-25 22:57:35.230235
597	f	\N	t	0	0	2	1	\N	3	20	0	123	\N	La Monita	6+	\N	9+2	\N	\N	2021-04-25 22:57:35.261991	2021-04-25 22:57:35.279368
598	f	\N	t	0	0	2	1	\N	4	20	0	123	\N	A la Xuxa la Chapa	6+	\N	9+2	\N	\N	2021-04-25 22:57:35.321414	2021-04-25 22:57:35.344382
599	f	\N	t	0	0	2	1	\N	5	20	0	123	\N	Ruta Antigua 1	5+	\N	\N	\N	\N	2021-04-25 22:57:35.394342	2021-04-25 22:57:35.40737
600	f	\N	t	0	0	2	1	\N	6	20	0	123	\N	Ruta Antigua 2	6a	\N	\N	\N	\N	2021-04-25 22:57:35.456402	2021-04-25 22:57:35.475566
601	f	\N	t	0	0	2	1	\N	7	25	0	123	\N	Para de Sufrir	7+	\N	13+2	\N	\N	2021-04-25 22:57:35.508172	2021-04-25 22:57:35.521532
602	t	t	t	0	0	2	1	0	1	20	0	124	\N	Gorila	7b	\N	9+2	\N	\N	2021-04-25 22:57:35.57749	2021-04-25 22:57:35.59453
603	f	f	t	0	0	0	1	0	1	0	0	125	\N	Unknown	Unknown	\N	\N	\N	\N	2021-04-25 22:57:35.651538	2021-04-25 22:57:35.669299
604	f	f	t	0	0	0	1	0	2	18	0	125	\N	Tormentina	8-	\N	10+2	\N	\N	2021-04-25 22:57:35.720268	2021-04-25 22:57:35.735752
605	f	f	t	0	0	1	1	0	3	16	0	125	\N	Benzón	7c	\N	7+2	\N	\N	2021-04-25 22:57:35.801772	2021-04-25 22:57:35.815131
606	t	f	t	0	0	2	1	0	4	16	0	125	\N	Unknown	6c A0	\N	7+2	\N	\N	2021-04-25 22:57:35.917431	2021-04-25 22:57:35.941162
607	t	t	t	0	0	2	1	0	5	12	0	125	\N	Nada en la Mente	6c	\N	6+2	\N	\N	2021-04-25 22:57:36.012084	2021-04-25 22:57:36.027584
608	t	t	t	0	0	2	1	0	6	10	0	125	\N	La Inconfundible	7a	\N	5+2	\N	\N	2021-04-25 22:57:36.101432	2021-04-25 22:57:36.122623
609	t	f	t	0	0	2	1	0	7	10	0	125	\N	Nigger Winner	5-	\N	5+2	\N	\N	2021-04-25 22:57:36.189708	2021-04-25 22:57:36.213451
610	t	t	t	0	0	3	1	0	1	16	0	126	\N	Mala Vida	7a+	\N	9+2	\N	\N	2021-04-25 22:57:36.28795	2021-04-25 22:57:36.302992
611	t	f	t	0	0	3	1	0	2	16	0	126	\N	Huevos de Lagartija	5+	\N	Trad	\N	\N	2021-04-25 22:57:36.365178	2021-04-25 22:57:36.378439
612	t	t	t	0	0	3	1	0	3	17	0	126	\N	Peo Calduo	7a	\N	8+2	\N	\N	2021-04-25 22:57:36.431575	2021-04-25 22:57:36.453032
613	t	t	t	0	0	3	1	0	4	17	0	126	\N	Hacete Caca	6c	\N	7+2	\N	\N	2021-04-25 22:57:36.500765	2021-04-25 22:57:36.51415
614	t	t	t	0	0	3	1	0	5	22	0	126	\N	Fisura Digital	6a	\N	6+2	\N	\N	2021-04-25 22:57:36.581914	2021-04-25 22:57:36.602313
615	t	f	t	0	0	3	1	0	6	19	0	126	\N	El Cielo de la Lagartija	6c	\N	7+2	\N	\N	2021-04-25 22:57:36.669875	2021-04-25 22:57:36.683134
616	t	f	t	0	0	3	1	0	7	20	0	126	\N	Guillotinas	6a+	\N	Mixta	\N	\N	2021-04-25 22:57:36.766956	2021-04-25 22:57:36.783682
617	t	f	t	0	0	2	1	0	1	15	0	127	\N	Cantauria	7a	\N	7+2	\N	\N	2021-04-25 22:57:36.841321	2021-04-25 22:57:36.874412
618	t	f	t	0	0	2	1	0	2	0	0	127	\N	Unknown	7?	\N	Unknown	\N	\N	2021-04-25 22:57:36.925667	2021-04-25 22:57:36.944307
619	t	t	t	0	0	2	1	0	3	15	0	127	\N	Siete Vidas Rastas	6c+	\N	9+2	\N	\N	2021-04-25 22:57:37.004003	2021-04-25 22:57:37.018196
620	t	f	t	0	0	2	1	0	4	15	0	127	\N	Unknown	7a	\N	8+2	\N	\N	2021-04-25 22:57:37.069488	2021-04-25 22:57:37.083773
621	t	t	t	0	0	1	1	0	1	15	0	128	\N	Finiquito	6a+	\N	8+2	\N	\N	2021-04-25 22:57:37.15023	2021-04-25 22:57:37.181399
622	t	t	t	0	0	2	1	0	2	15	0	128	\N	Pan con Queso	7a	\N	8+2	\N	\N	2021-04-25 22:57:37.247386	2021-04-25 22:57:37.261103
623	t	f	t	0	0	2	1	0	3	0	0	128	\N	Unknown	7?	\N	Unknown	\N	\N	2021-04-25 22:57:37.31855	2021-04-25 22:57:37.332847
624	t	\N	t	0	0	2	1	0	1	10	0	129	\N	El Voluntario	4+	\N	5+2	\N	\N	2021-04-25 22:57:37.400093	2021-04-25 22:57:37.413834
625	t	\N	t	0	0	2	1	0	2	19	0	129	\N	Dilema Face	6b	\N	6+2	\N	\N	2021-04-25 22:57:37.486677	2021-04-25 22:57:37.500589
626	t	\N	t	0	0	2	1	0	3	20	0	129	\N	Newen Kelen	7b+	\N	8+2	\N	\N	2021-04-25 22:57:37.551146	2021-04-25 22:57:37.56898
627	t	\N	t	0	0	2	1	0	4	14	0	129	\N	Wairao	6c+	\N	Mixta	\N	\N	2021-04-25 22:57:37.667397	2021-04-25 22:57:37.680497
628	t	\N	t	0	0	2	1	0	5	18	0	129	\N	Second Page	7a	\N	7+2	\N	\N	2021-04-25 22:57:37.730998	2021-04-25 22:57:37.744609
629	t	\N	t	0	0	2	1	0	6	20	0	129	\N	Unknown	7-	\N	10+2	\N	\N	2021-04-25 22:57:37.799112	2021-04-25 22:57:37.819201
630	t	\N	t	0	0	2	1	0	7	18	0	129	\N	Fisura 1	6b+	\N	Trad	\N	\N	2021-04-25 22:57:37.873745	2021-04-25 22:57:37.888385
631	t	\N	t	0	0	2	1	0	8	10	0	130	\N	Luchita	5+	\N	Trad	\N	\N	2021-04-25 22:57:37.948824	2021-04-25 22:57:37.961246
632	t	\N	t	0	0	2	1	0	1	12	0	130	\N	Unknown	6+	\N	Mixta	\N	\N	2021-04-25 22:57:38.009734	2021-04-25 22:57:38.025214
633	t	\N	t	0	0	2	1	0	2	0	0	130	\N	Ñapitas Donde Estás?	6+/7-	\N	7+2	\N	\N	2021-04-25 22:57:38.094226	2021-04-25 22:57:38.118014
634	t	\N	t	0	0	2	1	0	3	15	0	130	\N	Trompe	6a	\N	7+2	\N	\N	2021-04-25 22:57:38.176124	2021-04-25 22:57:38.195461
635	t	\N	t	0	0	2	1	0	4	30	0	131	\N	Unknown	6c	\N	Trad	\N	\N	2021-04-25 22:57:38.259446	2021-04-25 22:57:38.271801
636	t	\N	t	0	0	2	1	0	5	35	0	131	\N	Unknown	7a	\N	Mixta	\N	\N	2021-04-25 22:57:38.320134	2021-04-25 22:57:38.333755
637	t	t	t	0	0	2	1	0	6	30	0	131	\N	¿Como Quieres que te lo Diga?	7a+	\N	15+2	\N	\N	2021-04-25 22:57:38.397658	2021-04-25 22:57:38.410955
638	t	t	t	0	0	2	1	0	7	0	0	131	\N	Sin Obstáculos no hay Camino	6c	\N	8+2	\N	\N	2021-04-25 22:57:38.466814	2021-04-25 22:57:38.483835
639	t	t	t	0	0	2	1	0	8	0	0	131	\N	Espirulinas	7b	\N	8+2	\N	\N	2021-04-25 22:57:38.5417	2021-04-25 22:57:38.554673
640	t	t	t	0	0	2	2	0	9	0	0	131	\N	Super Espirulinas	7c+	\N	Unknown	\N	\N	2021-04-25 22:57:38.62997	2021-04-25 22:57:38.642605
641	t	\N	t	0	0	2	1	0	10	27	0	131	\N	Imponedora	6c+	\N	10+2	\N	\N	2021-04-25 22:57:38.842347	2021-04-25 22:57:38.867287
642	t	\N	t	0	0	2	1	0	11	18	0	131	\N	Unknown	7?	\N	8+2	\N	\N	2021-04-25 22:57:38.91731	2021-04-25 22:57:38.931465
643	t	\N	t	0	0	3	1	0	1	17	0	132	\N	Remedios Vencidos	6b	\N	6+2	\N	\N	2021-04-25 22:57:38.998663	2021-04-25 22:57:39.014006
644	t	\N	t	0	0	3	1	0	2	18	0	132	\N	Soplame Este Ojo	6b+	\N	7+2	\N	\N	2021-04-25 22:57:39.072688	2021-04-25 22:57:39.08916
645	t	\N	t	0	0	3	1	0	3	20	0	132	\N	No me Cambie el Contrato	6+/7-	\N	9+2	\N	\N	2021-04-25 22:57:39.141502	2021-04-25 22:57:39.156135
646	t	\N	t	0	0	3	1	0	4	14	0	132	\N	Zapatillas Mágicas	5-	\N	Unknown	\N	\N	2021-04-25 22:57:39.258028	2021-04-25 22:57:39.271892
647	t	\N	t	0	0	2	1	0	1	14	0	133	\N	La Promesa	4+	\N	Trad	\N	\N	2021-04-25 22:57:39.329014	2021-04-25 22:57:39.3413
648	t	\N	t	0	0	2	1	0	2	24	0	133	\N	Misión Cumplida	6c	\N	12+2	\N	\N	2021-04-25 22:57:39.389215	2021-04-25 22:57:39.403532
649	t	\N	t	0	0	2	1	0	3	24	0	133	\N	Deja la Koller	8-	\N	12+2	\N	\N	2021-04-25 22:57:39.455839	2021-04-25 22:57:39.473221
650	t	\N	t	0	0	2	1	0	4	24	0	133	\N	Date Cuenta	7a	\N	12+2	\N	\N	2021-04-25 22:57:39.552073	2021-04-25 22:57:39.577354
651	t	f	t	0	0	1	1	0	1	0	0	134	\N	Unknown	Unknown	\N	Unknown	\N	\N	2021-04-25 22:57:39.660407	2021-04-25 22:57:39.677471
652	t	\N	t	0	0	\N	1	0	1	16	0	135	\N	El Ocaso	6c	\N	7+2	\N	\N	2021-04-25 22:57:39.732396	2021-04-25 22:57:39.747366
653	t	\N	t	0	0	\N	1	0	2	16	0	135	\N	Ocasionalmente	6b+	\N	7+2	\N	\N	2021-04-25 22:57:39.797511	2021-04-25 22:57:39.811969
654	t	\N	t	0	0	\N	1	0	3	0	0	135	\N	Unknown	7?	\N	12+2	\N	\N	2021-04-25 22:57:39.883287	2021-04-25 22:57:39.897843
655	t	\N	t	0	0	\N	1	0	4	0	0	135	\N	El Colaila	7a	\N	10+2	\N	\N	2021-04-25 22:57:39.950405	2021-04-25 22:57:39.965578
656	t	\N	t	0	0	\N	1	0	5	0	0	135	\N	Sin Churrines	6c+	\N	8+2	\N	\N	2021-04-25 22:57:40.02175	2021-04-25 22:57:40.035765
657	t	\N	t	0	0	\N	1	0	6	0	0	135	\N	Hacela Cortita	7a+	\N	11+2	\N	\N	2021-04-25 22:57:40.085192	2021-04-25 22:57:40.099413
658	t	\N	t	0	0	\N	1	0	7	0	0	135	\N	El Calzoncillo	6b	\N	6+2	\N	\N	2021-04-25 22:57:40.14989	2021-04-25 22:57:40.16398
659	t	\N	t	0	0	\N	1	0	8	13	0	135	\N	Toque Sensual	6b+	\N	7+2	\N	\N	2021-04-25 22:57:40.231868	2021-04-25 22:57:40.247456
660	t	\N	t	0	0	\N	1	0	9	12	0	135	\N	El Diluvio	6b	\N	6+2	\N	\N	2021-04-25 22:57:40.313333	2021-04-25 22:57:40.337299
661	t	\N	t	0	0	\N	1	0	1	9	0	136	\N	La Garra	Proyecto	\N	6+2	\N	\N	2021-04-25 22:57:40.391354	2021-04-25 22:57:40.407546
662	t	\N	t	0	0	\N	1	0	2	15	0	136	\N	Chinin Mamón	6b	\N	8+2	\N	\N	2021-04-25 22:57:40.468832	2021-04-25 22:57:40.490958
663	t	\N	t	0	0	\N	1	0	3	15	0	136	\N	Chinin Monín	6a+	\N	8+2	\N	\N	2021-04-25 22:57:40.547764	2021-04-25 22:57:40.565157
664	t	\N	t	0	0	\N	1	0	4	20	0	136	\N	Voz Vela	6c	\N	13+2	\N	\N	2021-04-25 22:57:40.645422	2021-04-25 22:57:40.669209
665	t	\N	t	0	0	\N	1	0	5	15	0	136	\N	Ataca Matraca	7b	\N	7+2	\N	\N	2021-04-25 22:57:40.76275	2021-04-25 22:57:40.777608
666	t	\N	t	0	0	\N	1	0	6	\N	0	136	\N	Caupolicán	6a+	\N	Mixta	\N	\N	2021-04-25 22:57:40.835119	2021-04-25 22:57:40.849959
667	t	\N	t	0	0	\N	1	0	7	12	0	136	\N	Cuchi-Cuchi jaja	6c+	\N	5+2	\N	\N	2021-04-25 22:57:40.929483	2021-04-25 22:57:40.947326
668	t	\N	t	0	0	\N	1	0	8	33	0	136	\N	Araucano	6c	\N	Trad	\N	\N	2021-04-25 22:57:40.99862	2021-04-25 22:57:41.010365
669	t	\N	t	0	0	\N	1	0	9	\N	0	136	\N	Galán Galei	6c	\N	Trad	\N	\N	2021-04-25 22:57:41.058322	2021-04-25 22:57:41.070651
670	t	\N	t	0	0	\N	1	0	10	7	0	136	\N	Sin Pan ni Pedazo	7b+	\N	7+2	\N	\N	2021-04-25 22:57:41.124569	2021-04-25 22:57:41.139311
671	t	\N	t	0	0	\N	1	0	11	7	0	136	\N	Dias de Gloria	7b	\N	7+2	\N	\N	2021-04-25 22:57:41.196772	2021-04-25 22:57:41.210078
672	t	t	t	0	0	2	1	0	12	9	0	136	\N	Los Frutos del Ermitaño	5+	\N	9+2	\N	\N	2021-04-25 22:57:41.281528	2021-04-25 22:57:41.296536
673	t	f	f	0	0	2	1	0	13	0	0	136	\N	Unknown	Unknown	\N	Mixta	\N	\N	2021-04-25 22:57:41.350145	2021-04-25 22:57:41.361837
674	f	\N	f	0	0	2	1	0	1	\N	0	137	\N	La Guagua	7a+	\N	\N	\N	\N	2021-04-25 22:57:41.415866	2021-04-25 22:57:41.42941
675	f	\N	f	0	0	2	1	0	2	\N	0	137	\N	Tafilo	5+	\N	\N	\N	\N	2021-04-25 22:57:41.48852	2021-04-25 22:57:41.513064
676	f	\N	f	0	0	2	1	0	3	\N	0	137	\N	Proyecto	Proyecto	\N	\N	\N	\N	2021-04-25 22:57:41.585236	2021-04-25 22:57:41.607025
677	f	\N	f	0	0	2	1	0	1	\N	0	138	\N	Cumbre Ariqueña	6c+	\N	\N	\N	\N	2021-04-25 22:57:41.673419	2021-04-25 22:57:41.696113
678	f	\N	f	0	0	2	1	0	2	\N	0	138	\N	Calamesta	6b+	\N	Mixta	\N	\N	2021-04-25 22:57:41.74876	2021-04-25 22:57:41.766403
679	f	\N	f	0	0	2	1	0	3	\N	0	138	\N	Samaqiña	6c+	\N	\N	\N	\N	2021-04-25 22:57:41.833442	2021-04-25 22:57:41.8489
680	f	\N	f	0	0	2	1	0	4	\N	0	138	\N	Fucking Algebra	6b	\N	\N	\N	\N	2021-04-25 22:57:41.912831	2021-04-25 22:57:41.927563
681	f	\N	f	0	0	2	1	0	5	\N	0	138	\N	Libro Abierto	6c	\N	\N	\N	\N	2021-04-25 22:57:41.980394	2021-04-25 22:57:41.994367
682	f	\N	f	0	0	2	1	0	6	\N	0	138	\N	Proyecto	Proyecto	\N	\N	\N	\N	2021-04-25 22:57:42.046075	2021-04-25 22:57:42.059346
683	f	\N	f	0	0	2	1	0	7	\N	0	138	\N	30 Años	6b+	\N	\N	\N	\N	2021-04-25 22:57:42.120703	2021-04-25 22:57:42.137352
684	f	\N	f	0	0	2	1	0	8	\N	0	138	\N	Tu Tortura	6b	\N	\N	\N	\N	2021-04-25 22:57:42.196033	2021-04-25 22:57:42.214135
685	f	\N	f	0	0	2	1	0	9	\N	0	138	\N	Escuela	4+	\N	\N	\N	\N	2021-04-25 22:57:42.300336	2021-04-25 22:57:42.313664
686	f	\N	f	0	0	2	1	0	10	\N	0	138	\N	Chao Jefa	6b	\N	\N	\N	\N	2021-04-25 22:57:42.361326	2021-04-25 22:57:42.374147
687	f	\N	f	0	0	2	1	0	1	\N	0	139	\N	Jalama	6a	\N	\N	\N	\N	2021-04-25 22:57:42.42418	2021-04-25 22:57:42.438146
688	f	\N	f	0	0	2	1	0	2	\N	0	139	\N	Luis Pay	5+	\N	\N	\N	\N	2021-04-25 22:57:42.484406	2021-04-25 22:57:42.497142
689	f	\N	f	0	0	2	1	0	3	\N	0	139	\N	Chinito	5+	\N	\N	\N	\N	2021-04-25 22:57:42.547995	2021-04-25 22:57:42.56108
690	f	\N	f	0	0	2	1	0	4	\N	0	139	\N	La Duna	6a+	\N	\N	\N	\N	2021-04-25 22:57:42.622508	2021-04-25 22:57:42.635502
691	f	\N	f	0	0	2	1	0	5	\N	0	139	\N	Xtc "Extasis"	6c/+	\N	\N	\N	\N	2021-04-25 22:57:42.681407	2021-04-25 22:57:42.694755
692	f	\N	f	0	0	2	1	0	6	\N	0	139	\N	La Cueva del Ratón	5-	\N	\N	\N	\N	2021-04-25 22:57:42.744531	2021-04-25 22:57:42.764499
693	f	\N	f	0	0	2	1	0	7	\N	0	139	\N	América Latina	4+	\N	\N	\N	\N	2021-04-25 22:57:42.814676	2021-04-25 22:57:42.832161
694	f	\N	f	0	0	2	1	0	8	\N	0	139	\N	Lcd	6c	\N	\N	\N	\N	2021-04-25 22:57:42.895344	2021-04-25 22:57:42.908844
695	f	\N	f	0	0	2	1	0	9	\N	0	139	\N	Opio	6c+/7a	\N	\N	\N	\N	2021-04-25 22:57:42.966412	2021-04-25 22:57:42.980196
696	f	\N	f	0	0	2	1	0	1	\N	0	140	\N	Mal de Altura	6c	\N	\N	\N	\N	2021-04-25 22:57:43.035074	2021-04-25 22:57:43.048725
697	f	\N	f	0	0	2	1	0	2	\N	0	140	\N	Mente Nativa	6a+	\N	\N	\N	\N	2021-04-25 22:57:43.102333	2021-04-25 22:57:43.12094
698	f	\N	f	0	0	2	1	0	1	\N	0	141	\N	FLDSMDFR	5+	\N	\N	\N	\N	2021-04-25 22:57:43.194552	2021-04-25 22:57:43.212771
699	f	\N	f	0	0	2	1	0	2	\N	0	141	\N	Lluvia de Hamburguesas	6a	\N	\N	\N	\N	2021-04-25 22:57:43.284652	2021-04-25 22:57:43.297454
700	f	\N	f	0	0	2	1	0	3	\N	0	141	\N	La Venganza de las Sobras	5+	\N	\N	\N	\N	2021-04-25 22:57:43.355102	2021-04-25 22:57:43.368189
701	f	\N	f	0	0	2	1	0	1	\N	0	142	\N	Tostada	7b	\N	\N	\N	\N	2021-04-25 22:57:43.427147	2021-04-25 22:57:43.440345
702	f	\N	f	0	0	2	1	0	2	\N	0	142	\N	Calama yo Quelo	6c	\N	\N	\N	\N	2021-04-25 22:57:43.50028	2021-04-25 22:57:43.513085
703	f	\N	f	0	0	2	1	0	3	\N	0	142	\N	Chocolate Blanco	6b	\N	\N	\N	\N	2021-04-25 22:57:43.569282	2021-04-25 22:57:43.595624
704	f	\N	f	0	0	2	1	0	4	\N	0	142	\N	Volveré	5+	\N	\N	\N	\N	2021-04-25 22:57:43.66304	2021-04-25 22:57:43.676365
705	f	\N	f	0	0	2	1	0	5	\N	0	142	\N	Trágame Tierra	5+	\N	\N	\N	\N	2021-04-25 22:57:43.727435	2021-04-25 22:57:43.740417
706	f	\N	f	0	0	2	1	0	6	\N	0	142	\N	Para los Cagados	7a+	\N	\N	\N	\N	2021-04-25 22:57:43.790998	2021-04-25 22:57:43.80575
707	f	\N	f	0	0	2	1	0	7	\N	0	142	\N	Sin Llantos	6c+	\N	\N	\N	\N	2021-04-25 22:57:43.889947	2021-04-25 22:57:43.90608
708	f	\N	f	0	0	2	1	0	1	\N	0	143	\N	Miembro de Titán	7b	\N	\N	\N	\N	2021-04-25 22:57:43.993718	2021-04-25 22:57:44.013445
709	f	\N	f	0	0	2	1	0	2	\N	0	143	\N	Ojo de Titán	13?	\N	\N	\N	\N	2021-04-25 22:57:44.069653	2021-04-25 22:57:44.086759
710	t	\N	t	0	0	1	1	\N	1	\N	0	144	\N	La Puerta del Diablo	6b+	\N	\N	\N	\N	2021-04-25 22:57:44.140161	2021-04-25 22:57:44.158809
711	t	\N	t	0	0	1	1	\N	2	\N	0	144	\N	La Mujer de mis Sueños	7b	\N	\N	\N	\N	2021-04-25 22:57:44.234311	2021-04-25 22:57:44.248952
712	t	\N	t	0	0	1	1	\N	3	\N	0	144	\N	La Baticueva	7c+	\N	\N	\N	\N	2021-04-25 22:57:44.332023	2021-04-25 22:57:44.348514
713	t	\N	t	0	0	1	1	\N	4	\N	0	144	\N	La Cobra	Proyecto	\N	\N	\N	\N	2021-04-25 22:57:44.427454	2021-04-25 22:57:44.44084
714	t	\N	t	0	0	1	1	\N	5	\N	0	144	\N	Open Your Mind	7c	\N	\N	\N	\N	2021-04-25 22:57:44.493667	2021-04-25 22:57:44.511658
715	t	\N	t	0	0	1	1	\N	6	\N	0	144	\N	La Coqueta Asicalada	Unknown	\N	\N	\N	\N	2021-04-25 22:57:44.560199	2021-04-25 22:57:44.582516
716	t	\N	t	0	0	1	1	\N	7	\N	0	144	\N	La Unión Hace la Fuerza	Unknown	\N	\N	\N	\N	2021-04-25 22:57:44.642566	2021-04-25 22:57:44.664765
717	t	\N	t	0	0	0	1	0	1	\N	0	146	\N	Crisis Existencial	V9	\N	\N	\N	\N	2021-04-25 22:57:44.723027	2021-04-25 22:57:44.768564
718	t	\N	t	0	0	2	1	\N	1	\N	0	147	\N	La Chorrera	5-	\N	\N	\N	\N	2021-04-25 22:57:44.837175	2021-04-25 22:57:44.860743
719	t	\N	t	0	0	2	1	\N	2	\N	0	147	\N	El Español	5+	\N	\N	\N	\N	2021-04-25 22:57:44.911777	2021-04-25 22:57:44.925646
720	t	\N	t	0	0	2	1	\N	3	\N	0	147	\N	Libre de Pecado	6a+	\N	\N	\N	\N	2021-04-25 22:57:44.974964	2021-04-25 22:57:44.988822
721	t	\N	t	0	0	2	1	\N	1	\N	0	148	\N	Chiquitita Pero Peligrosa	7b+	\N	\N	\N	\N	2021-04-25 22:57:45.057083	2021-04-25 22:57:45.076422
722	t	\N	t	0	0	2	1	\N	2	\N	0	148	\N	Metale Suavecito	6c	\N	\N	\N	\N	2021-04-25 22:57:45.173905	2021-04-25 22:57:45.197141
723	t	\N	t	0	0	2	1	\N	3	\N	0	148	\N	La Fifi	6c	\N	\N	\N	\N	2021-04-25 22:57:45.250046	2021-04-25 22:57:45.264825
724	t	\N	t	0	0	2	1	\N	4	\N	0	148	\N	Kalahari	6a+	\N	\N	\N	\N	2021-04-25 22:57:45.33397	2021-04-25 22:57:45.350763
725	t	\N	t	0	0	2	1	\N	1	\N	0	149	\N	Gravity	6a	\N	\N	\N	\N	2021-04-25 22:57:45.445437	2021-04-25 22:57:45.477106
726	t	\N	t	0	0	2	1	\N	2	\N	0	149	\N	La Fisura del Pueblo	5+	\N	\N	\N	\N	2021-04-25 22:57:45.531451	2021-04-25 22:57:45.545064
727	t	\N	t	0	0	2	1	\N	3	\N	0	149	\N	La Nariz de Complite	6a+	\N	\N	\N	\N	2021-04-25 22:57:45.606945	2021-04-25 22:57:45.620278
728	t	\N	t	0	0	2	1	\N	4	\N	0	149	\N	El Peñon	6b+	\N	\N	\N	\N	2021-04-25 22:57:45.678904	2021-04-25 22:57:45.701596
729	t	\N	t	0	0	2	1	\N	5	\N	0	149	\N	Giganton	6a+	\N	\N	\N	\N	2021-04-25 22:57:45.775328	2021-04-25 22:57:45.801703
730	t	\N	t	0	0	2	1	\N	6	\N	0	149	\N	La Placa	6a+	\N	\N	\N	\N	2021-04-25 22:57:45.885681	2021-04-25 22:57:45.91352
731	t	\N	t	0	0	2	1	\N	1	\N	0	150	\N	Marito Sout	6b+	\N	Trad	\N	\N	2021-04-25 22:57:45.992909	2021-04-25 22:57:46.009272
732	t	\N	t	0	0	2	1	\N	2	\N	0	150	\N	Porca Puttana	Unknown	\N	\N	\N	\N	2021-04-25 22:57:46.073798	2021-04-25 22:57:46.099087
733	t	\N	t	0	0	2	1	\N	3	\N	0	150	\N	Sculacciare	7b+	\N	\N	\N	\N	2021-04-25 22:57:46.153771	2021-04-25 22:57:46.168443
734	t	\N	t	0	0	2	1	\N	4	\N	0	150	\N	Brother Chape	7b	\N	\N	\N	\N	2021-04-25 22:57:46.239682	2021-04-25 22:57:46.255145
735	t	\N	t	0	0	2	1	\N	5	\N	0	150	\N	Chimenea Doña	6a+	\N	Trad	\N	\N	2021-04-25 22:57:46.316023	2021-04-25 22:57:46.3292
736	t	\N	t	0	0	2	1	\N	6	\N	0	150	\N	Limpiando se Aprende	6b	\N	Trad	\N	\N	2021-04-25 22:57:46.386742	2021-04-25 22:57:46.399868
737	t	\N	t	0	0	2	1	\N	7	\N	0	150	\N	Variante	6b	\N	Trad	\N	\N	2021-04-25 22:57:46.452103	2021-04-25 22:57:46.469072
738	t	\N	t	0	0	2	1	\N	8	\N	0	150	\N	Proyecto	Proyecto	\N	\N	\N	\N	2021-04-25 22:57:46.526298	2021-04-25 22:57:46.545175
739	t	\N	t	0	0	2	1	\N	1	\N	0	151	\N	Plaquísima	Proyecto	\N	\N	\N	\N	2021-04-25 22:57:46.617901	2021-04-25 22:57:46.630051
740	t	\N	t	0	0	2	1	\N	2	\N	0	151	\N	Los Watygradistas	6c+	\N	\N	\N	\N	2021-04-25 22:57:46.66183	2021-04-25 22:57:46.674697
741	t	\N	t	0	0	2	1	\N	3	\N	0	151	\N	Amoldando el Gansito	7a	\N	\N	\N	\N	2021-04-25 22:57:46.727919	2021-04-25 22:57:46.741516
742	t	\N	t	0	0	2	1	\N	4	\N	0	151	\N	Never Die	6c	\N	Trad	\N	\N	2021-04-25 22:57:46.80489	2021-04-25 22:57:46.817439
743	t	\N	t	0	0	2	1	\N	5	\N	0	151	\N	Green Crack	6a+	\N	Trad	\N	\N	2021-04-25 22:57:46.885557	2021-04-25 22:57:46.897267
744	t	\N	t	0	0	2	1	\N	6	\N	0	151	\N	Proyecto	Proyecto	\N	\N	\N	\N	2021-04-25 22:57:46.947052	2021-04-25 22:57:46.960598
745	f	\N	t	0	0	0	1	0	1	\N	0	152	\N	Proyecto	Proyecto	\N	\N	\N	\N	2021-04-25 22:57:47.025252	2021-04-25 22:57:47.042075
746	f	\N	t	0	0	0	1	0	2	\N	0	152	\N	Levitando con Suspenso	Proyecto	\N	\N	\N	\N	2021-04-25 22:57:47.105786	2021-04-25 22:57:47.119746
747	f	\N	t	0	0	0	1	0	3	\N	0	152	\N	Trabajo para la Casa	Proyecto	\N	\N	\N	\N	2021-04-25 22:57:47.174329	2021-04-25 22:57:47.191713
748	f	\N	t	0	0	0	1	0	4	\N	0	152	\N	La Danza del Tiempo	7a	\N	\N	\N	\N	2021-04-25 22:57:47.263835	2021-04-25 22:57:47.277336
749	f	\N	t	0	0	0	1	0	5	\N	0	152	\N	Proyecto	Proyecto	\N	\N	\N	\N	2021-04-25 22:57:47.329806	2021-04-25 22:57:47.355914
750	f	\N	t	0	0	0	1	0	6	\N	0	152	\N	Shut Up	8a	\N	\N	\N	\N	2021-04-25 22:57:47.410609	2021-04-25 22:57:47.43613
751	f	\N	t	0	0	0	1	0	7	\N	0	152	\N	La Chimenea Egoista	Proyecto	\N	\N	\N	\N	2021-04-25 22:57:47.488897	2021-04-25 22:57:47.504183
752	f	\N	t	0	0	0	1	0	8	\N	0	152	\N	Stopping Magmático	8a	\N	\N	\N	\N	2021-04-25 22:57:47.558359	2021-04-25 22:57:47.573185
753	f	\N	t	0	0	0	1	0	9	\N	0	152	\N	Stopping Sopletero Variante	8a+	\N	\N	\N	\N	2021-04-25 22:57:47.657221	2021-04-25 22:57:47.67114
754	t	\N	t	0	0	2	1	0	1	\N	0	153	\N	Unknown	6a+	\N	\N	\N	\N	2021-04-25 22:57:47.728851	2021-04-25 22:57:47.742217
755	t	\N	t	0	0	2	1	0	2	\N	0	153	\N	Unknown	6c+	\N	\N	\N	\N	2021-04-25 22:57:47.814438	2021-04-25 22:57:47.837362
756	t	\N	t	0	0	2	1	0	3	\N	0	153	\N	Proyecto	Proyecto	\N	\N	\N	\N	2021-04-25 22:57:47.901103	2021-04-25 22:57:47.914812
757	t	t	t	0	0	2	1	0	4	\N	0	154	\N	Carbono 14	7a+	\N	\N	\N	\N	2021-04-25 22:57:47.972833	2021-04-25 22:57:47.987851
758	t	f	t	0	0	2	1	0	5	\N	0	154	\N	Laarisca	6a+	\N	\N	\N	\N	2021-04-25 22:57:48.064922	2021-04-25 22:57:48.079415
759	t	t	t	0	0	2	1	0	6	\N	0	154	\N	Hasta las Nubes	6a+/b	\N	\N	\N	\N	2021-04-25 22:57:48.150938	2021-04-25 22:57:48.164819
760	t	f	t	0	0	2	1	0	7	\N	0	154	\N	El Puzzle	6b+	\N	\N	\N	\N	2021-04-25 22:57:48.357745	2021-04-25 22:57:48.371114
761	t	t	t	0	0	2	1	0	8	\N	0	154	\N	Al Amish	6c	\N	\N	\N	\N	2021-04-25 22:57:48.42802	2021-04-25 22:57:48.45556
762	t	t	t	0	0	2	1	0	9	\N	0	154	\N	Unknown	7a+	\N	\N	\N	\N	2021-04-25 22:57:48.52175	2021-04-25 22:57:48.551675
763	t	f	t	0	0	2	1	0	10	\N	0	154	\N	Unknown	6b	\N	\N	\N	\N	2021-04-25 22:57:48.606122	2021-04-25 22:57:48.619846
764	t	f	t	0	0	2	1	0	11	\N	0	154	\N	Amalgama	6b	\N	\N	\N	\N	2021-04-25 22:57:48.68316	2021-04-25 22:57:48.698512
765	t	\N	t	0	0	2	1	0	12	\N	0	155	\N	El Jote	6a+	\N	\N	\N	\N	2021-04-25 22:57:48.806901	2021-04-25 22:57:48.838263
766	t	\N	t	0	0	2	1	0	13	\N	0	155	\N	El Arquitecto	6a	\N	\N	\N	\N	2021-04-25 22:57:48.913657	2021-04-25 22:57:48.935238
767	t	t	t	0	0	2	1	\N	1	\N	0	156	\N	No Alto Maipo	7c	\N	\N	\N	\N	2021-04-25 22:57:48.999698	2021-04-25 22:57:49.022489
768	t	f	t	0	0	2	1	\N	2	\N	0	156	\N	Cola de León	Proyecto	\N	\N	\N	\N	2021-04-25 22:57:49.089564	2021-04-25 22:57:49.111705
769	t	f	t	0	0	2	1	\N	3	\N	0	156	\N	Cabeza de Ratón	Proyecto	\N	\N	\N	\N	2021-04-25 22:57:49.193133	2021-04-25 22:57:49.223139
770	t	t	t	0	0	2	1	\N	4	\N	0	156	\N	El Mero	7b+	\N	\N	\N	\N	2021-04-25 22:57:49.324474	2021-04-25 22:57:49.339391
771	t	t	t	0	0	2	1	\N	5	\N	0	156	\N	A lo Vizcacha	6c+	\N	\N	\N	\N	2021-04-25 22:57:49.387639	2021-04-25 22:57:49.402522
772	t	f	t	0	0	2	1	\N	6	\N	0	156	\N	Nadie Sabe para Quien Trabaja	Proyecto	\N	\N	\N	\N	2021-04-25 22:57:49.475157	2021-04-25 22:57:49.488686
773	t	t	t	0	0	2	1	\N	7	\N	0	156	\N	Astro Tour	7b+	\N	\N	\N	\N	2021-04-25 22:57:49.544733	2021-04-25 22:57:49.558519
774	t	f	t	0	0	2	1	\N	8	\N	0	156	\N	Desayuno de Campeones	Proyecto	\N	\N	\N	\N	2021-04-25 22:57:49.61948	2021-04-25 22:57:49.633349
775	t	t	t	0	0	2	1	\N	9	\N	0	156	\N	Entrepiernas	7a+	\N	\N	\N	\N	2021-04-25 22:57:49.693417	2021-04-25 22:57:49.713225
776	t	f	t	0	0	2	1	\N	10	\N	0	156	\N	La Hermana Gladys	Proyecto	\N	\N	\N	\N	2021-04-25 22:57:49.801343	2021-04-25 22:57:49.816932
777	t	f	t	0	0	2	1	\N	11	\N	0	157	\N	Domingo Zárate Vega	7c	\N	\N	\N	\N	2021-04-25 22:57:49.889851	2021-04-25 22:57:49.906513
778	t	f	t	0	0	2	1	\N	12	\N	0	157	\N	Profeta en su Tierra	Proyecto	\N	\N	\N	\N	2021-04-25 22:57:49.954305	2021-04-25 22:57:49.966959
779	t	t	t	0	0	2	3	\N	13	\N	0	157	\N	El Largo Sueño de Ceratti	7b	\N	\N	\N	\N	2021-04-25 22:57:50.014243	2021-04-25 22:57:50.027552
780	t	t	t	0	0	2	4	\N	14	110	0	157	\N	Vida de Perros	7a+	\N	\N	\N	\N	2021-04-25 22:57:50.08401	2021-04-25 22:57:50.096174
781	t	f	t	0	0	2	3	\N	15	\N	0	157	\N	Perro Viejo	Unknown	\N	\N	\N	\N	2021-04-25 22:57:50.169757	2021-04-25 22:57:50.201317
782	t	f	t	0	0	2	1	\N	16	\N	0	157	\N	El Maestro de la Seducción	Proyecto	\N	\N	\N	\N	2021-04-25 22:57:50.302119	2021-04-25 22:57:50.325397
783	t	t	t	0	0	2	1	\N	17	\N	0	157	\N	Control Mental	6c+	\N	\N	\N	\N	2021-04-25 22:57:50.386983	2021-04-25 22:57:50.399882
784	t	f	t	0	0	2	2	\N	18	\N	0	157	\N	Cuchufleta Mística	Proyecto	\N	\N	\N	\N	2021-04-25 22:57:50.453615	2021-04-25 22:57:50.467841
785	t	f	t	0	0	2	1	\N	19	\N	0	157	\N	La Plegaria de Gonzalez	Proyecto	\N	\N	\N	\N	2021-04-25 22:57:50.557777	2021-04-25 22:57:50.576905
786	t	f	t	0	0	2	1	\N	20	\N	0	157	\N	A lo Hecho, Techo	7a+	\N	\N	\N	\N	2021-04-25 22:57:50.642589	2021-04-25 22:57:50.656387
787	t	f	t	0	0	2	1	\N	21	\N	0	157	\N	Hechando a Perder se Aprende	5+	\N	\N	\N	\N	2021-04-25 22:57:50.705332	2021-04-25 22:57:50.717195
788	t	f	t	0	0	2	1	\N	22	\N	0	157	\N	El Silencio Interno	6b	\N	\N	\N	\N	2021-04-25 22:57:50.777149	2021-04-25 22:57:50.795498
789	t	f	t	0	0	2	1	\N	23	\N	0	157	\N	Desierto Florido	5-	\N	\N	\N	\N	2021-04-25 22:57:50.853683	2021-04-25 22:57:50.868112
790	t	f	t	0	0	2	1	\N	24	\N	0	157	\N	El Cesante	4+	\N	\N	\N	\N	2021-04-25 22:57:50.916803	2021-04-25 22:57:50.928848
791	t	f	t	0	0	2	2	\N	25	\N	0	157	\N	Perro que Ladra	5+	\N	\N	\N	\N	2021-04-25 22:57:50.98415	2021-04-25 22:57:51.000809
792	t	f	t	0	0	2	1	\N	1	\N	0	158	\N	Capitán Cavernícola	7b+	\N	\N	\N	\N	2021-04-25 22:57:51.081769	2021-04-25 22:57:51.094894
793	t	f	t	0	0	2	1	\N	2	\N	0	158	\N	Juana 3 Cocos	6c	\N	\N	\N	\N	2021-04-25 22:57:51.154197	2021-04-25 22:57:51.170431
794	t	f	t	0	0	2	1	\N	3	\N	0	158	\N	Sangre de Lonko	6a	\N	\N	\N	\N	2021-04-25 22:57:51.253885	2021-04-25 22:57:51.267209
795	t	f	t	0	0	2	1	\N	4	\N	0	158	\N	No me Pellizque la Uva	6a+	\N	\N	\N	\N	2021-04-25 22:57:51.327858	2021-04-25 22:57:51.341209
796	t	t	t	0	0	2	1	\N	5	\N	0	158	\N	Grande Tronco	7b+	\N	\N	\N	\N	2021-04-25 22:57:51.386885	2021-04-25 22:57:51.403871
797	t	t	t	0	0	2	1	\N	6	\N	0	158	\N	Abowaldo del Diablo	7a+	\N	\N	\N	\N	2021-04-25 22:57:51.451658	2021-04-25 22:57:51.464937
798	t	f	t	0	0	2	1	\N	7	26	0	158	\N	El Guerrero Multiorgásmico	7a	\N	\N	\N	\N	2021-04-25 22:57:51.51191	2021-04-25 22:57:51.525411
799	t	t	t	0	0	1	1	\N	8	26	0	158	\N	Mascarón de Proa	7c	\N	\N	\N	\N	2021-04-25 22:57:51.572278	2021-04-25 22:57:51.586325
800	t	f	t	0	0	2	1	\N	9	25	0	158	\N	Cumpleaños de Monos	6b	\N	\N	\N	\N	2021-04-25 22:57:51.632646	2021-04-25 22:57:51.647111
801	t	t	t	0	0	2	1	\N	1	\N	0	159	\N	Gran Pez	7a+	\N	\N	\N	\N	2021-04-25 22:57:51.753995	2021-04-25 22:57:51.769623
802	t	f	t	0	0	2	1	\N	2	\N	0	159	\N	Caballo Muerto	6b+	\N	\N	\N	\N	2021-04-25 22:57:51.845917	2021-04-25 22:57:51.867791
803	t	f	t	0	0	2	1	\N	3	\N	0	159	\N	Enzo's Way	6a	\N	\N	\N	\N	2021-04-25 22:57:51.94166	2021-04-25 22:57:51.953935
804	t	f	t	0	0	2	1	\N	4	\N	0	159	\N	Rio de Piedras	4-	\N	\N	\N	\N	2021-04-25 22:57:51.999573	2021-04-25 22:57:52.013894
805	t	f	t	0	0	2	1	\N	5	\N	0	159	\N	NN	6a	\N	\N	\N	\N	2021-04-25 22:57:52.060735	2021-04-25 22:57:52.077384
806	t	f	t	0	0	2	1	\N	6	\N	0	159	\N	A Buey Viejo	7a	\N	\N	\N	\N	2021-04-25 22:57:52.124401	2021-04-25 22:57:52.141325
807	t	f	t	0	0	2	1	\N	7	\N	0	159	\N	En el Pais de los Ciegos	6b	\N	\N	\N	\N	2021-04-25 22:57:52.239455	2021-04-25 22:57:52.255164
808	t	f	t	0	0	2	1	\N	8	\N	0	159	\N	Todos los Monos Bailan	6a	\N	\N	\N	\N	2021-04-25 22:57:52.31044	2021-04-25 22:57:52.327245
809	t	t	t	0	0	2	1	\N	9	\N	0	159	\N	Profesora de Yoga	6b+	\N	\N	\N	\N	2021-04-25 22:57:52.381386	2021-04-25 22:57:52.402739
810	t	f	t	0	0	2	1	\N	10	\N	0	159	\N	Anaconda	6b	\N	\N	\N	\N	2021-04-25 22:57:52.464466	2021-04-25 22:57:52.483858
811	t	f	t	0	0	2	1	\N	11	\N	0	159	\N	NN	Proyecto	\N	\N	\N	\N	2021-04-25 22:57:52.539457	2021-04-25 22:57:52.55251
812	t	f	t	0	0	2	1	\N	12	\N	0	159	\N	El Espermio Cojo	6a+	\N	\N	\N	\N	2021-04-25 22:57:52.613349	2021-04-25 22:57:52.636715
813	t	f	t	0	0	2	1	\N	13	\N	0	159	\N	Vuelo del Avestruz	6b	\N	\N	\N	\N	2021-04-25 22:57:52.681424	2021-04-25 22:57:52.693798
814	t	t	t	0	0	2	1	\N	14	\N	0	159	\N	El Arco de Orión	6b+	\N	\N	\N	\N	2021-04-25 22:57:52.740439	2021-04-25 22:57:52.754105
815	t	f	t	0	0	2	2	\N	15	\N	0	159	\N	Caballo Muerto	5-	\N	\N	\N	\N	2021-04-25 22:57:52.817549	2021-04-25 22:57:52.831006
816	t	t	t	0	0	2	1	\N	16	\N	0	159	\N	Estrella Fugaz	5+	\N	\N	\N	\N	2021-04-25 22:57:52.912952	2021-04-25 22:57:52.926885
817	t	f	t	0	0	2	1	\N	17	\N	0	159	\N	Callejón Oscuro	5+ X	\N	\N	\N	\N	2021-04-25 22:57:52.992987	2021-04-25 22:57:53.005249
818	t	t	t	0	0	2	2	\N	18	\N	0	159	\N	Piel Roja	6a	\N	\N	\N	\N	2021-04-25 22:57:53.062912	2021-04-25 22:57:53.077914
819	t	t	t	0	0	2	2	\N	19	\N	0	159	\N	Perro Verde	6c+	\N	\N	\N	\N	2021-04-25 22:57:53.161328	2021-04-25 22:57:53.176841
820	t	f	t	0	0	3	1	\N	1	\N	0	160	\N	Cicciolina	5-	\N	\N	\N	\N	2021-04-25 22:57:53.247265	2021-04-25 22:57:53.263252
821	t	f	t	0	0	3	1	\N	2	\N	0	160	\N	Mala Junta	6a+	\N	\N	\N	\N	2021-04-25 22:57:53.316106	2021-04-25 22:57:53.331287
822	t	f	t	0	0	3	1	\N	3	\N	0	160	\N	Maestro Rochi	6a+	\N	\N	\N	\N	2021-04-25 22:57:53.385351	2021-04-25 22:57:53.399316
823	t	f	t	0	0	3	1	\N	4	\N	0	160	\N	Mr Satán	6a	\N	\N	\N	\N	2021-04-25 22:57:53.454062	2021-04-25 22:57:53.468375
824	t	f	t	0	0	3	1	\N	5	\N	0	160	\N	Chapulin Colorado	5+	\N	\N	\N	\N	2021-04-25 22:57:53.51714	2021-04-25 22:57:53.533621
825	t	f	t	0	0	2	1	\N	1	\N	0	161	\N	Bailahuen	6b	\N	\N	\N	\N	2021-04-25 22:57:53.617795	2021-04-25 22:57:53.635319
826	t	f	t	0	0	2	1	\N	2	\N	0	161	\N	La Turca	6c	\N	\N	\N	\N	2021-04-25 22:57:53.68985	2021-04-25 22:57:53.703322
827	t	f	t	0	0	2	1	\N	3	\N	0	161	\N	De Espalda al Loro	7a	\N	\N	\N	\N	2021-04-25 22:57:53.757282	2021-04-25 22:57:53.780632
828	t	f	t	0	0	2	1	\N	4	\N	0	161	\N	Circo Pobre	7b	\N	\N	\N	\N	2021-04-25 22:57:53.844893	2021-04-25 22:57:53.876538
829	t	f	t	0	0	2	1	\N	5	\N	0	161	\N	Serpiente Enplumada	7a	\N	\N	\N	\N	2021-04-25 22:57:53.939266	2021-04-25 22:57:53.953559
830	t	f	t	0	0	2	1	\N	1	\N	0	162	\N	El Paraiso del Burro	6b	\N	\N	\N	\N	2021-04-25 22:57:54.00764	2021-04-25 22:57:54.01933
831	t	t	t	0	0	2	1	\N	2	\N	0	162	\N	Mono Con Navaja	6c	\N	\N	\N	\N	2021-04-25 22:57:54.070671	2021-04-25 22:57:54.097231
832	t	f	t	0	0	2	1	\N	3	\N	0	162	\N	NN	Proyecto	\N	\N	\N	\N	2021-04-25 22:57:54.161066	2021-04-25 22:57:54.172473
833	t	f	t	0	0	2	1	\N	4	\N	0	162	\N	NN	Proyecto	\N	\N	\N	\N	2021-04-25 22:57:54.238192	2021-04-25 22:57:54.250231
834	t	f	t	0	0	2	7	\N	5	500	0	162	\N	Hipie Atrapado	5+	\N	\N	\N	\N	2021-04-25 22:57:54.297464	2021-04-25 22:57:54.31047
835	t	f	t	0	0	3	2	\N	1	70	0	163	\N	Dale Color	6a	\N	\N	\N	\N	2021-04-25 22:57:54.362931	2021-04-25 22:57:54.375042
836	t	f	t	0	0	3	2	\N	2	80	0	163	\N	El Sr. Sindicalista	6b	\N	\N	\N	\N	2021-04-25 22:57:54.443753	2021-04-25 22:57:54.455991
837	t	\N	t	0	0	2	1	\N	1	\N	0	164	\N	Unknown	Unknown	\N	\N	\N	\N	2021-04-25 22:57:54.528344	2021-04-25 22:57:54.541182
838	t	\N	t	0	0	2	1	\N	2	\N	0	164	\N	Sirenas de Montaña	Unknown	\N	\N	\N	\N	2021-04-25 22:57:54.573552	2021-04-25 22:57:54.587933
839	t	\N	t	0	0	2	1	\N	3	\N	0	164	\N	Viste que te Quiere	6b	\N	\N	\N	\N	2021-04-25 22:57:54.629145	2021-04-25 22:57:54.660329
840	t	\N	t	0	0	2	1	\N	4	\N	0	165	\N	Por Ella	6a	\N	\N	\N	\N	2021-04-25 22:57:54.695287	2021-04-25 22:57:54.707463
841	t	\N	t	0	0	2	1	\N	5	\N	0	165	\N	Unknown	6a+	\N	\N	\N	\N	2021-04-25 22:57:54.739986	2021-04-25 22:57:54.75138
842	t	\N	t	0	0	2	1	\N	6	\N	0	165	\N	Cocos Pelaos	6c	\N	\N	\N	\N	2021-04-25 22:57:54.789589	2021-04-25 22:57:54.809642
843	t	\N	t	0	0	2	1	\N	7	\N	0	165	\N	La Suelta	6a R	\N	\N	\N	\N	2021-04-25 22:57:54.846547	2021-04-25 22:57:54.865119
844	t	\N	t	0	0	2	1	\N	8	\N	0	165	\N	Unknown	6b	\N	\N	\N	\N	2021-04-25 22:57:54.911837	2021-04-25 22:57:54.925846
845	t	\N	t	0	0	2	1	\N	9	\N	0	165	\N	Escoliosis	6a+	\N	\N	\N	\N	2021-04-25 22:57:54.954101	2021-04-25 22:57:54.965936
846	t	\N	t	0	0	2	1	\N	10	\N	0	165	\N	Todo Bueno Mono	6c+	\N	\N	\N	\N	2021-04-25 22:57:55.01936	2021-04-25 22:57:55.032113
847	t	\N	t	0	0	2	1	\N	11	\N	0	166	\N	Unknown	Unknown	\N	\N	\N	\N	2021-04-25 22:57:55.067742	2021-04-25 22:57:55.085523
848	t	\N	t	0	0	2	1	\N	12	\N	0	166	\N	Unknown	Unknown	\N	\N	\N	\N	2021-04-25 22:57:55.116044	2021-04-25 22:57:55.129424
849	t	\N	t	0	0	2	1	\N	1	\N	0	167	\N	Agarre Húmedo	6b	\N	\N	\N	\N	2021-04-25 22:57:55.164378	2021-04-25 22:57:55.180726
850	t	\N	t	0	0	2	1	\N	2	\N	0	167	\N	Deo en el Hoyo	6c+	\N	\N	\N	\N	2021-04-25 22:57:55.241927	2021-04-25 22:57:55.270592
851	t	\N	t	0	0	2	1	\N	3	\N	0	167	\N	La del Medio	6b+	\N	\N	\N	\N	2021-04-25 22:57:55.321609	2021-04-25 22:57:55.344074
852	t	\N	t	0	0	2	1	\N	4	\N	0	167	\N	Patita al Hombro	6c	\N	\N	\N	\N	2021-04-25 22:57:55.423078	2021-04-25 22:57:55.435798
853	t	\N	t	0	0	2	1	\N	5	\N	0	167	\N	Punto G	7a	\N	\N	\N	\N	2021-04-25 22:57:55.492336	2021-04-25 22:57:55.506007
854	t	\N	t	0	0	2	1	\N	6	\N	0	167	\N	La Travesía	6c+	\N	\N	\N	\N	2021-04-25 22:57:55.55361	2021-04-25 22:57:55.569389
855	t	\N	t	0	0	2	1	\N	1	\N	0	168	\N	Unknown	5+	\N	\N	\N	\N	2021-04-25 22:57:55.646932	2021-04-25 22:57:55.66002
856	t	\N	t	0	0	2	1	\N	2	\N	0	168	\N	Unknown	5-	\N	\N	\N	\N	2021-04-25 22:57:55.726613	2021-04-25 22:57:55.742287
857	t	\N	t	0	0	2	1	\N	3	\N	0	168	\N	Unknown	5+	\N	\N	\N	\N	2021-04-25 22:57:55.790694	2021-04-25 22:57:55.806989
858	t	\N	t	0	0	2	1	\N	4	\N	0	168	\N	Unknown	6a	\N	\N	\N	\N	2021-04-25 22:57:55.879832	2021-04-25 22:57:55.893754
859	t	\N	t	0	0	2	1	\N	5	\N	0	168	\N	Unknown	6a	\N	\N	\N	\N	2021-04-25 22:57:55.959845	2021-04-25 22:57:55.974573
860	t	\N	t	0	0	2	1	\N	1	\N	0	169	\N	Unknown	5-	\N	\N	\N	\N	2021-04-25 22:57:56.029171	2021-04-25 22:57:56.041275
861	t	\N	t	0	0	2	1	\N	2	\N	0	169	\N	Unknown	4+	\N	\N	\N	\N	2021-04-25 22:57:56.100583	2021-04-25 22:57:56.15295
862	t	\N	t	0	0	2	0	\N	1	\N	0	170	\N	Unknown	V2	\N	\N	\N	\N	2021-04-25 22:57:56.209298	2021-04-25 22:57:56.222596
863	t	\N	t	0	0	2	0	\N	2	\N	0	170	\N	Unknown	V2	\N	\N	\N	\N	2021-04-25 22:57:56.281174	2021-04-25 22:57:56.293761
864	t	\N	t	0	0	1	0	\N	1	\N	0	171	\N	Niño Washo con Dolorub	V3	\N	\N	\N	\N	2021-04-25 22:57:56.346254	2021-04-25 22:57:56.358615
865	t	\N	t	0	0	2	1	\N	1	\N	0	172	\N	Dos Escaladas y un Trio	5+	\N	\N	\N	\N	2021-04-25 22:57:56.418137	2021-04-25 22:57:56.436884
866	t	\N	t	0	0	2	1	\N	2	\N	0	172	\N	Escaleralapino	6a	\N	\N	\N	\N	2021-04-25 22:57:56.513766	2021-04-25 22:57:56.527624
867	t	\N	t	0	0	2	1	\N	3	\N	0	172	\N	La Removible	6a+	\N	\N	\N	\N	2021-04-25 22:57:56.586102	2021-04-25 22:57:56.601496
868	t	\N	t	0	0	2	1	\N	4	\N	0	172	\N	Pan con Jamón y Queso	6b	\N	\N	\N	\N	2021-04-25 22:57:56.684311	2021-04-25 22:57:56.697336
869	t	\N	t	0	0	2	1	\N	5	\N	0	172	\N	Bienvenido a Coliumo	6a	\N	\N	\N	\N	2021-04-25 22:57:56.777976	2021-04-25 22:57:56.790837
870	t	\N	t	0	0	2	1	\N	6	\N	0	172	\N	Jugo de Manzana	6b	\N	\N	\N	\N	2021-04-25 22:57:56.877609	2021-04-25 22:57:56.90132
871	t	\N	t	0	0	2	1	\N	7	\N	0	172	\N	El Bouldercito	6b	\N	\N	\N	\N	2021-04-25 22:57:56.978329	2021-04-25 22:57:56.989646
872	f	\N	t	0	0	2	1	0	1	\N	0	173	\N	Unknown	7a	\N	\N	\N	\N	2021-04-25 22:57:57.057403	2021-04-25 22:57:57.085414
873	f	\N	t	0	0	2	1	0	1	\N	0	174	\N	Unknown	5-	\N	Trad	Off Width	\N	2021-04-25 22:57:57.157143	2021-04-25 22:57:57.16879
874	f	\N	t	0	0	2	1	0	2	\N	0	174	\N	Unknown	6c	\N	\N	\N	\N	2021-04-25 22:57:57.221638	2021-04-25 22:57:57.242659
875	f	\N	t	0	0	2	1	0	3	\N	0	174	\N	Unknown	5-	\N	Trad	\N	\N	2021-04-25 22:57:57.315559	2021-04-25 22:57:57.360615
876	f	\N	t	0	0	2	1	0	4	\N	0	174	\N	Unknown	5-	\N	Trad	\N	\N	2021-04-25 22:57:57.424945	2021-04-25 22:57:57.437328
877	f	\N	t	0	0	2	1	0	5	\N	0	174	\N	Unknown	6b+	\N	\N	\N	\N	2021-04-25 22:57:57.497672	2021-04-25 22:57:57.511049
878	f	\N	t	0	0	2	1	0	6	\N	0	174	\N	Unknown	5-	\N	Trad	\N	\N	2021-04-25 22:57:57.561694	2021-04-25 22:57:57.577331
879	f	\N	t	0	0	2	1	0	7	\N	0	174	\N	Unknown	5-	\N	Trad	\N	\N	2021-04-25 22:57:57.633329	2021-04-25 22:57:57.661081
880	f	\N	t	0	0	2	1	0	1	\N	0	175	\N	Unknown	6a	\N	Trad	\N	\N	2021-04-25 22:57:57.73313	2021-04-25 22:57:57.765061
881	f	\N	t	0	0	2	1	0	2	\N	0	175	\N	Unknown	6a	\N	Trad	\N	\N	2021-04-25 22:57:57.820556	2021-04-25 22:57:57.844962
882	f	\N	t	0	0	2	1	0	3	\N	0	175	\N	Unknown	5+	\N	Trad	\N	\N	2021-04-25 22:57:57.922559	2021-04-25 22:57:57.937482
883	f	\N	t	0	0	2	1	0	4	\N	0	175	\N	Unknown	5+	\N	Trad	\N	\N	2021-04-25 22:57:58.015726	2021-04-25 22:57:58.035538
884	f	\N	t	0	0	2	1	0	5	\N	0	175	\N	Unknown	6a	\N	Trad	\N	\N	2021-04-25 22:57:58.097392	2021-04-25 22:57:58.110039
885	f	\N	t	0	0	2	1	0	6	\N	0	175	\N	Unknown	5+	\N	Trad	\N	\N	2021-04-25 22:57:58.16214	2021-04-25 22:57:58.179507
886	f	\N	t	0	0	2	1	0	7	\N	0	175	\N	Unknown	6a	\N	Trad	\N	\N	2021-04-25 22:57:58.258372	2021-04-25 22:57:58.272065
887	f	\N	t	0	0	2	1	0	8	\N	0	175	\N	Unknown	6a	\N	Trad	\N	\N	2021-04-25 22:57:58.345762	2021-04-25 22:57:58.362045
888	f	\N	t	0	0	2	1	0	1	\N	0	176	\N	Unknown	6c	\N	\N	\N	\N	2021-04-25 22:57:58.413785	2021-04-25 22:57:58.429703
889	f	\N	t	0	0	2	1	0	2	\N	0	176	\N	Unknown	6c+	\N	\N	\N	\N	2021-04-25 22:57:58.482868	2021-04-25 22:57:58.497414
890	f	\N	t	0	0	2	1	0	3	\N	0	176	\N	Unknown	7a	\N	\N	\N	\N	2021-04-25 22:57:58.56348	2021-04-25 22:57:58.579103
891	f	\N	t	0	0	2	1	0	4	\N	0	176	\N	Unknown	7a	\N	\N	\N	\N	2021-04-25 22:57:58.661645	2021-04-25 22:57:58.685067
892	f	\N	t	0	0	2	1	0	1	\N	0	177	\N	Unknown	5-	\N	Trad	\N	\N	2021-04-25 22:57:58.748473	2021-04-25 22:57:58.761155
893	f	\N	t	0	0	2	1	0	2	\N	0	177	\N	Unknown	6a	\N	Trad	\N	\N	2021-04-25 22:57:58.813549	2021-04-25 22:57:58.825621
894	f	\N	t	0	0	2	1	0	3	\N	0	177	\N	Unknown	5+	\N	Trad	\N	\N	2021-04-25 22:57:58.889438	2021-04-25 22:57:58.905279
895	f	\N	t	0	0	2	1	0	4	\N	0	177	\N	Unknown	5+	\N	Trad	\N	\N	2021-04-25 22:57:58.976737	2021-04-25 22:57:58.988772
896	f	\N	t	0	0	2	1	0	5	\N	0	177	\N	Unknown	6a+	\N	Trad	\N	\N	2021-04-25 22:57:59.041645	2021-04-25 22:57:59.054048
897	f	\N	t	0	0	2	1	0	6	\N	0	177	\N	Unknown	6c+	\N	8+2	\N	\N	2021-04-25 22:57:59.136537	2021-04-25 22:57:59.151254
898	f	\N	t	0	0	2	1	0	7	\N	0	177	\N	Unknown	5+	\N	Trad	Con Reunión	\N	2021-04-25 22:57:59.203883	2021-04-25 22:57:59.259301
899	f	\N	t	0	0	2	1	0	8	\N	0	177	\N	Unknown	Proyecto	\N	8+2	\N	\N	2021-04-25 22:57:59.321174	2021-04-25 22:57:59.335388
900	f	\N	t	0	0	2	1	0	9	\N	0	177	\N	Unknown	Proyecto	\N	Mixta	\N	\N	2021-04-25 22:57:59.391591	2021-04-25 22:57:59.405851
901	f	\N	t	0	0	2	1	0	10	\N	0	177	\N	Los Care Flecha	7a+	\N	10+2	\N	\N	2021-04-25 22:57:59.455343	2021-04-25 22:57:59.469729
902	f	\N	t	0	0	2	1	0	11	\N	0	177	\N	Unknown	Unknown	\N	Trad	Con Reunión	\N	2021-04-25 22:57:59.517899	2021-04-25 22:57:59.530298
903	f	\N	t	0	0	2	1	0	12	\N	0	177	\N	Unknown	5+	\N	Trad	Con Reunión	\N	2021-04-25 22:57:59.599839	2021-04-25 22:57:59.613339
904	f	\N	t	0	0	2	1	0	13	25	0	177	\N	Unknown	6b	\N	12+2	\N	\N	2021-04-25 22:57:59.678053	2021-04-25 22:57:59.701001
905	f	\N	t	0	0	2	1	0	14	\N	0	177	\N	Unknown	Proyecto	\N	9+2	\N	\N	2021-04-25 22:57:59.747919	2021-04-25 22:57:59.760865
906	f	\N	t	0	0	2	1	0	15	\N	0	177	\N	Unknown	Proyecto	\N	Trad	Con Reunión	\N	2021-04-25 22:57:59.819357	2021-04-25 22:57:59.832487
907	f	\N	t	0	0	2	1	0	16	\N	0	177	\N	Los Care Flecha	Proyecto	\N	9+2	\N	\N	2021-04-25 22:57:59.912157	2021-04-25 22:57:59.926968
908	t	\N	t	1	0	2	1	0	1	\N	0	178	\N	La Abeja no me Deja	5+	\N	\N	\N	\N	2021-04-25 22:57:59.981427	2021-04-25 22:57:59.995119
909	t	\N	t	0	0	2	1	0	2	\N	0	178	\N	No se ni Quiero Saberlo	5+	\N	\N	\N	\N	2021-04-25 22:58:00.088877	2021-04-25 22:58:00.105208
910	t	\N	t	0	0	2	1	0	3	\N	0	178	\N	Malagueña Salerosa	5+	\N	\N	\N	\N	2021-04-25 22:58:00.166652	2021-04-25 22:58:00.180032
911	t	\N	t	0	0	2	1	0	4	\N	0	178	\N	Vieja Loca	6a+	\N	\N	\N	\N	2021-04-25 22:58:00.256078	2021-04-25 22:58:00.281169
912	t	\N	t	0	0	2	1	0	5	\N	0	178	\N	Calambrito	6a+	\N	\N	\N	\N	2021-04-25 22:58:00.393352	2021-04-25 22:58:00.407054
913	t	\N	t	0	0	2	1	0	6	\N	0	178	\N	Como Agua para Chocolate	6a	\N	\N	\N	\N	2021-04-25 22:58:00.473189	2021-04-25 22:58:00.487012
914	t	\N	t	0	0	2	1	0	1	\N	0	179	\N	La Corta	4+	\N	\N	\N	\N	2021-04-25 22:58:00.540644	2021-04-25 22:58:00.559432
915	t	\N	t	0	0	2	1	0	2	30	0	179	\N	Flor de Chile	5+	\N	\N	\N	\N	2021-04-25 22:58:00.617304	2021-04-25 22:58:00.635507
916	t	\N	t	0	0	2	1	0	3	30	0	179	\N	Pantalón	6a	\N	\N	\N	\N	2021-04-25 22:58:00.801645	2021-04-25 22:58:00.825346
917	t	\N	t	0	0	2	1	0	4	30	0	179	\N	Unknown	6a+	\N	\N	\N	\N	2021-04-25 22:58:00.926147	2021-04-25 22:58:00.945954
918	t	\N	t	0	0	2	1	0	5	30	0	179	\N	Cambio Rotundo	6a	\N	\N	\N	\N	2021-04-25 22:58:01.021542	2021-04-25 22:58:01.035056
919	t	\N	t	1	0	2	1	0	6	\N	0	179	\N	Escuela	5-	\N	\N	\N	\N	2021-04-25 22:58:01.090335	2021-04-25 22:58:01.107942
920	t	\N	t	0	0	2	1	0	1	\N	0	180	\N	Unknown	Proyecto	\N	\N	\N	\N	2021-04-25 22:58:01.183948	2021-04-25 22:58:01.201442
921	t	\N	t	0	0	2	1	0	2	\N	0	180	\N	Yema de Huevos	5+	\N	Solo Top	\N	\N	2021-04-25 22:58:01.284911	2021-04-25 22:58:01.298997
922	t	\N	t	0	0	2	1	0	1	\N	0	181	\N	Unknown	6b	\N	\N	\N	\N	2021-04-25 22:58:01.394405	2021-04-25 22:58:01.422242
923	t	\N	t	0	0	2	1	0	2	\N	0	181	\N	Unknown	6-	\N	\N	\N	\N	2021-04-25 22:58:01.493893	2021-04-25 22:58:01.513917
924	f	\N	t	0	0	1	1	\N	1	\N	0	182	\N	Con los Coquitos en el Cuello	8a	\N	\N	\N	\N	2021-04-25 22:58:01.579609	2021-04-25 22:58:01.595531
925	f	\N	t	0	0	1	1	\N	2	\N	0	182	\N	Los Coihuequereques	7-	\N	\N	\N	\N	2021-04-25 22:58:01.720946	2021-04-25 22:58:01.752998
926	t	\N	t	0	0	2	2	\N	1	\N	0	183	\N	Multilargo	6a	\N	\N	\N	\N	2021-04-25 22:58:01.820189	2021-04-25 22:58:01.843867
927	t	\N	t	0	0	2	1	\N	2	\N	0	183	\N	Unknown	6a+	\N	\N	\N	\N	2021-04-25 22:58:01.937635	2021-04-25 22:58:01.951738
928	t	\N	t	0	0	2	1	\N	3	\N	0	183	\N	Y pa que te Enojai	6a	\N	\N	\N	\N	2021-04-25 22:58:02.035374	2021-04-25 22:58:02.057395
929	t	\N	t	0	0	2	1	\N	4	\N	0	183	\N	Cáscara de Nuez	6a+	\N	\N	\N	\N	2021-04-25 22:58:02.137896	2021-04-25 22:58:02.162567
930	t	\N	t	0	0	2	1	\N	5	\N	0	183	\N	Ojo de Acero	6b	\N	\N	\N	\N	2021-04-25 22:58:02.241928	2021-04-25 22:58:02.255361
931	t	\N	t	0	0	2	1	\N	1	\N	0	184	\N	Unknown	Unknown	\N	\N	\N	\N	2021-04-25 22:58:02.354832	2021-04-25 22:58:02.372447
932	t	\N	t	0	0	2	1	\N	2	\N	0	184	\N	Unknown	Unknown	\N	\N	\N	\N	2021-04-25 22:58:02.448693	2021-04-25 22:58:02.475469
933	t	\N	t	0	0	2	1	\N	3	\N	0	184	\N	Unknown	6c	\N	\N	\N	\N	2021-04-25 22:58:02.57194	2021-04-25 22:58:02.589238
934	t	\N	t	0	0	2	1	\N	4	\N	0	184	\N	Unknown	7a	\N	\N	\N	\N	2021-04-25 22:58:02.667516	2021-04-25 22:58:02.685456
935	t	\N	t	0	0	2	1	\N	5	\N	0	184	\N	Unknown	7?	\N	\N	\N	\N	2021-04-25 22:58:02.792237	2021-04-25 22:58:02.829639
936	t	\N	t	0	0	2	1	\N	6	\N	0	184	\N	Unknown	6+	\N	\N	\N	\N	2021-04-25 22:58:02.929633	2021-04-25 22:58:02.954359
937	t	\N	t	0	0	2	1	\N	7	\N	0	184	\N	Giorgio Burger	6b+	\N	\N	Comienza en vía "6" y se devía a la derecha.	\N	2021-04-25 22:58:03.027554	2021-04-25 22:58:03.043351
938	t	\N	t	0	0	2	1	\N	8	\N	0	184	\N	El Hoyo	5+	\N	\N	\N	\N	2021-04-25 22:58:03.141008	2021-04-25 22:58:03.157622
939	t	\N	t	0	0	2	1	\N	9	\N	0	184	\N	El Chagual	6c+	\N	\N	\N	\N	2021-04-25 22:58:03.265584	2021-04-25 22:58:03.288856
940	t	\N	t	0	0	2	1	\N	10	\N	0	184	\N	Travesía	Unknown	\N	\N	Travesía que conecta con la reunión de vía "3".	\N	2021-04-25 22:58:03.389709	2021-04-25 22:58:03.428921
941	f	\N	t	0	0	1	1	\N	1	\N	0	185	\N	Piraña	6c	\N	\N	\N	\N	2021-04-25 22:58:03.52538	2021-04-25 22:58:03.544621
942	f	\N	t	0	0	1	1	\N	2	\N	0	185	\N	Pirañita	6c	\N	\N	\N	\N	2021-04-25 22:58:03.653016	2021-04-25 22:58:03.681231
943	f	\N	t	0	0	1	1	\N	3	\N	0	185	\N	Unknown	7c+	\N	\N	\N	\N	2021-04-25 22:58:03.768202	2021-04-25 22:58:03.784402
944	f	\N	t	0	0	1	1	\N	4	\N	0	185	\N	Unknown	8?	\N	\N	Comienza en vía "3" y se va a la izquierda	\N	2021-04-25 22:58:03.857207	2021-04-25 22:58:03.876943
945	f	\N	t	0	0	1	1	\N	5	\N	0	185	\N	Unknown	8?	\N	\N	Comienza en "Directo al Cielo" y se junta con "Superman".	\N	2021-04-25 22:58:03.942052	2021-04-25 22:58:03.958039
946	f	\N	t	0	0	1	1	\N	6	\N	0	185	\N	Superman	8a	\N	\N	Comienza en "Directo al Cielo" y se va hacia la izquierda.	\N	2021-04-25 22:58:04.027277	2021-04-25 22:58:04.05356
947	f	\N	t	0	0	1	1	\N	7	\N	0	185	\N	Directo al Cielo	7b+	\N	\N	\N	\N	2021-04-25 22:58:04.113643	2021-04-25 22:58:04.129178
948	f	\N	t	0	0	1	1	\N	8	\N	0	185	\N	Super Huber	8a+	\N	\N	\N	\N	2021-04-25 22:58:04.186226	2021-04-25 22:58:04.215633
949	f	\N	t	0	0	1	1	\N	9	\N	0	185	\N	Estado Nirvana	8b	\N	\N	\N	\N	2021-04-25 22:58:04.266862	2021-04-25 22:58:04.285702
950	f	\N	t	0	0	1	1	\N	10	\N	0	185	\N	Todos los Perritos se van al Cielo	7b+/c	\N	\N	\N	\N	2021-04-25 22:58:04.353099	2021-04-25 22:58:04.379287
951	f	\N	t	0	0	1	1	\N	11	\N	0	185	\N	El Difícil Camino al Cielo	7a+	\N	\N	\N	\N	2021-04-25 22:58:04.437169	2021-04-25 22:58:04.465174
952	f	\N	t	0	0	1	1	\N	12	\N	0	185	\N	Pájaros de Fuego	5-	\N	\N	\N	\N	2021-04-25 22:58:04.517823	2021-04-25 22:58:04.539682
953	f	\N	t	0	0	1	1	\N	13	\N	0	185	\N	La Variante	6c	\N	\N	\N	\N	2021-04-25 22:58:04.613417	2021-04-25 22:58:04.649194
954	t	\N	t	0	0	3	1	\N	1	\N	0	186	\N	Sexilia	5-	\N	\N	\N	\N	2021-04-25 22:58:04.716623	2021-04-25 22:58:04.758869
955	t	\N	t	0	0	3	1	\N	2	\N	0	186	\N	La Huella del Dinosaurio	4-	\N	\N	\N	\N	2021-04-25 22:58:04.818344	2021-04-25 22:58:04.84092
956	t	\N	t	0	0	3	1	\N	3	\N	0	186	\N	Angélica y sus Cámaras	4-	\N	\N	\N	\N	2021-04-25 22:58:04.912618	2021-04-25 22:58:04.926394
957	t	\N	t	0	0	3	1	\N	4	\N	0	186	\N	El Ombligo de Ventor	4-	\N	\N	\N	\N	2021-04-25 22:58:04.983294	2021-04-25 22:58:04.997986
958	t	\N	t	0	0	3	1	\N	5	\N	0	186	\N	Escalando en el Nido	4+	\N	\N	\N	\N	2021-04-25 22:58:05.052516	2021-04-25 22:58:05.06878
959	t	\N	t	0	0	3	1	\N	6	\N	0	186	\N	El Beso de la Mujer Araña	5-	\N	\N	\N	\N	2021-04-25 22:58:05.119285	2021-04-25 22:58:05.133822
960	t	\N	t	0	0	3	1	\N	7	\N	0	186	\N	Las Coortaa	4+	\N	\N	\N	\N	2021-04-25 22:58:05.185404	2021-04-25 22:58:05.198915
961	t	\N	t	0	0	3	1	\N	8	\N	0	186	\N	Doble Ración de Piedras	4+	\N	\N	\N	\N	2021-04-25 22:58:05.257618	2021-04-25 22:58:05.280816
962	t	\N	t	0	0	3	1	\N	9	\N	0	186	\N	Fina Suelta y Delicada	5-	\N	\N	\N	\N	2021-04-25 22:58:05.359617	2021-04-25 22:58:05.377497
963	t	\N	t	0	0	3	1	\N	1	\N	0	187	\N	Unknown	5+	\N	\N	\N	\N	2021-04-25 22:58:05.4899	2021-04-25 22:58:05.503742
964	t	\N	t	0	0	3	1	\N	2	\N	0	187	\N	Diagonal de la Serpiente	5+	\N	\N	\N	\N	2021-04-25 22:58:05.55345	2021-04-25 22:58:05.567922
965	t	\N	t	0	0	3	1	\N	3	\N	0	187	\N	Porfiada	5+	\N	\N	\N	\N	2021-04-25 22:58:05.656102	2021-04-25 22:58:05.670783
966	t	\N	t	0	0	3	1	\N	4	\N	0	187	\N	El Camino del Agua	6a	\N	\N	\N	\N	2021-04-25 22:58:05.734444	2021-04-25 22:58:05.755685
967	t	\N	t	0	0	3	1	\N	5	\N	0	187	\N	El Embudo	6a	\N	\N	\N	\N	2021-04-25 22:58:05.826126	2021-04-25 22:58:05.839648
968	\N	\N	t	0	0	1	1	\N	1	\N	0	188	\N	Unknown	6c	\N	\N	\N	\N	2021-04-25 22:58:05.91351	2021-04-25 22:58:05.932682
969	\N	\N	t	0	0	1	1	\N	2	\N	0	188	\N	Unknown	6c	\N	\N	\N	\N	2021-04-25 22:58:06.001324	2021-04-25 22:58:06.018752
970	\N	\N	t	0	0	1	1	\N	3	\N	0	188	\N	Unknown	7a+/b	\N	\N	\N	\N	2021-04-25 22:58:06.125761	2021-04-25 22:58:06.143225
971	\N	\N	t	0	0	1	1	\N	4	\N	0	188	\N	Unknown	Unknown	\N	\N	\N	\N	2021-04-25 22:58:06.203216	2021-04-25 22:58:06.225197
972	t	\N	t	0	0	2	1	\N	1	\N	0	189	\N	Versículo 1	6+	\N	\N	\N	\N	2021-04-25 22:58:06.343722	2021-04-25 22:58:06.360961
973	t	\N	t	0	0	2	1	\N	2	\N	0	189	\N	Versículo 2	6c	\N	\N	\N	\N	2021-04-25 22:58:06.416465	2021-04-25 22:58:06.431275
974	t	\N	t	0	0	2	1	\N	3	\N	0	189	\N	Versículo 3	6c	\N	\N	\N	\N	2021-04-25 22:58:06.487983	2021-04-25 22:58:06.523501
975	t	\N	t	0	0	2	1	\N	4	\N	0	189	\N	Versículo 4	6+	\N	\N	\N	\N	2021-04-25 22:58:06.591174	2021-04-25 22:58:06.608259
976	t	\N	t	0	0	2	1	\N	5	\N	0	189	\N	Matto Grosso	4+	\N	\N	\N	\N	2021-04-25 22:58:06.692147	2021-04-25 22:58:06.70636
977	t	\N	t	0	0	2	1	\N	6	\N	0	189	\N	Cabezona Cornutta	5+	\N	\N	\N	\N	2021-04-25 22:58:06.777465	2021-04-25 22:58:06.80333
978	t	\N	t	0	0	2	1	\N	7	\N	0	189	\N	Marmota y Fatiga	5-	\N	\N	\N	\N	2021-04-25 22:58:06.895325	2021-04-25 22:58:06.912026
979	t	\N	t	0	0	2	1	\N	1	\N	0	190	\N	Caupolican The Real	6c	\N	7+2	\N	\N	2021-04-25 22:58:06.987219	2021-04-25 22:58:07.009431
980	t	\N	t	0	0	2	1	\N	2	\N	0	190	\N	Aracnofobia	5+	\N	6+2	\N	\N	2021-04-25 22:58:07.090089	2021-04-25 22:58:07.113263
981	t	\N	t	0	0	2	1	\N	3	\N	0	190	\N	El Chape	Proyecto	\N	8+1	\N	\N	2021-04-25 22:58:07.186742	2021-04-25 22:58:07.205217
982	t	\N	t	0	0	2	1	\N	4	\N	0	190	\N	Unknown	Proyecto	\N	\N	\N	\N	2021-04-25 22:58:07.302064	2021-04-25 22:58:07.32437
983	t	\N	t	0	0	2	1	\N	5	\N	0	190	\N	Mundo de Raíces	6a	\N	9+2	\N	\N	2021-04-25 22:58:07.377209	2021-04-25 22:58:07.39262
984	t	\N	t	0	0	2	1	\N	6	\N	0	190	\N	La Rubia	6a+	\N	10+2	\N	\N	2021-04-25 22:58:07.458062	2021-04-25 22:58:07.475446
985	t	\N	t	0	0	2	1	\N	7	\N	0	190	\N	La Negra	7a	\N	8+2	\N	\N	2021-04-25 22:58:07.529262	2021-04-25 22:58:07.543573
986	t	\N	t	0	0	2	1	\N	8	\N	0	190	\N	Cubitos	6b	\N	7+2	\N	\N	2021-04-25 22:58:07.608488	2021-04-25 22:58:07.624808
987	f	\N	t	0	0	2	1	\N	1	\N	0	191	\N	La Ira de Viracocha	6c+	\N	7+2	\N	\N	2021-04-25 22:58:07.687418	2021-04-25 22:58:07.701475
988	f	\N	t	0	0	2	1	\N	2	\N	0	191	\N	El Grito	6c	\N	8+2	\N	\N	2021-04-25 22:58:07.753524	2021-04-25 22:58:07.767713
989	f	\N	t	0	0	2	1	\N	3	\N	0	191	\N	Majita Linda	6b+	\N	7+2	\N	\N	2021-04-25 22:58:07.839223	2021-04-25 22:58:07.855976
990	f	\N	t	0	0	2	1	\N	4	\N	0	191	\N	La Furia de Tunupa	7a	\N	Unknown	\N	\N	2021-04-25 22:58:07.915178	2021-04-25 22:58:07.927397
991	f	\N	t	0	0	2	1	\N	5	\N	0	191	\N	La Quebradita	5+	\N	3+2	\N	\N	2021-04-25 22:58:07.983068	2021-04-25 22:58:07.997451
992	f	\N	t	0	0	2	1	\N	6	\N	0	191	\N	Cebolla Asa	6a	\N	4+2	\N	\N	2021-04-25 22:58:08.091617	2021-04-25 22:58:08.107543
993	f	\N	t	0	0	2	1	\N	7	\N	0	191	\N	Mamaguevo	6c+	\N	5+2	\N	\N	2021-04-25 22:58:08.160519	2021-04-25 22:58:08.174053
994	f	\N	t	0	0	2	1	\N	8	\N	0	191	\N	Guachinanga	6c	\N	6+2	\N	\N	2021-04-25 22:58:08.231	2021-04-25 22:58:08.245463
995	f	\N	t	0	0	2	1	\N	9	\N	0	191	\N	Con el Hoyo en la Mano	6c	\N	6+2	\N	\N	2021-04-25 22:58:08.326867	2021-04-25 22:58:08.340522
996	f	\N	t	0	0	2	1	\N	10	\N	0	191	\N	La Tesis de Julio	7a	\N	5+2	\N	\N	2021-04-25 22:58:08.398934	2021-04-25 22:58:08.414615
997	f	\N	t	0	0	2	1	\N	11	\N	0	191	\N	Proyecto	Proyecto	\N	5+2	\N	\N	2021-04-25 22:58:08.475523	2021-04-25 22:58:08.48962
998	f	\N	t	0	0	2	1	\N	1	\N	0	192	\N	Amigos Para Que	7b	\N	5+2	\N	\N	2021-04-25 22:58:08.556545	2021-04-25 22:58:08.574107
999	f	\N	t	0	0	2	1	\N	1	\N	0	193	\N	Zaburra	6c	\N	5+2	\N	\N	2021-04-25 22:58:08.667565	2021-04-25 22:58:08.681273
1000	f	\N	t	0	0	2	1	\N	2	\N	0	193	\N	Ruta XX	5+	\N	3+2	\N	\N	2021-04-25 22:58:08.77138	2021-04-25 22:58:08.78459
1001	f	\N	t	0	0	1	1	\N	3	\N	0	193	\N	Yo Soy tu Padre	7c+	\N	7+2	\N	\N	2021-04-25 22:58:08.844541	2021-04-25 22:58:08.860088
1002	f	\N	t	0	0	2	1	\N	4	\N	0	193	\N	No Se Ve	6c	\N	4+2	\N	\N	2021-04-25 22:58:08.930504	2021-04-25 22:58:08.948448
1003	f	\N	t	0	0	2	1	\N	5	\N	0	193	\N	Rómulo y Romo	7a+	\N	6+2	\N	\N	2021-04-25 22:58:09.006994	2021-04-25 22:58:09.024723
1004	f	\N	t	0	0	2	1	\N	6	\N	0	193	\N	Titoplasma	7b	\N	7+2	\N	\N	2021-04-25 22:58:09.087404	2021-04-25 22:58:09.104118
1005	f	\N	t	0	0	2	1	\N	7	\N	0	193	\N	Mirando el Pescado	6c	\N	7+2	\N	\N	2021-04-25 22:58:09.165814	2021-04-25 22:58:09.18002
1006	f	\N	t	0	0	2	1	\N	8	\N	0	193	\N	Como Pecas Pagas	6a+	\N	7+2	\N	\N	2021-04-25 22:58:09.2344	2021-04-25 22:58:09.248729
1007	f	\N	t	0	0	2	1	\N	9	\N	0	193	\N	La Foca	7b	\N	6+2	\N	\N	2021-04-25 22:58:09.3406	2021-04-25 22:58:09.354253
1008	f	\N	t	0	0	2	1	\N	10	\N	0	193	\N	Guareno	6b+	\N	3+2	\N	\N	2021-04-25 22:58:09.408503	2021-04-25 22:58:09.425634
1009	f	\N	t	0	0	2	1	\N	11	\N	0	193	\N	La Rufina	6a	\N	4+2	\N	\N	2021-04-25 22:58:09.510671	2021-04-25 22:58:09.529204
1010	f	\N	t	0	0	2	1	\N	12	\N	0	193	\N	Makelembembe	6a+	\N	4+2	\N	\N	2021-04-25 22:58:09.598438	2021-04-25 22:58:09.615634
1011	f	\N	t	0	0	2	1	\N	13	\N	0	193	\N	Control Cachete	6b	\N	4+2	\N	\N	2021-04-25 22:58:09.689768	2021-04-25 22:58:09.70287
1012	f	\N	t	0	0	2	1	\N	14	\N	0	193	\N	Alaldrin	5+	\N	5+2	\N	\N	2021-04-25 22:58:09.760935	2021-04-25 22:58:09.774118
1013	f	\N	t	0	0	2	1	\N	15	\N	0	193	\N	Apretito	6b	\N	4+2	\N	\N	2021-04-25 22:58:09.837562	2021-04-25 22:58:09.861335
1014	f	\N	t	0	0	2	1	\N	1	\N	0	194	\N	Congeluhuuk	6c	\N	7+2	\N	\N	2021-04-25 22:58:09.934666	2021-04-25 22:58:09.948651
1015	f	\N	t	0	0	2	1	\N	2	\N	0	194	\N	El Espejo de mis Defectos	6b	\N	6+2	\N	\N	2021-04-25 22:58:10.007845	2021-04-25 22:58:10.022193
1016	f	\N	t	0	0	2	1	\N	3	\N	0	194	\N	Don Nicanor	6c	\N	6+2	\N	\N	2021-04-25 22:58:10.107391	2021-04-25 22:58:10.120892
1017	f	\N	t	0	0	2	1	\N	4	\N	0	194	\N	Con la Ayuda de los Apus	6a+	\N	6+2	\N	\N	2021-04-25 22:58:10.177004	2021-04-25 22:58:10.192934
1018	f	\N	t	0	0	2	1	\N	1	\N	0	195	\N	Chinchimenea	6a+	\N	6+2	\N	\N	2021-04-25 22:58:10.28957	2021-04-25 22:58:10.321747
1019	f	\N	t	0	0	2	1	\N	2	\N	0	195	\N	Chiken	7b+	\N	7+2	\N	\N	2021-04-25 22:58:10.406086	2021-04-25 22:58:10.420824
1020	f	\N	t	0	0	2	1	\N	3	\N	0	195	\N	Cervatillo	6b	\N	6+2	\N	\N	2021-04-25 22:58:10.467679	2021-04-25 22:58:10.480589
1021	f	\N	t	0	0	2	1	\N	4	\N	0	195	\N	El Duro Camino al Éxito	7b+	\N	7+2	\N	\N	2021-04-25 22:58:10.535283	2021-04-25 22:58:10.551196
1022	f	\N	t	0	0	2	1	\N	5	\N	0	195	\N	Sin Remedio	6a	\N	7+2	\N	\N	2021-04-25 22:58:10.611729	2021-04-25 22:58:10.653536
1023	f	\N	t	0	0	2	1	\N	6	\N	0	195	\N	Dame la Pasá	4+	\N	6+2	\N	\N	2021-04-25 22:58:10.749619	2021-04-25 22:58:10.769195
1024	f	\N	t	0	0	2	1	\N	7	\N	0	195	\N	Huevo Duro	4-	\N	5+2	\N	\N	2021-04-25 22:58:10.829881	2021-04-25 22:58:10.85402
1025	f	\N	t	0	0	2	1	\N	8	\N	0	195	\N	Jackychan	6c	\N	6+2	\N	\N	2021-04-25 22:58:10.929907	2021-04-25 22:58:10.946027
1026	f	\N	t	0	0	2	1	\N	9	\N	0	195	\N	Kung Fu Pao	7a+	\N	7+2	\N	\N	2021-04-25 22:58:11.107829	2021-04-25 22:58:11.125526
1027	f	\N	t	0	0	2	1	\N	1	\N	0	196	\N	Al Abordaje Muchachos	6a+	\N	4+2	\N	\N	2021-04-25 22:58:11.215519	2021-04-25 22:58:11.246313
1028	f	\N	t	0	0	0	1	\N	2	\N	0	196	\N	Rocoto Love	8c+	\N	8+2	\N	\N	2021-04-25 22:58:11.312867	2021-04-25 22:58:11.328833
1029	f	\N	t	0	0	3	1	\N	3	\N	0	196	\N	Acero Andino	6a	\N	6+2	\N	\N	2021-04-25 22:58:11.389608	2021-04-25 22:58:11.40878
1030	f	\N	t	0	0	2	1	\N	4	\N	0	196	\N	Místico	6c	\N	7+2	\N	\N	2021-04-25 22:58:11.464011	2021-04-25 22:58:11.480187
1031	f	\N	t	0	0	2	1	\N	5	\N	0	196	\N	Choro de Puerto	6a+	\N	4+2	\N	\N	2021-04-25 22:58:11.55355	2021-04-25 22:58:11.576157
1032	f	\N	t	0	0	2	1	\N	6	\N	0	196	\N	La Quete	6a	\N	4+2	\N	\N	2021-04-25 22:58:11.648068	2021-04-25 22:58:11.680443
1033	f	\N	t	0	0	2	1	\N	7	\N	0	196	\N	Chiquitín Force	6c	\N	4+2	\N	\N	2021-04-25 22:58:11.772302	2021-04-25 22:58:11.786228
1034	t	\N	f	0	0	2	1	1	1	20	0	197	\N	Unknown	6a+	\N	\N	\N	\N	2021-04-25 22:58:11.855365	2021-04-25 22:58:11.868419
1035	t	\N	f	0	0	2	1	1	2	15	0	197	\N	Sopa de Luche	5+	\N	Trad	\N	\N	2021-04-25 22:58:11.927217	2021-04-25 22:58:11.942946
1036	t	\N	f	0	0	2	1	1	3	15	0	197	\N	Enraízate	6b	\N	Trad	\N	\N	2021-04-25 22:58:11.992921	2021-04-25 22:58:12.009252
1037	t	\N	f	0	0	2	1	1	4	15	0	197	\N	La Oreja de Benitez	6b	\N	\N	\N	\N	2021-04-25 22:58:12.064053	2021-04-25 22:58:12.077777
1038	t	\N	f	0	0	2	1	1	5	15	0	197	\N	Mándale	6b	\N	\N	\N	\N	2021-04-25 22:58:12.149573	2021-04-25 22:58:12.169184
1039	t	\N	f	0	0	2	1	1	6	15	0	197	\N	Unknown	5+	\N	\N	\N	\N	2021-04-25 22:58:12.217951	2021-04-25 22:58:12.231147
1040	t	\N	f	0	0	2	1	1	7	15	0	197	\N	Unknown	5+	\N	\N	\N	\N	2021-04-25 22:58:12.336369	2021-04-25 22:58:12.354507
1041	t	\N	f	0	0	2	1	1	1	30	0	198	\N	Chingue	6b+	\N	\N	\N	\N	2021-04-25 22:58:12.431848	2021-04-25 22:58:12.452123
1042	t	\N	f	0	0	2	1	1	2	12	0	198	\N	Condorlandia	6a+	\N	\N	\N	\N	2021-04-25 22:58:12.523202	2021-04-25 22:58:12.538105
1043	t	\N	f	0	0	2	1	1	3	30	0	198	\N	Pa´ los Amigos	6b+	\N	\N	\N	\N	2021-04-25 22:58:12.58667	2021-04-25 22:58:12.602594
1044	t	\N	f	0	0	2	1	1	4	15	0	198	\N	Forraje Invernal	7a	\N	\N	\N	\N	2021-04-25 22:58:12.691109	2021-04-25 22:58:12.707179
1045	t	\N	f	0	0	2	1	1	5	6	0	198	\N	Escuelita	4-	\N	\N	\N	\N	2021-04-25 22:58:12.7773	2021-04-25 22:58:12.795536
1046	t	\N	f	0	0	2	1	1	6	15	0	198	\N	Taco de Frijoles	6c	\N	\N	\N	\N	2021-04-25 22:58:12.858574	2021-04-25 22:58:12.876291
1047	t	\N	f	0	0	2	1	1	1	22	0	199	\N	El Ojo de Sofía	6a	\N	\N	\N	\N	2021-04-25 22:58:12.982996	2021-04-25 22:58:13.029557
1048	t	\N	f	0	0	2	1	1	2	12	0	199	\N	El Ojo de Sofía P2	6b	\N	\N	\N	\N	2021-04-25 22:58:13.105992	2021-04-25 22:58:13.128638
1049	t	\N	f	0	0	2	1	1	3	22	0	199	\N	Chino Tira Piedra	6a	\N	\N	\N	\N	2021-04-25 22:58:13.247947	2021-04-25 22:58:13.266687
1050	t	\N	f	0	0	2	1	1	4	12	0	199	\N	Chino Tira Piedra P2	6a+	\N	\N	\N	\N	2021-04-25 22:58:13.352263	2021-04-25 22:58:13.374694
1051	t	\N	f	0	0	2	1	1	5	22	0	199	\N	Calafateo	6a	\N	\N	\N	\N	2021-04-25 22:58:13.465641	2021-04-25 22:58:13.486406
1052	t	\N	f	0	0	2	1	1	6	22	0	199	\N	Neneo	7a	\N	\N	\N	\N	2021-04-25 22:58:13.572522	2021-04-25 22:58:13.592956
1053	t	\N	f	0	0	2	1	1	7	30	0	199	\N	Nómade	7b	\N	\N	\N	\N	2021-04-25 22:58:13.70538	2021-04-25 22:58:13.740462
1054	t	\N	f	0	0	2	1	1	8	27	0	199	\N	Claudio y sus 5 Hermanas	7b+	\N	\N	\N	\N	2021-04-25 22:58:13.823879	2021-04-25 22:58:13.842588
1055	t	\N	f	0	0	2	1	1	9	26	0	199	\N	Madiba	7a+/b	\N	\N	\N	\N	2021-04-25 22:58:13.908586	2021-04-25 22:58:13.931629
1056	t	\N	f	0	0	2	1	1	10	22	0	199	\N	De Luz y Agua	6c	\N	\N	\N	\N	2021-04-25 22:58:13.995092	2021-04-25 22:58:14.014471
1057	t	\N	f	0	0	2	1	1	11	25	0	199	\N	Ulen	7a+	\N	\N	\N	\N	2021-04-25 22:58:14.0813	2021-04-25 22:58:14.099495
1058	t	\N	f	0	0	2	1	1	12	10	0	199	\N	Legalízame	5+	\N	\N	\N	\N	2021-04-25 22:58:14.167929	2021-04-25 22:58:14.18263
1059	t	\N	f	0	0	2	1	1	1	\N	0	200	\N	Como Hueso	5+	\N	\N	\N	\N	2021-04-25 22:58:14.269359	2021-04-25 22:58:14.293073
1060	t	\N	f	0	0	2	1	1	2	\N	0	200	\N	Mándale	5-	\N	\N	\N	\N	2021-04-25 22:58:14.405593	2021-04-25 22:58:14.422442
1061	t	\N	f	0	0	2	1	1	3	\N	0	200	\N	No le Mandes Na	5-	\N	\N	\N	\N	2021-04-25 22:58:14.481415	2021-04-25 22:58:14.499823
1062	t	\N	f	0	0	2	1	1	4	\N	0	200	\N	Pillo e Gusta	6-	\N	\N	\N	\N	2021-04-25 22:58:14.568148	2021-04-25 22:58:14.588654
1063	t	\N	f	0	0	2	1	1	5	\N	0	200	\N	Tira Piedra	6-	\N	\N	\N	\N	2021-04-25 22:58:14.689719	2021-04-25 22:58:14.705036
1064	t	\N	t	0	0	2	1	0	1	\N	0	201	\N	Detenido por Sospecha	7a+	\N	\N	\N	\N	2021-04-25 22:58:14.794851	2021-04-25 22:58:14.814334
1065	t	\N	t	0	0	2	1	0	2	\N	0	201	\N	Lucrando Ando	6c	\N	\N	\N	\N	2021-04-25 22:58:14.909392	2021-04-25 22:58:14.933384
1066	t	\N	t	0	0	2	1	0	3	\N	0	202	\N	Perdido Entre los Litres	6a+	\N	\N	\N	\N	2021-04-25 22:58:15.013351	2021-04-25 22:58:15.029092
1067	t	\N	t	0	0	2	1	0	4	\N	0	202	\N	El Sol Está Brillan3	5+	\N	\N	\N	\N	2021-04-25 22:58:15.103858	2021-04-25 22:58:15.118261
1068	t	\N	t	0	0	2	1	0	5	\N	0	202	\N	Pico en el Ojo	6a	\N	\N	\N	\N	2021-04-25 22:58:15.172678	2021-04-25 22:58:15.189811
1069	t	\N	t	0	0	2	1	0	6	\N	0	202	\N	Puras Falacias	6b+	\N	\N	\N	\N	2021-04-25 22:58:15.247521	2021-04-25 22:58:15.263477
1070	t	\N	t	0	0	2	1	0	7	\N	0	202	\N	Oh! VIENTOS	6b	\N	\N	\N	\N	2021-04-25 22:58:15.333847	2021-04-25 22:58:15.350506
1071	t	\N	t	0	0	2	1	0	8	\N	0	202	\N	La Guerra del Agua no Está Perdida	6a+	\N	\N	\N	\N	2021-04-25 22:58:15.407878	2021-04-25 22:58:15.423672
1072	t	\N	t	0	0	2	1	0	1	\N	0	203	\N	Thor, La Ira del Martillo	6c	\N	\N	\N	\N	2021-04-25 22:58:15.478241	2021-04-25 22:58:15.491257
1073	t	\N	t	0	0	2	1	0	2	\N	0	204	\N	El Estado de las Cosas	6b	\N	\N	\N	\N	2021-04-25 22:58:15.549478	2021-04-25 22:58:15.570853
1074	t	\N	t	0	0	2	1	0	3	\N	0	204	\N	El Poder del Dinero	6c	\N	\N	\N	\N	2021-04-25 22:58:15.625735	2021-04-25 22:58:15.645145
1075	t	\N	t	0	0	2	1	0	4	\N	0	204	\N	Hay Algo Aquí que va Mal	6a	\N	\N	\N	\N	2021-04-25 22:58:15.71303	2021-04-25 22:58:15.727389
1076	t	\N	t	0	0	2	1	1	1	7	0	205	\N	Early Departure	5-	\N	\N	\N	\N	2021-04-25 22:58:15.801271	2021-04-25 22:58:15.821658
1077	t	\N	t	0	0	2	1	1	2	10	0	205	\N	Catch a Wave	6b	\N	\N	\N	\N	2021-04-25 22:58:15.89099	2021-04-25 22:58:15.91655
1078	t	\N	t	0	0	2	1	1	3	10	0	205	\N	Tic Tac	6b+	\N	\N	\N	\N	2021-04-25 22:58:15.981294	2021-04-25 22:58:15.995976
1079	t	\N	t	0	0	2	1	1	4	12	0	205	\N	Quiero Galleta	7a	\N	\N	\N	\N	2021-04-25 22:58:16.060539	2021-04-25 22:58:16.076309
1080	t	\N	t	0	0	2	1	1	5	12	0	205	\N	Learning Curve	7c+	\N	\N	\N	\N	2021-04-25 22:58:16.170765	2021-04-25 22:58:16.184015
1081	t	\N	t	0	0	2	1	1	6	12	0	205	\N	Aleta de Tiburón	6b+	\N	\N	\N	\N	2021-04-25 22:58:16.325492	2021-04-25 22:58:16.34931
1082	t	\N	t	0	0	2	1	1	1	25	0	206	\N	Chimmey Corner	4-	\N	\N	\N	\N	2021-04-25 22:58:16.45122	2021-04-25 22:58:16.463093
1083	t	\N	t	0	0	2	1	1	2	20	0	206	\N	La Gata Loca	4-	\N	\N	\N	\N	2021-04-25 22:58:16.506762	2021-04-25 22:58:16.521304
1084	t	\N	t	0	0	2	1	1	3	25	0	206	\N	Penesilina	6c+	\N	\N	\N	\N	2021-04-25 22:58:16.584908	2021-04-25 22:58:16.603374
1085	t	\N	t	0	0	2	1	1	4	25	0	206	\N	Fiebre Porcina	8a+/b	\N	\N	\N	\N	2021-04-25 22:58:16.67142	2021-04-25 22:58:16.688924
1086	t	\N	t	0	0	2	1	1	5	25	0	206	\N	Mandarín 37	5+	\N	\N	\N	\N	2021-04-25 22:58:16.76117	2021-04-25 22:58:16.773851
1087	t	\N	t	0	0	2	1	1	6	20	0	206	\N	Likelihood v/s Inconsequent	6c	\N	\N	\N	\N	2021-04-25 22:58:16.828933	2021-04-25 22:58:16.850864
1088	t	\N	t	0	0	2	1	1	7	20	0	206	\N	Dame un Beso	6a	\N	\N	\N	\N	2021-04-25 22:58:16.925374	2021-04-25 22:58:16.941724
1089	t	\N	t	0	0	2	1	1	8	20	0	206	\N	El Tonto Diente	5+	\N	\N	\N	\N	2021-04-25 22:58:17.006708	2021-04-25 22:58:17.055383
1090	t	\N	t	0	0	2	1	1	9	20	0	206	\N	Tu Gocha da Welta	6a	\N	\N	\N	\N	2021-04-25 22:58:17.106305	2021-04-25 22:58:17.128461
1091	t	\N	t	0	0	2	1	1	10	10	0	206	\N	No lo Hecho Yo	5-	\N	\N	\N	\N	2021-04-25 22:58:17.207288	2021-04-25 22:58:17.219707
1092	t	\N	t	0	0	2	1	1	11	10	0	206	\N	Casa Común	5-	\N	\N	\N	\N	2021-04-25 22:58:17.276045	2021-04-25 22:58:17.294994
1093	t	\N	t	0	0	2	1	1	1	15	0	207	\N	Fisura Sin Nombre	4-	\N	\N	\N	\N	2021-04-25 22:58:17.358369	2021-04-25 22:58:17.374048
1094	t	\N	t	0	0	2	1	1	2	28	0	207	\N	Tres Cóndores	5+	\N	\N	\N	\N	2021-04-25 22:58:17.422017	2021-04-25 22:58:17.434672
1095	t	\N	t	0	0	2	2	1	3	40	0	207	\N	Barlovento	5+	\N	\N	\N	\N	2021-04-25 22:58:17.514581	2021-04-25 22:58:17.527005
1096	t	\N	t	0	0	2	1	1	4	20	0	207	\N	Nutritious And Delicious	5+	\N	\N	\N	\N	2021-04-25 22:58:17.574678	2021-04-25 22:58:17.597598
1097	t	\N	t	0	0	2	1	1	5	20	0	207	\N	Ursus Trotter	6a+	\N	\N	\N	\N	2021-04-25 22:58:17.647417	2021-04-25 22:58:17.662443
1098	t	\N	t	0	0	2	1	1	6	20	0	207	\N	Acapulco	6a	\N	\N	\N	\N	2021-04-25 22:58:17.720053	2021-04-25 22:58:17.739791
1099	t	\N	t	0	0	2	1	1	7	20	0	207	\N	Mate con Piernas	5+	\N	\N	\N	\N	2021-04-25 22:58:17.801704	2021-04-25 22:58:17.814079
1100	t	\N	t	0	0	2	1	1	8	40	0	207	\N	Que Huevada mas Huevada	6c	\N	\N	\N	\N	2021-04-25 22:58:17.85943	2021-04-25 22:58:17.871633
1101	t	\N	t	0	0	2	1	1	9	30	0	207	\N	Pa Que me Pongo si Saben como me Invitan	7b+	\N	\N	\N	\N	2021-04-25 22:58:17.931834	2021-04-25 22:58:17.945374
1102	t	\N	t	0	0	2	1	1	10	30	0	207	\N	Weak Sauce	5+	\N	\N	\N	\N	2021-04-25 22:58:17.993475	2021-04-25 22:58:18.006082
1103	t	\N	t	0	0	2	1	1	11	30	0	207	\N	Caca Negra	6a+	\N	\N	\N	\N	2021-04-25 22:58:18.080669	2021-04-25 22:58:18.092851
1104	t	\N	t	0	0	2	2	1	12	30	0	207	\N	Hijos del Águila	7a	\N	\N	\N	\N	2021-04-25 22:58:18.13933	2021-04-25 22:58:18.155636
1105	t	\N	t	0	0	2	2	1	13	20	0	207	\N	Terapia de Pareja	7a	\N	\N	\N	\N	2021-04-25 22:58:18.207444	2021-04-25 22:58:18.221354
1106	t	\N	t	0	0	2	1	1	14	30	0	207	\N	Muy Profesional	6b	\N	\N	\N	\N	2021-04-25 22:58:18.293716	2021-04-25 22:58:18.317386
1107	t	\N	t	0	0	2	1	1	15	20	0	207	\N	Si Juuuaaannn!	6c+	\N	\N	\N	\N	2021-04-25 22:58:18.376837	2021-04-25 22:58:18.397323
1108	t	\N	t	0	0	2	1	1	16	20	0	207	\N	6x5=35	8a+	\N	\N	\N	\N	2021-04-25 22:58:18.472421	2021-04-25 22:58:18.486388
1109	t	\N	t	0	0	2	1	1	17	20	0	207	\N	El Gato Volador	6b	\N	\N	\N	\N	2021-04-25 22:58:18.542411	2021-04-25 22:58:18.557015
1110	t	\N	t	0	0	2	1	1	18	20	0	207	\N	Unknown	6a	\N	\N	\N	\N	2021-04-25 22:58:18.608007	2021-04-25 22:58:18.622601
1111	t	\N	t	0	0	2	1	1	19	20	0	207	\N	Unknown	6a	\N	\N	\N	\N	2021-04-25 22:58:18.682184	2021-04-25 22:58:18.695028
1112	t	\N	t	0	0	2	1	1	2	40	0	208	\N	Left Lobe	4-	\N	\N	\N	\N	2021-04-25 22:58:18.749706	2021-04-25 22:58:18.770571
1113	t	\N	t	0	0	2	1	1	2	15	0	208	\N	Los Enchufados	5+	\N	\N	\N	\N	2021-04-25 22:58:18.878507	2021-04-25 22:58:18.909974
1114	t	\N	t	0	0	2	1	1	3	30	0	208	\N	Día Libre	6a	\N	\N	\N	\N	2021-04-25 22:58:18.967504	2021-04-25 22:58:18.981507
1115	t	\N	t	0	0	2	1	1	4	25	0	208	\N	Lucy in the Sky With Diamonds	5-	\N	\N	\N	\N	2021-04-25 22:58:19.044634	2021-04-25 22:58:19.057067
1116	t	\N	t	0	0	2	1	1	5	25	0	208	\N	Freud Explica	5-	\N	\N	\N	\N	2021-04-25 22:58:19.116299	2021-04-25 22:58:19.132599
1117	t	\N	t	0	0	2	1	1	6	20	0	208	\N	Amistad Colorida	5+	\N	\N	\N	\N	2021-04-25 22:58:19.193102	2021-04-25 22:58:19.20958
1118	t	\N	t	0	0	2	1	1	7	20	0	208	\N	Fisura del Deseo	5+	\N	\N	\N	\N	2021-04-25 22:58:19.2596	2021-04-25 22:58:19.274797
1119	t	\N	t	0	0	2	1	1	1	10	0	209	\N	Amor Seco	4-	\N	\N	\N	\N	2021-04-25 22:58:19.339617	2021-04-25 22:58:19.353998
1120	t	\N	t	0	0	2	1	1	2	12	0	209	\N	Ama mi Chivo	5-	\N	\N	\N	\N	2021-04-25 22:58:19.411987	2021-04-25 22:58:19.42811
1121	t	\N	t	0	0	2	1	1	3	14	0	209	\N	Buscando para Frey	5+	\N	\N	\N	\N	2021-04-25 22:58:19.478967	2021-04-25 22:58:19.494244
1122	t	\N	t	0	0	2	1	1	4	14	0	209	\N	Joy 1 Hazard 0	5+	\N	\N	\N	\N	2021-04-25 22:58:19.549326	2021-04-25 22:58:19.56596
1123	t	\N	t	0	0	2	1	1	5	14	0	209	\N	Zircon Effect	5+	\N	\N	\N	\N	2021-04-25 22:58:19.616153	2021-04-25 22:58:19.635361
1124	t	\N	t	0	0	2	1	1	1	18	0	210	\N	Si Los Perros Hablan es Porque Volamos	6a+	\N	\N	\N	\N	2021-04-25 22:58:19.711638	2021-04-25 22:58:19.723809
1125	t	\N	t	0	0	2	1	1	2	18	0	210	\N	Maraña de Araña	5-	\N	\N	\N	\N	2021-04-25 22:58:19.772634	2021-04-25 22:58:19.788394
1126	t	\N	t	0	0	2	1	1	3	18	0	210	\N	El Gaucho	6a	\N	\N	\N	\N	2021-04-25 22:58:19.837397	2021-04-25 22:58:19.858405
1127	t	\N	t	0	0	2	1	1	4	15	0	210	\N	Mate Che?	5+	\N	\N	\N	\N	2021-04-25 22:58:19.92	2021-04-25 22:58:19.941353
1128	t	\N	t	0	0	2	1	1	5	18	0	210	\N	Sipo!	5+	\N	\N	\N	\N	2021-04-25 22:58:20.100565	2021-04-25 22:58:20.113088
1129	t	\N	t	0	0	2	1	1	6	7	0	210	\N	Tio Tio Tio	6c	\N	\N	\N	\N	2021-04-25 22:58:20.168706	2021-04-25 22:58:20.1819
1130	t	\N	t	0	0	2	1	1	7	7	0	210	\N	Dímemelo	5-	\N	\N	\N	\N	2021-04-25 22:58:20.238709	2021-04-25 22:58:20.251255
1131	t	\N	t	0	0	2	3	1	1	90	0	211	\N	Entre Flores y Espinas	6a+/b	\N	\N	\N	\N	2021-04-25 22:58:20.321785	2021-04-25 22:58:20.335105
1132	t	\N	t	0	0	2	3	1	2	80	0	211	\N	Above Marley	6a+	\N	\N	\N	\N	2021-04-25 22:58:20.397529	2021-04-25 22:58:20.427386
1133	t	\N	t	0	0	2	3	1	3	90	0	211	\N	Santa Claus	6a+	\N	\N	\N	\N	2021-04-25 22:58:20.4877	2021-04-25 22:58:20.509157
1134	t	\N	t	0	0	2	2	1	1	40	0	212	\N	Dos Escorpiones	5+	\N	\N	\N	\N	2021-04-25 22:58:20.581615	2021-04-25 22:58:20.600453
1135	t	\N	t	0	0	2	1	1	2	50	0	212	\N	Pajagonia	5+	\N	\N	\N	\N	2021-04-25 22:58:20.668712	2021-04-25 22:58:20.680517
1136	t	\N	t	0	0	2	1	1	3	25	0	212	\N	Zombie Apocalipse	5+	\N	\N	\N	\N	2021-04-25 22:58:20.725399	2021-04-25 22:58:20.738486
1137	t	\N	t	0	0	2	1	1	4	20	0	212	\N	Diedro de Kukuczka	5+	\N	\N	\N	\N	2021-04-25 22:58:20.797934	2021-04-25 22:58:20.810248
1138	t	\N	t	0	0	2	1	1	5	20	0	212	\N	Moose Poop	5+	\N	\N	\N	\N	2021-04-25 22:58:20.855761	2021-04-25 22:58:20.869859
1139	t	\N	t	0	0	2	1	1	6	20	0	212	\N	Escudo Silver	5+	\N	\N	\N	\N	2021-04-25 22:58:20.954737	2021-04-25 22:58:20.972311
1140	t	\N	t	0	0	2	1	1	7	20	0	212	\N	Arista de Josie	7a	\N	\N	\N	\N	2021-04-25 22:58:21.040492	2021-04-25 22:58:21.062212
1141	t	\N	t	0	0	2	1	1	8	30	0	212	\N	Totem	5+	\N	\N	\N	\N	2021-04-25 22:58:21.116865	2021-04-25 22:58:21.131253
1142	t	\N	t	0	0	2	1	1	9	30	0	212	\N	Pb and Jelly	5+	\N	\N	\N	\N	2021-04-25 22:58:21.180637	2021-04-25 22:58:21.196381
1143	t	\N	t	0	0	2	1	1	10	30	0	212	\N	Despertar Mitocondrial	6a+	\N	\N	\N	\N	2021-04-25 22:58:21.248505	2021-04-25 22:58:21.269358
1144	t	\N	t	0	0	2	1	1	11	15	0	212	\N	H1N1	7c+	\N	\N	\N	\N	2021-04-25 22:58:21.333287	2021-04-25 22:58:21.348669
1145	t	\N	t	0	0	2	1	1	12	30	0	212	\N	Asociación Porcina	7b	\N	\N	\N	\N	2021-04-25 22:58:21.423359	2021-04-25 22:58:21.442177
1146	t	\N	t	0	0	2	1	1	13	25	0	212	\N	Pasao a Hudson	5-	\N	\N	\N	\N	2021-04-25 22:58:21.505359	2021-04-25 22:58:21.51976
1147	t	\N	t	0	0	2	1	1	14	20	0	212	\N	Eli	6a+	\N	\N	\N	\N	2021-04-25 22:58:21.565436	2021-04-25 22:58:21.580179
1148	t	\N	t	0	0	2	2	1	1	70	0	213	\N	Sin Palabras	7a+	\N	\N	\N	\N	2021-04-25 22:58:21.63929	2021-04-25 22:58:21.657052
1149	t	\N	t	0	0	2	1	1	2	25	0	213	\N	Bostezo Nocturno	7a+	\N	\N	\N	\N	2021-04-25 22:58:21.709289	2021-04-25 22:58:21.72224
1150	t	\N	t	0	0	2	1	1	3	25	0	213	\N	Esposición de Ballenas	6a+	\N	\N	\N	\N	2021-04-25 22:58:21.797426	2021-04-25 22:58:21.825244
1151	t	\N	t	0	0	2	1	1	4	25	0	213	\N	Thayari	6c+	\N	\N	\N	\N	2021-04-25 22:58:21.930997	2021-04-25 22:58:21.955971
1152	t	\N	t	0	0	2	3	1	5	70	0	213	\N	Ytacua	6a	\N	\N	\N	\N	2021-04-25 22:58:22.035346	2021-04-25 22:58:22.050227
1153	t	\N	t	0	0	2	1	1	6	30	0	213	\N	Luchando por la Vida	6b+	\N	\N	\N	\N	2021-04-25 22:58:22.101242	2021-04-25 22:58:22.114055
1154	t	\N	t	0	0	2	1	1	7	25	0	213	\N	Peguita de a Tres	7a	\N	\N	\N	\N	2021-04-25 22:58:22.163334	2021-04-25 22:58:22.182018
1155	t	\N	t	0	0	2	1	1	8	35	0	213	\N	Mago Pop	7c	\N	\N	\N	\N	2021-04-25 22:58:22.232857	2021-04-25 22:58:22.246509
1156	t	\N	t	0	0	2	1	1	9	30	0	213	\N	Carpintero de Roca	7c	\N	\N	\N	\N	2021-04-25 22:58:22.327371	2021-04-25 22:58:22.349417
1157	t	\N	t	0	0	2	1	1	10	30	0	213	\N	Dim Sum	8a	\N	\N	\N	\N	2021-04-25 22:58:22.447432	2021-04-25 22:58:22.465161
1158	t	\N	t	0	0	2	1	1	11	30	0	213	\N	Mon Petit Biche	7a	\N	\N	\N	\N	2021-04-25 22:58:22.51931	2021-04-25 22:58:22.533802
1159	t	\N	t	0	0	2	1	1	12	30	0	213	\N	Kryptonita	6c	\N	\N	\N	\N	2021-04-25 22:58:22.582937	2021-04-25 22:58:22.603142
1160	t	\N	t	0	0	2	1	1	13	35	0	214	\N	Las Bondades de la Paramela	8a	\N	\N	\N	\N	2021-04-25 22:58:22.688029	2021-04-25 22:58:22.705112
1161	t	\N	t	0	0	2	1	1	14	30	0	214	\N	La Naranja Mecánica	Proyecto	\N	\N	\N	\N	2021-04-25 22:58:22.759041	2021-04-25 22:58:22.774476
1162	t	\N	t	0	0	2	1	1	15	30	0	214	\N	Copucha Letal	7b+	\N	\N	\N	\N	2021-04-25 22:58:22.832886	2021-04-25 22:58:22.848726
1163	t	\N	t	0	0	2	1	1	16	30	0	214	\N	Warren Smith	7c+	\N	\N	\N	\N	2021-04-25 22:58:22.909817	2021-04-25 22:58:22.924525
1164	t	\N	t	0	0	2	1	1	17	35	0	214	\N	Roomba metoo	6c	\N	\N	\N	\N	2021-04-25 22:58:22.972767	2021-04-25 22:58:22.986382
1165	t	\N	t	0	0	2	1	1	18	30	0	214	\N	Cántabro	6c+	\N	\N	\N	\N	2021-04-25 22:58:23.037216	2021-04-25 22:58:23.055119
1166	t	\N	t	0	0	2	1	1	19	30	0	214	\N	Pura Calité	6c	\N	\N	\N	\N	2021-04-25 22:58:23.112746	2021-04-25 22:58:23.129707
1167	t	\N	t	0	0	2	1	1	20	30	0	214	\N	Antídoto	6c+	\N	\N	\N	\N	2021-04-25 22:58:23.269711	2021-04-25 22:58:23.305403
1168	t	\N	t	0	0	2	1	1	21	30	0	214	\N	La Schumager	6c+	\N	\N	\N	\N	2021-04-25 22:58:23.377525	2021-04-25 22:58:23.421461
1169	t	\N	t	0	0	2	1	1	22	30	0	214	\N	Contratodo	6b+	\N	\N	\N	\N	2021-04-25 22:58:23.483457	2021-04-25 22:58:23.497746
1170	t	\N	t	0	0	2	1	1	23	30	0	214	\N	Casi Todo	7a+	\N	\N	\N	\N	2021-04-25 22:58:23.546276	2021-04-25 22:58:23.563206
1171	t	\N	t	0	0	2	1	1	24	30	0	214	\N	Red & Yellow	7a	\N	\N	\N	\N	2021-04-25 22:58:23.640363	2021-04-25 22:58:23.653121
1172	t	\N	t	0	0	2	2	1	25	100	0	215	\N	Tierra de Nadie	7a+	\N	\N	\N	\N	2021-04-25 22:58:23.711453	2021-04-25 22:58:23.726866
1173	t	\N	t	0	0	2	2	1	26	80	0	215	\N	Tierra Sucia	5-	\N	\N	\N	\N	2021-04-25 22:58:23.806604	2021-04-25 22:58:23.823147
1174	t	\N	t	0	0	2	3	1	27	80	0	215	\N	Bajagonía	5+	\N	\N	\N	\N	2021-04-25 22:58:23.879371	2021-04-25 22:58:23.892329
1175	t	\N	t	0	0	2	1	1	28	30	0	215	\N	Batería Gris	5-	\N	\N	\N	\N	2021-04-25 22:58:23.955365	2021-04-25 22:58:23.970235
1176	t	\N	t	0	0	2	1	1	29	30	0	215	\N	Unbelayable	5-	\N	\N	\N	\N	2021-04-25 22:58:24.044156	2021-04-25 22:58:24.058186
1177	t	\N	t	0	0	2	3	1	30	105	0	215	\N	Sube y Baja Conmigo	6b	\N	\N	\N	\N	2021-04-25 22:58:24.133926	2021-04-25 22:58:24.154675
1238	t	\N	t	0	0	2	1	0	8	28	0	221	\N	Que Suba el Jefe	7b	\N	\N	\N	\N	2021-04-25 22:58:29.244458	2021-04-25 22:58:29.258911
1178	t	\N	t	0	0	2	3	1	31	105	0	215	\N	It's Jimmy From America and Pablito From Coyhaique	6b	\N	\N	\N	\N	2021-04-25 22:58:24.230053	2021-04-25 22:58:24.244334
1179	t	\N	t	0	0	2	1	1	32	35	0	215	\N	Tierra 2	6c	\N	\N	\N	\N	2021-04-25 22:58:24.301459	2021-04-25 22:58:24.321088
1180	t	\N	t	0	0	2	1	1	33	35	0	215	\N	La Muerte del Pirata	6c	\N	\N	\N	\N	2021-04-25 22:58:24.385676	2021-04-25 22:58:24.409402
1181	t	\N	t	0	0	2	1	1	34	35	0	215	\N	La Muerte del Minero	6b	\N	\N	\N	\N	2021-04-25 22:58:24.461309	2021-04-25 22:58:24.47523
1182	t	\N	t	0	0	2	1	1	35	35	0	215	\N	Como Guata Cagada	6c	\N	\N	\N	\N	2021-04-25 22:58:24.532799	2021-04-25 22:58:24.5526
1183	t	\N	t	0	0	2	4	1	36	100	0	215	\N	Pupila de Águila	\N	\N	\N	\N	\N	2021-04-25 22:58:24.607216	2021-04-25 22:58:24.63294
1184	t	\N	t	0	0	2	1	1	37	35	0	215	\N	Hermanabless	6b	\N	\N	\N	\N	2021-04-25 22:58:24.731968	2021-04-25 22:58:24.744048
1185	t	\N	t	0	0	2	1	1	38	35	0	215	\N	Brandon Situation	6b+	\N	\N	\N	\N	2021-04-25 22:58:24.807875	2021-04-25 22:58:24.820169
1186	t	\N	t	0	0	2	1	1	39	35	0	215	\N	Dieta Vergana	6c	\N	\N	\N	\N	2021-04-25 22:58:24.874617	2021-04-25 22:58:24.891725
1187	t	\N	t	0	0	2	1	1	40	35	0	215	\N	Between no More	6b	\N	\N	\N	\N	2021-04-25 22:58:24.969572	2021-04-25 22:58:24.983303
1188	t	\N	t	0	0	2	1	1	1	12	0	216	\N	Pequeña Solitaria	4-	\N	\N	\N	\N	2021-04-25 22:58:25.03872	2021-04-25 22:58:25.052582
1189	t	\N	t	0	0	2	1	1	2	12	0	216	\N	Bambi Line	5-	\N	\N	\N	\N	2021-04-25 22:58:25.121945	2021-04-25 22:58:25.135585
1190	t	\N	t	0	0	2	1	1	3	12	0	216	\N	Escuela de Rock	4-	\N	\N	\N	\N	2021-04-25 22:58:25.190005	2021-04-25 22:58:25.209975
1191	t	\N	t	0	0	2	1	1	4	12	0	216	\N	Unknown	5+	\N	\N	\N	\N	2021-04-25 22:58:25.269441	2021-04-25 22:58:25.297211
1192	t	\N	t	0	0	2	1	1	5	15	0	216	\N	He He	5-	\N	\N	\N	\N	2021-04-25 22:58:25.350939	2021-04-25 22:58:25.383585
1193	t	\N	t	0	0	2	1	1	6	15	0	216	\N	La Z	5-	\N	\N	\N	\N	2021-04-25 22:58:25.457051	2021-04-25 22:58:25.470527
1194	t	\N	t	0	0	2	1	1	7	15	0	216	\N	Un Pasito p'alante Maria	5-	\N	\N	\N	\N	2021-04-25 22:58:25.535579	2021-04-25 22:58:25.550179
1195	t	\N	t	0	0	2	1	1	8	15	0	216	\N	En Los Helechos	5+	\N	\N	\N	\N	2021-04-25 22:58:25.614367	2021-04-25 22:58:25.637426
1196	t	\N	t	0	0	2	1	1	9	15	0	216	\N	Segurito	7c	\N	\N	\N	\N	2021-04-25 22:58:25.71214	2021-04-25 22:58:25.729262
1197	t	\N	t	0	0	2	1	1	10	18	0	216	\N	Volviendo a los 17	7a	\N	\N	\N	\N	2021-04-25 22:58:25.780634	2021-04-25 22:58:25.803717
1198	t	\N	t	0	0	2	1	1	11	10	0	216	\N	Tranquila Valentina	7b	\N	\N	\N	\N	2021-04-25 22:58:25.857412	2021-04-25 22:58:25.87231
1199	t	\N	t	0	0	2	1	1	12	18	0	216	\N	Chikoka Mañosa	7a	\N	\N	\N	\N	2021-04-25 22:58:25.929186	2021-04-25 22:58:25.943811
1200	t	\N	t	0	0	2	1	1	13	10	0	216	\N	Al Filo del Huevo	6c	\N	\N	\N	\N	2021-04-25 22:58:25.998086	2021-04-25 22:58:26.01118
1201	t	\N	t	0	0	2	1	0	1	20	0	217	\N	La Primera no Entra Entera	6a+	\N	\N	\N	\N	2021-04-25 22:58:26.062729	2021-04-25 22:58:26.077733
1202	t	\N	t	0	0	2	1	0	2	27	0	217	\N	Pájaro Guacho	6c	\N	\N	\N	\N	2021-04-25 22:58:26.131358	2021-04-25 22:58:26.145201
1203	t	\N	t	0	0	2	1	0	3	27	0	217	\N	Sangre por Sangre	7a+	\N	\N	\N	\N	2021-04-25 22:58:26.195279	2021-04-25 22:58:26.210392
1204	t	\N	t	0	0	2	1	0	4	27	0	217	\N	La Escorpiona	6c+	\N	\N	\N	\N	2021-04-25 22:58:26.287922	2021-04-25 22:58:26.309183
1205	t	\N	t	0	0	2	1	0	5	28	0	217	\N	Llámame	7c	\N	\N	\N	\N	2021-04-25 22:58:26.374567	2021-04-25 22:58:26.40937
1206	t	\N	t	0	0	2	1	0	6	28	0	217	\N	Costilla Chancho	7a+	\N	\N	\N	\N	2021-04-25 22:58:26.478132	2021-04-25 22:58:26.491385
1207	t	\N	t	0	0	2	1	0	7	28	0	217	\N	Hipocamelus	7c	\N	\N	\N	\N	2021-04-25 22:58:26.541188	2021-04-25 22:58:26.556189
1208	t	\N	t	0	0	2	1	0	8	28	0	217	\N	Omega	Proyecto	\N	\N	\N	\N	2021-04-25 22:58:26.607881	2021-04-25 22:58:26.622248
1209	t	\N	t	0	0	2	1	0	9	28	0	217	\N	Siempre Cool Nunca Estrés	7b+	\N	\N	\N	\N	2021-04-25 22:58:26.71213	2021-04-25 22:58:26.733471
1210	t	\N	t	0	0	2	1	0	10	25	0	217	\N	Año Nuevo	Proyecto	\N	\N	\N	\N	2021-04-25 22:58:26.801847	2021-04-25 22:58:26.821037
1211	t	\N	t	0	0	2	1	0	11	25	0	217	\N	Re Linda	6a+	\N	\N	\N	\N	2021-04-25 22:58:26.904777	2021-04-25 22:58:26.925377
1212	t	\N	t	0	0	2	1	0	12	25	0	217	\N	Unknown	6b	\N	\N	\N	\N	2021-04-25 22:58:26.992471	2021-04-25 22:58:27.005665
1213	t	\N	t	0	0	2	1	0	1	25	0	218	\N	Niale	6b	\N	\N	\N	\N	2021-04-25 22:58:27.088581	2021-04-25 22:58:27.107107
1214	t	\N	t	0	0	2	1	0	2	25	0	218	\N	Chispas	6a+	\N	\N	\N	\N	2021-04-25 22:58:27.187093	2021-04-25 22:58:27.20862
1215	t	\N	t	0	0	2	1	0	3	22	0	218	\N	El Chulengo	6b	\N	\N	\N	\N	2021-04-25 22:58:27.276702	2021-04-25 22:58:27.310321
1216	t	\N	t	0	0	2	1	0	4	25	0	218	\N	Unknown	6b	\N	\N	\N	\N	2021-04-25 22:58:27.38769	2021-04-25 22:58:27.41087
1217	t	\N	t	0	0	2	1	0	5	20	0	218	\N	Don Patricio Carloh	6b+	\N	\N	\N	\N	2021-04-25 22:58:27.467547	2021-04-25 22:58:27.486704
1218	t	\N	t	0	0	2	1	0	6	25	0	218	\N	Guanaco Perdido	7b	\N	\N	\N	\N	2021-04-25 22:58:27.535173	2021-04-25 22:58:27.553393
1219	t	\N	t	0	0	2	1	0	1	20	0	219	\N	Ticket pa Escocia	5-	\N	\N	\N	\N	2021-04-25 22:58:27.616737	2021-04-25 22:58:27.636535
1220	t	\N	t	0	0	2	1	0	2	20	0	219	\N	Chancho Herido	5+	\N	\N	\N	\N	2021-04-25 22:58:27.701312	2021-04-25 22:58:27.716818
1221	t	\N	t	0	0	2	3	0	3	75	0	219	\N	Lluvia de Bandurrias	6c+	\N	\N	\N	\N	2021-04-25 22:58:27.813151	2021-04-25 22:58:27.830496
1222	t	\N	t	0	0	2	1	0	4	25	0	219	\N	A Darle Átomo	6a	\N	\N	\N	\N	2021-04-25 22:58:27.883949	2021-04-25 22:58:27.897559
1223	t	\N	t	0	0	2	4	0	5	100	0	219	\N	Marichiweu	6c	\N	\N	\N	\N	2021-04-25 22:58:27.976041	2021-04-25 22:58:27.99587
1224	t	\N	t	0	0	2	1	0	6	25	0	219	\N	Las 3 Pirámides	5+	\N	\N	\N	\N	2021-04-25 22:58:28.069379	2021-04-25 22:58:28.089494
1225	t	\N	t	0	0	2	1	0	1	20	0	220	\N	Canela	6b+	\N	\N	\N	\N	2021-04-25 22:58:28.156078	2021-04-25 22:58:28.170141
1226	t	\N	t	0	0	2	1	0	2	20	0	220	\N	Thor	6c	\N	\N	\N	\N	2021-04-25 22:58:28.241209	2021-04-25 22:58:28.258799
1227	t	\N	t	0	0	2	1	0	3	20	0	220	\N	Aquiles	6c	\N	\N	\N	\N	2021-04-25 22:58:28.349667	2021-04-25 22:58:28.37202
1228	t	\N	t	0	0	2	1	0	4	25	0	220	\N	Agua pal Mate	Proyecto	\N	\N	\N	\N	2021-04-25 22:58:28.421579	2021-04-25 22:58:28.43445
1229	t	\N	t	0	0	2	1	0	5	20	0	220	\N	Cerillazo	7a+	\N	\N	\N	\N	2021-04-25 22:58:28.49416	2021-04-25 22:58:28.509401
1230	t	\N	t	0	0	2	1	0	6	20	0	220	\N	Cafuné	7a+	\N	\N	\N	\N	2021-04-25 22:58:28.558079	2021-04-25 22:58:28.57316
1231	t	\N	t	0	0	2	1	0	1	29	0	221	\N	Ilusión	7a	\N	\N	\N	\N	2021-04-25 22:58:28.653557	2021-04-25 22:58:28.677151
1232	t	\N	t	0	0	2	1	0	2	30	0	221	\N	Araña Colorá	7a	\N	\N	\N	\N	2021-04-25 22:58:28.737075	2021-04-25 22:58:28.755699
1233	t	\N	t	0	0	2	1	0	3	15	0	221	\N	Agárrate Cabro	7b	\N	\N	\N	\N	2021-04-25 22:58:28.83719	2021-04-25 22:58:28.855748
1234	t	\N	t	0	0	2	1	0	4	28	0	221	\N	Huemul con Miedo	7c	\N	\N	\N	\N	2021-04-25 22:58:28.917293	2021-04-25 22:58:28.940867
1235	t	\N	t	0	0	2	1	0	5	28	0	221	\N	Casi Aflojando	7a	\N	\N	\N	\N	2021-04-25 22:58:29.001102	2021-04-25 22:58:29.01672
1236	t	\N	t	0	0	2	1	0	6	30	0	221	\N	Pánico Gaucho	7b+	\N	\N	\N	\N	2021-04-25 22:58:29.089654	2021-04-25 22:58:29.105544
1237	t	\N	t	0	0	2	1	0	7	28	0	221	\N	Hembra Brava	6c+	\N	\N	\N	\N	2021-04-25 22:58:29.168903	2021-04-25 22:58:29.195526
1239	t	\N	t	0	0	2	1	0	9	35	0	221	\N	Calienta que Sales	6c+	\N	\N	\N	\N	2021-04-25 22:58:29.329664	2021-04-25 22:58:29.349737
1240	t	\N	t	0	0	2	1	0	1	28	0	222	\N	Entre Diedros	7a	\N	\N	\N	\N	2021-04-25 22:58:29.407158	2021-04-25 22:58:29.421904
1241	t	\N	t	0	0	2	1	0	2	28	0	222	\N	¿Prieto o Aprieto?	7b+	\N	\N	\N	\N	2021-04-25 22:58:29.509913	2021-04-25 22:58:29.527602
1242	t	\N	t	0	0	2	1	0	3	28	0	222	\N	Unknown	Proyecto	\N	\N	\N	\N	2021-04-25 22:58:29.577676	2021-04-25 22:58:29.592329
1243	t	\N	t	0	0	2	1	0	4	28	0	222	\N	Unknown	7a+	\N	\N	\N	\N	2021-04-25 22:58:29.648101	2021-04-25 22:58:29.669411
1244	t	\N	t	0	0	2	1	0	5	35	0	222	\N	Cartoné Sauvignon	7b	\N	\N	\N	\N	2021-04-25 22:58:29.735627	2021-04-25 22:58:29.74994
1245	t	\N	t	0	0	2	1	0	6	20	0	222	\N	Alice en el Pais de las Maravillas	6b	\N	\N	\N	\N	2021-04-25 22:58:29.812708	2021-04-25 22:58:29.825201
1246	t	\N	t	0	0	2	1	0	7	20	0	222	\N	A Falta de Pan Buenas son las Tortas	6c+	\N	\N	\N	\N	2021-04-25 22:58:29.870112	2021-04-25 22:58:29.883955
1247	t	\N	t	0	0	2	1	0	8	25	0	222	\N	Los Opuestos se Atraen	8a	\N	\N	\N	\N	2021-04-25 22:58:29.957664	2021-04-25 22:58:29.972396
1248	t	\N	t	0	0	2	1	0	9	25	0	222	\N	Chip Pop	Proyecto	\N	\N	\N	\N	2021-04-25 22:58:30.067786	2021-04-25 22:58:30.083101
1249	t	\N	t	0	0	2	1	0	10	28	0	222	\N	Mister White	Proyecto	\N	\N	\N	\N	2021-04-25 22:58:30.134177	2021-04-25 22:58:30.148097
1250	t	\N	t	0	0	2	1	0	11	30	0	222	\N	Lindo Patio	7a+	\N	\N	\N	\N	2021-04-25 22:58:30.215653	2021-04-25 22:58:30.233163
1251	t	\N	t	0	0	2	1	0	12	35	0	222	\N	El Capitalino	7a	\N	\N	\N	\N	2021-04-25 22:58:30.29277	2021-04-25 22:58:30.316947
1252	t	\N	t	0	0	2	1	0	13	35	0	222	\N	Unknown	7a	\N	\N	\N	\N	2021-04-25 22:58:30.375917	2021-04-25 22:58:30.388554
1253	t	\N	t	0	0	2	1	0	14	30	0	222	\N	Fake News	7c+	\N	\N	\N	\N	2021-04-25 22:58:30.453515	2021-04-25 22:58:30.470199
1254	t	\N	t	0	0	2	2	0	1	60	0	223	\N	Papichulo / Papichulo Extentensión	7b+	\N	\N	\N	\N	2021-04-25 22:58:30.529193	2021-04-25 22:58:30.543294
1255	t	\N	t	0	0	2	1	0	2	55	0	223	\N	Chimi Changa	7a	\N	\N	\N	\N	2021-04-25 22:58:30.595705	2021-04-25 22:58:30.609555
1256	t	\N	t	0	0	2	1	0	3	37	0	223	\N	No Hay Sistema	7c	\N	\N	\N	\N	2021-04-25 22:58:30.713079	2021-04-25 22:58:30.73302
1257	t	\N	t	0	0	2	1	0	4	28	0	223	\N	Pampita	7c	\N	\N	\N	\N	2021-04-25 22:58:30.804041	2021-04-25 22:58:30.818077
1258	t	\N	t	0	0	2	1	0	5	28	0	223	\N	El Cambalache	6c+	\N	\N	\N	\N	2021-04-25 22:58:30.870807	2021-04-25 22:58:30.884932
1259	t	\N	t	0	0	2	1	0	6	28	0	223	\N	Unknown	6c	\N	\N	\N	\N	2021-04-25 22:58:30.965691	2021-04-25 22:58:30.984789
1260	t	\N	t	0	0	2	1	0	7	25	0	223	\N	El Despertar de la Fuerza	6c	\N	\N	\N	\N	2021-04-25 22:58:31.045268	2021-04-25 22:58:31.057541
1261	t	\N	t	0	0	2	1	0	8	25	0	223	\N	Diedro Vale^2	7a	\N	\N	\N	\N	2021-04-25 22:58:31.112373	2021-04-25 22:58:31.132001
1262	t	\N	t	0	0	2	1	0	9	30	0	223	\N	La Octava Dimensión	8a	\N	\N	\N	\N	2021-04-25 22:58:31.233526	2021-04-25 22:58:31.274025
1263	t	\N	t	0	0	2	1	0	10	25	0	223	\N	Donde Dobla y el Viento se Cruzan los Atajos	7a	\N	\N	\N	\N	2021-04-25 22:58:31.358116	2021-04-25 22:58:31.378327
1264	t	\N	t	0	0	2	1	0	11	35	0	223	\N	Mas Largo que un Dia sin Pan	7b	\N	\N	\N	\N	2021-04-25 22:58:31.4528	2021-04-25 22:58:31.487246
1265	t	\N	t	0	0	2	1	0	12	35	0	223	\N	Apaño Patagón	7c	\N	\N	\N	\N	2021-04-25 22:58:31.549051	2021-04-25 22:58:31.564397
1266	t	\N	t	0	0	2	1	0	13	30	0	223	\N	Unknown	7a+	\N	\N	\N	\N	2021-04-25 22:58:31.641731	2021-04-25 22:58:31.670766
1267	t	\N	t	0	0	2	1	0	1	20	0	224	\N	Liberen a Willy	6c	\N	\N	\N	\N	2021-04-25 22:58:31.752517	2021-04-25 22:58:31.784389
1268	t	\N	t	0	0	2	1	0	2	20	0	224	\N	Mina de Chapas	7a	\N	\N	\N	\N	2021-04-25 22:58:31.846749	2021-04-25 22:58:31.870276
1269	t	\N	t	0	0	2	1	0	3	20	0	224	\N	Térmica 19,70	5+	\N	\N	\N	\N	2021-04-25 22:58:31.965708	2021-04-25 22:58:32.006133
1270	t	\N	t	0	0	2	1	0	4	20	0	224	\N	Manos del Castillo	6b	\N	\N	\N	\N	2021-04-25 22:58:32.109123	2021-04-25 22:58:32.125256
1271	t	\N	t	0	0	2	1	0	5	15	0	224	\N	Taki Taki	5+	\N	\N	\N	\N	2021-04-25 22:58:32.206206	2021-04-25 22:58:32.230169
1272	t	\N	t	0	0	2	1	0	6	15	0	224	\N	Publicidad Engañosa	6b+	\N	\N	\N	\N	2021-04-25 22:58:32.291869	2021-04-25 22:58:32.319659
1273	t	\N	t	0	0	2	1	0	7	15	0	224	\N	La Bandurria	6b	\N	\N	\N	\N	2021-04-25 22:58:32.373952	2021-04-25 22:58:32.390442
1274	t	\N	t	0	0	2	1	0	8	15	0	224	\N	La Botella Perdida	5+	\N	\N	\N	\N	2021-04-25 22:58:32.460338	2021-04-25 22:58:32.473331
1275	t	\N	t	0	0	2	1	0	9	18	0	224	\N	Línea Blanca	5+	\N	\N	\N	\N	2021-04-25 22:58:32.522822	2021-04-25 22:58:32.535855
1276	t	\N	t	0	0	2	1	0	10	18	0	224	\N	Berberis Microphylla	6b+	\N	\N	\N	\N	2021-04-25 22:58:32.615206	2021-04-25 22:58:32.630275
1277	t	\N	t	0	0	2	1	0	1	18	0	225	\N	Evolución Lógica	6c	\N	\N	\N	\N	2021-04-25 22:58:32.68799	2021-04-25 22:58:32.701416
1278	t	\N	t	0	0	2	1	0	2	15	0	225	\N	Patababy	5+	\N	\N	\N	\N	2021-04-25 22:58:32.754339	2021-04-25 22:58:32.767104
1279	t	\N	t	0	0	2	1	0	3	18	0	225	\N	La Primera	6b+	\N	\N	\N	\N	2021-04-25 22:58:32.914418	2021-04-25 22:58:32.92851
1280	t	\N	t	0	0	2	1	0	4	15	0	225	\N	Trabajar Bajo Piedrón	6b	\N	\N	\N	\N	2021-04-25 22:58:32.988699	2021-04-25 22:58:33.006264
1281	t	\N	t	0	0	2	1	0	5	12	0	225	\N	La Laguna	5+	\N	\N	\N	\N	2021-04-25 22:58:33.055348	2021-04-25 22:58:33.073551
1282	t	\N	t	0	0	2	1	0	1	20	0	226	\N	La Fisura	5+	\N	\N	\N	\N	2021-04-25 22:58:33.200003	2021-04-25 22:58:33.229119
1283	t	\N	t	0	0	2	1	0	2	20	0	226	\N	En Trámite	5+	\N	\N	\N	\N	2021-04-25 22:58:33.349612	2021-04-25 22:58:33.370715
1284	t	\N	t	0	0	2	1	0	3	20	0	226	\N	Unknown	5+	\N	\N	\N	\N	2021-04-25 22:58:33.43665	2021-04-25 22:58:33.454661
1285	t	\N	t	0	0	2	1	0	4	20	0	226	\N	La Picá de Araña	5-	\N	\N	\N	\N	2021-04-25 22:58:33.524365	2021-04-25 22:58:33.542493
1286	t	\N	t	0	0	2	1	0	5	20	0	226	\N	La Movía	5-	\N	\N	\N	\N	2021-04-25 22:58:33.624651	2021-04-25 22:58:33.64934
1287	t	\N	t	0	0	2	1	0	6	20	0	226	\N	Fio Fio	5+	\N	\N	\N	\N	2021-04-25 22:58:33.729365	2021-04-25 22:58:33.749154
1288	t	\N	t	0	0	2	1	0	7	20	0	226	\N	Reypa	5-	\N	\N	\N	\N	2021-04-25 22:58:33.817341	2021-04-25 22:58:33.839845
1289	t	\N	t	0	0	2	1	0	8	20	0	226	\N	La Lindes	4-	\N	\N	\N	\N	2021-04-25 22:58:33.891814	2021-04-25 22:58:33.90524
1290	t	\N	t	0	0	2	1	0	9	15	0	227	\N	Los Lumaqueños	5-	\N	\N	\N	\N	2021-04-25 22:58:33.969116	2021-04-25 22:58:33.982145
1291	t	\N	t	0	0	2	1	0	10	15	0	227	\N	Antes de la Sopa	4-	\N	\N	\N	\N	2021-04-25 22:58:34.030829	2021-04-25 22:58:34.045169
1292	t	\N	t	0	0	2	1	0	11	15	0	227	\N	Murciélago	4-	\N	\N	\N	\N	2021-04-25 22:58:34.125628	2021-04-25 22:58:34.162259
1293	t	\N	t	0	0	2	1	0	1	\N	0	228	\N	Unknown	6a+	\N	\N	\N	\N	2021-04-25 22:58:34.216669	2021-04-25 22:58:34.230347
1294	t	\N	t	0	0	2	1	0	2	\N	0	228	\N	Unknown	7c	\N	\N	\N	\N	2021-04-25 22:58:34.307715	2021-04-25 22:58:34.325491
1295	t	\N	t	0	0	2	1	0	3	\N	0	228	\N	Licor de Calafate con 2 de Azúcar	7b	\N	\N	\N	\N	2021-04-25 22:58:34.413751	2021-04-25 22:58:34.432582
1296	t	\N	t	0	0	2	1	0	4	\N	0	228	\N	El Diedro de Lily	5+	\N	\N	\N	\N	2021-04-25 22:58:34.502224	2021-04-25 22:58:34.517872
1297	t	\N	t	0	0	2	1	0	5	\N	0	228	\N	Unknown	7a	\N	\N	\N	\N	2021-04-25 22:58:34.578162	2021-04-25 22:58:34.592629
1298	t	\N	t	0	0	2	1	0	6	\N	0	228	\N	Babysitter	7a+	\N	\N	\N	\N	2021-04-25 22:58:34.673542	2021-04-25 22:58:34.693362
1299	t	\N	t	0	0	2	1	0	7	\N	0	228	\N	La Ardilla Honnold	7b	\N	\N	\N	\N	2021-04-25 22:58:34.770575	2021-04-25 22:58:34.784421
1300	t	\N	t	0	0	2	1	0	8	\N	0	228	\N	Santa Closs	6c	\N	\N	\N	\N	2021-04-25 22:58:34.833027	2021-04-25 22:58:34.846942
1301	t	\N	t	0	0	2	1	0	9	\N	0	228	\N	Te Pondrá Pelo en el Pecho	6c	\N	\N	\N	\N	2021-04-25 22:58:34.894076	2021-04-25 22:58:34.906986
1302	t	\N	t	0	0	2	1	0	10	\N	0	228	\N	La Pana	6b	\N	\N	\N	\N	2021-04-25 22:58:34.996089	2021-04-25 22:58:35.025313
1303	t	\N	t	0	0	2	1	0	11	\N	0	228	\N	El Ilari	6a	\N	\N	\N	\N	2021-04-25 22:58:35.078924	2021-04-25 22:58:35.092326
1304	t	\N	t	0	0	2	1	0	12	\N	0	228	\N	Auke	6a	\N	\N	\N	\N	2021-04-25 22:58:35.158742	2021-04-25 22:58:35.172099
1305	t	\N	t	0	0	2	1	0	13	\N	0	228	\N	Un 28 de Marzo	6a+	\N	\N	\N	\N	2021-04-25 22:58:35.22262	2021-04-25 22:58:35.241354
1306	t	\N	t	0	0	2	1	0	14	\N	0	228	\N	El Martirio	6b	\N	\N	\N	\N	2021-04-25 22:58:35.329485	2021-04-25 22:58:35.34293
1307	t	\N	t	0	0	2	1	0	15	\N	0	228	\N	Frecuencia Peninsular	6b+	\N	\N	\N	\N	2021-04-25 22:58:35.449419	2021-04-25 22:58:35.46895
1308	t	\N	t	0	0	2	1	0	16	\N	0	228	\N	Crimen Desorganizado	6b	\N	\N	\N	\N	2021-04-25 22:58:35.530503	2021-04-25 22:58:35.552798
1309	t	\N	t	0	0	2	1	0	17	\N	0	228	\N	Entre Sombras	6a	\N	\N	\N	\N	2021-04-25 22:58:35.608706	2021-04-25 22:58:35.623195
1310	t	\N	t	0	0	2	1	0	18	\N	0	228	\N	5,9 de los Duros	6a	\N	\N	\N	\N	2021-04-25 22:58:35.690316	2021-04-25 22:58:35.704064
1311	t	\N	t	0	0	2	1	0	19	\N	0	228	\N	Mate Amargo	7b+	\N	\N	\N	\N	2021-04-25 22:58:35.762178	2021-04-25 22:58:35.776804
1312	t	\N	t	0	0	2	1	0	20	\N	0	228	\N	Granja de Gatos	6b+	\N	\N	\N	\N	2021-04-25 22:58:35.835217	2021-04-25 22:58:35.850385
1313	t	\N	t	0	0	2	1	0	21	\N	0	228	\N	La Polola Peluda	6c	\N	\N	\N	\N	2021-04-25 22:58:35.90833	2021-04-25 22:58:35.923525
1314	t	\N	t	0	0	2	1	0	1	20	0	229	\N	Polvo en el Ojo	6a	\N	\N	\N	\N	2021-04-25 22:58:36.025874	2021-04-25 22:58:36.053401
1315	t	\N	t	0	0	2	1	0	2	20	0	229	\N	En Trámite	6a	\N	\N	\N	\N	2021-04-25 22:58:36.111559	2021-04-25 22:58:36.14198
1316	t	\N	t	0	0	2	1	0	3	20	0	229	\N	Maitenal Bajo	6a	\N	\N	\N	\N	2021-04-25 22:58:36.207654	2021-04-25 22:58:36.229188
1317	t	\N	t	0	0	2	1	0	1	20	0	230	\N	Guanaco Compartido	7c	\N	\N	\N	\N	2021-04-25 22:58:36.317823	2021-04-25 22:58:36.341355
1318	t	\N	t	0	0	2	1	0	2	25	0	230	\N	La Catedral	7a+	\N	\N	\N	\N	2021-04-25 22:58:36.42212	2021-04-25 22:58:36.449206
1319	t	\N	t	0	0	2	1	0	3	25	0	230	\N	Unknown	7b+	\N	\N	\N	\N	2021-04-25 22:58:36.523848	2021-04-25 22:58:36.538525
1320	t	\N	t	0	0	2	1	0	4	25	0	230	\N	Strange Fingers	Proyecto	\N	\N	\N	\N	2021-04-25 22:58:36.598541	2021-04-25 22:58:36.626775
1321	t	\N	t	0	0	2	1	0	5	25	0	230	\N	Unknown	8b	\N	\N	\N	\N	2021-04-25 22:58:36.71582	2021-04-25 22:58:36.731642
1322	t	\N	t	0	0	2	1	0	6	23	0	230	\N	Fito Patagónico	Proyecto	\N	\N	\N	\N	2021-04-25 22:58:36.781187	2021-04-25 22:58:36.809668
1323	t	\N	t	0	0	2	1	0	7	20	0	230	\N	El Porfiado	6c	\N	\N	\N	\N	2021-04-25 22:58:36.880065	2021-04-25 22:58:36.900207
1324	t	\N	t	0	0	2	1	0	8	20	0	230	\N	La Radio	6b	\N	\N	\N	\N	2021-04-25 22:58:36.968298	2021-04-25 22:58:37.000826
81	t	t	t	0	0	1	1	0	4	\N	2	50	\N	C-Men	7b	\N	\N	\N	\N	2021-04-25 22:56:51.137446	2021-08-28 17:36:00.27334
\.


--
-- Data for Name: saved_routes; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.saved_routes (id, route_id, user_id, created_at, updated_at) FROM stdin;
105	1190	109	2021-04-29 17:26:34.191886	2021-04-29 17:26:34.191886
90	39	88	2021-04-14 14:28:42.773984	2021-04-14 14:28:42.773984
93	36	50	2021-04-19 21:21:48.941835	2021-04-19 21:21:48.941835
94	39	49	2021-04-22 21:06:48.709594	2021-04-22 21:06:48.709594
95	36	89	2021-04-22 23:07:59.066036	2021-04-22 23:07:59.066036
103	463	96	2021-04-25 23:31:28.985802	2021-04-25 23:31:28.985802
104	75	96	2021-04-25 23:32:26.439108	2021-04-25 23:32:26.439108
106	81	49	2021-08-28 17:35:41.735938	2021-08-28 17:35:41.735938
\.


--
-- Data for Name: schema_migrations; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.schema_migrations (version) FROM stdin;
20201006154422
20201006155009
20201006155010
20201006162459
20201007200139
20201007200832
20201007201630
20201007201943
20201007204340
20201007204828
20201007204841
20201007205815
20201007212006
20201007212711
20201007220257
20201007221240
20201007221243
20201007222312
20201008015354
20201008015414
20201008020603
20201008020826
20201008020923
20201008021019
20201008021448
20201008021745
20201008021852
20201008022122
20201008022447
20201008022637
20201008022654
20201008164248
20201008164249
20201008200707
20201008213057
20201008213115
20201222131916
20201222161345
20201222162310
20210211121200
20210211130312
20210211140200
20210211141855
20210216115822
20210216125043
20210217122948
20210217173424
20210223120050
20210226171621
20210303151035
20210303152343
20210305164803
20210305164804
20210322112738
20210316024202
\.


--
-- Data for Name: season_sun_exposures; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.season_sun_exposures (id, sun_exposure_id, season_id, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: seasons; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.seasons (id, start_date, end_date, name, created_at, updated_at) FROM stdin;
1	2020-12-21 00:00:00	2020-03-20 00:00:00	0	2020-12-18 19:15:30.164071	2020-12-18 19:15:30.164071
\.


--
-- Data for Name: sectors; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.sectors (id, latitude, longitude, zone_id, name, created_at, updated_at) FROM stdin;
2	\N	\N	35	Los Quesos	2021-02-25 14:20:25.56403	2021-02-25 14:20:25.56403
6	\N	\N	38	El Cubo	2021-04-09 12:42:19.978453	2021-04-09 12:42:19.978453
7	\N	\N	38	Cachupín	2021-04-09 13:01:58.044172	2021-04-09 13:01:58.044172
8	\N	\N	38	Espino	2021-04-09 13:06:33.674356	2021-04-09 13:06:33.674356
9	\N	\N	38	Círculo Vicioso	2021-04-09 13:08:34.690076	2021-04-09 13:08:34.690076
10	\N	\N	38	Transilvania	2021-04-09 13:10:50.177089	2021-04-09 13:10:50.177089
11	\N	\N	38	Zona Diabólica	2021-04-09 13:13:55.123137	2021-04-09 13:13:55.123137
12	\N	\N	38	Plan Z	2021-04-09 13:16:30.163503	2021-04-09 13:16:30.163503
13	\N	\N	38	San Pateste	2021-04-09 13:22:30.964274	2021-04-09 13:22:30.964274
14	\N	\N	38	Desplomilandia	2021-04-09 13:25:33.218567	2021-04-09 13:25:33.218567
15	\N	\N	38	Bohemia	2021-04-09 13:28:11.285905	2021-04-09 13:28:11.285905
16	\N	\N	38	Zona Escondida	2021-04-09 13:34:55.952998	2021-04-09 13:34:55.952998
17	\N	\N	38	Zona Poética	2021-04-09 13:38:03.811908	2021-04-09 13:38:03.811908
18	\N	\N	38	Muela Mayor	2021-04-09 13:43:15.313473	2021-04-09 13:43:15.313473
19	\N	\N	38	Minicubo	2021-04-09 13:47:40.10432	2021-04-09 13:47:40.10432
20	\N	\N	38	Señuelo	2021-04-09 13:49:37.524114	2021-04-09 13:49:37.524114
21	\N	\N	38	La Piedra del Condor	2021-04-09 13:50:01.847601	2021-04-09 13:50:01.847601
22	\N	\N	38	La Cueva	2021-04-09 13:50:15.832021	2021-04-09 13:50:15.832021
23	\N	\N	39	Todo por Nada	2021-04-09 15:44:13.271511	2021-04-09 15:44:13.271511
24	\N	\N	39	Hidrofobia	2021-04-09 15:44:35.729458	2021-04-09 15:44:35.729458
25	\N	\N	39	Popeye	2021-04-09 15:44:56.541709	2021-04-09 15:44:56.541709
26	\N	\N	39	Fogata	2021-04-09 15:45:13.255478	2021-04-09 15:45:13.255478
27	\N	\N	39	Constelaciones	2021-04-09 15:45:26.590739	2021-04-09 15:45:26.590739
28	\N	\N	40	Porno	2021-04-09 17:33:43.451866	2021-04-09 17:33:43.451866
29	\N	\N	40	Piola	2021-04-09 17:34:13.79558	2021-04-09 17:34:13.79558
30	\N	\N	40	Marmol	2021-04-09 17:34:29.659483	2021-04-09 17:34:29.659483
31	\N	\N	40	Multilargos	2021-04-09 17:34:43.331121	2021-04-09 17:34:43.331121
32	\N	\N	40	Sin Nombre	2021-04-09 17:35:02.180375	2021-04-09 17:35:02.180375
33	\N	\N	41	Polaca	2021-04-09 17:47:45.747834	2021-04-09 17:47:45.747834
34	\N	\N	41	Escuela	2021-04-09 17:47:57.112486	2021-04-09 17:47:57.112486
35	\N	\N	41	Café Paris	2021-04-09 17:48:11.664054	2021-04-09 17:48:11.664054
36	\N	\N	41	Gran Monolito	2021-04-09 17:48:52.41028	2021-04-09 17:48:52.41028
37	\N	\N	41	Arriero	2021-04-09 17:49:08.631173	2021-04-09 17:49:08.631173
38	\N	\N	41	Multilargos	2021-04-09 17:49:23.048416	2021-04-09 17:49:23.048416
39	\N	\N	42	Petorca Bajo	2021-04-09 19:37:39.327849	2021-04-09 19:37:39.327849
40	\N	\N	42	Machete	2021-04-09 19:38:15.109726	2021-04-09 19:38:15.109726
41	\N	\N	42	Jabón	2021-04-09 19:38:30.531032	2021-04-09 19:38:30.531032
42	\N	\N	42	Trilogía	2021-04-09 19:38:46.599698	2021-04-09 19:38:46.599698
43	\N	\N	42	Catedral	2021-04-09 19:39:03.399178	2021-04-09 19:39:03.399178
44	\N	\N	42	Boulder	2021-04-09 19:39:22.240745	2021-04-09 19:39:22.240745
45	\N	\N	43	Anfiteatro	2021-04-12 14:11:31.486991	2021-04-12 14:11:31.486991
47	\N	\N	43	Techito	2021-04-12 15:31:33.57927	2021-04-12 15:31:33.57927
48	\N	\N	43	La Gran Pared	2021-04-12 15:32:11.851025	2021-04-12 15:32:11.851025
49	\N	\N	43	Gran Bloque	2021-04-12 15:32:34.613254	2021-04-12 15:32:34.613254
50	\N	\N	44	Primera	2021-04-12 15:32:52.022313	2021-04-12 15:32:52.022313
51	\N	\N	44	Segunda	2021-04-12 15:33:04.200839	2021-04-12 15:33:04.200839
52	\N	\N	44	Tercera	2021-04-12 15:33:26.383015	2021-04-12 15:33:26.383015
53	\N	\N	44	Cuarta	2021-04-12 15:33:42.212025	2021-04-12 15:33:42.212025
54	\N	\N	45	Sierra Calavera	2021-04-12 15:34:20.22853	2021-04-12 15:34:20.22853
55	\N	\N	46	Pared Principal	2021-04-12 15:34:35.130017	2021-04-12 15:35:14.872991
56	\N	\N	47	Sector 1	2021-04-12 15:35:33.507141	2021-04-12 15:35:33.507141
57	\N	\N	47	Sector 2	2021-04-12 15:35:51.079734	2021-04-12 15:35:51.079734
58	\N	\N	47	Sector 3	2021-04-12 15:36:03.026458	2021-04-12 15:36:03.026458
59	\N	\N	48	Rampa al Cielo	2021-04-12 15:36:37.473389	2021-04-12 15:36:37.473389
60	\N	\N	48	Choro Mingram	2021-04-12 15:36:52.429816	2021-04-12 15:36:52.429816
61	\N	\N	48	Principal	2021-04-12 15:37:06.953305	2021-04-12 15:37:06.953305
62	\N	\N	48	La Fuente	2021-04-12 15:37:19.710416	2021-04-12 15:37:19.710416
63	\N	\N	48	Relevo	2021-04-12 15:37:35.271292	2021-04-12 15:37:35.271292
64	\N	\N	49	Zona Clásica	2021-04-12 16:31:29.443502	2021-04-12 16:31:29.443502
65	\N	\N	49	Derecha	2021-04-12 16:31:42.659239	2021-04-12 16:31:42.659239
66	\N	\N	50	Pared Principal	2021-04-12 16:32:08.194583	2021-04-12 16:32:08.194583
67	\N	\N	51	Playa Corazones	2021-04-12 16:32:38.99998	2021-04-12 16:32:38.99998
68	\N	\N	52	El Gorila	2021-04-12 16:32:51.857546	2021-04-12 16:32:51.857546
69	\N	\N	52	Nigger	2021-04-12 16:33:02.571614	2021-04-12 16:33:02.571614
70	\N	\N	52	El Queso	2021-04-12 16:33:14.553148	2021-04-12 16:33:14.553148
71	\N	\N	52	Dark Side	2021-04-12 16:33:30.143797	2021-04-12 16:33:30.143797
72	\N	\N	52	Adherencia	2021-04-12 16:33:51.69716	2021-04-12 16:33:51.69716
73	\N	\N	52	Bota Piedras	2021-04-12 16:34:02.480787	2021-04-12 16:34:02.480787
74	\N	\N	52	Guacha	2021-04-12 16:34:14.217519	2021-04-12 16:34:14.217519
75	\N	\N	52	El Araucano	2021-04-12 16:34:31.903813	2021-04-12 16:34:31.903813
76	\N	\N	53	Clásico	2021-04-12 19:22:46.141723	2021-04-12 19:22:46.141723
77	\N	\N	53	Lluvia de Hamburguesas	2021-04-12 19:23:00.43905	2021-04-12 19:23:00.43905
78	\N	\N	53	Atardecer	2021-04-12 19:23:17.02642	2021-04-12 19:23:17.02642
79	\N	\N	53	Titanes	2021-04-12 19:23:28.383179	2021-04-12 19:23:28.383179
80	\N	\N	54	Piedra Blanca	2021-04-12 19:23:42.611216	2021-04-12 19:23:42.611216
81	\N	\N	54	Playa Creek	2021-04-12 19:23:54.899122	2021-04-12 19:23:54.899122
82	\N	\N	54	El Santuario de Jah	2021-04-12 19:24:46.60526	2021-04-12 19:24:46.60526
83	\N	\N	55	Pared Principal	2021-04-12 19:25:12.869845	2021-04-12 19:25:12.869845
84	\N	\N	56	Café Con Piernas	2021-04-13 01:12:45.90927	2021-04-13 01:12:45.90927
85	\N	\N	56	Las Cuevitas	2021-04-13 01:13:47.060857	2021-04-13 01:13:47.060857
86	\N	\N	56	Castillo Rojo	2021-04-13 01:14:06.143299	2021-04-13 01:14:06.143299
87	\N	\N	56	Mr Satán	2021-04-13 01:14:22.980767	2021-04-13 01:14:22.980767
88	\N	\N	56	Las Guatas	2021-04-13 01:14:47.330102	2021-04-13 01:14:47.330102
89	\N	\N	56	Paraiso del Burro	2021-04-13 01:14:58.954686	2021-04-13 01:14:58.954686
90	\N	\N	56	Torrecita Central	2021-04-13 01:15:10.278892	2021-04-13 01:15:10.278892
91	\N	\N	57	Pared Principal	2021-04-13 01:15:24.867257	2021-04-13 01:15:24.867257
92	\N	\N	58	La Playa	2021-04-13 01:15:56.811732	2021-04-13 01:15:56.811732
93	\N	\N	58	Bosque	2021-04-13 01:16:11.526831	2021-04-13 01:16:11.526831
94	\N	\N	58	Tradicional	2021-04-13 01:16:27.851692	2021-04-13 01:16:27.851692
95	\N	\N	58	Boulder	2021-04-13 01:16:42.218651	2021-04-13 01:16:42.218651
96	\N	\N	59	Bienvenido a Coliumo	2021-04-13 01:17:02.891226	2021-04-13 01:17:02.891226
97	\N	\N	60	Quebrada	2021-04-13 01:17:27.300763	2021-04-13 01:17:27.300763
98	\N	\N	60	Techos	2021-04-13 01:17:42.698997	2021-04-13 01:17:42.698997
99	\N	\N	60	Sector 3	2021-04-13 01:17:56.584707	2021-04-13 01:17:56.584707
100	\N	\N	60	Monolito	2021-04-13 01:18:11.986075	2021-04-13 01:18:11.986075
101	\N	\N	60	El Maray	2021-04-13 01:18:26.971127	2021-04-13 01:18:26.971127
102	\N	\N	61	Los Mayos	2021-04-13 01:37:05.189741	2021-04-13 01:37:05.189741
103	\N	\N	62	La Cuevita	2021-04-13 01:37:20.843546	2021-04-13 01:37:20.843546
104	\N	\N	62	Escuela	2021-04-13 01:37:39.135182	2021-04-13 01:37:39.135182
105	\N	\N	62	Unknown	2021-04-13 01:38:15.406259	2021-04-13 01:38:15.406259
106	\N	\N	62	La Gruta de la Virgen	2021-04-13 01:38:29.244416	2021-04-13 01:38:29.244416
107	\N	\N	62	Kinder Garden	2021-04-13 01:38:41.136367	2021-04-13 01:38:41.136367
108	\N	\N	62	Del Bosque	2021-04-13 01:39:07.310971	2021-04-13 01:39:07.310971
109	\N	\N	62	Del Techo	2021-04-13 01:39:28.807159	2021-04-13 01:39:28.807159
110	\N	\N	62	El Muro de los Lamentos	2021-04-13 01:39:47.410981	2021-04-13 01:39:47.410981
111	\N	\N	63	El Cañi	2021-04-13 01:40:41.030931	2021-04-13 01:40:41.030931
112	\N	\N	64	Los Antiguos	2021-04-13 01:40:51.70081	2021-04-13 01:40:51.70081
113	\N	\N	64	Amigos Para Qué	2021-04-13 01:41:01.550669	2021-04-13 01:41:01.550669
114	\N	\N	64	Mirando el Pescado	2021-04-13 01:41:29.406464	2021-04-13 01:41:29.406464
115	\N	\N	64	La Isla	2021-04-13 01:41:45.632023	2021-04-13 01:41:45.632023
116	\N	\N	64	La Escuela	2021-04-13 01:42:04.159163	2021-04-13 01:42:04.159163
117	\N	\N	64	Apacheta	2021-04-13 01:42:20.271172	2021-04-13 01:42:20.271172
118	\N	\N	65	Condorito	2021-04-13 01:54:30.873407	2021-04-13 01:54:30.873407
119	\N	\N	65	Pa Los Amigos	2021-04-13 01:54:42.10279	2021-04-13 01:54:42.10279
120	\N	\N	65	Pared Blanca	2021-04-13 01:54:53.735201	2021-04-13 01:54:53.735201
121	\N	\N	65	Tortuga	2021-04-13 01:55:05.851286	2021-04-13 01:55:05.851286
122	\N	\N	66	La Muela	2021-04-13 01:55:16.210126	2021-04-13 01:55:16.210126
123	\N	\N	66	Ratonera	2021-04-13 01:55:24.676099	2021-04-13 01:55:24.676099
124	\N	\N	67	La Peta	2021-04-13 01:55:36.571424	2021-04-13 01:55:36.571424
125	\N	\N	67	El Diente	2021-04-13 01:55:56.180587	2021-04-13 01:55:56.180587
126	\N	\N	67	El Dorado	2021-04-13 01:56:07.679171	2021-04-13 01:56:07.679171
127	\N	\N	67	El ID	2021-04-13 01:56:25.79446	2021-04-13 01:56:25.79446
128	\N	\N	67	La Calma	2021-04-13 01:56:40.438749	2021-04-13 01:56:40.438749
129	\N	\N	67	Mallín Escondido	2021-04-13 01:56:52.026912	2021-04-13 01:56:52.026912
130	\N	\N	67	Dos Palabras	2021-04-13 01:57:03.474863	2021-04-13 01:57:03.474863
131	\N	\N	67	Pared Sur	2021-04-13 01:57:32.545251	2021-04-13 01:57:32.545251
132	\N	\N	68	Pared Sur	2021-04-13 02:08:06.806753	2021-04-13 02:08:06.806753
133	\N	\N	68	Pared Central	2021-04-13 02:08:17.166934	2021-04-13 02:08:17.166934
134	\N	\N	69	Sector 1	2021-04-13 02:08:32.164992	2021-04-13 02:08:32.164992
135	\N	\N	69	Sector 2	2021-04-13 02:08:43.326674	2021-04-13 02:08:43.326674
136	\N	\N	69	Sector 3	2021-04-13 02:08:51.950738	2021-04-13 02:08:51.950738
137	\N	\N	69	Sector 4	2021-04-13 02:09:02.236408	2021-04-13 02:09:02.236408
138	\N	\N	69	Sector 5	2021-04-13 02:09:11.720011	2021-04-13 02:09:11.720011
139	\N	\N	69	Sector 6	2021-04-13 02:09:21.631267	2021-04-13 02:09:21.631267
140	\N	\N	69	Sector 7	2021-04-13 02:09:33.370746	2021-04-13 02:09:33.370746
141	\N	\N	70	El Queso	2021-04-13 02:09:43.7199	2021-04-13 02:09:43.7199
142	\N	\N	70	Pared Central	2021-04-13 02:09:54.098754	2021-04-13 02:09:54.098754
143	\N	\N	70	Sector Bajo	2021-04-13 02:10:04.909996	2021-04-13 02:10:04.909996
144	\N	\N	70	El Chivo	2021-04-13 02:10:14.533063	2021-04-13 02:10:14.533063
\.


--
-- Data for Name: spatial_ref_sys; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.spatial_ref_sys (srid, auth_name, auth_srid, srtext, proj4text) FROM stdin;
\.


--
-- Data for Name: sponsors; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.sponsors (id, name, created_at, updated_at, url) FROM stdin;
1	The North Face	2020-12-18 19:15:31.954885	2021-03-15 19:12:16.350781	https://thenorthface.cl
34	Patagonia	2021-03-22 19:29:42.797761	2021-03-22 19:29:42.865345	http://www.patagonia.cl
\.


--
-- Data for Name: sun_exposures; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.sun_exposures (id, exposure, wall_id, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: user_sponsors; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.user_sponsors (id, user_id, sponsor_id, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.users (id, provider, uid, encrypted_password, reset_password_token, reset_password_sent_at, allow_password_change, remember_created_at, sign_in_count, current_sign_in_at, last_sign_in_at, current_sign_in_ip, last_sign_in_ip, confirmation_token, confirmed_at, confirmation_sent_at, unconfirmed_email, climbing_since, boulder_scale, route_scale, name, brief_bio, email, phone_number, twitter, instagram, youtube, tiktok, facebook, last_sign_in_country, biography, tokens, created_at, updated_at, country_code, show_modal) FROM stdin;
98	phone	976230229		\N	\N	f	\N	1	2021-04-26 03:54:25.642059	2021-04-26 03:54:25.642059	54.86.50.139	54.86.50.139	\N	\N	\N	\N	\N	0	0	\N	\N	\N	976230229	\N	\N	\N	\N	\N	\N	\N	{"ZSE7PlhL8-N8-hnC2ow8Lw":{"token":"$2a$10$Z93ddp2y6AFhqjeVdLzXuO5MJWkHTvqso.a5kAfmUJEguww2M5Gym","expiry":1620594264},"PaMfMHYL5i8V7tcJPINzkA":{"token":"$2a$10$Tuy4jnJILXextFgZ.VUqduIkDsM29jyC1NSJv1EgIs8G39bhdGCta","expiry":1620594305},"kUrhilH6EEPFLWREtnRVEg":{"token":"$2a$10$4QrknOidkgRmym1A0MUbR.NjzZ8S4WzdvAnTyALwnxzXQeNSFttZ2","expiry":1620618865}}	2021-04-25 21:04:24.807343	2021-04-26 03:54:25.642429	\N	t
99	phone	975786087		\N	\N	f	\N	2	2021-04-29 19:35:54.772734	2021-04-26 14:56:51.059134	181.43.226.64	186.11.57.232	\N	\N	\N	\N	\N	0	0	Nacho	\N	\N	975786087	\N	\N	\N	\N	\N	\N	\N	{"8eG6mK7FRhSYU8rVsF4O-w":{"token":"$2a$10$eJ6cWDi6vMve0B9bGQo0COCu0h/mGcDFylmbBvMqsDcDQgs7gJ7cm","expiry":1620658611},"LdWneiIj792LQ7f2I3Q0tw":{"token":"$2a$10$JlENariAYUE3IXo2iDZUbuI1BTN6it5xnLspy416DPx8uN1NBTS.S","expiry":1620934554}}	2021-04-26 14:56:50.95753	2021-04-29 19:35:54.773264	\N	f
88	phone	981291729		\N	\N	f	\N	1	2021-04-14 14:16:52.666176	2021-04-14 14:16:52.666176	186.11.97.149	186.11.97.149	\N	\N	\N	\N	\N	0	0	Cami Tirado	\N	\N	981291729	\N	\N	\N	\N	\N	\N	\N	{"e5U1FhNHOcr7yelY4zHGSg":{"token":"$2a$10$krDUfTjh/INrvj3irK0OZO89GI8VETM5Hrc8yiubkROQaLpoCG.ym","expiry":1619619412}}	2021-04-14 14:16:52.573341	2021-04-14 14:17:20.312466	\N	f
105	phone	990471620		\N	\N	f	\N	2	2021-05-01 21:15:40.650105	2021-04-29 15:54:06.774982	181.203.23.113	200.83.148.27	\N	\N	\N	\N	\N	0	0	Gabriel	\N	\N	990471620	\N	\N	\N	\N	\N	\N	\N	{"4BApWv-HJjuRRLTFsWWGAg":{"token":"$2a$10$zJ6d6tgYTAMIuh7l3wAvku3ucF1wyvRYJCf4ezyxqzeLBiFez.AoO","expiry":1620921246},"AwQcNiaPC6-S-dI2V9jTDw":{"token":"$2a$10$CTau/HlYAg/3EpbEh88Uo.LE/Wk0DBdeF2So/syLn/pZ.fjjpNieO","expiry":1621113340}}	2021-04-29 15:54:06.690647	2021-05-01 21:15:40.650626	\N	f
113	phone	966561935		\N	\N	f	\N	5	2021-06-26 03:11:16.160953	2021-05-30 12:50:40.363309	201.241.211.64	201.241.211.64	\N	\N	\N	\N	2019	0	1	Arie	\N	\N	966561935	\N	\N	\N	\N	\N	\N	\N	{"-VHhwkXvmK74ZlMEoNijXA":{"token":"$2a$10$LUxFtYVbcnRF639ctG1Jduhdur.w3YzaM0I40oSCe8YEGuucOjIe.","expiry":1625886676}}	2021-04-30 01:38:56.710589	2021-06-26 03:11:16.161499	\N	f
100	phone	988189166		\N	\N	f	\N	5	2021-08-13 20:58:10.451378	2021-08-13 20:57:59.668291	200.119.230.181	200.119.230.181	\N	\N	\N	\N	\N	0	0	Probando	\N	\N	988189166	\N	\N	\N	\N	\N	\N	\N	{"4y-NGf3TZZ5HC_-AFCIsOg":{"token":"$2a$10$bFpdRGJ61P.hvIpr6g/8f.99Ev3BVShW8MT2SFbUXY0JgL3EUZqQ2","expiry":1629773456},"VfHtD6XQhhFNfHO5_5JHXA":{"token":"$2a$10$pCvL6DJYN3s1vujl15M6v.QnP1TrhXhIcSLVCLnpOYo2396Txgkx6","expiry":1630097879},"4qSKLSJvnKSPxRmQDHt9xg":{"token":"$2a$10$Z0htG8U03lOkUOcND9KldeWRM0eqB3AujtNd9tEOcFaeHKCSkdRtu","expiry":1630097890}}	2021-04-27 14:49:43.537899	2021-08-13 20:58:10.451841	\N	f
101	phone	988189144		\N	\N	f	\N	1	2021-04-28 13:10:50.175693	2021-04-28 13:10:50.175693	181.203.95.47	181.203.95.47	\N	\N	\N	\N	\N	0	0	Sebastian Zisis 		sebastian.zisis.s@gmail.com	77086604						\N		\N	2021-04-28 13:10:50.097114	2021-06-01 13:27:04.308173	\N	f
106	phone	982592174		\N	\N	f	\N	4	2021-08-10 15:17:05.077537	2021-08-10 02:51:46.169199	200.119.230.181	200.119.230.181	\N	\N	\N	\N	\N	0	0	Sebastián Ramírez 	\N	\N	982592174	\N	\N	\N	\N	\N	\N	\N	{"-wEvqv0zxB2pmLIL1IqBcA":{"token":"$2a$10$uFXnYegKDXhzZAOzXJnHTulk6Os8NVqYVS.0QpQ5VKFXHaXGcZQRC","expiry":1629773506},"ZkvFS9jbda8YBtRdEjSkBQ":{"token":"$2a$10$6RjWggadNhxDB6lwlmpVu.aW.WZ0NDim5bF7Q3iUEa1ij85h581TW","expiry":1629818225}}	2021-04-29 15:56:00.194574	2021-08-10 15:17:05.07804	\N	f
89	phone	978077354		\N	\N	f	\N	4	2021-05-04 13:31:51.396185	2021-04-22 23:22:03.772791	181.43.227.36	181.226.169.15	\N	\N	\N	\N	\N	0	0	Manu	\N	\N	978077354	\N	\N	\N	\N	\N	\N	\N	{"ZvUz1_xWSNpIoP9f5OQb4w":{"token":"$2a$10$S984uUY3wY7CeyQ2dgV74OMeqIeDwihngarDHEJME9h1vqX1sRNaC","expiry":1620342303},"s2sp0AQypyK8cSF62Gp8hA":{"token":"$2a$10$LDBeCUf2bwDsd7PoX7Z4kuBNrSHq9VtXQQJT6Sfgtp4Bk5RlaPj1q","expiry":1620342369},"eoRjJIXI3lydLAbFe-bUuQ":{"token":"$2a$10$GZJSmOecd2POTl7cDrLWieLyvwBsJpVKqWQhd.CZiYh1Uv5tth7HC","expiry":1620342399},"5g3GkurLsgcczGTj5YLY2g":{"token":"$2a$10$hi2PVjxdJhIHO7M0VDM//ug0Tw2pfO2vIEOhCIQRlRN9rxLNaFfKu","expiry":1620342421},"2Z6IxV80bgrOxWxFJkhSmA":{"token":"$2a$10$SnU75vmhM22Lw1CnSgEN6.jXL01kPdHgHFAWK2pi3vmyfLUv.GF9e","expiry":1620343081},"GFHFy2w0-IH0zYM0rJAGyQ":{"token":"$2a$10$WR2TBD1MRfdQyaU4W3R2dulnlNXFJ/KuyHcDpixeCTJ087Y4i.4RK","expiry":1620343323},"uiUkXs6QZc4sibhvykpOfA":{"token":"$2a$10$BB8.DOtZL.N4t5ymchVtJObhaygpmHEls7hL.vTcDP.m9n.7z3Hia","expiry":1620343375},"3qIgWZD5oj69AMhex_ihjg":{"token":"$2a$10$cLPvLnjkNSI1my.7UAsXSOAZtfTTsNvHfprLTgfJXW2ehM3vR9DTe","expiry":1621344711}}	2021-04-14 14:25:39.766959	2021-05-04 13:31:51.39668	\N	f
86	phone	964725408		\N	\N	f	\N	7	2021-05-05 01:38:18.316792	2021-05-04 13:55:03.953778	181.72.167.130	201.219.236.15	\N	\N	\N	\N	\N	0	0	Jekar Ignacio	\N	\N	964725408	\N	\N	\N	\N	\N	\N	\N	{"A3QEN3zjmNpqAzre_Ea00w":{"token":"$2a$10$e4UFphvmVXJL1yonoAOzLesdc0/NlqpWRul5NAGDaKFyyBAMrQWjG","expiry":1621257520},"JioRPmkLTjNYP7IP3TViFg":{"token":"$2a$10$Iafdl7iEhMRiuQgTEuAsiOJp/xH6NCIMsisqatexo4ykwiBqAbJKC","expiry":1621257704},"f1M6YJTptY8qUV1DR4FmcA":{"token":"$2a$10$/.9.96lmQRiJ1gLFW3V8keqxiZOWdRvEjd2ok7sceigY2WR4rJFh2","expiry":1621258659},"mcXdgCF3DHYAW0Jqc5usAg":{"token":"$2a$10$WnpDQIKZOiIPSvpseEHlBuG4ZLTcNZnpyegFmtnpNBe25IdI2DjFu","expiry":1621258856},"j5E4PuDt9t_vBIKzLegwSg":{"token":"$2a$10$vLdcba5NhHooO.0BQBROK.8r3mSVeX3knFj.Dt01VC.yxlOMtFfIy","expiry":1621346103},"IWLXs0xSBwXQFpWtG1i92w":{"token":"$2a$10$BZ66kTFIJgAKxFE93MC6reThe3Zmk5SxGCh/p9zvDsUdNE00pPvxS","expiry":1621388298}}	2021-04-12 14:00:10.488236	2021-05-05 01:38:18.31724	\N	f
96	phone	985003385		\N	\N	f	\N	5	2021-04-27 04:36:55.10506	2021-04-26 18:15:09.093803	186.11.98.116	181.226.169.15	\N	\N	\N	\N	\N	0	0	Daniela	\N	\N	985003385	\N	\N	\N	\N	\N	\N	\N	{"y0MKTgW79F9sUelruIDaEA":{"token":"$2a$10$SPPdA8g2aIxyorH1cj.hjuUSO3FbeukMd3loBu7qbDPOfw1KUM1Su","expiry":1620417490},"ZTFlKqMGTYruNiUvqq0RGQ":{"token":"$2a$10$qgTJU39rZ8p7qGe7Ua98t.z8IkkCiS/u2KSuCnloyQ3A.gx/V.Ucq","expiry":1620594348},"J3MebxJNzF5jTDgiUHcfDA":{"token":"$2a$10$KcxbomvsO0ajNsrmD3l2GuJnW4.QF5WR8feD5LMZN9Jnfvq..4ZSe","expiry":1620601197},"1jKl1zzxjR8YceMZB83Jrg":{"token":"$2a$10$7RwYsKEohRDBALF5XkOJTOUGNFP2wbNOR5Z8yPrnhxeyL0/dmwXcO","expiry":1620670509},"G7leWSMPlwPb2ypmm1Cyug":{"token":"$2a$10$UYbXPBgB2GMgM15Zs19P...RfUjAjc/WTxDM5cj/G..Uc4N0g7Awy","expiry":1620707815}}	2021-04-23 19:58:10.550245	2021-04-27 04:36:55.105587	\N	f
102	phone	988189177		\N	\N	f	\N	1	2021-04-28 13:20:43.936887	2021-04-28 13:20:43.936887	181.203.95.47	181.203.95.47	\N	\N	\N	\N	\N	0	0	Jsjjss	\N	\N	988189177	\N	\N	\N	\N	\N	\N	\N	{"o96dFByhca1T1PeLsiL4Vg":{"token":"$2a$10$SA7eFhb.2jSBA3XbATCXFO..3DKAdhMkAKRZQok6AOmTcqwcZFccm","expiry":1620825643}}	2021-04-28 13:20:43.856996	2021-04-28 13:20:54.283532	\N	f
34	phone	987654321		\N	\N	f	\N	978	2021-04-07 11:46:39.284106	2021-03-24 12:54:27.787931	201.186.118.165	164.77.237.228	\N	\N	\N	\N	\N	1	1	Ignacio Solar		sochix@gmail.com	45464661								\N	2021-02-22 15:31:39.229294	2021-06-01 13:25:31.921502	56	f
104	phone	988185691		\N	\N	f	\N	1	2021-04-28 13:27:39.877791	2021-04-28 13:27:39.877791	181.203.95.47	181.203.95.47	\N	\N	\N	\N	\N	0	0	Jjjjj0000	\N	\N	988185691	\N	\N	\N	\N	\N	\N	\N	{"l9nG6Xd3Lxg-TIQzNI1gFg":{"token":"$2a$10$oEUgD.9eyqqWx7NCilEzLe9NdxEitbT8AfNG/yFYwkwmteyjjC3FG","expiry":1620826059}}	2021-04-28 13:27:39.800327	2021-04-28 13:27:53.380191	\N	f
51	phone	988189188		\N	\N	f	\N	19	2021-08-14 17:01:49.273479	2021-08-14 16:48:20.749479	200.83.172.122	200.83.172.122	\N	\N	\N	\N	\N	0	0	Eyal 	\N	\N	988189188	\N	\N	\N	\N	\N	\N	\N	{"7dzl2IzlfGIKeOJ1F7Tlcw":{"token":"$2a$10$JieSfjB6bWgemJgAD19UG.thj1lTR3cQ4lcuN1nymhT.gAfLQ4Day","expiry":1630168534},"6xIQh2bmkKtBiKIhICO8GA":{"token":"$2a$10$SE9NmUYO1ViW7l.VWcT/PedfHtnT6dZtVVw9yyxtevTTfddPlKP2K","expiry":1630168742},"e0FHJkkBIIi3AjfrOjCJXw":{"token":"$2a$10$okb5ahBz5YjIjRn6uI4NcucQfV4spJGtnVAvCkt1ewOzA3vNQnVTK","expiry":1630168771},"iY2tdZqLNvfEEsTmCZasfw":{"token":"$2a$10$path.9.JsWnIgDzSG/rMs.PjdqeO2VQJCkn9Us9kwKmItkFSsse.i","expiry":1630168817},"BJxTZQvgf5ORokOI7hJDmQ":{"token":"$2a$10$9GvZoEenxR23PoiKkJMbVugOxMf/XKeXjhs5ftNtRl4RVDMOPyS5W","expiry":1630168859},"HHMnqyscVkh9_HBq0_wLdg":{"token":"$2a$10$nwEWGbS9Hf9yjjlfOsQyzOMPv3LcBLUytxP01rwypJ8ZGNRYiWERW","expiry":1630168883},"Dm-IPJ6MOVPYq3T82Hoo4Q":{"token":"$2a$10$2NfFqdk19aSn/ReviYDpH.JQzRCflicq20FDM6phjAc2iPhDTKW8O","expiry":1630169221},"kgePmu7uabUgd4nXG59ZQw":{"token":"$2a$10$3Wy4mj5oDZcEnGgWZKLxauSyEchCe25uFMD6eTU5qWfAJkzj6kyaK","expiry":1630169268},"7tYFbjR6G3ltAbpWO6PtqA":{"token":"$2a$10$8tjj5r2G3BCu/lHnGOdAouRRgFh/p2fwyb.mms/7GW1tFpS/RlxEe","expiry":1630169300},"oiHdpp6HisJH1RT0ozymBg":{"token":"$2a$10$Nyyu/fHc3tXu3iN6CKr0J.kn8sDW5gVfioDIXKyQA9LOMWAOnFIYe","expiry":1630170109}}	2021-04-08 13:15:48.102522	2021-08-14 17:01:49.2744	\N	f
103	phone	988189155		\N	\N	f	\N	1	2021-04-28 13:22:40.052243	2021-04-28 13:22:40.052243	181.203.95.47	181.203.95.47	\N	\N	\N	\N	\N	0	0	Eyal	\N	\N	988189155	\N	\N	\N	\N	\N	\N	\N	{"Zk5PIAqaKBkxuWygWGHJqA":{"token":"$2a$10$5xavuBO4Bi/DjKXdYiQ9o.Q9Nt6wkxmV.MZnvXGn1z.cTiIvlGrkC","expiry":1620825760}}	2021-04-28 13:22:39.975601	2021-04-28 13:22:45.039285	\N	f
107	phone	998271321		\N	\N	f	\N	1	2021-04-29 16:19:03.726923	2021-04-29 16:19:03.726923	190.101.155.25	190.101.155.25	\N	\N	\N	\N	\N	0	0	Gonzo	\N	\N	998271321	\N	\N	\N	\N	\N	\N	\N	{"C8wWtvT3KkDcfw4LcxbPyg":{"token":"$2a$10$KZ6/As7LPhbaREL2id6eSuNeoD1srLbQKfDexr/musP4LphnE4wl.","expiry":1620922743}}	2021-04-29 16:19:03.644916	2021-04-29 16:19:17.146602	\N	f
92	phone	988189183		\N	\N	f	\N	1	2021-04-15 16:42:24.021179	2021-04-15 16:42:24.021179	191.126.45.252	191.126.45.252	\N	\N	\N	\N	\N	0	0	Probando	\N	\N	988189183	\N	\N	\N	\N	\N	\N	\N	{"JDxlU39uURb_qOGwshHuKg":{"token":"$2a$10$.g/HlCWgtHWuf3ORsQg.R.o66/T9Ri0qNZmQpAZFPyBWK4R6GPSHm","expiry":1619714544}}	2021-04-15 16:42:23.941535	2021-04-15 16:42:32.638437	\N	f
108	phone	945375434		\N	\N	f	\N	1	2021-04-29 16:24:09.022044	2021-04-29 16:24:09.022044	186.79.211.27	186.79.211.27	\N	\N	\N	\N	\N	0	0	Dani Ramos	\N	\N	945375434	\N	\N	\N	\N	\N	\N	\N	{"1nVbVQUySclgv3q-SesrAQ":{"token":"$2a$10$IwHc4oVC6SXbNLUvZUfyBel6P73IVeNjzI/fcZv9HAVgmFX0SqcyO","expiry":1620923049}}	2021-04-29 16:24:08.937959	2021-04-29 16:24:15.539146	\N	f
93	phone	988181111		\N	\N	f	\N	2	2021-04-16 14:58:14.68118	2021-04-16 14:58:09.57696	191.126.55.93	191.126.55.93	\N	\N	\N	\N	\N	0	0	Pipo	\N	\N	988181111	\N	\N	\N	\N	\N	\N	\N	{"IvXTffQVHa-feetAQDcD8w":{"token":"$2a$10$BH0CJAdlpRhxK3xY2SEjEOnwk4TmvhJI/THWqnYPgzm5e6cj4rPYq","expiry":1619794689},"6vqWnpzcuvKNb1r41BqbpQ":{"token":"$2a$10$LuS2zEtAJwGSwyckVXEJouC7aZwItsHBNeDwy8EicagxtGH25pk3W","expiry":1619794694}}	2021-04-16 14:58:09.485045	2021-04-16 14:58:20.10673	\N	f
109	phone	974831797		\N	\N	f	\N	1	2021-04-29 17:11:12.900406	2021-04-29 17:11:12.900406	191.112.146.50	191.112.146.50	\N	\N	\N	\N	\N	0	0	Agustín Ferrer	\N	\N	974831797	\N	\N	\N	\N	\N	\N	\N	{"4k4G2cUtEjxyZsJafykAbw":{"token":"$2a$10$R5Pv0zsgjq10Ok9ZRa0bgOMk2SR9pJzLTC0N26JDBmpm6ecMaqgSS","expiry":1620925872},"mnhnMqiOm8AuA2Hk-_DgaQ":{"token":"$2a$10$3w8qwAK48dXWmllpM8CWVeEZxAtzIbhQQYnnnqQlv1NBj9Zw24Z96","expiry":1621639199}}	2021-04-29 17:11:12.819842	2021-05-07 23:19:59.368506	\N	f
90	phone	995345307		\N	\N	f	\N	11	2021-05-05 01:39:04.419838	2021-05-05 01:38:15.644514	181.72.167.130	181.42.54.213	\N	\N	\N	\N	\N	0	0	Romi	\N	\N	995345307	\N	\N	\N	\N	\N	\N	\N	{"opZuQKLRmjv3pxlXI3nSpg":{"token":"$2a$10$7h63ldeNBcwffbmoiruHW.7S6Iku/qGKZA4fqLCa2nJ6uYL4ePp9K","expiry":1620821543},"TsL3PQxYZ1URIDLy61cGRw":{"token":"$2a$10$xss2NVVWTxxrY6.3WjyFkucXazaDHo6FpeJhBGAmr1iqSNvN9zFGK","expiry":1620822251},"lbSeDsjN_HxhHToed6hg3g":{"token":"$2a$10$k.c1PEL46cqwW8vECorqCO6k4NEeDiPA4AleTm9crfDP5IZt4tMYe","expiry":1620832879},"0Su9TLXJNJvxN4YXWjcebg":{"token":"$2a$10$1.RfKEf4eg8ZXhNoqQ1EsONEiLSCzON6KADdhVQz.NuWpyxGnEI6u","expiry":1620845286},"LDAigCqN05zZdWlKvOygAg":{"token":"$2a$10$iAj7wRto5tJAwLBKLZJBf.vuZyQdQN.QeZtYuh0t4S8awelagSNoa","expiry":1620926710},"yHD2g_rF_sEHEZrqlpKXeA":{"token":"$2a$10$sFQ8lyC698cnJkODPMkl1.1v4UdDt6T.qKYl0MYOtyXImMixrs/8e","expiry":1620926829},"E5FqJ7wDeErR7Xaaea_3aA":{"token":"$2a$10$V2q3HnR8wJ/IuMxAL7xVWOH6QKlhZH2hyp3qGDy8sPAEDgZvDuUda","expiry":1621270986},"_y2M2mi50_MlvIQ279-Y3Q":{"token":"$2a$10$aq0M4Y8lT9FTAdMnNJqg1.OZOJBTKMaMD3jlMXa3LHAc1BuNk1ae.","expiry":1621346296},"FXML-1dBRyRC1YA7vARUBA":{"token":"$2a$10$FVXTjk4mIvop5rpy4zZM/.cs03Yeng1kycpepCRZoe/zIlghhDZwK","expiry":1621388295},"h7hmG2HoK_5LFkcgwN1KoQ":{"token":"$2a$10$00ovqcA6AzfYUzgIRTzXj.qMqWJ4jHJv03Akkd1vXTUW9ldBcJxJe","expiry":1621388344}}	2021-04-14 18:04:19.226997	2021-05-05 01:39:04.4203	\N	f
94	phone	988566588		\N	\N	f	\N	1	2021-04-18 20:25:29.832119	2021-04-18 20:25:29.832119	191.126.63.209	191.126.63.209	\N	\N	\N	\N	\N	0	0	Austria	\N	\N	988566588	\N	\N	\N	\N	\N	\N	\N	{"EYS_HysM2u3JU2CzsKJG3g":{"token":"$2a$10$NggJE3UMa8W6qrZQt9Cm7uGNiLdYqTmIW.YYi6CW4Q/fjHquGBDgK","expiry":1619987129}}	2021-04-18 20:25:29.686469	2021-04-18 20:25:51.144953	\N	f
110	phone	985763015		\N	\N	f	\N	2	2021-05-03 21:18:08.814715	2021-04-29 17:22:34.607891	190.196.103.106	190.196.103.106	\N	\N	\N	\N	\N	0	0	Pablo Alegria	\N	\N	985763015	\N	\N	\N	\N	\N	\N	\N	{"UDkOSWYHPlzBO9Aea-8-uw":{"token":"$2a$10$yuYytyIKCCGdt4NBJfc0BuNz.XSzuWIjdAdKVSI7nEr5D.8PvLQYO","expiry":1620926554},"Qg95O6d83geFnhl8rksMfw":{"token":"$2a$10$u99l9hKShP9LmYAHWhZl/ub6AFEHw9twVSywzYs97FIb73EmWF8py","expiry":1621286288}}	2021-04-29 17:22:34.530017	2021-05-03 21:18:08.81504	\N	f
95	phone	988189189		\N	\N	f	\N	2	2021-04-27 14:49:08.42224	2021-04-18 20:26:38.864507	181.203.35.179	191.126.63.209	\N	\N	\N	\N	\N	0	0	Hhhhi	\N	\N	988189189	\N	\N	\N	\N	\N	\N	\N	{"1sRyQHRx5YBc9jMVczlFkQ":{"token":"$2a$10$gnSNw2BGtQnST6txH9P9EeZ4qAdrXJTKCcMvLZbTXphsQ/FgVKQUS","expiry":1619987198},"4zKhfjPN-6Fpt4THnFRh6A":{"token":"$2a$10$KLP5aELwSU9g1JKuBSMYxuoqSWfUookO9/Y.codg4NqSwul8JeSIe","expiry":1619987836},"XVWlGIuDAbr_fZLMhCtGcw":{"token":"$2a$10$tVLpScAyGb0bV503z10gPOv/1mkktQUrysPdcMOOmFHy/B4Tv8vSO","expiry":1619987972},"NCGTkJQDb8vtsyynsjBoJA":{"token":"$2a$10$7klrxAfmcwO.vVLmn6NSVuzePV75PUo9SMiiLBOX72qOGSzygtFxe","expiry":1620744548}}	2021-04-18 20:26:38.718343	2021-04-27 14:49:08.422596	\N	f
111	phone	942723186		\N	\N	f	\N	1	2021-04-29 19:05:53.165098	2021-04-29 19:05:53.165098	201.219.233.6	201.219.233.6	\N	\N	\N	\N	\N	0	0	Cata Tondreau 	\N	\N	942723186	\N	\N	\N	\N	\N	\N	\N	{"Q4VhS-EKIucvEc-v3QP0Tg":{"token":"$2a$10$1Uj1tDCDFhQXSJDp/t28GO4e5CMWzCE2FYNt66n66xkMmvdc/9i6m","expiry":1626145273}}	2021-04-29 19:05:53.085994	2021-06-29 03:01:13.431191	\N	f
50	phone	995922399		\N	\N	f	\N	6	2021-04-19 21:19:50.529092	2021-04-19 19:22:52.285384	186.11.82.99	179.56.180.61	\N	\N	\N	\N	2012	0	0	Natalia Bugedo	Escalo luego existo		995922399		natbugedo				\N		{"LQGBUB3tiQQCgfCDFDGdUA":{"token":"$2a$10$s8jWzKhaV1s9ebfwXHqNg.FgBzGmKE4mZehUqHuvVjP1rTyAk08cO","expiry":1619972373},"3e9Ra2QwKiBlVA6teCNEkQ":{"token":"$2a$10$7P.k7/nr2OuBWGiZlZC7tOuxmO1AV3hHaCSx8wCkvn0ojCt6Xmybe","expiry":1619975060},"0xBV7hKnq6i-TIt6Is7uEQ":{"token":"$2a$10$S/GXgWD.F09DZTLz4lsi6O0YixRUcbpbliSzMhNfgyyM0dD.UNtQy","expiry":1619988092},"8oZBLUZNWF4fNxgz9axznA":{"token":"$2a$10$piTdpTuoLtJgKyMAmzbo0OpZrUuBHY5juCC7N7neLcxugj3FIut6e","expiry":1619989359},"3DJJ6BgtsjraNlugutulBA":{"token":"$2a$10$hdH8a.4fuQMHW6jCOwgfEeFHIG6dooHFLAUr2sj/fkN0hFqpzv9t2","expiry":1619990847},"_e8gXSwK7RkmSDRBZMfRMg":{"token":"$2a$10$Q4ILt5GbE9M9jk9NSHHGu.Ue2nmKX.laxUJcM2Y.f5OhN5HgPlbTG","expiry":1619991837},"iXBuTHJ_z634GK4pbggT3Q":{"token":"$2a$10$rx8/Bj3tJFc.I9ClsEIQtO2i3s8tZ7Ipfr5/TJiGOdJ2bgur325UK","expiry":1620060680},"4wijIM4AjE4mw5eFjPW2XA":{"token":"$2a$10$5gnXiGSQDATv9z4EVixzd.JkRO1EwsIm.N9bQQvAyhviUu1I6P7lG","expiry":1620069772},"aqu4vFgMRC_xpYKVXeIUHA":{"token":"$2a$10$Raf6I/MzsjloEW1B9rwUquf7hCqnMj6iuzF9oOIij3SVtZVO4TuWC","expiry":1620076790},"wqASewYM7MTrxC499FQxVQ":{"token":"$2a$10$ZU3MZKN5EFVaeRC/EjHgM.upCKrVjhnW6lbUUyDQlWmo/kwf4Pe2y","expiry":1620922535}}	2021-04-07 18:48:52.33085	2021-04-29 16:15:35.244565	\N	f
87	phone	974505996		\N	\N	f	\N	2	2021-04-23 20:05:20.109265	2021-04-14 13:11:51.125594	186.11.45.52	181.43.224.174	\N	\N	\N	\N	\N	0	0	Magda Leigh	\N	\N	974505996	\N	\N	\N	\N	\N	\N	\N	{"3e_stTQebNXlvgmG860k0A":{"token":"$2a$10$k7VjrUKe6pSWPiwekwpqBOWpkgHCIzollCfm8YHEkRNC4SxfETSwG","expiry":1619615511},"z5pdeEand7odgh0sYUv-NA":{"token":"$2a$10$FOAz3fEZcgl7U7wbEOyBfOYVYueWbyehLimmDSZViNRUSH67qcSm6","expiry":1619615671},"p45ws1PAMsYO5PrYHAFqcA":{"token":"$2a$10$wpsFCUMe7JxLspZIFlS8kuHFbYBu6tpp4lxoWXeCzTwp5q8aBPJ5q","expiry":1619615741},"7hn5KzY54kqJI_mj5mtQeQ":{"token":"$2a$10$8bzGZ9XmZp6CI/wjjgw.our60W.2SocWotkSNxoLlj3Jesr8dT9mK","expiry":1619734454},"NxSIqxka7fKh7Kw61dEYOQ":{"token":"$2a$10$u4xqWtHNrhS3LVrHccr1nenwgi3ngnQ6pxE.7rwBwYPN0v2Ox/Ntu","expiry":1619734512},"mXcRORcfvTELXrskdzUxTg":{"token":"$2a$10$nuRihpFaXQCU1iY2vHPV0ukOOkiBT5Qavez/kokIxDW.n.adsrgMu","expiry":1620417920}}	2021-04-14 13:11:51.02273	2021-04-23 20:05:20.10982	\N	f
112	phone	989766084		\N	\N	f	\N	1	2021-04-29 20:29:12.817505	2021-04-29 20:29:12.817505	181.203.22.103	181.203.22.103	\N	\N	\N	\N	\N	0	0	Enrique Larrain	\N	\N	989766084	\N	\N	\N	\N	\N	\N	\N	{"bBhe47HKqiWaB0gdocd6AA":{"token":"$2a$10$3p0tyEXed/v8HHqsXPT/RO/HdBJMjhy2Q49u.D01N7ypsl/6LjHA2","expiry":1620937752}}	2021-04-29 20:29:12.735152	2021-04-29 20:33:04.079228	\N	f
119	phone	988180000		\N	\N	f	\N	1	2021-08-18 15:56:26.389777	2021-08-18 15:56:26.389777	141.101.103.60	141.101.103.60	\N	\N	\N	\N	\N	0	0	Petrr	\N	\N	988180000	\N	\N	\N	\N	\N	\N	\N	{"1zuzxI9UtJFGw63r5HPMfA":{"token":"$2a$10$65vNjdWVpDWQQdBXcJmHQ.Wy1oFN4cXuRP3vRnNAWjeEUVjK0teNu","expiry":1630511786}}	2021-08-18 15:56:26.309587	2021-08-18 15:58:11.402379	\N	f
114	phone	988180027		\N	\N	f	\N	1	2021-08-18 13:53:15.949701	2021-08-18 13:53:15.949701	141.101.103.60	141.101.103.60	\N	\N	\N	\N	\N	0	0	PRUEBA 1	\N	\N	988180027	\N	\N	\N	\N	\N	\N	\N	{"0mENzgYVgiOUoaqC7wcmhg":{"token":"$2a$10$D.1rbAXHfC62/Pz4IaaG1uexQoELeMwbVBSr0Xq6NC2eTmM2jO.Fi","expiry":1630504395}}	2021-08-18 13:53:15.866349	2021-08-18 13:53:33.005765	\N	t
115	phone	988180028		\N	\N	f	\N	1	2021-08-18 14:04:23.863043	2021-08-18 14:04:23.863043	141.101.102.13	141.101.102.13	\N	\N	\N	\N	\N	0	0	Pedro	\N	\N	988180028	\N	\N	\N	\N	\N	\N	\N	{"-p7lje2I_dSNzo-CL_z8TQ":{"token":"$2a$10$kyWWC0C/gEW0dfDhkY7kAuGV/AYNks80b/I35vzJ69Tc3tHI0g5Fy","expiry":1630505063}}	2021-08-18 14:04:23.782001	2021-08-18 14:07:20.913976	\N	f
116	phone	988180031		\N	\N	f	\N	1	2021-08-18 14:08:53.804217	2021-08-18 14:08:53.804217	141.101.103.4	141.101.103.4	\N	\N	\N	\N	\N	0	0	\N	\N	\N	988180031	\N	\N	\N	\N	\N	\N	\N	{"69IAWJjEd_hmp1kylYwDoA":{"token":"$2a$10$g8SxpD8.eHdf0JrIzWFhROtxBdkillFPEEF3Mg/3CKxeYMghvzdHW","expiry":1630505333}}	2021-08-18 14:08:53.723287	2021-08-18 14:09:01.896737	\N	f
117	phone	988180032		\N	\N	f	\N	1	2021-08-18 14:10:02.393077	2021-08-18 14:10:02.393077	141.101.103.62	141.101.103.62	\N	\N	\N	\N	\N	0	0	\N	\N	\N	988180032	\N	\N	\N	\N	\N	\N	\N	{"aCkdh2LKrUFHYg0vjqu2Rg":{"token":"$2a$10$HqGarjYPZLkq8h/Eg6uDge3lUbqv7PKFvQkxa4/.57WZ85yCuhc4K","expiry":1630505402}}	2021-08-18 14:10:02.313402	2021-08-18 14:10:07.154735	\N	f
118	phone	988180033		\N	\N	f	\N	1	2021-08-18 14:10:33.813223	2021-08-18 14:10:33.813223	141.101.102.13	141.101.102.13	\N	\N	\N	\N	\N	0	0	Peter	\N	\N	988180033	\N	\N	\N	\N	\N	\N	\N	{"oLWAkoqP9XK6Tzmo3w4PaQ":{"token":"$2a$10$eZAFO.Gc2EJMFGDrlyhBb.ZzfWt2PEc5l65AkOQsMMej4FK7i7h9q","expiry":1630505433}}	2021-08-18 14:10:33.734062	2021-08-18 14:10:41.852139	\N	t
49	phone	988189187		\N	\N	f	\N	128	2021-08-28 17:35:16.591269	2021-08-23 15:29:56.059547	198.41.231.118	198.41.231.226	\N	\N	\N	\N	2016	0	1	Eyal Levy	Escalador y algo más.	elevy@andescalada.org	988189187	eyalll		elevyg91		elevyg	\N		{"u7SCw7zlyTEROv9qYrH4nQ":{"token":"$2a$10$5TbYRER/qwWZD4bcskzq1uZ2.2jb5pXOlDQa58TDqRyjKUTP2IBee","expiry":1630174516},"usfxx-srae-C5C323SZLgA":{"token":"$2a$10$5E1lwHsipbI9ggAk.krC2.xT04x5pP3Cmuepnww611U.BW8kdkns.","expiry":1630177955},"C-3gRdpywICqUguBnPkpHw":{"token":"$2a$10$JbmlXEdoj1IxA2SOFgeytudRhD.2NJA6nQ8UW8px5IIKPniHaIeM6","expiry":1630328012},"2E77kwAyqivq4QvpW3nW4g":{"token":"$2a$10$6PnaTDb8FCvS/sKoTT/sseSY1Kub0n3Qs9USJ4c001kvS/S2r77.W","expiry":1630337036},"fJppBzW4zXVnrm0__hpWmQ":{"token":"$2a$10$8rLkfjMIllgT5GhAz7/N9.uTa5.NMcmktLIb8CT4oen11Q8mhUNYG","expiry":1630511696},"P7LsXZx5os0q2qxP4u80RQ":{"token":"$2a$10$vG5oVUoXSC5P7SPQPNXIPOCFlns57Gaz7SI9DDGTmQpGYK8UEDfrO","expiry":1630511832},"QkTsYcoxLOWRGlPuiU6rhg":{"token":"$2a$10$wJlaPosLdGNpsp4fxJJw/ek2QX./lFKKi.sIJXBymC5jy7QTwtMla","expiry":1630942196},"V3oDJLRYteduT5JYlSv8MQ":{"token":"$2a$10$9BLRFtlujfTTuFWtzo3JmOWrEkKcw0TZ9EbbV0Nx1dtBoTCIfYn.u","expiry":1630944059},"DRjTrEvcKvEMi5gkwc0sqA":{"token":"$2a$10$UTtUC4Q7OFu3iFwQ6Z4ATupi6d6eq1DAZG6sRqP4hSMDXZ96dM.bi","expiry":1631381716}}	2021-04-07 16:42:39.00219	2021-08-28 17:35:16.59212	\N	f
120	phone	988181234		\N	\N	f	\N	1	2021-08-27 02:49:34.395164	2021-08-27 02:49:34.395164	198.41.231.104	198.41.231.104	\N	\N	\N	\N	\N	0	0	Prueba 1	\N	\N	988181234	\N	\N	\N	\N	\N	\N	\N	{"eYKCtua5xGi2LBkSA7UIJw":{"token":"$2a$10$2KE26d9p/rDlM0Uba/doKeFF3PywN1dh9VwwMyjYC9eCJsZbE/7zC","expiry":1631242174},"A1RK83BQY9w8hjXvdx2E4g":{"token":"$2a$10$TfuTu21RBEQ8MC2QBlJLjuYu8bDV/FLBQTf2FfLGM7Ha6EOoE2ThG","expiry":1631242786}}	2021-08-27 02:49:34.314919	2021-08-27 03:02:30.15507	\N	f
122	phone	988180130		\N	\N	f	\N	2	2021-08-31 16:34:40.304046	2021-08-28 17:36:56.965385	198.41.226.231	141.101.103.4	\N	\N	\N	\N	\N	0	0	\N	\N	\N	988180130	\N	\N	\N	\N	\N	\N	\N	{"leUmMMGQMeqfiwzwjc8xaQ":{"token":"$2a$10$.KRsXpoavGya20tP2pwHNuFqMm9nFokKxr7qOyYiHxI8SSozcl/6C","expiry":1631381816},"07zSOKUCkCb0q76qsHQV7Q":{"token":"$2a$10$1m2kvXPN.Zsiem6V7cAUq.EnOC/27YH2JXosGLzW9SZIpbngfQjKa","expiry":1631637280}}	2021-08-28 17:36:56.876567	2021-08-31 16:34:40.304399	\N	f
121	phone	988185647		\N	\N	f	\N	1	2021-08-27 03:06:35.354352	2021-08-27 03:06:35.354352	198.41.231.218	198.41.231.218	\N	\N	\N	\N	\N	0	0	Eyal 	\N	\N	988185647	\N	\N	\N	\N	\N	\N	\N	{"C5K3MJI9COLv3yVu0jGt5Q":{"token":"$2a$10$jWLeIRstiMyA88PUuG2cW.aWHydiYxsLVmGQ67f0CGghfibAOk6T.","expiry":1631243195}}	2021-08-27 03:06:35.262161	2021-08-27 03:10:31.965026	\N	f
\.


--
-- Data for Name: users_roles; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.users_roles (user_id, role_id) FROM stdin;
\.


--
-- Data for Name: walls; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.walls (id, rains, published, routes_count, zone_id, name, description, created_at, updated_at, sector_id) FROM stdin;
40	t	t	5	38	Cubo Cara Este	Pared vertical que tiene en su inicio un techo a superar. Vías en general poco escaladas.	2021-04-09 12:53:04.401612	2021-05-03 14:07:17.538114	6
43	t	t	3	38	Cachupín Principal		2021-04-09 13:04:47.286459	2021-05-03 17:21:15.995546	7
44	t	t	11	38	Espino Principal		2021-04-09 13:07:28.990294	2021-05-03 17:21:25.472781	8
74	t	t	0	40	Sin nombre		2021-04-09 17:43:46.3893	2021-04-09 17:43:46.3893	32
42	t	t	11	38	Cubo Cara Oeste	Pared vertical que contiene casi en su totalidad vías de 6to grado de gran calidad y muy estéticas.	2021-04-09 12:59:37.218442	2021-05-03 17:20:07.467751	6
45	t	t	9	38	Círculo Vicioso Principal		2021-04-09 13:10:16.198485	2021-05-03 17:22:05.197132	9
46	t	t	7	38	Transilvania	Pared vertical con vías de todos los grados, todas muy estéticas y de gran calidad.	2021-04-09 13:12:22.788959	2021-05-03 17:22:15.800497	10
47	t	t	7	38	Zona Diabólica Principal	Pared desplomada con vías de gran calidad. Contiene el primer 8a equipado en Chile.	2021-04-09 13:16:04.630774	2021-05-03 17:23:53.806605	11
55	t	t	2	38	Muela Mayor Cara Este	Pared desplomada con pocas vías y de gran dificultad.	2021-04-09 13:44:22.765187	2021-05-03 17:26:35.541965	18
48	t	t	5	38	Plan Z Principal	Pared vertical con vías de 6to grado ubicada al costado de la carretera. Se recomienda escalar con un día nublado, ya que el sol pega con bastante fuerza.	2021-04-09 13:19:16.347664	2021-05-03 17:24:10.18064	12
50	t	t	19	38	Desplomilandia Principal	Pared espectacular con leve desplome. Vías de gran calidad donde predomina el 7mo grado.	2021-04-09 13:27:33.333299	2021-05-03 17:25:06.409005	14
51	t	t	9	38	Bohemia Principal	Pared característica con un gran cuadrado blanco, que en el comienzo del cuadrado es desplomado con buenos agarres.	2021-04-09 13:30:31.183009	2021-05-03 17:25:21.690977	15
52	t	t	7	38	Zona Escondida Principal	Pared de placas con vías de 6to grado.	2021-04-09 13:36:09.252529	2021-05-03 17:25:38.253244	16
53	t	t	3	38	Zona Poética Principal	Pared desplomada con pocas vías y de gran dificultad.	2021-04-09 13:39:16.48949	2021-05-03 17:25:52.155777	17
54	t	t	4	38	Zona Poética Cara Oeste	Pared desplomada que contiene las vías mas duras de las Chilcas.	2021-04-09 13:42:45.935515	2021-05-03 17:26:22.727022	17
56	t	t	4	38	Muela Mayor Cara Sur	Pared desplomada con pocas vías y de gran dificultad.	2021-04-09 13:45:15.107394	2021-05-03 17:27:12.252957	18
57	f	t	2	38	Minicubo Principal	Pared con dos vías desplomadas fuera del cubo, al costado de la carretera. Vías cortas y muy duras que no se escalan casi nunca.	2021-04-09 13:49:10.97912	2021-05-03 17:27:31.50979	19
231	t	t	6	38	San Pateste Escuela	Pared de vías escuelas de 30 metros, ideal para aprender.	2021-04-19 12:37:50.961269	2021-05-03 17:29:11.785033	13
62	t	t	2	39	Todo por Nada Centro		2021-04-09 15:49:44.472912	2021-05-03 18:10:35.563995	23
63	t	t	3	39	Todo por Nada Derecha		2021-04-09 15:50:16.229985	2021-05-03 18:10:41.957365	23
61	t	t	5	39	Todo por Nada Izquierda		2021-04-09 15:49:03.70355	2021-05-03 18:09:46.866956	23
64	t	t	9	39	Hidrofobia Principal	Pared de placa con vías donde predomina el 7mo grado y vías de gran dificultad.	2021-04-09 15:50:51.164185	2021-05-03 18:10:59.144666	24
65	t	t	4	39	Popeye Principal	Pared con leve desplome con pocas vías pero todas de gran calidad. Es la única pared de la zona donde el estilo cambia de la placa.	2021-04-09 15:51:23.456388	2021-05-03 18:11:19.672774	25
66	t	t	13	39	Fogata Principal	Pared de placa con vías de 6to grado ideales para mejorar en el estilo de placa de adherencia.	2021-04-09 15:51:53.69108	2021-05-03 18:11:56.229237	26
67	t	t	14	39	Constelaciones Principal		2021-04-09 15:52:22.355297	2021-05-03 18:11:58.665459	27
69	t	t	8	40	Piola Izquierda	Vías de 7mo grado todas de gran calidad.	2021-04-09 17:40:37.520178	2021-05-03 18:27:56.763826	29
70	t	t	9	40	Piola Derecha		2021-04-09 17:41:08.126513	2021-05-03 18:28:13.149167	29
71	t	t	5	40	Marmol Principal		2021-04-09 17:41:47.320704	2021-05-03 18:28:29.793851	30
72	t	t	5	40	Marmol Derecha		2021-04-09 17:42:25.928779	2021-05-03 18:28:47.297881	30
73	t	t	13	40	Multilargos	Zona escuela de multilargos ideal para aprender y practicar maniobras de manejo de cuerdas, polipastos u otros.	2021-04-09 17:43:06.215187	2021-05-03 18:29:29.872201	31
68	t	t	8	40	Porno Principal	Vías largas de 6to grado y 30 metros de largo.	2021-04-09 17:39:56.095826	2021-05-03 18:29:42.716381	28
75	t	t	3	41	Polaca Principal		2021-04-09 17:53:51.924999	2021-05-03 23:29:55.651492	33
76	t	t	4	41	Escuela Principal		2021-04-09 17:54:18.055185	2021-05-03 23:29:59.476438	34
77	t	t	5	41	Café París Principal		2021-04-09 17:54:54.741305	2021-05-03 23:30:10.946433	35
78	t	t	6	41	Gran Monolito Cara Oeste		2021-04-09 17:55:51.146191	2021-05-03 23:30:39.588882	36
79	t	t	3	41	Gran Monolito Cara Sur-Oeste		2021-04-09 17:56:23.799192	2021-05-03 23:31:18.747658	36
80	t	t	5	41	Gran Monolito Cara Sur		2021-04-09 17:56:52.25345	2021-05-03 23:31:34.082936	36
81	t	t	4	41	Gran Monolito Cara Norte		2021-04-09 17:57:21.992455	2021-05-03 23:31:52.808579	36
82	t	t	4	41	Arriero Principal		2021-04-09 17:57:49.408273	2021-05-03 23:32:04.570358	37
83	t	t	10	41	Multilargos Izquierda		2021-04-09 17:58:14.387121	2021-05-03 23:32:17.169741	38
84	t	t	3	41	Multilargos Aguja		2021-04-09 17:58:43.720982	2021-05-03 23:32:32.123571	38
86	t	t	2	42	Petorca Bajo Derecha		2021-04-09 19:44:29.037313	2021-04-09 19:44:29.037313	39
85	t	t	2	42	Petorca Bajo Izquierda		2021-04-09 19:43:40.209276	2021-04-09 19:43:40.209276	39
87	t	t	5	42	Machete Izquierda		2021-04-09 19:45:18.987296	2021-04-09 19:45:18.987296	40
145	f	t	0	54	Boulder		2021-04-12 19:34:02.602356	2021-04-12 19:34:02.602356	80
92	t	t	7	42	Trilogía Derecha		2021-04-09 19:48:54.367352	2021-04-09 19:48:54.367352	42
88	t	t	8	42	Machete Derecha		2021-04-09 19:46:17.522979	2021-04-09 19:46:17.522979	40
89	t	t	10	42	Jabón Principal		2021-04-09 19:47:10.031381	2021-04-09 19:47:10.031381	41
90	t	t	8	42	Trilogía Izquierda		2021-04-09 19:47:46.097364	2021-04-09 19:47:46.097364	42
91	t	t	10	42	Trilogía Principal		2021-04-09 19:48:16.18402	2021-04-09 19:48:16.18402	42
93	t	t	5	42	Trilogía al Sol		2021-04-09 19:49:37.77914	2021-04-09 19:49:37.77914	42
94	t	f	9	42	Catedral Principal		2021-04-09 19:52:40.731331	2021-04-09 19:52:40.731331	43
95	t	t	5	42	Boulder		2021-04-09 19:53:07.058714	2021-04-09 19:53:07.058714	44
96	f	t	3	43	Anfiteatro Principal		2021-04-12 15:46:13.879616	2021-04-12 15:46:13.879616	45
97	f	t	1	43	Techito Principal		2021-04-12 15:46:44.532083	2021-04-12 15:46:44.532083	47
98	t	t	9	43	La Gran Pared Principal		2021-04-12 15:47:36.13636	2021-04-12 15:47:36.13636	48
99	t	t	1	43	Gran Bloque Principal		2021-04-12 15:48:03.361527	2021-04-12 15:48:03.361527	49
101	f	t	1	44	Segunda Principal		2021-04-12 15:51:13.503201	2021-04-12 15:51:13.503201	50
100	f	t	2	44	Primera Principal		2021-04-12 15:50:20.975436	2021-04-12 15:50:20.975436	50
102	f	t	1	44	Tercera Principal		2021-04-12 15:51:35.479494	2021-04-12 15:51:35.479494	52
108	f	t	5	47		Sector 1 Principal	2021-04-12 15:59:38.593457	2021-04-12 15:59:38.593457	56
104	f	t	4	45	Sierra Calavera Principal		2021-04-12 15:57:32.558301	2021-04-12 15:57:32.558301	54
105	f	t	2	45	Sierra Calavera Derecha		2021-04-12 15:58:10.9124	2021-04-12 15:58:10.9124	54
106	f	t	16	46	Pared Principal Izquierda		2021-04-12 15:58:34.193392	2021-04-12 15:58:34.193392	55
107	f	t	14	46	Pared Principal Derecha		2021-04-12 15:59:04.268119	2021-04-12 15:59:04.268119	55
109	f	t	5	47	Sector 1 Boulder		2021-04-12 16:00:04.656367	2021-04-12 16:00:04.656367	56
111	f	t	5	47	Sector 3 Principal		2021-04-12 16:00:48.571104	2021-04-12 16:00:48.571104	58
110	f	t	2	47	Sector 2 Principal		2021-04-12 16:00:26.686981	2021-04-12 16:00:26.686981	57
113	f	t	11	48	Choro Mingram Principal		2021-04-12 16:01:45.915327	2021-04-12 16:01:45.915327	60
112	f	t	4	48	Rampa al Cielo Principal		2021-04-12 16:01:23.649694	2021-04-12 16:01:23.649694	59
116	f	t	1	48	Relevo Principal		2021-04-12 16:02:47.84728	2021-04-12 16:02:47.84728	63
114	f	t	12	48	Principal 		2021-04-12 16:02:08.434061	2021-04-12 16:02:08.434061	61
115	f	t	8	48	La Fuente Principal		2021-04-12 16:02:27.93583	2021-04-12 16:02:27.93583	62
117	f	t	15	49	Clásica Principal		2021-04-12 19:03:36.076758	2021-04-12 19:03:36.076758	64
118	f	t	1	49	Clásica Arriba		2021-04-12 19:03:59.683781	2021-04-12 19:05:45.150868	64
119	f	t	5	49	Derecha Principal		2021-04-12 19:04:27.212708	2021-04-12 19:04:27.212708	65
122	f	t	13	50	Pared Principal Derecha		2021-04-12 19:06:37.375116	2021-04-12 19:06:37.375116	66
120	f	t	2	49	Derecha Abajo		2021-04-12 19:04:57.219167	2021-04-12 19:04:57.219167	65
121	f	t	2	50	Pared Principal Izquierda		2021-04-12 19:06:10.192133	2021-04-12 19:06:10.192133	66
123	f	t	7	51	Playa Corazones Principal		2021-04-12 19:06:59.98716	2021-04-12 19:06:59.98716	67
124	t	t	1	52	El Gorila Principal		2021-04-12 19:07:33.371155	2021-04-12 19:07:33.371155	68
125	f	t	7	52	Nigger Principal		2021-04-12 19:08:04.708266	2021-04-12 19:08:04.708266	69
126	t	t	7	52	El Queso Principal		2021-04-12 19:08:30.735487	2021-04-12 19:08:30.735487	70
128	t	t	3	52	Silva Queso		2021-04-12 19:09:26.559203	2021-04-12 19:09:26.559203	70
127	t	t	4	52	Queso Alto		2021-04-12 19:08:56.991236	2021-04-12 19:08:56.991236	70
134	t	t	1	52	Guacha Principal		2021-04-12 19:14:58.794128	2021-04-12 19:14:58.794128	74
130	t	t	4	52	Dark Side Centro		2021-04-12 19:11:10.557827	2021-04-12 19:11:10.557827	71
131	t	t	8	52	Dark Side Principal		2021-04-12 19:12:21.888752	2021-04-12 19:12:21.888752	71
132	t	t	4	52	Adherencia Principal		2021-04-12 19:13:47.047099	2021-04-12 19:13:47.047099	72
133	t	t	4	52	Bota Piedras Principal		2021-04-12 19:14:34.202135	2021-04-12 19:14:34.202135	73
135	t	t	9	52	El Araucano Alto		2021-04-12 19:15:29.705427	2021-04-12 19:15:29.705427	75
136	t	t	13	52	El Araucano Bajo		2021-04-12 19:15:58.142911	2021-04-12 19:15:58.142911	75
137	f	t	3	53	Clásico Este		2021-04-12 19:26:57.967272	2021-04-12 19:26:57.967272	76
139	f	t	9	53	Clásico Sur		2021-04-12 19:28:43.498707	2021-04-12 19:28:43.498707	76
138	f	t	10	53	Clásico Norte		2021-04-12 19:28:14.102802	2021-04-12 19:28:14.102802	76
141	f	t	3	53	Lluvia de Hamburguesas Principal		2021-04-12 19:30:04.143141	2021-04-12 19:30:04.143141	77
140	f	t	2	53	Clásico Oeste		2021-04-12 19:29:05.167472	2021-04-12 19:29:05.167472	76
142	f	t	7	53	Atardecer Principal		2021-04-12 19:30:33.5352	2021-04-12 19:30:33.5352	78
144	t	t	7	54	El Grito		2021-04-12 19:33:42.930561	2021-04-12 19:33:42.930561	80
143	f	t	2	53	Titanes Principal		2021-04-12 19:31:05.626718	2021-04-12 19:31:05.626718	79
146	f	t	1	54	Techo		2021-04-12 19:34:18.935337	2021-04-12 19:34:18.935337	80
147	f	t	3	54	La Virgen		2021-04-12 19:34:37.959607	2021-04-12 19:34:37.959607	80
152	f	t	9	54	Cueva Principal		2021-04-12 19:36:31.715068	2021-04-12 19:36:31.715068	82
148	f	t	4	54	El Bosque		2021-04-12 19:34:57.59522	2021-04-12 19:34:57.59522	80
149	f	t	6	54	Clásico		2021-04-12 19:35:18.398003	2021-04-12 19:35:18.398003	80
150	f	t	8	54	Sculacciare		2021-04-12 19:35:36.245661	2021-04-12 19:35:36.245661	81
151	f	t	6	54	Plaquísima		2021-04-12 19:36:01.594472	2021-04-12 19:36:01.594472	81
153	f	t	3	55	Pared Principal Izquierda		2021-04-12 19:39:54.459609	2021-04-12 19:39:54.459609	83
157	f	t	15	56	Café Con Piernas Derecha		2021-04-13 01:23:04.453723	2021-04-13 01:23:04.453723	84
154	f	t	8	55	Pared Principal Centro		2021-04-12 19:42:28.076266	2021-04-12 19:42:28.076266	83
155	f	t	2	55	Pared Principal Derecha		2021-04-12 19:46:57.104674	2021-04-12 19:46:57.104674	83
158	f	t	9	56	Las Cuevitas Principal		2021-04-13 01:23:23.394777	2021-04-13 01:23:23.394777	85
159	f	t	19	56	Castillo Rojo Principal		2021-04-13 01:23:45.0719	2021-04-13 01:23:45.0719	86
160	f	t	5	56	Mr Satán Principal		2021-04-13 01:24:05.296741	2021-04-13 01:24:05.296741	87
162	f	t	5	56	Paraiso del Burro Principal		2021-04-13 01:24:41.682941	2021-04-13 01:24:41.682941	89
34	f	t	9	35	Roquefort	Zona de excelentes vias desplomadas con todo tipo de agarres. 	2021-02-25 14:21:06.655832	2021-02-25 14:21:06.655832	2
161	f	t	5	56	Las Guatas Principal		2021-04-13 01:24:25.468383	2021-04-13 01:25:42.263522	88
164	f	t	3	57	Pared Principal Izquierda		2021-04-13 01:26:59.235997	2021-04-13 01:26:59.235997	91
163	f	t	2	56	Torrecita Central Principal		2021-04-13 01:25:06.139534	2021-04-13 01:25:06.139534	90
165	f	t	7	57	Pared Principal Centro		2021-04-13 01:27:42.475148	2021-04-13 01:27:42.475148	91
168	f	t	5	58	Bosque Principal		2021-04-13 01:30:01.88491	2021-04-13 01:30:01.88491	93
166	f	t	2	57	Pared Principal Derecha		2021-04-13 01:27:59.625408	2021-04-13 01:27:59.625408	91
167	f	t	6	58	La Playa Principal		2021-04-13 01:29:42.885527	2021-04-13 01:29:42.885527	92
171	f	t	1	58	Voyerista		2021-04-13 01:31:22.762828	2021-04-13 01:31:22.762828	95
169	f	t	2	58	Tradicional Principal		2021-04-13 01:30:23.238846	2021-04-13 01:30:23.238846	94
170	f	t	2	58	Chillán		2021-04-13 01:30:58.810091	2021-04-13 01:30:58.810091	95
172	f	t	7	59	Principal		2021-04-13 01:32:12.845783	2021-04-13 01:32:12.845783	96
173	f	t	1	60	Quebrada Principal		2021-04-13 01:33:39.908441	2021-04-13 01:33:39.908441	97
174	f	t	7	60	Techos Principal		2021-04-13 01:34:00.065961	2021-04-13 01:34:00.065961	98
183	f	t	5	62	Escuela Principal		2021-04-13 01:46:11.695115	2021-04-13 01:46:11.695115	104
175	f	t	8	60	Sector 3 Principal		2021-04-13 01:34:20.231145	2021-04-13 01:34:20.231145	99
176	f	t	4	60	Monolito Principal		2021-04-13 01:34:40.755169	2021-04-13 01:34:40.755169	100
177	f	t	16	60	El Maray Principal		2021-04-13 01:35:00.318736	2021-04-13 01:35:00.318736	101
178	f	t	6	61	Izquierda		2021-04-13 01:43:59.767707	2021-04-13 01:43:59.767707	102
179	f	t	6	61	Centro		2021-04-13 01:44:20.768502	2021-04-13 01:44:20.768502	102
180	f	t	2	61	Derecha 1		2021-04-13 01:44:40.854788	2021-04-13 01:44:40.854788	102
181	f	t	2	61	Derecha 2		2021-04-13 01:45:20.611309	2021-04-13 01:45:20.611309	102
182	f	t	2	62	La Cuevita Principal		2021-04-13 01:45:46.314725	2021-04-13 01:45:46.314725	103
185	f	t	13	62	La Gruta de la Virgen Principal		2021-04-13 01:46:59.400203	2021-04-13 01:46:59.400203	106
186	f	t	9	62	Kinder Garden Principal		2021-04-13 01:47:19.39482	2021-04-13 01:47:19.39482	107
187	f	t	5	62	Del Bosque Principal		2021-04-13 01:47:36.502689	2021-04-13 01:47:36.502689	108
189	f	t	7	62	El Muro de los Lamentos Principal		2021-04-13 01:48:21.746997	2021-04-13 01:48:21.746997	110
188	f	t	4	62	Del Techo Principal		2021-04-13 01:47:55.009408	2021-04-13 01:47:55.009408	109
191	f	t	11	64	Los Antiguos Principal		2021-04-13 01:50:25.324681	2021-04-13 01:50:25.324681	112
190	f	t	8	63	Principal		2021-04-13 01:50:06.608739	2021-04-13 01:50:06.608739	111
192	f	t	1	64	Amigos Para Qué Principal		2021-04-13 01:51:17.659408	2021-04-13 01:51:17.659408	113
193	f	t	15	64	Mirando el Pescado Principal		2021-04-13 01:51:50.3753	2021-04-13 01:51:50.3753	114
195	f	t	9	64	La Escuela Principal		2021-04-13 01:52:44.82269	2021-04-13 01:52:44.82269	116
194	f	t	4	64	La Isla Principal		2021-04-13 01:52:24.074593	2021-04-13 01:52:24.074593	115
196	f	t	7	64	Apacheta Principal		2021-04-13 01:53:06.19054	2021-04-13 01:53:06.19054	117
197	f	t	7	65	Condorito Principal		2021-04-13 02:01:07.770514	2021-04-13 02:01:07.770514	118
200	f	t	5	65	Tortuga Principal		2021-04-13 02:02:04.813401	2021-04-13 02:02:04.813401	121
198	f	t	6	65	Pa Los Amigos Principal		2021-04-13 02:01:26.247134	2021-04-13 02:01:26.247134	119
199	f	t	12	65	Pared Blanca Principal		2021-04-13 02:01:45.775961	2021-04-13 02:01:45.775961	120
203	f	t	1	66	Ratonera Izquierda		2021-04-13 02:03:28.039211	2021-04-13 02:03:28.039211	123
201	f	t	2	66	La Muela Izquierda		2021-04-13 02:02:41.755501	2021-04-13 02:02:41.755501	122
202	f	t	6	66	La Muela Principal		2021-04-13 02:03:03.96042	2021-04-13 02:03:03.96042	122
204	f	t	3	66	Ratonera Principal		2021-04-13 02:03:50.346883	2021-04-13 02:03:50.346883	123
206	f	t	11	67	El Diente Principal		2021-04-13 02:04:41.050663	2021-04-13 02:04:41.050663	125
205	f	t	6	67	La Peta Principal		2021-04-13 02:04:22.53505	2021-04-13 02:04:22.53505	124
207	f	t	19	67	El Dorado Principal		2021-04-13 02:04:59.195007	2021-04-13 02:04:59.195007	126
208	f	t	7	67	El ID Principal		2021-04-13 02:05:15.166942	2021-04-13 02:05:15.166942	127
209	f	t	5	67	La Calma Principal		2021-04-13 02:05:29.640526	2021-04-13 02:05:29.640526	128
210	f	t	7	67	Mallín Escondido Uno		2021-04-13 02:05:48.006461	2021-04-13 02:05:48.006461	129
211	f	t	3	67	Mallín Escondido Dos		2021-04-13 02:06:03.545733	2021-04-13 02:06:03.545733	129
216	f	t	13	68	Pared Sur Principal		2021-04-13 02:13:53.722702	2021-04-13 02:13:53.722702	132
212	f	t	14	67	2 Palabras Principal		2021-04-13 02:06:22.47928	2021-04-13 02:06:22.47928	130
213	f	t	12	67	Pared Sur Izquierda 1		2021-04-13 02:06:40.150835	2021-04-13 02:06:40.150835	131
214	f	t	12	67	Pared Sur Izquierda 2		2021-04-13 02:06:55.486178	2021-04-13 02:06:55.486178	131
215	f	t	16	67	Pared Sur Derecha		2021-04-13 02:07:14.120595	2021-04-13 02:07:14.120595	131
221	f	t	9	69	Central Superior Izquierda		2021-04-13 02:15:33.360719	2021-04-13 02:15:33.360719	136
217	f	t	12	68	Pared Central Izquierda		2021-04-13 02:14:16.706899	2021-04-13 02:14:16.706899	133
218	f	t	6	68	Pared Central Derecha		2021-04-13 02:14:37.469784	2021-04-13 02:14:37.469784	133
219	f	t	6	69	Izquierda		2021-04-13 02:14:56.319376	2021-04-13 02:14:56.319376	134
220	f	t	6	69	Izquierda Superior		2021-04-13 02:15:12.89691	2021-04-13 02:15:12.89691	135
223	f	t	13	69	Central Superior Derecha		2021-04-13 02:16:15.569183	2021-04-13 02:16:15.569183	138
222	f	t	14	69	Central Superior Centro		2021-04-13 02:15:57.511263	2021-04-13 02:15:57.511263	137
225	f	t	5	69	Derecha Inferior		2021-04-13 02:16:48.125892	2021-04-13 02:16:48.125892	140
224	f	t	10	69	Izquierda Inferior		2021-04-13 02:16:32.96719	2021-04-13 02:16:32.96719	139
227	f	t	3	70	El Queso Derecha		2021-04-13 02:17:38.201783	2021-04-13 02:17:38.201783	141
226	f	t	8	70	El Queso Izquierda		2021-04-13 02:17:08.263309	2021-04-13 02:17:08.263309	141
228	f	t	21	70	Pared Central Principal		2021-04-13 02:17:58.367662	2021-04-13 02:17:58.367662	142
229	f	t	3	70	Sector Bajo Principal		2021-04-13 02:18:22.480173	2021-04-13 02:18:22.480173	143
230	f	t	8	70	El Chivo Principal		2021-04-13 02:18:40.110344	2021-04-13 02:18:40.110344	144
41	t	t	17	38	Cubo Cara Norte	Pared con vías de gran calidad que tienen inicios bien duros, para después convertirse en placas muy estéticas. Esta pared contiene la primera vía equipada en las Chilcas. También contiene algunas de las vías mas duras de toda la zona.	2021-04-09 12:57:22.346897	2021-05-03 17:19:39.79623	6
49	t	t	4	38	San Pateste Principal	Pared de multilargos compuesta por 4 vías. Además se utilizan los primeros largos como vías escuela para aprender.	2021-04-09 13:24:11.38911	2021-05-03 17:23:32.318616	13
58	t	t	3	38	Señuelo Principal		2021-04-09 13:51:49.194117	2021-05-03 17:28:00.070277	20
60	f	t	8	38	La Cueva Principal	Vías desplomadas de gran dificultad.	2021-04-09 13:53:17.25766	2021-05-03 17:28:27.620329	22
59	t	t	7	38	La Piedra del Cóndor Principal		2021-04-09 13:52:29.604714	2021-05-03 17:28:45.737165	21
103	f	t	3	44	Cuarta Principal		2021-04-12 15:52:08.242806	2021-04-12 15:52:08.242806	53
129	t	t	7	52	Dark Side Izquierda		2021-04-12 19:10:22.035261	2021-04-12 19:10:22.035261	71
156	f	t	10	56	Café Con Piernas Izquierda		2021-04-13 01:22:27.745162	2021-04-13 01:22:27.745162	84
184	f	t	10	62	Unknown		2021-04-13 01:46:38.323122	2021-04-13 01:46:38.323122	105
\.


--
-- Data for Name: zone_climbing_types; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.zone_climbing_types (id, zone_id, climbing_type_id, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: zone_coalitions; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.zone_coalitions (id, coalition_id, zone_id, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: zone_owners; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.zone_owners (id, zone_id, owner_id, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: zones; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.zones (id, camping_zone, bathroom_available, fire_allowed, published, multipitch, latitude, longitude, altitude, routes_count, price, region_id, name, location, lonlat, description, created_at, updated_at, suitable_for_children) FROM stdin;
38	1	0	0	t	t	\N	\N	\N	153	0	6	Las Chilcas		\N		2021-04-08 22:42:08.894524	2021-05-03 17:10:13.584652	1
39	2	0	0	t	f	\N	\N	\N	50	0	7	Las Palestras		\N		2021-04-08 22:43:31.425275	2021-05-03 18:17:20.508774	1
63	2	2	2	t	f	\N	\N	\N	8	0	12	El Cañi		\N		2021-04-08 23:01:01.75217	2021-04-08 23:01:01.783036	2
51	0	0	0	t	f	\N	\N	\N	7	0	1	Playa Corazones		\N		2021-04-08 22:53:42.187367	2021-04-08 22:53:42.235144	1
40	2	0	0	f	f	\N	\N	\N	48	0	7	Chacabuco		\N		2021-04-08 22:44:14.693515	2021-05-03 18:33:26.929396	1
48	1	0	0	t	f	\N	\N	\N	36	0	7	Choliana		\N		2021-04-08 22:51:26.422509	2021-04-08 22:51:26.478309	1
44	2	2	2	t	f	\N	\N	\N	7	0	1	Copaquilla		\N		2021-04-08 22:48:14.552	2021-04-08 22:48:14.681781	2
49	0	0	0	t	f	\N	\N	\N	23	0	7	Lo Curro		\N		2021-04-08 22:52:08.04285	2021-04-08 22:52:08.064352	1
61	0	0	0	t	f	\N	\N	\N	16	0	8	Los Mayos		\N		2021-04-08 22:59:58.785806	2021-04-08 22:59:58.821439	1
64	1	0	1	t	f	\N	\N	\N	47	0	2	Tajgrapata		\N		2021-04-08 23:01:45.206652	2021-04-08 23:01:45.267348	1
41	1	1	1	t	t	\N	\N	\N	47	5000	7	Melosas		\N		2021-04-08 22:45:55.065085	2021-05-03 23:33:51.646802	1
52	1	1	1	t	f	\N	\N	\N	72	0	12	El Cerduo		\N		2021-04-08 22:54:28.460257	2021-04-08 22:54:28.493517	1
68	0	0	0	t	f	\N	\N	\N	31	0	15	La Guanaca		\N		2021-04-08 23:04:06.309214	2021-04-08 23:04:06.436804	1
55	0	0	0	t	f	\N	\N	\N	13	0	15	Villa Jara		\N		2021-04-08 22:56:42.583627	2021-04-08 22:56:42.66528	1
56	1	1	2	f	f	\N	\N	\N	70	0	5	Chacay		\N		2021-04-08 22:57:19.462384	2021-04-08 22:57:19.507664	1
60	2	0	2	t	f	\N	\N	\N	36	0	4	El Maray		\N		2021-04-08 22:59:21.727753	2021-04-08 22:59:21.757221	2
58	2	2	2	t	f	\N	\N	\N	16	0	11	Paredes de Constitución		\N		2021-04-08 22:58:20.517396	2021-04-08 22:58:20.595265	2
65	0	0	0	t	f	\N	\N	\N	30	0	16	Laguna Sofía		\N		2021-04-08 23:02:23.909295	2021-04-08 23:02:23.988843	2
70	1	1	1	t	f	\N	\N	\N	43	0	15	Maitenal		\N		2021-04-08 23:05:14.672133	2021-04-08 23:05:14.706448	1
42	1	0	0	t	f	\N	\N	\N	71	0	6	Petorca		\N		2021-04-08 22:46:50.585504	2021-04-08 22:46:50.685743	1
35	0	0	0	t	t	-46.54033165982353	-71.72816638498324	460	9	0	15	Cerro el indio	Chile Chico	0101000020E61000002C632E479AEE51C0BDF77B96294547C0	La roca es de buena calidad, se trata de una toba riolitica muy silicificada, lo que permite realizar buenos anclajes y una escalada muy entretenida. 	2021-02-24 16:06:13.741005	2021-04-13 19:36:51.119848	1
62	2	2	2	t	f	\N	\N	\N	55	0	10	Termas de Chillán		\N		2021-04-08 23:00:31.940418	2021-04-08 23:00:32.022881	2
45	2	2	2	f	f	\N	\N	\N	6	0	4	Sierra Calavera		\N		2021-04-08 22:48:43.124687	2021-04-08 22:48:43.271037	2
47	0	0	0	t	f	\N	\N	\N	17	0	3	Roca Roja		\N		2021-04-08 22:50:42.115573	2021-04-08 22:50:42.173861	2
54	0	0	0	t	f	\N	\N	\N	44	0	14	Correntoso		\N		2021-04-08 22:56:01.008203	2021-04-08 22:56:01.047328	1
67	0	1	0	t	t	\N	\N	\N	112	0	15	El Águila		\N		2021-04-08 23:03:35.592434	2021-04-08 23:03:35.658943	1
53	1	0	1	f	f	\N	\N	\N	36	0	4	Ojo de Opache		\N		2021-04-08 22:55:19.921034	2021-04-08 22:55:20.041054	1
50	0	0	0	t	f	\N	\N	\N	15	0	7	Quinchamalí		\N		2021-04-08 22:53:03.770911	2021-04-08 22:53:03.843372	1
46	1	1	2	t	t	\N	\N	\N	30	0	8	Pared de Stuardo		\N		2021-04-08 22:49:36.914814	2021-04-08 22:49:37.011061	1
57	2	2	2	f	f	\N	\N	\N	12	0	11	Punta de Parra		\N		2021-04-08 22:57:55.011867	2021-04-08 22:57:55.080244	2
59	2	2	2	t	f	\N	\N	\N	7	0	11	Coliumo		\N		2021-04-08 22:58:46.194304	2021-04-08 22:58:46.232818	2
43	0	0	0	t	f	\N	\N	\N	14	0	9	Armerillo		\N		2021-04-08 22:47:37.016607	2021-04-08 22:47:37.080167	0
69	1	0	0	t	t	\N	\N	\N	63	0	15	Altamirano		\N		2021-04-08 23:04:40.751937	2021-04-08 23:04:40.831205	2
66	0	0	0	t	f	\N	\N	\N	12	0	7	Los Dientes		\N		2021-04-08 23:02:52.676267	2021-04-08 23:02:52.749143	1
\.


--
-- Name: action_text_rich_texts_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.action_text_rich_texts_id_seq', 2750, true);


--
-- Name: active_storage_attachments_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.active_storage_attachments_id_seq', 303, true);


--
-- Name: active_storage_blobs_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.active_storage_blobs_id_seq', 303, true);


--
-- Name: active_storage_variant_records_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.active_storage_variant_records_id_seq', 179, true);


--
-- Name: climbed_routes_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.climbed_routes_id_seq', 129, true);


--
-- Name: climbing_types_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.climbing_types_id_seq', 33, true);


--
-- Name: coalition_members_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.coalition_members_id_seq', 36, true);


--
-- Name: coalitions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.coalitions_id_seq', 33, true);


--
-- Name: collaborated_routes_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.collaborated_routes_id_seq', 72, true);


--
-- Name: countries_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.countries_id_seq', 33, true);


--
-- Name: descent_alternatives_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.descent_alternatives_id_seq', 35, true);


--
-- Name: descents_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.descents_id_seq', 33, true);


--
-- Name: downloaded_zones_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.downloaded_zones_id_seq', 1, true);


--
-- Name: equipped_routes_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.equipped_routes_id_seq', 39, true);


--
-- Name: initiative_participants_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.initiative_participants_id_seq', 9, true);


--
-- Name: initiative_sponsors_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.initiative_sponsors_id_seq', 37, true);


--
-- Name: initiatives_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.initiatives_id_seq', 35, true);


--
-- Name: nesting_seasons_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.nesting_seasons_id_seq', 33, true);


--
-- Name: owners_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.owners_id_seq', 33, true);


--
-- Name: pictures_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.pictures_id_seq', 44, true);


--
-- Name: recent_zones_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.recent_zones_id_seq', 1407, true);


--
-- Name: recommended_descents_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.recommended_descents_id_seq', 33, true);


--
-- Name: recommended_seasons_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.recommended_seasons_id_seq', 33, true);


--
-- Name: regions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.regions_id_seq', 33, true);


--
-- Name: roles_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.roles_id_seq', 1, false);


--
-- Name: route_climbing_types_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.route_climbing_types_id_seq', 1302, true);


--
-- Name: route_reviews_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.route_reviews_id_seq', 108, true);


--
-- Name: routes_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.routes_id_seq', 1324, true);


--
-- Name: saved_routes_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.saved_routes_id_seq', 138, true);


--
-- Name: season_sun_exposures_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.season_sun_exposures_id_seq', 33, true);


--
-- Name: seasons_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.seasons_id_seq', 33, true);


--
-- Name: sectors_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.sectors_id_seq', 144, true);


--
-- Name: sponsors_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.sponsors_id_seq', 34, true);


--
-- Name: sun_exposures_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.sun_exposures_id_seq', 33, true);


--
-- Name: user_sponsors_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.user_sponsors_id_seq', 1, false);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.users_id_seq', 154, true);


--
-- Name: walls_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.walls_id_seq', 231, true);


--
-- Name: zone_climbing_types_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.zone_climbing_types_id_seq', 33, true);


--
-- Name: zone_coalitions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.zone_coalitions_id_seq', 2, true);


--
-- Name: zone_owners_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.zone_owners_id_seq', 35, true);


--
-- Name: zones_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.zones_id_seq', 70, true);


--
-- Name: action_text_rich_texts action_text_rich_texts_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.action_text_rich_texts
    ADD CONSTRAINT action_text_rich_texts_pkey PRIMARY KEY (id);


--
-- Name: active_storage_attachments active_storage_attachments_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.active_storage_attachments
    ADD CONSTRAINT active_storage_attachments_pkey PRIMARY KEY (id);


--
-- Name: active_storage_blobs active_storage_blobs_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.active_storage_blobs
    ADD CONSTRAINT active_storage_blobs_pkey PRIMARY KEY (id);


--
-- Name: active_storage_variant_records active_storage_variant_records_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.active_storage_variant_records
    ADD CONSTRAINT active_storage_variant_records_pkey PRIMARY KEY (id);


--
-- Name: ar_internal_metadata ar_internal_metadata_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.ar_internal_metadata
    ADD CONSTRAINT ar_internal_metadata_pkey PRIMARY KEY (key);


--
-- Name: climbed_routes climbed_routes_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.climbed_routes
    ADD CONSTRAINT climbed_routes_pkey PRIMARY KEY (id);


--
-- Name: climbing_types climbing_types_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.climbing_types
    ADD CONSTRAINT climbing_types_pkey PRIMARY KEY (id);


--
-- Name: coalition_members coalition_members_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.coalition_members
    ADD CONSTRAINT coalition_members_pkey PRIMARY KEY (id);


--
-- Name: coalitions coalitions_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.coalitions
    ADD CONSTRAINT coalitions_pkey PRIMARY KEY (id);


--
-- Name: collaborated_routes collaborated_routes_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.collaborated_routes
    ADD CONSTRAINT collaborated_routes_pkey PRIMARY KEY (id);


--
-- Name: countries countries_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.countries
    ADD CONSTRAINT countries_pkey PRIMARY KEY (id);


--
-- Name: descent_alternatives descent_alternatives_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.descent_alternatives
    ADD CONSTRAINT descent_alternatives_pkey PRIMARY KEY (id);


--
-- Name: descents descents_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.descents
    ADD CONSTRAINT descents_pkey PRIMARY KEY (id);


--
-- Name: downloaded_zones downloaded_zones_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.downloaded_zones
    ADD CONSTRAINT downloaded_zones_pkey PRIMARY KEY (id);


--
-- Name: equipped_routes equipped_routes_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.equipped_routes
    ADD CONSTRAINT equipped_routes_pkey PRIMARY KEY (id);


--
-- Name: initiative_participants initiative_participants_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.initiative_participants
    ADD CONSTRAINT initiative_participants_pkey PRIMARY KEY (id);


--
-- Name: initiative_sponsors initiative_sponsors_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.initiative_sponsors
    ADD CONSTRAINT initiative_sponsors_pkey PRIMARY KEY (id);


--
-- Name: initiatives initiatives_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.initiatives
    ADD CONSTRAINT initiatives_pkey PRIMARY KEY (id);


--
-- Name: nesting_seasons nesting_seasons_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.nesting_seasons
    ADD CONSTRAINT nesting_seasons_pkey PRIMARY KEY (id);


--
-- Name: owners owners_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.owners
    ADD CONSTRAINT owners_pkey PRIMARY KEY (id);


--
-- Name: pictures pictures_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.pictures
    ADD CONSTRAINT pictures_pkey PRIMARY KEY (id);


--
-- Name: recent_zones recent_zones_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.recent_zones
    ADD CONSTRAINT recent_zones_pkey PRIMARY KEY (id);


--
-- Name: recommended_descents recommended_descents_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.recommended_descents
    ADD CONSTRAINT recommended_descents_pkey PRIMARY KEY (id);


--
-- Name: recommended_seasons recommended_seasons_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.recommended_seasons
    ADD CONSTRAINT recommended_seasons_pkey PRIMARY KEY (id);


--
-- Name: regions regions_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.regions
    ADD CONSTRAINT regions_pkey PRIMARY KEY (id);


--
-- Name: roles roles_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.roles
    ADD CONSTRAINT roles_pkey PRIMARY KEY (id);


--
-- Name: route_climbing_types route_climbing_types_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.route_climbing_types
    ADD CONSTRAINT route_climbing_types_pkey PRIMARY KEY (id);


--
-- Name: route_reviews route_reviews_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.route_reviews
    ADD CONSTRAINT route_reviews_pkey PRIMARY KEY (id);


--
-- Name: routes routes_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.routes
    ADD CONSTRAINT routes_pkey PRIMARY KEY (id);


--
-- Name: saved_routes saved_routes_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.saved_routes
    ADD CONSTRAINT saved_routes_pkey PRIMARY KEY (id);


--
-- Name: schema_migrations schema_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.schema_migrations
    ADD CONSTRAINT schema_migrations_pkey PRIMARY KEY (version);


--
-- Name: season_sun_exposures season_sun_exposures_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.season_sun_exposures
    ADD CONSTRAINT season_sun_exposures_pkey PRIMARY KEY (id);


--
-- Name: seasons seasons_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.seasons
    ADD CONSTRAINT seasons_pkey PRIMARY KEY (id);


--
-- Name: sectors sectors_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.sectors
    ADD CONSTRAINT sectors_pkey PRIMARY KEY (id);


--
-- Name: sponsors sponsors_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.sponsors
    ADD CONSTRAINT sponsors_pkey PRIMARY KEY (id);


--
-- Name: sun_exposures sun_exposures_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.sun_exposures
    ADD CONSTRAINT sun_exposures_pkey PRIMARY KEY (id);


--
-- Name: user_sponsors user_sponsors_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.user_sponsors
    ADD CONSTRAINT user_sponsors_pkey PRIMARY KEY (id);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: walls walls_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.walls
    ADD CONSTRAINT walls_pkey PRIMARY KEY (id);


--
-- Name: zone_climbing_types zone_climbing_types_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.zone_climbing_types
    ADD CONSTRAINT zone_climbing_types_pkey PRIMARY KEY (id);


--
-- Name: zone_coalitions zone_coalitions_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.zone_coalitions
    ADD CONSTRAINT zone_coalitions_pkey PRIMARY KEY (id);


--
-- Name: zone_owners zone_owners_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.zone_owners
    ADD CONSTRAINT zone_owners_pkey PRIMARY KEY (id);


--
-- Name: zones zones_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.zones
    ADD CONSTRAINT zones_pkey PRIMARY KEY (id);


--
-- Name: index_action_text_rich_texts_uniqueness; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX index_action_text_rich_texts_uniqueness ON public.action_text_rich_texts USING btree (record_type, record_id, name);


--
-- Name: index_active_storage_attachments_on_blob_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_active_storage_attachments_on_blob_id ON public.active_storage_attachments USING btree (blob_id);


--
-- Name: index_active_storage_attachments_uniqueness; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX index_active_storage_attachments_uniqueness ON public.active_storage_attachments USING btree (record_type, record_id, name, blob_id);


--
-- Name: index_active_storage_blobs_on_key; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX index_active_storage_blobs_on_key ON public.active_storage_blobs USING btree (key);


--
-- Name: index_active_storage_variant_records_uniqueness; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX index_active_storage_variant_records_uniqueness ON public.active_storage_variant_records USING btree (blob_id, variation_digest);


--
-- Name: index_climbed_routes_on_route_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_climbed_routes_on_route_id ON public.climbed_routes USING btree (route_id);


--
-- Name: index_climbed_routes_on_user_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_climbed_routes_on_user_id ON public.climbed_routes USING btree (user_id);


--
-- Name: index_coalition_members_on_coalition_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_coalition_members_on_coalition_id ON public.coalition_members USING btree (coalition_id);


--
-- Name: index_coalition_members_on_user_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_coalition_members_on_user_id ON public.coalition_members USING btree (user_id);


--
-- Name: index_collaborated_routes_on_route_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_collaborated_routes_on_route_id ON public.collaborated_routes USING btree (route_id);


--
-- Name: index_collaborated_routes_on_user_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_collaborated_routes_on_user_id ON public.collaborated_routes USING btree (user_id);


--
-- Name: index_descent_alternatives_on_descent_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_descent_alternatives_on_descent_id ON public.descent_alternatives USING btree (descent_id);


--
-- Name: index_descent_alternatives_on_route_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_descent_alternatives_on_route_id ON public.descent_alternatives USING btree (route_id);


--
-- Name: index_downloaded_zones_on_user_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_downloaded_zones_on_user_id ON public.downloaded_zones USING btree (user_id);


--
-- Name: index_downloaded_zones_on_zone_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_downloaded_zones_on_zone_id ON public.downloaded_zones USING btree (zone_id);


--
-- Name: index_equipped_routes_on_route_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_equipped_routes_on_route_id ON public.equipped_routes USING btree (route_id);


--
-- Name: index_equipped_routes_on_user_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_equipped_routes_on_user_id ON public.equipped_routes USING btree (user_id);


--
-- Name: index_initiative_participants_on_initiative_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_initiative_participants_on_initiative_id ON public.initiative_participants USING btree (initiative_id);


--
-- Name: index_initiative_participants_on_user_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_initiative_participants_on_user_id ON public.initiative_participants USING btree (user_id);


--
-- Name: index_initiative_sponsors_on_initiative_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_initiative_sponsors_on_initiative_id ON public.initiative_sponsors USING btree (initiative_id);


--
-- Name: index_initiative_sponsors_on_sponsor_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_initiative_sponsors_on_sponsor_id ON public.initiative_sponsors USING btree (sponsor_id);


--
-- Name: index_initiatives_on_coalition_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_initiatives_on_coalition_id ON public.initiatives USING btree (coalition_id);


--
-- Name: index_nesting_seasons_on_route_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_nesting_seasons_on_route_id ON public.nesting_seasons USING btree (route_id);


--
-- Name: index_pictures_on_imageable_type_and_imageable_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_pictures_on_imageable_type_and_imageable_id ON public.pictures USING btree (imageable_type, imageable_id);


--
-- Name: index_recent_zones_on_user_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_recent_zones_on_user_id ON public.recent_zones USING btree (user_id);


--
-- Name: index_recent_zones_on_zone_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_recent_zones_on_zone_id ON public.recent_zones USING btree (zone_id);


--
-- Name: index_recommended_descents_on_descent_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_recommended_descents_on_descent_id ON public.recommended_descents USING btree (descent_id);


--
-- Name: index_recommended_descents_on_route_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_recommended_descents_on_route_id ON public.recommended_descents USING btree (route_id);


--
-- Name: index_recommended_seasons_on_season_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_recommended_seasons_on_season_id ON public.recommended_seasons USING btree (season_id);


--
-- Name: index_recommended_seasons_on_wall_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_recommended_seasons_on_wall_id ON public.recommended_seasons USING btree (wall_id);


--
-- Name: index_regions_on_country_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_regions_on_country_id ON public.regions USING btree (country_id);


--
-- Name: index_roles_on_name; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_roles_on_name ON public.roles USING btree (name);


--
-- Name: index_roles_on_name_and_resource_type_and_resource_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_roles_on_name_and_resource_type_and_resource_id ON public.roles USING btree (name, resource_type, resource_id);


--
-- Name: index_roles_on_resource; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_roles_on_resource ON public.roles USING btree (resource_type, resource_id);


--
-- Name: index_route_climbing_types_on_climbing_type_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_route_climbing_types_on_climbing_type_id ON public.route_climbing_types USING btree (climbing_type_id);


--
-- Name: index_route_climbing_types_on_route_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_route_climbing_types_on_route_id ON public.route_climbing_types USING btree (route_id);


--
-- Name: index_route_reviews_on_route_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_route_reviews_on_route_id ON public.route_reviews USING btree (route_id);


--
-- Name: index_route_reviews_on_user_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_route_reviews_on_user_id ON public.route_reviews USING btree (user_id);


--
-- Name: index_routes_on_left_route_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_routes_on_left_route_id ON public.routes USING btree (left_route_id);


--
-- Name: index_routes_on_wall_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_routes_on_wall_id ON public.routes USING btree (wall_id);


--
-- Name: index_saved_routes_on_route_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_saved_routes_on_route_id ON public.saved_routes USING btree (route_id);


--
-- Name: index_saved_routes_on_user_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_saved_routes_on_user_id ON public.saved_routes USING btree (user_id);


--
-- Name: index_season_sun_exposures_on_season_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_season_sun_exposures_on_season_id ON public.season_sun_exposures USING btree (season_id);


--
-- Name: index_season_sun_exposures_on_sun_exposure_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_season_sun_exposures_on_sun_exposure_id ON public.season_sun_exposures USING btree (sun_exposure_id);


--
-- Name: index_sectors_on_zone_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_sectors_on_zone_id ON public.sectors USING btree (zone_id);


--
-- Name: index_sun_exposures_on_wall_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_sun_exposures_on_wall_id ON public.sun_exposures USING btree (wall_id);


--
-- Name: index_user_sponsors_on_sponsor_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_user_sponsors_on_sponsor_id ON public.user_sponsors USING btree (sponsor_id);


--
-- Name: index_user_sponsors_on_user_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_user_sponsors_on_user_id ON public.user_sponsors USING btree (user_id);


--
-- Name: index_users_on_confirmation_token; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX index_users_on_confirmation_token ON public.users USING btree (confirmation_token);


--
-- Name: index_users_on_phone_number; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX index_users_on_phone_number ON public.users USING btree (phone_number);


--
-- Name: index_users_on_reset_password_token; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX index_users_on_reset_password_token ON public.users USING btree (reset_password_token);


--
-- Name: index_users_on_uid_and_provider; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX index_users_on_uid_and_provider ON public.users USING btree (uid, provider);


--
-- Name: index_users_roles_on_role_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_users_roles_on_role_id ON public.users_roles USING btree (role_id);


--
-- Name: index_users_roles_on_user_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_users_roles_on_user_id ON public.users_roles USING btree (user_id);


--
-- Name: index_users_roles_on_user_id_and_role_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_users_roles_on_user_id_and_role_id ON public.users_roles USING btree (user_id, role_id);


--
-- Name: index_walls_on_sector_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_walls_on_sector_id ON public.walls USING btree (sector_id);


--
-- Name: index_walls_on_zone_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_walls_on_zone_id ON public.walls USING btree (zone_id);


--
-- Name: index_zone_climbing_types_on_climbing_type_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_zone_climbing_types_on_climbing_type_id ON public.zone_climbing_types USING btree (climbing_type_id);


--
-- Name: index_zone_climbing_types_on_zone_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_zone_climbing_types_on_zone_id ON public.zone_climbing_types USING btree (zone_id);


--
-- Name: index_zone_coalitions_on_coalition_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_zone_coalitions_on_coalition_id ON public.zone_coalitions USING btree (coalition_id);


--
-- Name: index_zone_coalitions_on_zone_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_zone_coalitions_on_zone_id ON public.zone_coalitions USING btree (zone_id);


--
-- Name: index_zone_owners_on_owner_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_zone_owners_on_owner_id ON public.zone_owners USING btree (owner_id);


--
-- Name: index_zone_owners_on_zone_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_zone_owners_on_zone_id ON public.zone_owners USING btree (zone_id);


--
-- Name: index_zones_on_region_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_zones_on_region_id ON public.zones USING btree (region_id);


--
-- Name: climbed_routes fk_rails_0018cc96bd; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.climbed_routes
    ADD CONSTRAINT fk_rails_0018cc96bd FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- Name: zone_owners fk_rails_04ca08c58c; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.zone_owners
    ADD CONSTRAINT fk_rails_04ca08c58c FOREIGN KEY (zone_id) REFERENCES public.zones(id);


--
-- Name: route_climbing_types fk_rails_05078d3aa7; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.route_climbing_types
    ADD CONSTRAINT fk_rails_05078d3aa7 FOREIGN KEY (route_id) REFERENCES public.routes(id);


--
-- Name: route_reviews fk_rails_0663ab2e3c; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.route_reviews
    ADD CONSTRAINT fk_rails_0663ab2e3c FOREIGN KEY (route_id) REFERENCES public.routes(id);


--
-- Name: initiatives fk_rails_0e3749c93b; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.initiatives
    ADD CONSTRAINT fk_rails_0e3749c93b FOREIGN KEY (coalition_id) REFERENCES public.coalitions(id);


--
-- Name: routes fk_rails_2070c35097; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.routes
    ADD CONSTRAINT fk_rails_2070c35097 FOREIGN KEY (wall_id) REFERENCES public.walls(id);


--
-- Name: season_sun_exposures fk_rails_284f855421; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.season_sun_exposures
    ADD CONSTRAINT fk_rails_284f855421 FOREIGN KEY (sun_exposure_id) REFERENCES public.sun_exposures(id);


--
-- Name: recommended_descents fk_rails_2f6f42df34; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.recommended_descents
    ADD CONSTRAINT fk_rails_2f6f42df34 FOREIGN KEY (route_id) REFERENCES public.routes(id);


--
-- Name: zone_coalitions fk_rails_3864ebebf9; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.zone_coalitions
    ADD CONSTRAINT fk_rails_3864ebebf9 FOREIGN KEY (zone_id) REFERENCES public.zones(id);


--
-- Name: user_sponsors fk_rails_394a76b27e; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.user_sponsors
    ADD CONSTRAINT fk_rails_394a76b27e FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- Name: recommended_seasons fk_rails_418236aa58; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.recommended_seasons
    ADD CONSTRAINT fk_rails_418236aa58 FOREIGN KEY (wall_id) REFERENCES public.walls(id);


--
-- Name: saved_routes fk_rails_42dd46a0c3; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.saved_routes
    ADD CONSTRAINT fk_rails_42dd46a0c3 FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- Name: downloaded_zones fk_rails_4ccf10a633; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.downloaded_zones
    ADD CONSTRAINT fk_rails_4ccf10a633 FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- Name: initiative_participants fk_rails_5379583e00; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.initiative_participants
    ADD CONSTRAINT fk_rails_5379583e00 FOREIGN KEY (initiative_id) REFERENCES public.initiatives(id);


--
-- Name: saved_routes fk_rails_6046b6fc44; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.saved_routes
    ADD CONSTRAINT fk_rails_6046b6fc44 FOREIGN KEY (route_id) REFERENCES public.routes(id);


--
-- Name: zones fk_rails_612e015e24; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.zones
    ADD CONSTRAINT fk_rails_612e015e24 FOREIGN KEY (region_id) REFERENCES public.regions(id);


--
-- Name: route_reviews fk_rails_6220be3ded; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.route_reviews
    ADD CONSTRAINT fk_rails_6220be3ded FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- Name: initiative_participants fk_rails_62d736b348; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.initiative_participants
    ADD CONSTRAINT fk_rails_62d736b348 FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- Name: walls fk_rails_67fb9acabc; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.walls
    ADD CONSTRAINT fk_rails_67fb9acabc FOREIGN KEY (sector_id) REFERENCES public.sectors(id);


--
-- Name: initiative_sponsors fk_rails_6a8eb171d4; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.initiative_sponsors
    ADD CONSTRAINT fk_rails_6a8eb171d4 FOREIGN KEY (sponsor_id) REFERENCES public.sponsors(id);


--
-- Name: sectors fk_rails_7180e343e9; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.sectors
    ADD CONSTRAINT fk_rails_7180e343e9 FOREIGN KEY (zone_id) REFERENCES public.zones(id);


--
-- Name: recent_zones fk_rails_71b57ed864; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.recent_zones
    ADD CONSTRAINT fk_rails_71b57ed864 FOREIGN KEY (zone_id) REFERENCES public.zones(id);


--
-- Name: walls fk_rails_7398561f75; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.walls
    ADD CONSTRAINT fk_rails_7398561f75 FOREIGN KEY (zone_id) REFERENCES public.zones(id);


--
-- Name: zone_owners fk_rails_7ddfbe3bb8; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.zone_owners
    ADD CONSTRAINT fk_rails_7ddfbe3bb8 FOREIGN KEY (owner_id) REFERENCES public.owners(id);


--
-- Name: route_climbing_types fk_rails_86223d883c; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.route_climbing_types
    ADD CONSTRAINT fk_rails_86223d883c FOREIGN KEY (climbing_type_id) REFERENCES public.climbing_types(id);


--
-- Name: season_sun_exposures fk_rails_89bd34377e; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.season_sun_exposures
    ADD CONSTRAINT fk_rails_89bd34377e FOREIGN KEY (season_id) REFERENCES public.seasons(id);


--
-- Name: recommended_seasons fk_rails_902b959204; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.recommended_seasons
    ADD CONSTRAINT fk_rails_902b959204 FOREIGN KEY (season_id) REFERENCES public.seasons(id);


--
-- Name: descent_alternatives fk_rails_936331ca91; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.descent_alternatives
    ADD CONSTRAINT fk_rails_936331ca91 FOREIGN KEY (route_id) REFERENCES public.routes(id);


--
-- Name: active_storage_variant_records fk_rails_993965df05; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.active_storage_variant_records
    ADD CONSTRAINT fk_rails_993965df05 FOREIGN KEY (blob_id) REFERENCES public.active_storage_blobs(id);


--
-- Name: equipped_routes fk_rails_a70f6e1c60; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.equipped_routes
    ADD CONSTRAINT fk_rails_a70f6e1c60 FOREIGN KEY (route_id) REFERENCES public.routes(id);


--
-- Name: recommended_descents fk_rails_b215929dfb; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.recommended_descents
    ADD CONSTRAINT fk_rails_b215929dfb FOREIGN KEY (descent_id) REFERENCES public.descents(id);


--
-- Name: coalition_members fk_rails_c0ad645cdc; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.coalition_members
    ADD CONSTRAINT fk_rails_c0ad645cdc FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- Name: coalition_members fk_rails_c2e979f43c; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.coalition_members
    ADD CONSTRAINT fk_rails_c2e979f43c FOREIGN KEY (coalition_id) REFERENCES public.coalitions(id);


--
-- Name: active_storage_attachments fk_rails_c3b3935057; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.active_storage_attachments
    ADD CONSTRAINT fk_rails_c3b3935057 FOREIGN KEY (blob_id) REFERENCES public.active_storage_blobs(id);


--
-- Name: descent_alternatives fk_rails_c3b7bb5d83; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.descent_alternatives
    ADD CONSTRAINT fk_rails_c3b7bb5d83 FOREIGN KEY (descent_id) REFERENCES public.descents(id);


--
-- Name: collaborated_routes fk_rails_cc3c43a14f; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.collaborated_routes
    ADD CONSTRAINT fk_rails_cc3c43a14f FOREIGN KEY (route_id) REFERENCES public.routes(id);


--
-- Name: recent_zones fk_rails_d2ef29384e; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.recent_zones
    ADD CONSTRAINT fk_rails_d2ef29384e FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- Name: downloaded_zones fk_rails_d725ababd5; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.downloaded_zones
    ADD CONSTRAINT fk_rails_d725ababd5 FOREIGN KEY (zone_id) REFERENCES public.zones(id);


--
-- Name: zone_climbing_types fk_rails_dd8a762b0e; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.zone_climbing_types
    ADD CONSTRAINT fk_rails_dd8a762b0e FOREIGN KEY (zone_id) REFERENCES public.zones(id);


--
-- Name: equipped_routes fk_rails_e1536e5352; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.equipped_routes
    ADD CONSTRAINT fk_rails_e1536e5352 FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- Name: initiative_sponsors fk_rails_e3a97d7c3f; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.initiative_sponsors
    ADD CONSTRAINT fk_rails_e3a97d7c3f FOREIGN KEY (initiative_id) REFERENCES public.initiatives(id);


--
-- Name: nesting_seasons fk_rails_e6c09384ec; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.nesting_seasons
    ADD CONSTRAINT fk_rails_e6c09384ec FOREIGN KEY (route_id) REFERENCES public.routes(id);


--
-- Name: zone_climbing_types fk_rails_eb80b69298; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.zone_climbing_types
    ADD CONSTRAINT fk_rails_eb80b69298 FOREIGN KEY (climbing_type_id) REFERENCES public.climbing_types(id);


--
-- Name: sun_exposures fk_rails_ec20665e80; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.sun_exposures
    ADD CONSTRAINT fk_rails_ec20665e80 FOREIGN KEY (wall_id) REFERENCES public.walls(id);


--
-- Name: climbed_routes fk_rails_ec5d461b4b; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.climbed_routes
    ADD CONSTRAINT fk_rails_ec5d461b4b FOREIGN KEY (route_id) REFERENCES public.routes(id);


--
-- Name: collaborated_routes fk_rails_efe00b7180; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.collaborated_routes
    ADD CONSTRAINT fk_rails_efe00b7180 FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- Name: regions fk_rails_f2ba72ccee; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.regions
    ADD CONSTRAINT fk_rails_f2ba72ccee FOREIGN KEY (country_id) REFERENCES public.countries(id);


--
-- Name: user_sponsors fk_rails_f52fc8efab; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.user_sponsors
    ADD CONSTRAINT fk_rails_f52fc8efab FOREIGN KEY (sponsor_id) REFERENCES public.sponsors(id);


--
-- Name: zone_coalitions fk_rails_fe83a4d6cf; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.zone_coalitions
    ADD CONSTRAINT fk_rails_fe83a4d6cf FOREIGN KEY (coalition_id) REFERENCES public.coalitions(id);


--
-- PostgreSQL database dump complete
--

