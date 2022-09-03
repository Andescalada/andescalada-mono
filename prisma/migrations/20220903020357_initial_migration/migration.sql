-- CreateTable
CREATE TABLE "action_text_rich_texts" (
    "id" BIGSERIAL NOT NULL,
    "name" VARCHAR NOT NULL,
    "body" TEXT,
    "record_type" VARCHAR NOT NULL,
    "record_id" BIGINT NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL,
    "updated_at" TIMESTAMP(6) NOT NULL,

    CONSTRAINT "action_text_rich_texts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "active_storage_attachments" (
    "id" BIGSERIAL NOT NULL,
    "name" VARCHAR NOT NULL,
    "record_type" VARCHAR NOT NULL,
    "record_id" BIGINT NOT NULL,
    "blob_id" BIGINT NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL,

    CONSTRAINT "active_storage_attachments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "active_storage_blobs" (
    "id" BIGSERIAL NOT NULL,
    "key" VARCHAR NOT NULL,
    "filename" VARCHAR NOT NULL,
    "content_type" VARCHAR,
    "metadata" TEXT,
    "byte_size" BIGINT NOT NULL,
    "checksum" VARCHAR NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL,
    "service_name" VARCHAR NOT NULL,

    CONSTRAINT "active_storage_blobs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "active_storage_variant_records" (
    "id" BIGSERIAL NOT NULL,
    "blob_id" BIGINT NOT NULL,
    "variation_digest" VARCHAR NOT NULL,

    CONSTRAINT "active_storage_variant_records_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ar_internal_metadata" (
    "key" VARCHAR NOT NULL,
    "value" VARCHAR,
    "created_at" TIMESTAMP(6) NOT NULL,
    "updated_at" TIMESTAMP(6) NOT NULL,

    CONSTRAINT "ar_internal_metadata_pkey" PRIMARY KEY ("key")
);

-- CreateTable
CREATE TABLE "climbed_routes" (
    "id" BIGSERIAL NOT NULL,
    "route_id" BIGINT NOT NULL,
    "user_id" BIGINT NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL,
    "updated_at" TIMESTAMP(6) NOT NULL,

    CONSTRAINT "climbed_routes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "climbing_types" (
    "id" BIGSERIAL NOT NULL,
    "name" INTEGER DEFAULT 0,
    "created_at" TIMESTAMP(6) NOT NULL,
    "updated_at" TIMESTAMP(6) NOT NULL,

    CONSTRAINT "climbing_types_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "coalition_members" (
    "id" BIGSERIAL NOT NULL,
    "coalition_id" BIGINT NOT NULL,
    "user_id" BIGINT NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL,
    "updated_at" TIMESTAMP(6) NOT NULL,
    "approved" BOOLEAN DEFAULT false,

    CONSTRAINT "coalition_members_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "coalitions" (
    "id" BIGSERIAL NOT NULL,
    "name" VARCHAR,
    "email" VARCHAR,
    "twitter" VARCHAR,
    "instagram" VARCHAR,
    "youtube" VARCHAR,
    "tiktok" VARCHAR,
    "facebook" VARCHAR,
    "description" TEXT,
    "created_at" TIMESTAMP(6) NOT NULL,
    "updated_at" TIMESTAMP(6) NOT NULL,
    "initiatives_count" INTEGER DEFAULT 0,

    CONSTRAINT "coalitions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "collaborated_routes" (
    "id" BIGSERIAL NOT NULL,
    "route_id" BIGINT NOT NULL,
    "user_id" BIGINT NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL,
    "updated_at" TIMESTAMP(6) NOT NULL,

    CONSTRAINT "collaborated_routes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "countries" (
    "id" BIGSERIAL NOT NULL,
    "name" VARCHAR,
    "created_at" TIMESTAMP(6) NOT NULL,
    "updated_at" TIMESTAMP(6) NOT NULL,

    CONSTRAINT "countries_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "descent_alternatives" (
    "id" BIGSERIAL NOT NULL,
    "route_id" BIGINT NOT NULL,
    "descent_id" BIGINT NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL,
    "updated_at" TIMESTAMP(6) NOT NULL,

    CONSTRAINT "descent_alternatives_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "descents" (
    "id" BIGSERIAL NOT NULL,
    "name" INTEGER DEFAULT 0,
    "created_at" TIMESTAMP(6) NOT NULL,
    "updated_at" TIMESTAMP(6) NOT NULL,

    CONSTRAINT "descents_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "downloaded_zones" (
    "id" BIGSERIAL NOT NULL,
    "user_id" BIGINT NOT NULL,
    "zone_id" BIGINT NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL,
    "updated_at" TIMESTAMP(6) NOT NULL,

    CONSTRAINT "downloaded_zones_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "equipped_routes" (
    "id" BIGSERIAL NOT NULL,
    "route_id" BIGINT NOT NULL,
    "user_id" BIGINT NOT NULL,
    "date" DATE,
    "created_at" TIMESTAMP(6) NOT NULL,
    "updated_at" TIMESTAMP(6) NOT NULL,

    CONSTRAINT "equipped_routes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "initiative_participants" (
    "id" BIGSERIAL NOT NULL,
    "initiative_id" BIGINT NOT NULL,
    "user_id" BIGINT NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL,
    "updated_at" TIMESTAMP(6) NOT NULL,

    CONSTRAINT "initiative_participants_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "initiative_sponsors" (
    "id" BIGSERIAL NOT NULL,
    "initiative_id" BIGINT NOT NULL,
    "sponsor_id" BIGINT NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL,
    "updated_at" TIMESTAMP(6) NOT NULL,

    CONSTRAINT "initiative_sponsors_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "initiatives" (
    "id" BIGSERIAL NOT NULL,
    "donatable" BOOLEAN DEFAULT true,
    "joinable" BOOLEAN DEFAULT true,
    "start_date" TIMESTAMP(6),
    "end_date" TIMESTAMP(6),
    "donated" DOUBLE PRECISION DEFAULT 0.0,
    "coalition_id" BIGINT NOT NULL,
    "name" VARCHAR,
    "email" VARCHAR,
    "twitter" VARCHAR,
    "instagram" VARCHAR,
    "youtube" VARCHAR,
    "tiktok" VARCHAR,
    "facebook" VARCHAR,
    "description" TEXT,
    "created_at" TIMESTAMP(6) NOT NULL,
    "updated_at" TIMESTAMP(6) NOT NULL,
    "active" BOOLEAN DEFAULT false,

    CONSTRAINT "initiatives_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "nesting_seasons" (
    "id" BIGSERIAL NOT NULL,
    "start_date" TIMESTAMP(6),
    "end_date" TIMESTAMP(6),
    "route_id" BIGINT NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL,
    "updated_at" TIMESTAMP(6) NOT NULL,

    CONSTRAINT "nesting_seasons_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "owners" (
    "id" BIGSERIAL NOT NULL,
    "company" BOOLEAN DEFAULT false,
    "government" BOOLEAN DEFAULT false,
    "name" VARCHAR,
    "email" VARCHAR,
    "phone_number" VARCHAR,
    "additional_info" TEXT,
    "created_at" TIMESTAMP(6) NOT NULL,
    "updated_at" TIMESTAMP(6) NOT NULL,

    CONSTRAINT "owners_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pictures" (
    "id" BIGSERIAL NOT NULL,
    "downloaded" BOOLEAN DEFAULT false,
    "imageable_type" VARCHAR,
    "imageable_id" BIGINT,
    "created_at" TIMESTAMP(6) NOT NULL,
    "updated_at" TIMESTAMP(6) NOT NULL,
    "description" TEXT,

    CONSTRAINT "pictures_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "recent_zones" (
    "id" BIGSERIAL NOT NULL,
    "user_id" BIGINT NOT NULL,
    "zone_id" BIGINT NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL,
    "updated_at" TIMESTAMP(6) NOT NULL,

    CONSTRAINT "recent_zones_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "recommended_descents" (
    "id" BIGSERIAL NOT NULL,
    "route_id" BIGINT NOT NULL,
    "descent_id" BIGINT NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL,
    "updated_at" TIMESTAMP(6) NOT NULL,

    CONSTRAINT "recommended_descents_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "recommended_seasons" (
    "id" BIGSERIAL NOT NULL,
    "wall_id" BIGINT NOT NULL,
    "season_id" BIGINT NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL,
    "updated_at" TIMESTAMP(6) NOT NULL,

    CONSTRAINT "recommended_seasons_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "regions" (
    "id" BIGSERIAL NOT NULL,
    "name" VARCHAR,
    "country_id" BIGINT NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL,
    "updated_at" TIMESTAMP(6) NOT NULL,

    CONSTRAINT "regions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "roles" (
    "id" BIGSERIAL NOT NULL,
    "name" VARCHAR,
    "resource_type" VARCHAR,
    "resource_id" BIGINT,
    "created_at" TIMESTAMP(6) NOT NULL,
    "updated_at" TIMESTAMP(6) NOT NULL,

    CONSTRAINT "roles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "route_climbing_types" (
    "id" BIGSERIAL NOT NULL,
    "route_id" BIGINT NOT NULL,
    "climbing_type_id" BIGINT NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL,
    "updated_at" TIMESTAMP(6) NOT NULL,

    CONSTRAINT "route_climbing_types_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "route_reviews" (
    "id" BIGSERIAL NOT NULL,
    "climbing_type_id" INTEGER,
    "protection_rating" INTEGER,
    "stars" INTEGER,
    "route_id" BIGINT NOT NULL,
    "user_id" BIGINT NOT NULL,
    "grade" VARCHAR,
    "comment" TEXT,
    "created_at" TIMESTAMP(6) NOT NULL,
    "updated_at" TIMESTAMP(6) NOT NULL,

    CONSTRAINT "route_reviews_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "routes" (
    "id" BIGSERIAL NOT NULL,
    "rains" BOOLEAN DEFAULT false,
    "classic" BOOLEAN DEFAULT false,
    "published" BOOLEAN DEFAULT false,
    "status" INTEGER DEFAULT 0,
    "protection_ranking" INTEGER DEFAULT 0,
    "slope" INTEGER DEFAULT 0,
    "pitch_num" INTEGER DEFAULT 1,
    "wind" INTEGER DEFAULT 0,
    "topo_num" INTEGER,
    "length" INTEGER,
    "reviews_count" INTEGER DEFAULT 0,
    "wall_id" BIGINT NOT NULL,
    "left_route_id" BIGINT,
    "name" VARCHAR,
    "grade" VARCHAR,
    "community_grade" VARCHAR,
    "quickdraws" VARCHAR,
    "status_title" VARCHAR,
    "status_description" TEXT,
    "created_at" TIMESTAMP(6) NOT NULL,
    "updated_at" TIMESTAMP(6) NOT NULL,

    CONSTRAINT "routes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "saved_routes" (
    "id" BIGSERIAL NOT NULL,
    "route_id" BIGINT NOT NULL,
    "user_id" BIGINT NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL,
    "updated_at" TIMESTAMP(6) NOT NULL,

    CONSTRAINT "saved_routes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "schema_migrations" (
    "version" VARCHAR NOT NULL,

    CONSTRAINT "schema_migrations_pkey" PRIMARY KEY ("version")
);

-- CreateTable
CREATE TABLE "season_sun_exposures" (
    "id" BIGSERIAL NOT NULL,
    "sun_exposure_id" BIGINT NOT NULL,
    "season_id" BIGINT NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL,
    "updated_at" TIMESTAMP(6) NOT NULL,

    CONSTRAINT "season_sun_exposures_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "seasons" (
    "id" BIGSERIAL NOT NULL,
    "start_date" TIMESTAMP(6),
    "end_date" TIMESTAMP(6),
    "name" INTEGER,
    "created_at" TIMESTAMP(6) NOT NULL,
    "updated_at" TIMESTAMP(6) NOT NULL,

    CONSTRAINT "seasons_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sectors" (
    "id" BIGSERIAL NOT NULL,
    "latitude" DECIMAL,
    "longitude" DECIMAL,
    "zone_id" BIGINT NOT NULL,
    "name" VARCHAR,
    "created_at" TIMESTAMP(6) NOT NULL,
    "updated_at" TIMESTAMP(6) NOT NULL,

    CONSTRAINT "sectors_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sponsors" (
    "id" BIGSERIAL NOT NULL,
    "name" VARCHAR,
    "created_at" TIMESTAMP(6) NOT NULL,
    "updated_at" TIMESTAMP(6) NOT NULL,
    "url" VARCHAR,

    CONSTRAINT "sponsors_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sun_exposures" (
    "id" BIGSERIAL NOT NULL,
    "exposure" INTEGER DEFAULT 0,
    "wall_id" BIGINT NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL,
    "updated_at" TIMESTAMP(6) NOT NULL,

    CONSTRAINT "sun_exposures_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_sponsors" (
    "id" BIGSERIAL NOT NULL,
    "user_id" BIGINT NOT NULL,
    "sponsor_id" BIGINT NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL,
    "updated_at" TIMESTAMP(6) NOT NULL,

    CONSTRAINT "user_sponsors_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" BIGSERIAL NOT NULL,
    "provider" VARCHAR NOT NULL DEFAULT 'email',
    "uid" VARCHAR NOT NULL DEFAULT '',
    "encrypted_password" VARCHAR NOT NULL DEFAULT '',
    "reset_password_token" VARCHAR,
    "reset_password_sent_at" TIMESTAMP(6),
    "allow_password_change" BOOLEAN DEFAULT false,
    "remember_created_at" TIMESTAMP(6),
    "sign_in_count" INTEGER NOT NULL DEFAULT 0,
    "current_sign_in_at" TIMESTAMP(6),
    "last_sign_in_at" TIMESTAMP(6),
    "current_sign_in_ip" INET,
    "last_sign_in_ip" INET,
    "confirmation_token" VARCHAR,
    "confirmed_at" TIMESTAMP(6),
    "confirmation_sent_at" TIMESTAMP(6),
    "unconfirmed_email" VARCHAR,
    "climbing_since" INTEGER,
    "boulder_scale" INTEGER DEFAULT 0,
    "route_scale" INTEGER DEFAULT 0,
    "name" VARCHAR,
    "brief_bio" VARCHAR,
    "email" VARCHAR,
    "phone_number" BIGINT,
    "twitter" VARCHAR,
    "instagram" VARCHAR,
    "youtube" VARCHAR,
    "tiktok" VARCHAR,
    "facebook" VARCHAR,
    "last_sign_in_country" VARCHAR,
    "biography" TEXT,
    "tokens" TEXT,
    "created_at" TIMESTAMP(6) NOT NULL,
    "updated_at" TIMESTAMP(6) NOT NULL,
    "country_code" VARCHAR,
    "show_modal" BOOLEAN DEFAULT true,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users_roles" (
    "id" BIGSERIAL NOT NULL,
    "user_id" BIGINT,
    "role_id" BIGINT,

    CONSTRAINT "users_roles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "walls" (
    "id" BIGSERIAL NOT NULL,
    "rains" BOOLEAN DEFAULT false,
    "published" BOOLEAN DEFAULT false,
    "routes_count" INTEGER DEFAULT 0,
    "zone_id" BIGINT NOT NULL,
    "name" VARCHAR,
    "description" TEXT,
    "created_at" TIMESTAMP(6) NOT NULL,
    "updated_at" TIMESTAMP(6) NOT NULL,
    "sector_id" BIGINT,

    CONSTRAINT "walls_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "zone_climbing_types" (
    "id" BIGSERIAL NOT NULL,
    "zone_id" BIGINT NOT NULL,
    "climbing_type_id" BIGINT NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL,
    "updated_at" TIMESTAMP(6) NOT NULL,

    CONSTRAINT "zone_climbing_types_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "zone_coalitions" (
    "id" BIGSERIAL NOT NULL,
    "coalition_id" BIGINT NOT NULL,
    "zone_id" BIGINT NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL,
    "updated_at" TIMESTAMP(6) NOT NULL,

    CONSTRAINT "zone_coalitions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "zone_owners" (
    "id" BIGSERIAL NOT NULL,
    "zone_id" BIGINT NOT NULL,
    "owner_id" BIGINT NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL,
    "updated_at" TIMESTAMP(6) NOT NULL,

    CONSTRAINT "zone_owners_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "zones" (
    "id" BIGSERIAL NOT NULL,
    "camping_zone" INTEGER DEFAULT 2,
    "bathroom_available" INTEGER DEFAULT 2,
    "fire_allowed" INTEGER DEFAULT 2,
    "published" BOOLEAN DEFAULT false,
    "multipitch" BOOLEAN DEFAULT false,
    "latitude" DECIMAL,
    "longitude" DECIMAL,
    "altitude" DOUBLE PRECISION,
    "routes_count" INTEGER DEFAULT 0,
    "price" INTEGER DEFAULT 0,
    "region_id" BIGINT NOT NULL,
    "name" VARCHAR,
    "location" VARCHAR,
    "lonlat" geography,
    "description" TEXT,
    "created_at" TIMESTAMP(6) NOT NULL,
    "updated_at" TIMESTAMP(6) NOT NULL,
    "suitable_for_children" INTEGER DEFAULT 2,

    CONSTRAINT "zones_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "index_action_text_rich_texts_uniqueness" ON "action_text_rich_texts"("record_type", "record_id", "name");

-- CreateIndex
CREATE INDEX "index_active_storage_attachments_on_blob_id" ON "active_storage_attachments"("blob_id");

-- CreateIndex
CREATE UNIQUE INDEX "index_active_storage_attachments_uniqueness" ON "active_storage_attachments"("record_type", "record_id", "name", "blob_id");

-- CreateIndex
CREATE UNIQUE INDEX "index_active_storage_blobs_on_key" ON "active_storage_blobs"("key");

-- CreateIndex
CREATE UNIQUE INDEX "index_active_storage_variant_records_uniqueness" ON "active_storage_variant_records"("blob_id", "variation_digest");

-- CreateIndex
CREATE INDEX "index_climbed_routes_on_route_id" ON "climbed_routes"("route_id");

-- CreateIndex
CREATE INDEX "index_climbed_routes_on_user_id" ON "climbed_routes"("user_id");

-- CreateIndex
CREATE INDEX "index_coalition_members_on_coalition_id" ON "coalition_members"("coalition_id");

-- CreateIndex
CREATE INDEX "index_coalition_members_on_user_id" ON "coalition_members"("user_id");

-- CreateIndex
CREATE INDEX "index_collaborated_routes_on_route_id" ON "collaborated_routes"("route_id");

-- CreateIndex
CREATE INDEX "index_collaborated_routes_on_user_id" ON "collaborated_routes"("user_id");

-- CreateIndex
CREATE INDEX "index_descent_alternatives_on_descent_id" ON "descent_alternatives"("descent_id");

-- CreateIndex
CREATE INDEX "index_descent_alternatives_on_route_id" ON "descent_alternatives"("route_id");

-- CreateIndex
CREATE INDEX "index_downloaded_zones_on_user_id" ON "downloaded_zones"("user_id");

-- CreateIndex
CREATE INDEX "index_downloaded_zones_on_zone_id" ON "downloaded_zones"("zone_id");

-- CreateIndex
CREATE INDEX "index_equipped_routes_on_route_id" ON "equipped_routes"("route_id");

-- CreateIndex
CREATE INDEX "index_equipped_routes_on_user_id" ON "equipped_routes"("user_id");

-- CreateIndex
CREATE INDEX "index_initiative_participants_on_initiative_id" ON "initiative_participants"("initiative_id");

-- CreateIndex
CREATE INDEX "index_initiative_participants_on_user_id" ON "initiative_participants"("user_id");

-- CreateIndex
CREATE INDEX "index_initiative_sponsors_on_initiative_id" ON "initiative_sponsors"("initiative_id");

-- CreateIndex
CREATE INDEX "index_initiative_sponsors_on_sponsor_id" ON "initiative_sponsors"("sponsor_id");

-- CreateIndex
CREATE INDEX "index_initiatives_on_coalition_id" ON "initiatives"("coalition_id");

-- CreateIndex
CREATE INDEX "index_nesting_seasons_on_route_id" ON "nesting_seasons"("route_id");

-- CreateIndex
CREATE INDEX "index_pictures_on_imageable_type_and_imageable_id" ON "pictures"("imageable_type", "imageable_id");

-- CreateIndex
CREATE INDEX "index_recent_zones_on_user_id" ON "recent_zones"("user_id");

-- CreateIndex
CREATE INDEX "index_recent_zones_on_zone_id" ON "recent_zones"("zone_id");

-- CreateIndex
CREATE INDEX "index_recommended_descents_on_descent_id" ON "recommended_descents"("descent_id");

-- CreateIndex
CREATE INDEX "index_recommended_descents_on_route_id" ON "recommended_descents"("route_id");

-- CreateIndex
CREATE INDEX "index_recommended_seasons_on_season_id" ON "recommended_seasons"("season_id");

-- CreateIndex
CREATE INDEX "index_recommended_seasons_on_wall_id" ON "recommended_seasons"("wall_id");

-- CreateIndex
CREATE INDEX "index_regions_on_country_id" ON "regions"("country_id");

-- CreateIndex
CREATE INDEX "index_roles_on_name" ON "roles"("name");

-- CreateIndex
CREATE INDEX "index_roles_on_name_and_resource_type_and_resource_id" ON "roles"("name", "resource_type", "resource_id");

-- CreateIndex
CREATE INDEX "index_roles_on_resource" ON "roles"("resource_type", "resource_id");

-- CreateIndex
CREATE INDEX "index_route_climbing_types_on_climbing_type_id" ON "route_climbing_types"("climbing_type_id");

-- CreateIndex
CREATE INDEX "index_route_climbing_types_on_route_id" ON "route_climbing_types"("route_id");

-- CreateIndex
CREATE INDEX "index_route_reviews_on_route_id" ON "route_reviews"("route_id");

-- CreateIndex
CREATE INDEX "index_route_reviews_on_user_id" ON "route_reviews"("user_id");

-- CreateIndex
CREATE INDEX "index_routes_on_left_route_id" ON "routes"("left_route_id");

-- CreateIndex
CREATE INDEX "index_routes_on_wall_id" ON "routes"("wall_id");

-- CreateIndex
CREATE INDEX "index_saved_routes_on_route_id" ON "saved_routes"("route_id");

-- CreateIndex
CREATE INDEX "index_saved_routes_on_user_id" ON "saved_routes"("user_id");

-- CreateIndex
CREATE INDEX "index_season_sun_exposures_on_season_id" ON "season_sun_exposures"("season_id");

-- CreateIndex
CREATE INDEX "index_season_sun_exposures_on_sun_exposure_id" ON "season_sun_exposures"("sun_exposure_id");

-- CreateIndex
CREATE INDEX "index_sectors_on_zone_id" ON "sectors"("zone_id");

-- CreateIndex
CREATE INDEX "index_sun_exposures_on_wall_id" ON "sun_exposures"("wall_id");

-- CreateIndex
CREATE INDEX "index_user_sponsors_on_sponsor_id" ON "user_sponsors"("sponsor_id");

-- CreateIndex
CREATE INDEX "index_user_sponsors_on_user_id" ON "user_sponsors"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "index_users_on_reset_password_token" ON "users"("reset_password_token");

-- CreateIndex
CREATE UNIQUE INDEX "index_users_on_confirmation_token" ON "users"("confirmation_token");

-- CreateIndex
CREATE UNIQUE INDEX "index_users_on_phone_number" ON "users"("phone_number");

-- CreateIndex
CREATE UNIQUE INDEX "index_users_on_uid_and_provider" ON "users"("uid", "provider");

-- CreateIndex
CREATE INDEX "index_users_roles_on_role_id" ON "users_roles"("role_id");

-- CreateIndex
CREATE INDEX "index_users_roles_on_user_id" ON "users_roles"("user_id");

-- CreateIndex
CREATE INDEX "index_users_roles_on_user_id_and_role_id" ON "users_roles"("user_id", "role_id");

-- CreateIndex
CREATE INDEX "index_walls_on_sector_id" ON "walls"("sector_id");

-- CreateIndex
CREATE INDEX "index_walls_on_zone_id" ON "walls"("zone_id");

-- CreateIndex
CREATE INDEX "index_zone_climbing_types_on_climbing_type_id" ON "zone_climbing_types"("climbing_type_id");

-- CreateIndex
CREATE INDEX "index_zone_climbing_types_on_zone_id" ON "zone_climbing_types"("zone_id");

-- CreateIndex
CREATE INDEX "index_zone_coalitions_on_coalition_id" ON "zone_coalitions"("coalition_id");

-- CreateIndex
CREATE INDEX "index_zone_coalitions_on_zone_id" ON "zone_coalitions"("zone_id");

-- CreateIndex
CREATE INDEX "index_zone_owners_on_owner_id" ON "zone_owners"("owner_id");

-- CreateIndex
CREATE INDEX "index_zone_owners_on_zone_id" ON "zone_owners"("zone_id");

-- CreateIndex
CREATE INDEX "index_zones_on_region_id" ON "zones"("region_id");

-- AddForeignKey
ALTER TABLE "active_storage_attachments" ADD CONSTRAINT "fk_rails_c3b3935057" FOREIGN KEY ("blob_id") REFERENCES "active_storage_blobs"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "active_storage_variant_records" ADD CONSTRAINT "fk_rails_993965df05" FOREIGN KEY ("blob_id") REFERENCES "active_storage_blobs"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "climbed_routes" ADD CONSTRAINT "fk_rails_0018cc96bd" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "climbed_routes" ADD CONSTRAINT "fk_rails_ec5d461b4b" FOREIGN KEY ("route_id") REFERENCES "routes"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "coalition_members" ADD CONSTRAINT "fk_rails_c0ad645cdc" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "coalition_members" ADD CONSTRAINT "fk_rails_c2e979f43c" FOREIGN KEY ("coalition_id") REFERENCES "coalitions"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "collaborated_routes" ADD CONSTRAINT "fk_rails_cc3c43a14f" FOREIGN KEY ("route_id") REFERENCES "routes"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "collaborated_routes" ADD CONSTRAINT "fk_rails_efe00b7180" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "descent_alternatives" ADD CONSTRAINT "fk_rails_936331ca91" FOREIGN KEY ("route_id") REFERENCES "routes"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "descent_alternatives" ADD CONSTRAINT "fk_rails_c3b7bb5d83" FOREIGN KEY ("descent_id") REFERENCES "descents"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "downloaded_zones" ADD CONSTRAINT "fk_rails_4ccf10a633" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "downloaded_zones" ADD CONSTRAINT "fk_rails_d725ababd5" FOREIGN KEY ("zone_id") REFERENCES "zones"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "equipped_routes" ADD CONSTRAINT "fk_rails_a70f6e1c60" FOREIGN KEY ("route_id") REFERENCES "routes"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "equipped_routes" ADD CONSTRAINT "fk_rails_e1536e5352" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "initiative_participants" ADD CONSTRAINT "fk_rails_5379583e00" FOREIGN KEY ("initiative_id") REFERENCES "initiatives"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "initiative_participants" ADD CONSTRAINT "fk_rails_62d736b348" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "initiative_sponsors" ADD CONSTRAINT "fk_rails_6a8eb171d4" FOREIGN KEY ("sponsor_id") REFERENCES "sponsors"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "initiative_sponsors" ADD CONSTRAINT "fk_rails_e3a97d7c3f" FOREIGN KEY ("initiative_id") REFERENCES "initiatives"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "initiatives" ADD CONSTRAINT "fk_rails_0e3749c93b" FOREIGN KEY ("coalition_id") REFERENCES "coalitions"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "nesting_seasons" ADD CONSTRAINT "fk_rails_e6c09384ec" FOREIGN KEY ("route_id") REFERENCES "routes"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "recent_zones" ADD CONSTRAINT "fk_rails_71b57ed864" FOREIGN KEY ("zone_id") REFERENCES "zones"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "recent_zones" ADD CONSTRAINT "fk_rails_d2ef29384e" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "recommended_descents" ADD CONSTRAINT "fk_rails_2f6f42df34" FOREIGN KEY ("route_id") REFERENCES "routes"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "recommended_descents" ADD CONSTRAINT "fk_rails_b215929dfb" FOREIGN KEY ("descent_id") REFERENCES "descents"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "recommended_seasons" ADD CONSTRAINT "fk_rails_418236aa58" FOREIGN KEY ("wall_id") REFERENCES "walls"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "recommended_seasons" ADD CONSTRAINT "fk_rails_902b959204" FOREIGN KEY ("season_id") REFERENCES "seasons"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "regions" ADD CONSTRAINT "fk_rails_f2ba72ccee" FOREIGN KEY ("country_id") REFERENCES "countries"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "route_climbing_types" ADD CONSTRAINT "fk_rails_05078d3aa7" FOREIGN KEY ("route_id") REFERENCES "routes"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "route_climbing_types" ADD CONSTRAINT "fk_rails_86223d883c" FOREIGN KEY ("climbing_type_id") REFERENCES "climbing_types"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "route_reviews" ADD CONSTRAINT "fk_rails_0663ab2e3c" FOREIGN KEY ("route_id") REFERENCES "routes"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "route_reviews" ADD CONSTRAINT "fk_rails_6220be3ded" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "routes" ADD CONSTRAINT "fk_rails_2070c35097" FOREIGN KEY ("wall_id") REFERENCES "walls"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "saved_routes" ADD CONSTRAINT "fk_rails_42dd46a0c3" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "saved_routes" ADD CONSTRAINT "fk_rails_6046b6fc44" FOREIGN KEY ("route_id") REFERENCES "routes"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "season_sun_exposures" ADD CONSTRAINT "fk_rails_284f855421" FOREIGN KEY ("sun_exposure_id") REFERENCES "sun_exposures"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "season_sun_exposures" ADD CONSTRAINT "fk_rails_89bd34377e" FOREIGN KEY ("season_id") REFERENCES "seasons"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "sectors" ADD CONSTRAINT "fk_rails_7180e343e9" FOREIGN KEY ("zone_id") REFERENCES "zones"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "sun_exposures" ADD CONSTRAINT "fk_rails_ec20665e80" FOREIGN KEY ("wall_id") REFERENCES "walls"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "user_sponsors" ADD CONSTRAINT "fk_rails_394a76b27e" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "user_sponsors" ADD CONSTRAINT "fk_rails_f52fc8efab" FOREIGN KEY ("sponsor_id") REFERENCES "sponsors"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "walls" ADD CONSTRAINT "fk_rails_67fb9acabc" FOREIGN KEY ("sector_id") REFERENCES "sectors"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "walls" ADD CONSTRAINT "fk_rails_7398561f75" FOREIGN KEY ("zone_id") REFERENCES "zones"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "zone_climbing_types" ADD CONSTRAINT "fk_rails_dd8a762b0e" FOREIGN KEY ("zone_id") REFERENCES "zones"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "zone_climbing_types" ADD CONSTRAINT "fk_rails_eb80b69298" FOREIGN KEY ("climbing_type_id") REFERENCES "climbing_types"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "zone_coalitions" ADD CONSTRAINT "fk_rails_3864ebebf9" FOREIGN KEY ("zone_id") REFERENCES "zones"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "zone_coalitions" ADD CONSTRAINT "fk_rails_fe83a4d6cf" FOREIGN KEY ("coalition_id") REFERENCES "coalitions"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "zone_owners" ADD CONSTRAINT "fk_rails_04ca08c58c" FOREIGN KEY ("zone_id") REFERENCES "zones"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "zone_owners" ADD CONSTRAINT "fk_rails_7ddfbe3bb8" FOREIGN KEY ("owner_id") REFERENCES "owners"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "zones" ADD CONSTRAINT "fk_rails_612e015e24" FOREIGN KEY ("region_id") REFERENCES "regions"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
