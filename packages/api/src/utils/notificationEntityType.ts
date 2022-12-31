import { Entity, EntityTypeId } from "@prisma/client";

type supportedLanguages = "en" | "es";

interface EntityType {
  id: EntityTypeId;
  entity: Entity;
  template: Partial<{
    [key in supportedLanguages]: (...values: any[]) => string;
  }>;
}

type NotificationEntityTypes = { [key in EntityTypeId]: EntityType };

const pushNotification = {
  [EntityTypeId.RequestZoneReview]: {
    id: EntityTypeId.RequestZoneReview,
    entity: Entity.Zone,

    template: {
      es: ({ user, zoneName }: { user: string; zoneName: string }) =>
        `${user} ha solicitado la revisión de la zona ${zoneName}`,
    },
  },
  [EntityTypeId.RequestCommunityAccess]: {
    id: EntityTypeId.RequestCommunityAccess,
    entity: Entity.Zone,
    template: {
      es: ({ user, zoneName }: { user: string; zoneName: string }) =>
        `${user} ha solicitado la revisión de la zona ${zoneName}`,
    },
  },
  [EntityTypeId.ZoneReviewAssigned]: {
    id: EntityTypeId.ZoneReviewAssigned,
    entity: Entity.Zone,
    template: {
      es: ({ user, zoneName }: { user: string; zoneName: string }) =>
        `Ya comenzó la revisión de la zona ${zoneName} por parte de ${user}`,
    },
  },
  [EntityTypeId.ApproveZoneReview]: {
    id: EntityTypeId.ApproveZoneReview,
    entity: Entity.Zone,
    template: {
      es: ({ zoneName }: { zoneName: string }) =>
        `La revisión de la zona ${zoneName} ha sido aprobada, ya puedes publicar la zona`,
    },
  },
  [EntityTypeId.RejectZoneReview]: {
    id: EntityTypeId.ApproveZoneReview,
    entity: Entity.Zone,
    template: {
      es: ({ zoneName }: { zoneName: string }) =>
        `La revisión de la zona ${zoneName} ha sido rechazada, revisa las correcciones y vuele a solicitar la revisión`,
    },
  },
} satisfies NotificationEntityTypes;

export default pushNotification;