import { Entity, EntityTypeId } from "@andescalada/db";

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
  [EntityTypeId.RequestZoneAccess]: {
    id: EntityTypeId.RequestZoneAccess,
    entity: Entity.Zone,
    template: {
      es: ({ user, zoneName }: { user: string; zoneName: string }) =>
        `${user} ha solicitado acceso a la zona ${zoneName}`,
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
  [EntityTypeId.PublishZoneByAdmin]: {
    id: EntityTypeId.PublishZoneByAdmin,
    entity: Entity.Zone,
    template: {
      es: ({ zoneName, user }: { zoneName: string; user: string }) =>
        `La zona ${zoneName} ha sido publicada por ${user}`,
    },
  },
  [EntityTypeId.PausePublicationByAdmin]: {
    id: EntityTypeId.PausePublicationByAdmin,
    entity: Entity.Zone,
    template: {
      es: ({ zoneName, user }: { zoneName: string; user: string }) =>
        `La publicación de la zona ${zoneName} ha sido pausada por ${user}`,
    },
  },
  [EntityTypeId.UnpublishZoneByReviewer]: {
    id: EntityTypeId.UnpublishZoneByReviewer,
    entity: Entity.Zone,
    template: {
      es: ({ zoneName, user }: { zoneName: string; user: string }) =>
        `La publicación de la zona ${zoneName} ha sido pausada por ${user}, revisa las razones y vuelve a publicar la zona`,
    },
  },
  [EntityTypeId.ApproveZoneAccess]: {
    id: EntityTypeId.ApproveZoneAccess,
    entity: Entity.Zone,
    template: {
      es: ({ zoneName, user }: { zoneName: string; user: string }) =>
        `${user} te ha dado acceso a la zona ${zoneName}, ahora puedes ver la guía`,
    },
  },
  [EntityTypeId.AssignNewZoneRole]: {
    id: EntityTypeId.AssignNewZoneRole,
    entity: Entity.Zone,
    template: {
      es: ({
        zoneName,
        sender,
        role,
      }: {
        zoneName: string;
        sender: string;
        role: string;
      }) =>
        `${sender} te ha asignado el rol de ${role}  para la zona ${zoneName}`,
    },
  },
} satisfies NotificationEntityTypes;

export default pushNotification;
