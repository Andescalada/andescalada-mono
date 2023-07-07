import type { User } from "./../prisma/client";
import type { PhoneNumber } from "./../prisma/client";
import type { History } from "./../prisma/client";
import type { AcceptTermsAndConditions } from "./../prisma/client";
import type { RoleByZone } from "./../prisma/client";
import type { UserZoneAgreementRecord } from "./../prisma/client";
import type { Role } from "./../prisma/client";
import type { Permissions } from "./../prisma/client";
import type { ZoneAccessRequest } from "./../prisma/client";
import type { Zone } from "./../prisma/client";
import type { ZoneStatus } from "./../prisma/client";
import type { ZoneAgreement } from "./../prisma/client";
import type { Agreement } from "./../prisma/client";
import type { ZoneDirections } from "./../prisma/client";
import type { Sector } from "./../prisma/client";
import type { Wall } from "./../prisma/client";
import type { Topo } from "./../prisma/client";
import type { Route } from "./../prisma/client";
import type { RouteLength } from "./../prisma/client";
import type { MultiPitch } from "./../prisma/client";
import type { Pitch } from "./../prisma/client";
import type { RouteGrade } from "./../prisma/client";
import type { RoutePath } from "./../prisma/client";
import type { RouteEvaluation } from "./../prisma/client";
import type { RouteGradeEvaluation } from "./../prisma/client";
import type { Image } from "./../prisma/client";
import type { TextContent } from "./../prisma/client";
import type { Translation } from "./../prisma/client";
import type { Language } from "./../prisma/client";
import type { Location } from "./../prisma/client";
import type { NotificationReceiver } from "./../prisma/client";
import type { NotificationObject } from "./../prisma/client";
import type { NotificationSender } from "./../prisma/client";
import type { GradeSystems } from "./../prisma/client";
import type { SoftDelete } from "./../prisma/client";
import type { Actions } from "./../prisma/client";
import type { RoleNames } from "./../prisma/client";
import type { PermissionActions } from "./../prisma/client";
import type { RequestStatus } from "./../prisma/client";
import type { InfoAccess } from "./../prisma/client";
import type { Status } from "./../prisma/client";
import type { SearchVisibility } from "./../prisma/client";
import type { AgreementLevel } from "./../prisma/client";
import type { ClassicAgreement } from "./../prisma/client";
import type { TransportationMode } from "./../prisma/client";
import type { SectorKind } from "./../prisma/client";
import type { RouteKind } from "./../prisma/client";
import type { Unit } from "./../prisma/client";
import type { PitchType } from "./../prisma/client";
import type { StorageService } from "./../prisma/client";
import type { Entity } from "./../prisma/client";
import type { EntityTypeId } from "./../prisma/client";
import { Prisma } from "./../prisma/client";
import type { PrismaClient } from "./../prisma/client";
import { getClient, ModelWithFields, createScreener, getScalarFieldValueGenerator, Resolver, normalizeResolver, normalizeList, getSequenceCounter, } from "@quramy/prisma-fabbrica/lib/internal";
export { initialize, resetSequence, registerScalarFieldValueGenerator, resetScalarFieldValueGenerator } from "@quramy/prisma-fabbrica/lib/internal";

type BuildDataOptions = {
    readonly seq: number;
};

const modelFieldDefinitions: ModelWithFields[] = [{
        name: "User",
        fields: [{
                name: "PhoneNumber",
                type: "PhoneNumber",
                relationName: "PhoneNumberToUser"
            }, {
                name: "profilePhoto",
                type: "Image",
                relationName: "ImageToUser"
            }, {
                name: "authorZone",
                type: "Zone",
                relationName: "AuthorZone"
            }, {
                name: "coAuthorZone",
                type: "Zone",
                relationName: "CoAuthorZone"
            }, {
                name: "authorSector",
                type: "Sector",
                relationName: "AuthorSector"
            }, {
                name: "coAuthorSector",
                type: "Sector",
                relationName: "CoAuthorSector"
            }, {
                name: "authorWall",
                type: "Wall",
                relationName: "AuthorWall"
            }, {
                name: "coAuthorWall",
                type: "Wall",
                relationName: "CoAuthorWall"
            }, {
                name: "authorRoute",
                type: "Route",
                relationName: "AuthorRoute"
            }, {
                name: "coAuthorRoute",
                type: "Route",
                relationName: "CoAuthorRoute"
            }, {
                name: "authorTopo",
                type: "Topo",
                relationName: "AuthorTopo"
            }, {
                name: "coAuthorTopo",
                type: "Topo",
                relationName: "CoAuthorTopo"
            }, {
                name: "authorRoutePath",
                type: "RoutePath",
                relationName: "AuthorRoutePath"
            }, {
                name: "coAuthorRoutePath",
                type: "RoutePath",
                relationName: "CoAuthorRoutePath"
            }, {
                name: "authorMultiPitch",
                type: "MultiPitch",
                relationName: "AuthorMultiPitch"
            }, {
                name: "coAuthorMultiPitch",
                type: "MultiPitch",
                relationName: "CoAuthorMultiPitch"
            }, {
                name: "RoleByZone",
                type: "RoleByZone",
                relationName: "RoleByZoneToUser"
            }, {
                name: "AssignedRoles",
                type: "RoleByZone",
                relationName: "AssignedBy"
            }, {
                name: "FavoriteZones",
                type: "Zone",
                relationName: "FavoriteZones"
            }, {
                name: "DownloadedZones",
                type: "Zone",
                relationName: "DownloadedZones"
            }, {
                name: "History",
                type: "History",
                relationName: "HistoryToUser"
            }, {
                name: "AuthorAgreements",
                type: "Agreement",
                relationName: "AuthorAgreements"
            }, {
                name: "coAuthorAgreements",
                type: "Agreement",
                relationName: "CoAuthorAgreements"
            }, {
                name: "AuthorZoneListAgreements",
                type: "ZoneAgreement",
                relationName: "AuthorZoneAgreements"
            }, {
                name: "coAuthorZoneListAgreements",
                type: "ZoneAgreement",
                relationName: "CoAuthorZoneAgreements"
            }, {
                name: "ZoneStatusModifications",
                type: "ZoneStatus",
                relationName: "UserToZoneStatus"
            }, {
                name: "NotificationSent",
                type: "NotificationSender",
                relationName: "Sender"
            }, {
                name: "NotificationReceived",
                type: "NotificationReceiver",
                relationName: "Receiver"
            }, {
                name: "ZoneAccessRequestHistory",
                type: "ZoneAccessRequest",
                relationName: "UserToZoneAccessRequest"
            }, {
                name: "ZoneAccessRequestReviewed",
                type: "ZoneAccessRequest",
                relationName: "ZoneAccessRequestModifiedBy"
            }, {
                name: "UserZoneAgreementHistory",
                type: "UserZoneAgreementRecord",
                relationName: "UserToUserZoneAgreementRecord"
            }, {
                name: "authorZoneDirections",
                type: "ZoneDirections",
                relationName: "AuthorZoneDirections"
            }, {
                name: "coAuthorZoneDirections",
                type: "ZoneDirections",
                relationName: "CoAuthorZoneDirections"
            }, {
                name: "RouteEvaluation",
                type: "RouteEvaluation",
                relationName: "RouteEvaluationToUser"
            }, {
                name: "RouteGradeEvaluation",
                type: "RouteGradeEvaluation",
                relationName: "RouteGradeEvaluationToUser"
            }, {
                name: "AccepTermsAndConditions",
                type: "AcceptTermsAndConditions",
                relationName: "AcceptTermsAndConditionsToUser"
            }]
    }, {
        name: "PhoneNumber",
        fields: [{
                name: "User",
                type: "User",
                relationName: "PhoneNumberToUser"
            }]
    }, {
        name: "History",
        fields: [{
                name: "user",
                type: "User",
                relationName: "HistoryToUser"
            }, {
                name: "zone",
                type: "Zone",
                relationName: "HistoryToZone"
            }]
    }, {
        name: "AcceptTermsAndConditions",
        fields: [{
                name: "user",
                type: "User",
                relationName: "AcceptTermsAndConditionsToUser"
            }]
    }, {
        name: "RoleByZone",
        fields: [{
                name: "User",
                type: "User",
                relationName: "RoleByZoneToUser"
            }, {
                name: "Zone",
                type: "Zone",
                relationName: "RoleByZoneToZone"
            }, {
                name: "Role",
                type: "Role",
                relationName: "RoleToRoleByZone"
            }, {
                name: "AssignedBy",
                type: "User",
                relationName: "AssignedBy"
            }]
    }, {
        name: "UserZoneAgreementRecord",
        fields: [{
                name: "Zone",
                type: "Zone",
                relationName: "UserZoneAgreementRecordToZone"
            }, {
                name: "User",
                type: "User",
                relationName: "UserToUserZoneAgreementRecord"
            }]
    }, {
        name: "Role",
        fields: [{
                name: "permissions",
                type: "Permissions",
                relationName: "PermissionsToRole"
            }, {
                name: "RoleByZone",
                type: "RoleByZone",
                relationName: "RoleToRoleByZone"
            }]
    }, {
        name: "Permissions",
        fields: [{
                name: "roles",
                type: "Role",
                relationName: "PermissionsToRole"
            }]
    }, {
        name: "ZoneAccessRequest",
        fields: [{
                name: "Zone",
                type: "Zone",
                relationName: "ZoneToZoneAccessRequest"
            }, {
                name: "User",
                type: "User",
                relationName: "UserToZoneAccessRequest"
            }, {
                name: "modifiedBy",
                type: "User",
                relationName: "ZoneAccessRequestModifiedBy"
            }, {
                name: "message",
                type: "TextContent",
                relationName: "TextContentToZoneAccessRequest"
            }]
    }, {
        name: "Zone",
        fields: [{
                name: "description",
                type: "TextContent",
                relationName: "TextContentToZone"
            }, {
                name: "sectors",
                type: "Sector",
                relationName: "SectorToZone"
            }, {
                name: "photos",
                type: "Image",
                relationName: "ImageToZone"
            }, {
                name: "RoleByZone",
                type: "RoleByZone",
                relationName: "RoleByZoneToZone"
            }, {
                name: "FavoritedBy",
                type: "User",
                relationName: "FavoriteZones"
            }, {
                name: "DownloadedBy",
                type: "User",
                relationName: "DownloadedZones"
            }, {
                name: "History",
                type: "History",
                relationName: "HistoryToZone"
            }, {
                name: "agreements",
                type: "ZoneAgreement",
                relationName: "ZoneToZoneAgreement"
            }, {
                name: "Location",
                type: "Location",
                relationName: "LocationToZone"
            }, {
                name: "statusHistory",
                type: "ZoneStatus",
                relationName: "ZoneToZoneStatus"
            }, {
                name: "ZoneAccessRequest",
                type: "ZoneAccessRequest",
                relationName: "ZoneToZoneAccessRequest"
            }, {
                name: "UserZoneAgreementHistory",
                type: "UserZoneAgreementRecord",
                relationName: "UserZoneAgreementRecordToZone"
            }, {
                name: "ZoneDirections",
                type: "ZoneDirections",
                relationName: "ZoneToZoneDirections"
            }, {
                name: "Author",
                type: "User",
                relationName: "AuthorZone"
            }, {
                name: "coAuthors",
                type: "User",
                relationName: "CoAuthorZone"
            }]
    }, {
        name: "ZoneStatus",
        fields: [{
                name: "message",
                type: "TextContent",
                relationName: "TextContentToZoneStatus"
            }, {
                name: "Zone",
                type: "Zone",
                relationName: "ZoneToZoneStatus"
            }, {
                name: "modifiedBy",
                type: "User",
                relationName: "UserToZoneStatus"
            }]
    }, {
        name: "ZoneAgreement",
        fields: [{
                name: "comment",
                type: "TextContent",
                relationName: "TextContentToZoneAgreement"
            }, {
                name: "Zone",
                type: "Zone",
                relationName: "ZoneToZoneAgreement"
            }, {
                name: "Agreement",
                type: "Agreement",
                relationName: "AgreementToZoneAgreement"
            }, {
                name: "Author",
                type: "User",
                relationName: "AuthorZoneAgreements"
            }, {
                name: "coAuthors",
                type: "User",
                relationName: "CoAuthorZoneAgreements"
            }]
    }, {
        name: "Agreement",
        fields: [{
                name: "title",
                type: "TextContent",
                relationName: "AgreementName"
            }, {
                name: "description",
                type: "TextContent",
                relationName: "AgreementDescription"
            }, {
                name: "Author",
                type: "User",
                relationName: "AuthorAgreements"
            }, {
                name: "coAuthors",
                type: "User",
                relationName: "CoAuthorAgreements"
            }, {
                name: "ZoneAgreement",
                type: "ZoneAgreement",
                relationName: "AgreementToZoneAgreement"
            }]
    }, {
        name: "ZoneDirections",
        fields: [{
                name: "name",
                type: "TextContent",
                relationName: "ZoneDirectionsName"
            }, {
                name: "Zone",
                type: "Zone",
                relationName: "ZoneToZoneDirections"
            }, {
                name: "description",
                type: "TextContent",
                relationName: "TextContentToZoneDirections"
            }, {
                name: "Author",
                type: "User",
                relationName: "AuthorZoneDirections"
            }, {
                name: "coAuthors",
                type: "User",
                relationName: "CoAuthorZoneDirections"
            }]
    }, {
        name: "Sector",
        fields: [{
                name: "Zone",
                type: "Zone",
                relationName: "SectorToZone"
            }, {
                name: "walls",
                type: "Wall",
                relationName: "SectorToWall"
            }, {
                name: "Author",
                type: "User",
                relationName: "AuthorSector"
            }, {
                name: "coAuthors",
                type: "User",
                relationName: "CoAuthorSector"
            }, {
                name: "Location",
                type: "Location",
                relationName: "LocationToSector"
            }]
    }, {
        name: "Wall",
        fields: [{
                name: "Sector",
                type: "Sector",
                relationName: "SectorToWall"
            }, {
                name: "topos",
                type: "Topo",
                relationName: "TopoToWall"
            }, {
                name: "routes",
                type: "Route",
                relationName: "RouteToWall"
            }, {
                name: "Author",
                type: "User",
                relationName: "AuthorWall"
            }, {
                name: "coAuthors",
                type: "User",
                relationName: "CoAuthorWall"
            }, {
                name: "MultiPitch",
                type: "MultiPitch",
                relationName: "MultiPitchToWall"
            }]
    }, {
        name: "Topo",
        fields: [{
                name: "Wall",
                type: "Wall",
                relationName: "TopoToWall"
            }, {
                name: "RoutePath",
                type: "RoutePath",
                relationName: "RoutePathToTopo"
            }, {
                name: "image",
                type: "Image",
                relationName: "ImageToTopo"
            }, {
                name: "Author",
                type: "User",
                relationName: "AuthorTopo"
            }, {
                name: "coAuthors",
                type: "User",
                relationName: "CoAuthorTopo"
            }]
    }, {
        name: "Route",
        fields: [{
                name: "Wall",
                type: "Wall",
                relationName: "RouteToWall"
            }, {
                name: "description",
                type: "TextContent",
                relationName: "RouteToTextContent"
            }, {
                name: "RouteLength",
                type: "RouteLength",
                relationName: "RouteToRouteLength"
            }, {
                name: "RoutePath",
                type: "RoutePath",
                relationName: "RouteToRoutePath"
            }, {
                name: "RouteGrade",
                type: "RouteGrade",
                relationName: "RouteToRouteGrade"
            }, {
                name: "Author",
                type: "User",
                relationName: "AuthorRoute"
            }, {
                name: "coAuthors",
                type: "User",
                relationName: "CoAuthorRoute"
            }, {
                name: "ExtendedRoute",
                type: "Route",
                relationName: "ExtensionOf"
            }, {
                name: "Extension",
                type: "Route",
                relationName: "ExtensionOf"
            }, {
                name: "VariantRoute",
                type: "Route",
                relationName: "VariantOf"
            }, {
                name: "Variant",
                type: "Route",
                relationName: "VariantOf"
            }, {
                name: "Pitch",
                type: "Pitch",
                relationName: "PitchToRoute"
            }, {
                name: "RouteEvaluation",
                type: "RouteEvaluation",
                relationName: "RouteToRouteEvaluation"
            }, {
                name: "RouteGradeEvaluation",
                type: "RouteGradeEvaluation",
                relationName: "RouteToRouteGradeEvaluation"
            }]
    }, {
        name: "RouteLength",
        fields: [{
                name: "Route",
                type: "Route",
                relationName: "RouteToRouteLength"
            }]
    }, {
        name: "MultiPitch",
        fields: [{
                name: "Pitches",
                type: "Pitch",
                relationName: "MultiPitchToPitch"
            }, {
                name: "Wall",
                type: "Wall",
                relationName: "MultiPitchToWall"
            }, {
                name: "Author",
                type: "User",
                relationName: "AuthorMultiPitch"
            }, {
                name: "coAuthors",
                type: "User",
                relationName: "CoAuthorMultiPitch"
            }]
    }, {
        name: "Pitch",
        fields: [{
                name: "Route",
                type: "Route",
                relationName: "PitchToRoute"
            }, {
                name: "MultiPitch",
                type: "MultiPitch",
                relationName: "MultiPitchToPitch"
            }, {
                name: "VariantPitch",
                type: "Pitch",
                relationName: "VariantPitchOf"
            }, {
                name: "Variant",
                type: "Pitch",
                relationName: "VariantPitchOf"
            }]
    }, {
        name: "RouteGrade",
        fields: [{
                name: "route",
                type: "Route",
                relationName: "RouteToRouteGrade"
            }]
    }, {
        name: "RoutePath",
        fields: [{
                name: "Topo",
                type: "Topo",
                relationName: "RoutePathToTopo"
            }, {
                name: "Route",
                type: "Route",
                relationName: "RouteToRoutePath"
            }, {
                name: "Author",
                type: "User",
                relationName: "AuthorRoutePath"
            }, {
                name: "coAuthors",
                type: "User",
                relationName: "CoAuthorRoutePath"
            }]
    }, {
        name: "RouteEvaluation",
        fields: [{
                name: "Route",
                type: "Route",
                relationName: "RouteToRouteEvaluation"
            }, {
                name: "User",
                type: "User",
                relationName: "RouteEvaluationToUser"
            }]
    }, {
        name: "RouteGradeEvaluation",
        fields: [{
                name: "Route",
                type: "Route",
                relationName: "RouteToRouteGradeEvaluation"
            }, {
                name: "User",
                type: "User",
                relationName: "RouteGradeEvaluationToUser"
            }]
    }, {
        name: "Image",
        fields: [{
                name: "Topo",
                type: "Topo",
                relationName: "ImageToTopo"
            }, {
                name: "User",
                type: "User",
                relationName: "ImageToUser"
            }, {
                name: "Zone",
                type: "Zone",
                relationName: "ImageToZone"
            }]
    }, {
        name: "TextContent",
        fields: [{
                name: "originalLang",
                type: "Language",
                relationName: "LanguageToTextContent"
            }, {
                name: "Translation",
                type: "Translation",
                relationName: "TextContentToTranslation"
            }, {
                name: "AgreementName",
                type: "Agreement",
                relationName: "AgreementName"
            }, {
                name: "AgreementDescription",
                type: "Agreement",
                relationName: "AgreementDescription"
            }, {
                name: "ZoneAgreementComment",
                type: "ZoneAgreement",
                relationName: "TextContentToZoneAgreement"
            }, {
                name: "ZoneStatus",
                type: "ZoneStatus",
                relationName: "TextContentToZoneStatus"
            }, {
                name: "ZoneAccessRequest",
                type: "ZoneAccessRequest",
                relationName: "TextContentToZoneAccessRequest"
            }, {
                name: "ZoneDirections",
                type: "ZoneDirections",
                relationName: "TextContentToZoneDirections"
            }, {
                name: "ZoneDirectionsName",
                type: "ZoneDirections",
                relationName: "ZoneDirectionsName"
            }, {
                name: "Zone",
                type: "Zone",
                relationName: "TextContentToZone"
            }, {
                name: "Route",
                type: "Route",
                relationName: "RouteToTextContent"
            }]
    }, {
        name: "Translation",
        fields: [{
                name: "textContent",
                type: "TextContent",
                relationName: "TextContentToTranslation"
            }, {
                name: "language",
                type: "Language",
                relationName: "LanguageToTranslation"
            }]
    }, {
        name: "Language",
        fields: [{
                name: "TextContent",
                type: "TextContent",
                relationName: "LanguageToTextContent"
            }, {
                name: "Translation",
                type: "Translation",
                relationName: "LanguageToTranslation"
            }]
    }, {
        name: "Location",
        fields: [{
                name: "Zone",
                type: "Zone",
                relationName: "LocationToZone"
            }, {
                name: "Sector",
                type: "Sector",
                relationName: "LocationToSector"
            }]
    }, {
        name: "NotificationReceiver",
        fields: [{
                name: "Object",
                type: "NotificationObject",
                relationName: "NotificationObjectToNotificationReceiver"
            }, {
                name: "Receiver",
                type: "User",
                relationName: "Receiver"
            }]
    }, {
        name: "NotificationObject",
        fields: [{
                name: "NotificationReceiver",
                type: "NotificationReceiver",
                relationName: "NotificationObjectToNotificationReceiver"
            }, {
                name: "NotificationSender",
                type: "NotificationSender",
                relationName: "NotificationObjectToNotificationSender"
            }]
    }, {
        name: "NotificationSender",
        fields: [{
                name: "Object",
                type: "NotificationObject",
                relationName: "NotificationObjectToNotificationSender"
            }, {
                name: "Sender",
                type: "User",
                relationName: "Sender"
            }]
    }];

type UserScalarOrEnumFields = {};

type UserPhoneNumberFactory = {
    _factoryFor: "PhoneNumber";
    build: () => PromiseLike<Prisma.PhoneNumberCreateNestedOneWithoutUserInput["create"]>;
};

type UserprofilePhotoFactory = {
    _factoryFor: "Image";
    build: () => PromiseLike<Prisma.ImageCreateNestedOneWithoutUserInput["create"]>;
};

type UserFactoryDefineInput = {
    id?: string;
    createdAt?: Date;
    updatedAt?: Date;
    name?: string;
    username?: string;
    email?: string | null;
    phoneVerified?: boolean;
    emailVerified?: boolean;
    firstLogin?: boolean;
    auth0id?: string | null;
    preferredSportGrade?: GradeSystems;
    preferredTradGrade?: GradeSystems;
    preferredBoulderGrade?: GradeSystems;
    isDeleted?: SoftDelete;
    PhoneNumber?: UserPhoneNumberFactory | Prisma.PhoneNumberCreateNestedOneWithoutUserInput;
    profilePhoto?: UserprofilePhotoFactory | Prisma.ImageCreateNestedOneWithoutUserInput;
    authorZone?: Prisma.ZoneCreateNestedManyWithoutAuthorInput;
    coAuthorZone?: Prisma.ZoneCreateNestedManyWithoutCoAuthorsInput;
    authorSector?: Prisma.SectorCreateNestedManyWithoutAuthorInput;
    coAuthorSector?: Prisma.SectorCreateNestedManyWithoutCoAuthorsInput;
    authorWall?: Prisma.WallCreateNestedManyWithoutAuthorInput;
    coAuthorWall?: Prisma.WallCreateNestedManyWithoutCoAuthorsInput;
    authorRoute?: Prisma.RouteCreateNestedManyWithoutAuthorInput;
    coAuthorRoute?: Prisma.RouteCreateNestedManyWithoutCoAuthorsInput;
    authorTopo?: Prisma.TopoCreateNestedManyWithoutAuthorInput;
    coAuthorTopo?: Prisma.TopoCreateNestedManyWithoutCoAuthorsInput;
    authorRoutePath?: Prisma.RoutePathCreateNestedManyWithoutAuthorInput;
    coAuthorRoutePath?: Prisma.RoutePathCreateNestedManyWithoutCoAuthorsInput;
    authorMultiPitch?: Prisma.MultiPitchCreateNestedManyWithoutAuthorInput;
    coAuthorMultiPitch?: Prisma.MultiPitchCreateNestedManyWithoutCoAuthorsInput;
    RoleByZone?: Prisma.RoleByZoneCreateNestedManyWithoutUserInput;
    AssignedRoles?: Prisma.RoleByZoneCreateNestedManyWithoutAssignedByInput;
    FavoriteZones?: Prisma.ZoneCreateNestedManyWithoutFavoritedByInput;
    DownloadedZones?: Prisma.ZoneCreateNestedManyWithoutDownloadedByInput;
    History?: Prisma.HistoryCreateNestedManyWithoutUserInput;
    AuthorAgreements?: Prisma.AgreementCreateNestedManyWithoutAuthorInput;
    coAuthorAgreements?: Prisma.AgreementCreateNestedManyWithoutCoAuthorsInput;
    AuthorZoneListAgreements?: Prisma.ZoneAgreementCreateNestedManyWithoutAuthorInput;
    coAuthorZoneListAgreements?: Prisma.ZoneAgreementCreateNestedManyWithoutCoAuthorsInput;
    ZoneStatusModifications?: Prisma.ZoneStatusCreateNestedManyWithoutModifiedByInput;
    NotificationSent?: Prisma.NotificationSenderCreateNestedManyWithoutSenderInput;
    NotificationReceived?: Prisma.NotificationReceiverCreateNestedManyWithoutReceiverInput;
    ZoneAccessRequestHistory?: Prisma.ZoneAccessRequestCreateNestedManyWithoutUserInput;
    ZoneAccessRequestReviewed?: Prisma.ZoneAccessRequestCreateNestedManyWithoutModifiedByInput;
    UserZoneAgreementHistory?: Prisma.UserZoneAgreementRecordCreateNestedManyWithoutUserInput;
    authorZoneDirections?: Prisma.ZoneDirectionsCreateNestedManyWithoutAuthorInput;
    coAuthorZoneDirections?: Prisma.ZoneDirectionsCreateNestedManyWithoutCoAuthorsInput;
    RouteEvaluation?: Prisma.RouteEvaluationCreateNestedManyWithoutUserInput;
    RouteGradeEvaluation?: Prisma.RouteGradeEvaluationCreateNestedManyWithoutUserInput;
    AccepTermsAndConditions?: Prisma.AcceptTermsAndConditionsCreateNestedManyWithoutUserInput;
};

type UserFactoryDefineOptions = {
    defaultData?: Resolver<UserFactoryDefineInput, BuildDataOptions>;
    traits?: {
        [traitName: string | symbol]: {
            data: Resolver<Partial<UserFactoryDefineInput>, BuildDataOptions>;
        };
    };
};

function isUserPhoneNumberFactory(x: UserPhoneNumberFactory | Prisma.PhoneNumberCreateNestedOneWithoutUserInput | undefined): x is UserPhoneNumberFactory {
    return (x as any)?._factoryFor === "PhoneNumber";
}

function isUserprofilePhotoFactory(x: UserprofilePhotoFactory | Prisma.ImageCreateNestedOneWithoutUserInput | undefined): x is UserprofilePhotoFactory {
    return (x as any)?._factoryFor === "Image";
}

type UserTraitKeys<TOptions extends UserFactoryDefineOptions> = keyof TOptions["traits"];

export interface UserFactoryInterfaceWithoutTraits {
    readonly _factoryFor: "User";
    build(inputData?: Partial<Prisma.UserCreateInput>): PromiseLike<Prisma.UserCreateInput>;
    buildCreateInput(inputData?: Partial<Prisma.UserCreateInput>): PromiseLike<Prisma.UserCreateInput>;
    buildList(inputData: number | readonly Partial<Prisma.UserCreateInput>[]): PromiseLike<Prisma.UserCreateInput[]>;
    pickForConnect(inputData: User): Pick<User, "id">;
    create(inputData?: Partial<Prisma.UserCreateInput>): PromiseLike<User>;
    createList(inputData: number | readonly Partial<Prisma.UserCreateInput>[]): PromiseLike<User[]>;
    createForConnect(inputData?: Partial<Prisma.UserCreateInput>): PromiseLike<Pick<User, "id">>;
}

export interface UserFactoryInterface<TOptions extends UserFactoryDefineOptions = UserFactoryDefineOptions> extends UserFactoryInterfaceWithoutTraits {
    use(name: UserTraitKeys<TOptions>, ...names: readonly UserTraitKeys<TOptions>[]): UserFactoryInterfaceWithoutTraits;
}

function autoGenerateUserScalarsOrEnums({ seq }: {
    readonly seq: number;
}): UserScalarOrEnumFields {
    return {};
}

function defineUserFactoryInternal<TOptions extends UserFactoryDefineOptions>({ defaultData: defaultDataResolver, traits: traitsDefs = {} }: TOptions): UserFactoryInterface<TOptions> {
    const getFactoryWithTraits = (traitKeys: readonly UserTraitKeys<TOptions>[] = []) => {
        const seqKey = {};
        const getSeq = () => getSequenceCounter(seqKey);
        const screen = createScreener("User", modelFieldDefinitions);
        const build = async (inputData: Partial<Prisma.UserCreateInput> = {}) => {
            const seq = getSeq();
            const requiredScalarData = autoGenerateUserScalarsOrEnums({ seq });
            const resolveValue = normalizeResolver<UserFactoryDefineInput, BuildDataOptions>(defaultDataResolver ?? {});
            const defaultData = await traitKeys.reduce(async (queue, traitKey) => {
                const acc = await queue;
                const resolveTraitValue = normalizeResolver<Partial<UserFactoryDefineInput>, BuildDataOptions>(traitsDefs[traitKey]?.data ?? {});
                const traitData = await resolveTraitValue({ seq });
                return {
                    ...acc,
                    ...traitData,
                };
            }, resolveValue({ seq }));
            const defaultAssociations = {
                PhoneNumber: isUserPhoneNumberFactory(defaultData.PhoneNumber) ? {
                    create: await defaultData.PhoneNumber.build()
                } : defaultData.PhoneNumber,
                profilePhoto: isUserprofilePhotoFactory(defaultData.profilePhoto) ? {
                    create: await defaultData.profilePhoto.build()
                } : defaultData.profilePhoto
            };
            const data: Prisma.UserCreateInput = { ...requiredScalarData, ...defaultData, ...defaultAssociations, ...inputData };
            return data;
        };
        const buildList = (inputData: number | readonly Partial<Prisma.UserCreateInput>[]) => Promise.all(normalizeList(inputData).map(data => build(data)));
        const pickForConnect = (inputData: User) => ({
            id: inputData.id
        });
        const create = async (inputData: Partial<Prisma.UserCreateInput> = {}) => {
            const data = await build(inputData).then(screen);
            return await getClient<PrismaClient>().user.create({ data });
        };
        const createList = (inputData: number | readonly Partial<Prisma.UserCreateInput>[]) => Promise.all(normalizeList(inputData).map(data => create(data)));
        const createForConnect = (inputData: Partial<Prisma.UserCreateInput> = {}) => create(inputData).then(pickForConnect);
        return {
            _factoryFor: "User" as const,
            build,
            buildList,
            buildCreateInput: build,
            pickForConnect,
            create,
            createList,
            createForConnect,
        };
    };
    const factory = getFactoryWithTraits();
    const useTraits = (name: UserTraitKeys<TOptions>, ...names: readonly UserTraitKeys<TOptions>[]) => {
        return getFactoryWithTraits([name, ...names]);
    };
    return {
        ...factory,
        use: useTraits,
    };
}

/**
 * Define factory for {@link User} model.
 *
 * @param options
 * @returns factory {@link UserFactoryInterface}
 */
export function defineUserFactory<TOptions extends UserFactoryDefineOptions>(options?: TOptions): UserFactoryInterface<TOptions> {
    return defineUserFactoryInternal(options ?? {});
}

type PhoneNumberScalarOrEnumFields = {
    fullNumber: string;
};

type PhoneNumberUserFactory = {
    _factoryFor: "User";
    build: () => PromiseLike<Prisma.UserCreateNestedOneWithoutPhoneNumberInput["create"]>;
};

type PhoneNumberFactoryDefineInput = {
    id?: string;
    createdAt?: Date;
    updatedAt?: Date;
    fullNumber?: string;
    country?: string | null;
    countryCode?: string | null;
    number?: string | null;
    isDeleted?: SoftDelete;
    User: PhoneNumberUserFactory | Prisma.UserCreateNestedOneWithoutPhoneNumberInput;
};

type PhoneNumberFactoryDefineOptions = {
    defaultData: Resolver<PhoneNumberFactoryDefineInput, BuildDataOptions>;
    traits?: {
        [traitName: string | symbol]: {
            data: Resolver<Partial<PhoneNumberFactoryDefineInput>, BuildDataOptions>;
        };
    };
};

function isPhoneNumberUserFactory(x: PhoneNumberUserFactory | Prisma.UserCreateNestedOneWithoutPhoneNumberInput | undefined): x is PhoneNumberUserFactory {
    return (x as any)?._factoryFor === "User";
}

type PhoneNumberTraitKeys<TOptions extends PhoneNumberFactoryDefineOptions> = keyof TOptions["traits"];

export interface PhoneNumberFactoryInterfaceWithoutTraits {
    readonly _factoryFor: "PhoneNumber";
    build(inputData?: Partial<Prisma.PhoneNumberCreateInput>): PromiseLike<Prisma.PhoneNumberCreateInput>;
    buildCreateInput(inputData?: Partial<Prisma.PhoneNumberCreateInput>): PromiseLike<Prisma.PhoneNumberCreateInput>;
    buildList(inputData: number | readonly Partial<Prisma.PhoneNumberCreateInput>[]): PromiseLike<Prisma.PhoneNumberCreateInput[]>;
    pickForConnect(inputData: PhoneNumber): Pick<PhoneNumber, "id">;
    create(inputData?: Partial<Prisma.PhoneNumberCreateInput>): PromiseLike<PhoneNumber>;
    createList(inputData: number | readonly Partial<Prisma.PhoneNumberCreateInput>[]): PromiseLike<PhoneNumber[]>;
    createForConnect(inputData?: Partial<Prisma.PhoneNumberCreateInput>): PromiseLike<Pick<PhoneNumber, "id">>;
}

export interface PhoneNumberFactoryInterface<TOptions extends PhoneNumberFactoryDefineOptions = PhoneNumberFactoryDefineOptions> extends PhoneNumberFactoryInterfaceWithoutTraits {
    use(name: PhoneNumberTraitKeys<TOptions>, ...names: readonly PhoneNumberTraitKeys<TOptions>[]): PhoneNumberFactoryInterfaceWithoutTraits;
}

function autoGeneratePhoneNumberScalarsOrEnums({ seq }: {
    readonly seq: number;
}): PhoneNumberScalarOrEnumFields {
    return {
        fullNumber: getScalarFieldValueGenerator().String({ modelName: "PhoneNumber", fieldName: "fullNumber", isId: false, isUnique: true, seq })
    };
}

function definePhoneNumberFactoryInternal<TOptions extends PhoneNumberFactoryDefineOptions>({ defaultData: defaultDataResolver, traits: traitsDefs = {} }: TOptions): PhoneNumberFactoryInterface<TOptions> {
    const getFactoryWithTraits = (traitKeys: readonly PhoneNumberTraitKeys<TOptions>[] = []) => {
        const seqKey = {};
        const getSeq = () => getSequenceCounter(seqKey);
        const screen = createScreener("PhoneNumber", modelFieldDefinitions);
        const build = async (inputData: Partial<Prisma.PhoneNumberCreateInput> = {}) => {
            const seq = getSeq();
            const requiredScalarData = autoGeneratePhoneNumberScalarsOrEnums({ seq });
            const resolveValue = normalizeResolver<PhoneNumberFactoryDefineInput, BuildDataOptions>(defaultDataResolver ?? {});
            const defaultData = await traitKeys.reduce(async (queue, traitKey) => {
                const acc = await queue;
                const resolveTraitValue = normalizeResolver<Partial<PhoneNumberFactoryDefineInput>, BuildDataOptions>(traitsDefs[traitKey]?.data ?? {});
                const traitData = await resolveTraitValue({ seq });
                return {
                    ...acc,
                    ...traitData,
                };
            }, resolveValue({ seq }));
            const defaultAssociations = {
                User: isPhoneNumberUserFactory(defaultData.User) ? {
                    create: await defaultData.User.build()
                } : defaultData.User
            };
            const data: Prisma.PhoneNumberCreateInput = { ...requiredScalarData, ...defaultData, ...defaultAssociations, ...inputData };
            return data;
        };
        const buildList = (inputData: number | readonly Partial<Prisma.PhoneNumberCreateInput>[]) => Promise.all(normalizeList(inputData).map(data => build(data)));
        const pickForConnect = (inputData: PhoneNumber) => ({
            id: inputData.id
        });
        const create = async (inputData: Partial<Prisma.PhoneNumberCreateInput> = {}) => {
            const data = await build(inputData).then(screen);
            return await getClient<PrismaClient>().phoneNumber.create({ data });
        };
        const createList = (inputData: number | readonly Partial<Prisma.PhoneNumberCreateInput>[]) => Promise.all(normalizeList(inputData).map(data => create(data)));
        const createForConnect = (inputData: Partial<Prisma.PhoneNumberCreateInput> = {}) => create(inputData).then(pickForConnect);
        return {
            _factoryFor: "PhoneNumber" as const,
            build,
            buildList,
            buildCreateInput: build,
            pickForConnect,
            create,
            createList,
            createForConnect,
        };
    };
    const factory = getFactoryWithTraits();
    const useTraits = (name: PhoneNumberTraitKeys<TOptions>, ...names: readonly PhoneNumberTraitKeys<TOptions>[]) => {
        return getFactoryWithTraits([name, ...names]);
    };
    return {
        ...factory,
        use: useTraits,
    };
}

/**
 * Define factory for {@link PhoneNumber} model.
 *
 * @param options
 * @returns factory {@link PhoneNumberFactoryInterface}
 */
export function definePhoneNumberFactory<TOptions extends PhoneNumberFactoryDefineOptions>(options: TOptions): PhoneNumberFactoryInterface<TOptions> {
    return definePhoneNumberFactoryInternal(options);
}

type HistoryScalarOrEnumFields = {
    action: Actions;
};

type HistoryuserFactory = {
    _factoryFor: "User";
    build: () => PromiseLike<Prisma.UserCreateNestedOneWithoutHistoryInput["create"]>;
};

type HistoryzoneFactory = {
    _factoryFor: "Zone";
    build: () => PromiseLike<Prisma.ZoneCreateNestedOneWithoutHistoryInput["create"]>;
};

type HistoryFactoryDefineInput = {
    id?: string;
    createdAt?: Date;
    updatedAt?: Date;
    action?: Actions;
    counter?: number;
    isDeleted?: SoftDelete;
    user: HistoryuserFactory | Prisma.UserCreateNestedOneWithoutHistoryInput;
    zone?: HistoryzoneFactory | Prisma.ZoneCreateNestedOneWithoutHistoryInput;
};

type HistoryFactoryDefineOptions = {
    defaultData: Resolver<HistoryFactoryDefineInput, BuildDataOptions>;
    traits?: {
        [traitName: string | symbol]: {
            data: Resolver<Partial<HistoryFactoryDefineInput>, BuildDataOptions>;
        };
    };
};

function isHistoryuserFactory(x: HistoryuserFactory | Prisma.UserCreateNestedOneWithoutHistoryInput | undefined): x is HistoryuserFactory {
    return (x as any)?._factoryFor === "User";
}

function isHistoryzoneFactory(x: HistoryzoneFactory | Prisma.ZoneCreateNestedOneWithoutHistoryInput | undefined): x is HistoryzoneFactory {
    return (x as any)?._factoryFor === "Zone";
}

type HistoryTraitKeys<TOptions extends HistoryFactoryDefineOptions> = keyof TOptions["traits"];

export interface HistoryFactoryInterfaceWithoutTraits {
    readonly _factoryFor: "History";
    build(inputData?: Partial<Prisma.HistoryCreateInput>): PromiseLike<Prisma.HistoryCreateInput>;
    buildCreateInput(inputData?: Partial<Prisma.HistoryCreateInput>): PromiseLike<Prisma.HistoryCreateInput>;
    buildList(inputData: number | readonly Partial<Prisma.HistoryCreateInput>[]): PromiseLike<Prisma.HistoryCreateInput[]>;
    pickForConnect(inputData: History): Pick<History, "id">;
    create(inputData?: Partial<Prisma.HistoryCreateInput>): PromiseLike<History>;
    createList(inputData: number | readonly Partial<Prisma.HistoryCreateInput>[]): PromiseLike<History[]>;
    createForConnect(inputData?: Partial<Prisma.HistoryCreateInput>): PromiseLike<Pick<History, "id">>;
}

export interface HistoryFactoryInterface<TOptions extends HistoryFactoryDefineOptions = HistoryFactoryDefineOptions> extends HistoryFactoryInterfaceWithoutTraits {
    use(name: HistoryTraitKeys<TOptions>, ...names: readonly HistoryTraitKeys<TOptions>[]): HistoryFactoryInterfaceWithoutTraits;
}

function autoGenerateHistoryScalarsOrEnums({ seq }: {
    readonly seq: number;
}): HistoryScalarOrEnumFields {
    return {
        action: "Downloaded"
    };
}

function defineHistoryFactoryInternal<TOptions extends HistoryFactoryDefineOptions>({ defaultData: defaultDataResolver, traits: traitsDefs = {} }: TOptions): HistoryFactoryInterface<TOptions> {
    const getFactoryWithTraits = (traitKeys: readonly HistoryTraitKeys<TOptions>[] = []) => {
        const seqKey = {};
        const getSeq = () => getSequenceCounter(seqKey);
        const screen = createScreener("History", modelFieldDefinitions);
        const build = async (inputData: Partial<Prisma.HistoryCreateInput> = {}) => {
            const seq = getSeq();
            const requiredScalarData = autoGenerateHistoryScalarsOrEnums({ seq });
            const resolveValue = normalizeResolver<HistoryFactoryDefineInput, BuildDataOptions>(defaultDataResolver ?? {});
            const defaultData = await traitKeys.reduce(async (queue, traitKey) => {
                const acc = await queue;
                const resolveTraitValue = normalizeResolver<Partial<HistoryFactoryDefineInput>, BuildDataOptions>(traitsDefs[traitKey]?.data ?? {});
                const traitData = await resolveTraitValue({ seq });
                return {
                    ...acc,
                    ...traitData,
                };
            }, resolveValue({ seq }));
            const defaultAssociations = {
                user: isHistoryuserFactory(defaultData.user) ? {
                    create: await defaultData.user.build()
                } : defaultData.user,
                zone: isHistoryzoneFactory(defaultData.zone) ? {
                    create: await defaultData.zone.build()
                } : defaultData.zone
            };
            const data: Prisma.HistoryCreateInput = { ...requiredScalarData, ...defaultData, ...defaultAssociations, ...inputData };
            return data;
        };
        const buildList = (inputData: number | readonly Partial<Prisma.HistoryCreateInput>[]) => Promise.all(normalizeList(inputData).map(data => build(data)));
        const pickForConnect = (inputData: History) => ({
            id: inputData.id
        });
        const create = async (inputData: Partial<Prisma.HistoryCreateInput> = {}) => {
            const data = await build(inputData).then(screen);
            return await getClient<PrismaClient>().history.create({ data });
        };
        const createList = (inputData: number | readonly Partial<Prisma.HistoryCreateInput>[]) => Promise.all(normalizeList(inputData).map(data => create(data)));
        const createForConnect = (inputData: Partial<Prisma.HistoryCreateInput> = {}) => create(inputData).then(pickForConnect);
        return {
            _factoryFor: "History" as const,
            build,
            buildList,
            buildCreateInput: build,
            pickForConnect,
            create,
            createList,
            createForConnect,
        };
    };
    const factory = getFactoryWithTraits();
    const useTraits = (name: HistoryTraitKeys<TOptions>, ...names: readonly HistoryTraitKeys<TOptions>[]) => {
        return getFactoryWithTraits([name, ...names]);
    };
    return {
        ...factory,
        use: useTraits,
    };
}

/**
 * Define factory for {@link History} model.
 *
 * @param options
 * @returns factory {@link HistoryFactoryInterface}
 */
export function defineHistoryFactory<TOptions extends HistoryFactoryDefineOptions>(options: TOptions): HistoryFactoryInterface<TOptions> {
    return defineHistoryFactoryInternal(options);
}

type AcceptTermsAndConditionsScalarOrEnumFields = {};

type AcceptTermsAndConditionsuserFactory = {
    _factoryFor: "User";
    build: () => PromiseLike<Prisma.UserCreateNestedOneWithoutAccepTermsAndConditionsInput["create"]>;
};

type AcceptTermsAndConditionsFactoryDefineInput = {
    id?: string;
    createdAt?: Date;
    user: AcceptTermsAndConditionsuserFactory | Prisma.UserCreateNestedOneWithoutAccepTermsAndConditionsInput;
};

type AcceptTermsAndConditionsFactoryDefineOptions = {
    defaultData: Resolver<AcceptTermsAndConditionsFactoryDefineInput, BuildDataOptions>;
    traits?: {
        [traitName: string | symbol]: {
            data: Resolver<Partial<AcceptTermsAndConditionsFactoryDefineInput>, BuildDataOptions>;
        };
    };
};

function isAcceptTermsAndConditionsuserFactory(x: AcceptTermsAndConditionsuserFactory | Prisma.UserCreateNestedOneWithoutAccepTermsAndConditionsInput | undefined): x is AcceptTermsAndConditionsuserFactory {
    return (x as any)?._factoryFor === "User";
}

type AcceptTermsAndConditionsTraitKeys<TOptions extends AcceptTermsAndConditionsFactoryDefineOptions> = keyof TOptions["traits"];

export interface AcceptTermsAndConditionsFactoryInterfaceWithoutTraits {
    readonly _factoryFor: "AcceptTermsAndConditions";
    build(inputData?: Partial<Prisma.AcceptTermsAndConditionsCreateInput>): PromiseLike<Prisma.AcceptTermsAndConditionsCreateInput>;
    buildCreateInput(inputData?: Partial<Prisma.AcceptTermsAndConditionsCreateInput>): PromiseLike<Prisma.AcceptTermsAndConditionsCreateInput>;
    buildList(inputData: number | readonly Partial<Prisma.AcceptTermsAndConditionsCreateInput>[]): PromiseLike<Prisma.AcceptTermsAndConditionsCreateInput[]>;
    pickForConnect(inputData: AcceptTermsAndConditions): Pick<AcceptTermsAndConditions, "id">;
    create(inputData?: Partial<Prisma.AcceptTermsAndConditionsCreateInput>): PromiseLike<AcceptTermsAndConditions>;
    createList(inputData: number | readonly Partial<Prisma.AcceptTermsAndConditionsCreateInput>[]): PromiseLike<AcceptTermsAndConditions[]>;
    createForConnect(inputData?: Partial<Prisma.AcceptTermsAndConditionsCreateInput>): PromiseLike<Pick<AcceptTermsAndConditions, "id">>;
}

export interface AcceptTermsAndConditionsFactoryInterface<TOptions extends AcceptTermsAndConditionsFactoryDefineOptions = AcceptTermsAndConditionsFactoryDefineOptions> extends AcceptTermsAndConditionsFactoryInterfaceWithoutTraits {
    use(name: AcceptTermsAndConditionsTraitKeys<TOptions>, ...names: readonly AcceptTermsAndConditionsTraitKeys<TOptions>[]): AcceptTermsAndConditionsFactoryInterfaceWithoutTraits;
}

function autoGenerateAcceptTermsAndConditionsScalarsOrEnums({ seq }: {
    readonly seq: number;
}): AcceptTermsAndConditionsScalarOrEnumFields {
    return {};
}

function defineAcceptTermsAndConditionsFactoryInternal<TOptions extends AcceptTermsAndConditionsFactoryDefineOptions>({ defaultData: defaultDataResolver, traits: traitsDefs = {} }: TOptions): AcceptTermsAndConditionsFactoryInterface<TOptions> {
    const getFactoryWithTraits = (traitKeys: readonly AcceptTermsAndConditionsTraitKeys<TOptions>[] = []) => {
        const seqKey = {};
        const getSeq = () => getSequenceCounter(seqKey);
        const screen = createScreener("AcceptTermsAndConditions", modelFieldDefinitions);
        const build = async (inputData: Partial<Prisma.AcceptTermsAndConditionsCreateInput> = {}) => {
            const seq = getSeq();
            const requiredScalarData = autoGenerateAcceptTermsAndConditionsScalarsOrEnums({ seq });
            const resolveValue = normalizeResolver<AcceptTermsAndConditionsFactoryDefineInput, BuildDataOptions>(defaultDataResolver ?? {});
            const defaultData = await traitKeys.reduce(async (queue, traitKey) => {
                const acc = await queue;
                const resolveTraitValue = normalizeResolver<Partial<AcceptTermsAndConditionsFactoryDefineInput>, BuildDataOptions>(traitsDefs[traitKey]?.data ?? {});
                const traitData = await resolveTraitValue({ seq });
                return {
                    ...acc,
                    ...traitData,
                };
            }, resolveValue({ seq }));
            const defaultAssociations = {
                user: isAcceptTermsAndConditionsuserFactory(defaultData.user) ? {
                    create: await defaultData.user.build()
                } : defaultData.user
            };
            const data: Prisma.AcceptTermsAndConditionsCreateInput = { ...requiredScalarData, ...defaultData, ...defaultAssociations, ...inputData };
            return data;
        };
        const buildList = (inputData: number | readonly Partial<Prisma.AcceptTermsAndConditionsCreateInput>[]) => Promise.all(normalizeList(inputData).map(data => build(data)));
        const pickForConnect = (inputData: AcceptTermsAndConditions) => ({
            id: inputData.id
        });
        const create = async (inputData: Partial<Prisma.AcceptTermsAndConditionsCreateInput> = {}) => {
            const data = await build(inputData).then(screen);
            return await getClient<PrismaClient>().acceptTermsAndConditions.create({ data });
        };
        const createList = (inputData: number | readonly Partial<Prisma.AcceptTermsAndConditionsCreateInput>[]) => Promise.all(normalizeList(inputData).map(data => create(data)));
        const createForConnect = (inputData: Partial<Prisma.AcceptTermsAndConditionsCreateInput> = {}) => create(inputData).then(pickForConnect);
        return {
            _factoryFor: "AcceptTermsAndConditions" as const,
            build,
            buildList,
            buildCreateInput: build,
            pickForConnect,
            create,
            createList,
            createForConnect,
        };
    };
    const factory = getFactoryWithTraits();
    const useTraits = (name: AcceptTermsAndConditionsTraitKeys<TOptions>, ...names: readonly AcceptTermsAndConditionsTraitKeys<TOptions>[]) => {
        return getFactoryWithTraits([name, ...names]);
    };
    return {
        ...factory,
        use: useTraits,
    };
}

/**
 * Define factory for {@link AcceptTermsAndConditions} model.
 *
 * @param options
 * @returns factory {@link AcceptTermsAndConditionsFactoryInterface}
 */
export function defineAcceptTermsAndConditionsFactory<TOptions extends AcceptTermsAndConditionsFactoryDefineOptions>(options: TOptions): AcceptTermsAndConditionsFactoryInterface<TOptions> {
    return defineAcceptTermsAndConditionsFactoryInternal(options);
}

type RoleByZoneScalarOrEnumFields = {};

type RoleByZoneUserFactory = {
    _factoryFor: "User";
    build: () => PromiseLike<Prisma.UserCreateNestedOneWithoutRoleByZoneInput["create"]>;
};

type RoleByZoneZoneFactory = {
    _factoryFor: "Zone";
    build: () => PromiseLike<Prisma.ZoneCreateNestedOneWithoutRoleByZoneInput["create"]>;
};

type RoleByZoneRoleFactory = {
    _factoryFor: "Role";
    build: () => PromiseLike<Prisma.RoleCreateNestedOneWithoutRoleByZoneInput["create"]>;
};

type RoleByZoneAssignedByFactory = {
    _factoryFor: "User";
    build: () => PromiseLike<Prisma.UserCreateNestedOneWithoutAssignedRolesInput["create"]>;
};

type RoleByZoneFactoryDefineInput = {
    id?: string;
    createdAt?: Date;
    updatedAt?: Date;
    isDeleted?: SoftDelete;
    version?: number;
    User: RoleByZoneUserFactory | Prisma.UserCreateNestedOneWithoutRoleByZoneInput;
    Zone: RoleByZoneZoneFactory | Prisma.ZoneCreateNestedOneWithoutRoleByZoneInput;
    Role: RoleByZoneRoleFactory | Prisma.RoleCreateNestedOneWithoutRoleByZoneInput;
    AssignedBy: RoleByZoneAssignedByFactory | Prisma.UserCreateNestedOneWithoutAssignedRolesInput;
};

type RoleByZoneFactoryDefineOptions = {
    defaultData: Resolver<RoleByZoneFactoryDefineInput, BuildDataOptions>;
    traits?: {
        [traitName: string | symbol]: {
            data: Resolver<Partial<RoleByZoneFactoryDefineInput>, BuildDataOptions>;
        };
    };
};

function isRoleByZoneUserFactory(x: RoleByZoneUserFactory | Prisma.UserCreateNestedOneWithoutRoleByZoneInput | undefined): x is RoleByZoneUserFactory {
    return (x as any)?._factoryFor === "User";
}

function isRoleByZoneZoneFactory(x: RoleByZoneZoneFactory | Prisma.ZoneCreateNestedOneWithoutRoleByZoneInput | undefined): x is RoleByZoneZoneFactory {
    return (x as any)?._factoryFor === "Zone";
}

function isRoleByZoneRoleFactory(x: RoleByZoneRoleFactory | Prisma.RoleCreateNestedOneWithoutRoleByZoneInput | undefined): x is RoleByZoneRoleFactory {
    return (x as any)?._factoryFor === "Role";
}

function isRoleByZoneAssignedByFactory(x: RoleByZoneAssignedByFactory | Prisma.UserCreateNestedOneWithoutAssignedRolesInput | undefined): x is RoleByZoneAssignedByFactory {
    return (x as any)?._factoryFor === "User";
}

type RoleByZoneTraitKeys<TOptions extends RoleByZoneFactoryDefineOptions> = keyof TOptions["traits"];

export interface RoleByZoneFactoryInterfaceWithoutTraits {
    readonly _factoryFor: "RoleByZone";
    build(inputData?: Partial<Prisma.RoleByZoneCreateInput>): PromiseLike<Prisma.RoleByZoneCreateInput>;
    buildCreateInput(inputData?: Partial<Prisma.RoleByZoneCreateInput>): PromiseLike<Prisma.RoleByZoneCreateInput>;
    buildList(inputData: number | readonly Partial<Prisma.RoleByZoneCreateInput>[]): PromiseLike<Prisma.RoleByZoneCreateInput[]>;
    pickForConnect(inputData: RoleByZone): Pick<RoleByZone, "id">;
    create(inputData?: Partial<Prisma.RoleByZoneCreateInput>): PromiseLike<RoleByZone>;
    createList(inputData: number | readonly Partial<Prisma.RoleByZoneCreateInput>[]): PromiseLike<RoleByZone[]>;
    createForConnect(inputData?: Partial<Prisma.RoleByZoneCreateInput>): PromiseLike<Pick<RoleByZone, "id">>;
}

export interface RoleByZoneFactoryInterface<TOptions extends RoleByZoneFactoryDefineOptions = RoleByZoneFactoryDefineOptions> extends RoleByZoneFactoryInterfaceWithoutTraits {
    use(name: RoleByZoneTraitKeys<TOptions>, ...names: readonly RoleByZoneTraitKeys<TOptions>[]): RoleByZoneFactoryInterfaceWithoutTraits;
}

function autoGenerateRoleByZoneScalarsOrEnums({ seq }: {
    readonly seq: number;
}): RoleByZoneScalarOrEnumFields {
    return {};
}

function defineRoleByZoneFactoryInternal<TOptions extends RoleByZoneFactoryDefineOptions>({ defaultData: defaultDataResolver, traits: traitsDefs = {} }: TOptions): RoleByZoneFactoryInterface<TOptions> {
    const getFactoryWithTraits = (traitKeys: readonly RoleByZoneTraitKeys<TOptions>[] = []) => {
        const seqKey = {};
        const getSeq = () => getSequenceCounter(seqKey);
        const screen = createScreener("RoleByZone", modelFieldDefinitions);
        const build = async (inputData: Partial<Prisma.RoleByZoneCreateInput> = {}) => {
            const seq = getSeq();
            const requiredScalarData = autoGenerateRoleByZoneScalarsOrEnums({ seq });
            const resolveValue = normalizeResolver<RoleByZoneFactoryDefineInput, BuildDataOptions>(defaultDataResolver ?? {});
            const defaultData = await traitKeys.reduce(async (queue, traitKey) => {
                const acc = await queue;
                const resolveTraitValue = normalizeResolver<Partial<RoleByZoneFactoryDefineInput>, BuildDataOptions>(traitsDefs[traitKey]?.data ?? {});
                const traitData = await resolveTraitValue({ seq });
                return {
                    ...acc,
                    ...traitData,
                };
            }, resolveValue({ seq }));
            const defaultAssociations = {
                User: isRoleByZoneUserFactory(defaultData.User) ? {
                    create: await defaultData.User.build()
                } : defaultData.User,
                Zone: isRoleByZoneZoneFactory(defaultData.Zone) ? {
                    create: await defaultData.Zone.build()
                } : defaultData.Zone,
                Role: isRoleByZoneRoleFactory(defaultData.Role) ? {
                    create: await defaultData.Role.build()
                } : defaultData.Role,
                AssignedBy: isRoleByZoneAssignedByFactory(defaultData.AssignedBy) ? {
                    create: await defaultData.AssignedBy.build()
                } : defaultData.AssignedBy
            };
            const data: Prisma.RoleByZoneCreateInput = { ...requiredScalarData, ...defaultData, ...defaultAssociations, ...inputData };
            return data;
        };
        const buildList = (inputData: number | readonly Partial<Prisma.RoleByZoneCreateInput>[]) => Promise.all(normalizeList(inputData).map(data => build(data)));
        const pickForConnect = (inputData: RoleByZone) => ({
            id: inputData.id
        });
        const create = async (inputData: Partial<Prisma.RoleByZoneCreateInput> = {}) => {
            const data = await build(inputData).then(screen);
            return await getClient<PrismaClient>().roleByZone.create({ data });
        };
        const createList = (inputData: number | readonly Partial<Prisma.RoleByZoneCreateInput>[]) => Promise.all(normalizeList(inputData).map(data => create(data)));
        const createForConnect = (inputData: Partial<Prisma.RoleByZoneCreateInput> = {}) => create(inputData).then(pickForConnect);
        return {
            _factoryFor: "RoleByZone" as const,
            build,
            buildList,
            buildCreateInput: build,
            pickForConnect,
            create,
            createList,
            createForConnect,
        };
    };
    const factory = getFactoryWithTraits();
    const useTraits = (name: RoleByZoneTraitKeys<TOptions>, ...names: readonly RoleByZoneTraitKeys<TOptions>[]) => {
        return getFactoryWithTraits([name, ...names]);
    };
    return {
        ...factory,
        use: useTraits,
    };
}

/**
 * Define factory for {@link RoleByZone} model.
 *
 * @param options
 * @returns factory {@link RoleByZoneFactoryInterface}
 */
export function defineRoleByZoneFactory<TOptions extends RoleByZoneFactoryDefineOptions>(options: TOptions): RoleByZoneFactoryInterface<TOptions> {
    return defineRoleByZoneFactoryInternal(options);
}

type UserZoneAgreementRecordScalarOrEnumFields = {
    hasAgreed: boolean;
    agreementsRecord: string;
};

type UserZoneAgreementRecordZoneFactory = {
    _factoryFor: "Zone";
    build: () => PromiseLike<Prisma.ZoneCreateNestedOneWithoutUserZoneAgreementHistoryInput["create"]>;
};

type UserZoneAgreementRecordUserFactory = {
    _factoryFor: "User";
    build: () => PromiseLike<Prisma.UserCreateNestedOneWithoutUserZoneAgreementHistoryInput["create"]>;
};

type UserZoneAgreementRecordFactoryDefineInput = {
    id?: string;
    createdAt?: Date;
    updatedAt?: Date;
    hasAgreed?: boolean;
    agreementsRecord?: string;
    Zone: UserZoneAgreementRecordZoneFactory | Prisma.ZoneCreateNestedOneWithoutUserZoneAgreementHistoryInput;
    User: UserZoneAgreementRecordUserFactory | Prisma.UserCreateNestedOneWithoutUserZoneAgreementHistoryInput;
};

type UserZoneAgreementRecordFactoryDefineOptions = {
    defaultData: Resolver<UserZoneAgreementRecordFactoryDefineInput, BuildDataOptions>;
    traits?: {
        [traitName: string | symbol]: {
            data: Resolver<Partial<UserZoneAgreementRecordFactoryDefineInput>, BuildDataOptions>;
        };
    };
};

function isUserZoneAgreementRecordZoneFactory(x: UserZoneAgreementRecordZoneFactory | Prisma.ZoneCreateNestedOneWithoutUserZoneAgreementHistoryInput | undefined): x is UserZoneAgreementRecordZoneFactory {
    return (x as any)?._factoryFor === "Zone";
}

function isUserZoneAgreementRecordUserFactory(x: UserZoneAgreementRecordUserFactory | Prisma.UserCreateNestedOneWithoutUserZoneAgreementHistoryInput | undefined): x is UserZoneAgreementRecordUserFactory {
    return (x as any)?._factoryFor === "User";
}

type UserZoneAgreementRecordTraitKeys<TOptions extends UserZoneAgreementRecordFactoryDefineOptions> = keyof TOptions["traits"];

export interface UserZoneAgreementRecordFactoryInterfaceWithoutTraits {
    readonly _factoryFor: "UserZoneAgreementRecord";
    build(inputData?: Partial<Prisma.UserZoneAgreementRecordCreateInput>): PromiseLike<Prisma.UserZoneAgreementRecordCreateInput>;
    buildCreateInput(inputData?: Partial<Prisma.UserZoneAgreementRecordCreateInput>): PromiseLike<Prisma.UserZoneAgreementRecordCreateInput>;
    buildList(inputData: number | readonly Partial<Prisma.UserZoneAgreementRecordCreateInput>[]): PromiseLike<Prisma.UserZoneAgreementRecordCreateInput[]>;
    pickForConnect(inputData: UserZoneAgreementRecord): Pick<UserZoneAgreementRecord, "id">;
    create(inputData?: Partial<Prisma.UserZoneAgreementRecordCreateInput>): PromiseLike<UserZoneAgreementRecord>;
    createList(inputData: number | readonly Partial<Prisma.UserZoneAgreementRecordCreateInput>[]): PromiseLike<UserZoneAgreementRecord[]>;
    createForConnect(inputData?: Partial<Prisma.UserZoneAgreementRecordCreateInput>): PromiseLike<Pick<UserZoneAgreementRecord, "id">>;
}

export interface UserZoneAgreementRecordFactoryInterface<TOptions extends UserZoneAgreementRecordFactoryDefineOptions = UserZoneAgreementRecordFactoryDefineOptions> extends UserZoneAgreementRecordFactoryInterfaceWithoutTraits {
    use(name: UserZoneAgreementRecordTraitKeys<TOptions>, ...names: readonly UserZoneAgreementRecordTraitKeys<TOptions>[]): UserZoneAgreementRecordFactoryInterfaceWithoutTraits;
}

function autoGenerateUserZoneAgreementRecordScalarsOrEnums({ seq }: {
    readonly seq: number;
}): UserZoneAgreementRecordScalarOrEnumFields {
    return {
        hasAgreed: getScalarFieldValueGenerator().Boolean({ modelName: "UserZoneAgreementRecord", fieldName: "hasAgreed", isId: false, isUnique: false, seq }),
        agreementsRecord: getScalarFieldValueGenerator().String({ modelName: "UserZoneAgreementRecord", fieldName: "agreementsRecord", isId: false, isUnique: false, seq })
    };
}

function defineUserZoneAgreementRecordFactoryInternal<TOptions extends UserZoneAgreementRecordFactoryDefineOptions>({ defaultData: defaultDataResolver, traits: traitsDefs = {} }: TOptions): UserZoneAgreementRecordFactoryInterface<TOptions> {
    const getFactoryWithTraits = (traitKeys: readonly UserZoneAgreementRecordTraitKeys<TOptions>[] = []) => {
        const seqKey = {};
        const getSeq = () => getSequenceCounter(seqKey);
        const screen = createScreener("UserZoneAgreementRecord", modelFieldDefinitions);
        const build = async (inputData: Partial<Prisma.UserZoneAgreementRecordCreateInput> = {}) => {
            const seq = getSeq();
            const requiredScalarData = autoGenerateUserZoneAgreementRecordScalarsOrEnums({ seq });
            const resolveValue = normalizeResolver<UserZoneAgreementRecordFactoryDefineInput, BuildDataOptions>(defaultDataResolver ?? {});
            const defaultData = await traitKeys.reduce(async (queue, traitKey) => {
                const acc = await queue;
                const resolveTraitValue = normalizeResolver<Partial<UserZoneAgreementRecordFactoryDefineInput>, BuildDataOptions>(traitsDefs[traitKey]?.data ?? {});
                const traitData = await resolveTraitValue({ seq });
                return {
                    ...acc,
                    ...traitData,
                };
            }, resolveValue({ seq }));
            const defaultAssociations = {
                Zone: isUserZoneAgreementRecordZoneFactory(defaultData.Zone) ? {
                    create: await defaultData.Zone.build()
                } : defaultData.Zone,
                User: isUserZoneAgreementRecordUserFactory(defaultData.User) ? {
                    create: await defaultData.User.build()
                } : defaultData.User
            };
            const data: Prisma.UserZoneAgreementRecordCreateInput = { ...requiredScalarData, ...defaultData, ...defaultAssociations, ...inputData };
            return data;
        };
        const buildList = (inputData: number | readonly Partial<Prisma.UserZoneAgreementRecordCreateInput>[]) => Promise.all(normalizeList(inputData).map(data => build(data)));
        const pickForConnect = (inputData: UserZoneAgreementRecord) => ({
            id: inputData.id
        });
        const create = async (inputData: Partial<Prisma.UserZoneAgreementRecordCreateInput> = {}) => {
            const data = await build(inputData).then(screen);
            return await getClient<PrismaClient>().userZoneAgreementRecord.create({ data });
        };
        const createList = (inputData: number | readonly Partial<Prisma.UserZoneAgreementRecordCreateInput>[]) => Promise.all(normalizeList(inputData).map(data => create(data)));
        const createForConnect = (inputData: Partial<Prisma.UserZoneAgreementRecordCreateInput> = {}) => create(inputData).then(pickForConnect);
        return {
            _factoryFor: "UserZoneAgreementRecord" as const,
            build,
            buildList,
            buildCreateInput: build,
            pickForConnect,
            create,
            createList,
            createForConnect,
        };
    };
    const factory = getFactoryWithTraits();
    const useTraits = (name: UserZoneAgreementRecordTraitKeys<TOptions>, ...names: readonly UserZoneAgreementRecordTraitKeys<TOptions>[]) => {
        return getFactoryWithTraits([name, ...names]);
    };
    return {
        ...factory,
        use: useTraits,
    };
}

/**
 * Define factory for {@link UserZoneAgreementRecord} model.
 *
 * @param options
 * @returns factory {@link UserZoneAgreementRecordFactoryInterface}
 */
export function defineUserZoneAgreementRecordFactory<TOptions extends UserZoneAgreementRecordFactoryDefineOptions>(options: TOptions): UserZoneAgreementRecordFactoryInterface<TOptions> {
    return defineUserZoneAgreementRecordFactoryInternal(options);
}

type RoleScalarOrEnumFields = {
    name: RoleNames;
};

type RoleFactoryDefineInput = {
    id?: string;
    name?: RoleNames;
    createdAt?: Date;
    updatedAt?: Date;
    permissions?: Prisma.PermissionsCreateNestedManyWithoutRolesInput;
    RoleByZone?: Prisma.RoleByZoneCreateNestedManyWithoutRoleInput;
};

type RoleFactoryDefineOptions = {
    defaultData?: Resolver<RoleFactoryDefineInput, BuildDataOptions>;
    traits?: {
        [traitName: string | symbol]: {
            data: Resolver<Partial<RoleFactoryDefineInput>, BuildDataOptions>;
        };
    };
};

type RoleTraitKeys<TOptions extends RoleFactoryDefineOptions> = keyof TOptions["traits"];

export interface RoleFactoryInterfaceWithoutTraits {
    readonly _factoryFor: "Role";
    build(inputData?: Partial<Prisma.RoleCreateInput>): PromiseLike<Prisma.RoleCreateInput>;
    buildCreateInput(inputData?: Partial<Prisma.RoleCreateInput>): PromiseLike<Prisma.RoleCreateInput>;
    buildList(inputData: number | readonly Partial<Prisma.RoleCreateInput>[]): PromiseLike<Prisma.RoleCreateInput[]>;
    pickForConnect(inputData: Role): Pick<Role, "id">;
    create(inputData?: Partial<Prisma.RoleCreateInput>): PromiseLike<Role>;
    createList(inputData: number | readonly Partial<Prisma.RoleCreateInput>[]): PromiseLike<Role[]>;
    createForConnect(inputData?: Partial<Prisma.RoleCreateInput>): PromiseLike<Pick<Role, "id">>;
}

export interface RoleFactoryInterface<TOptions extends RoleFactoryDefineOptions = RoleFactoryDefineOptions> extends RoleFactoryInterfaceWithoutTraits {
    use(name: RoleTraitKeys<TOptions>, ...names: readonly RoleTraitKeys<TOptions>[]): RoleFactoryInterfaceWithoutTraits;
}

function autoGenerateRoleScalarsOrEnums({ seq }: {
    readonly seq: number;
}): RoleScalarOrEnumFields {
    return {
        name: "Admin"
    };
}

function defineRoleFactoryInternal<TOptions extends RoleFactoryDefineOptions>({ defaultData: defaultDataResolver, traits: traitsDefs = {} }: TOptions): RoleFactoryInterface<TOptions> {
    const getFactoryWithTraits = (traitKeys: readonly RoleTraitKeys<TOptions>[] = []) => {
        const seqKey = {};
        const getSeq = () => getSequenceCounter(seqKey);
        const screen = createScreener("Role", modelFieldDefinitions);
        const build = async (inputData: Partial<Prisma.RoleCreateInput> = {}) => {
            const seq = getSeq();
            const requiredScalarData = autoGenerateRoleScalarsOrEnums({ seq });
            const resolveValue = normalizeResolver<RoleFactoryDefineInput, BuildDataOptions>(defaultDataResolver ?? {});
            const defaultData = await traitKeys.reduce(async (queue, traitKey) => {
                const acc = await queue;
                const resolveTraitValue = normalizeResolver<Partial<RoleFactoryDefineInput>, BuildDataOptions>(traitsDefs[traitKey]?.data ?? {});
                const traitData = await resolveTraitValue({ seq });
                return {
                    ...acc,
                    ...traitData,
                };
            }, resolveValue({ seq }));
            const defaultAssociations = {};
            const data: Prisma.RoleCreateInput = { ...requiredScalarData, ...defaultData, ...defaultAssociations, ...inputData };
            return data;
        };
        const buildList = (inputData: number | readonly Partial<Prisma.RoleCreateInput>[]) => Promise.all(normalizeList(inputData).map(data => build(data)));
        const pickForConnect = (inputData: Role) => ({
            id: inputData.id
        });
        const create = async (inputData: Partial<Prisma.RoleCreateInput> = {}) => {
            const data = await build(inputData).then(screen);
            return await getClient<PrismaClient>().role.create({ data });
        };
        const createList = (inputData: number | readonly Partial<Prisma.RoleCreateInput>[]) => Promise.all(normalizeList(inputData).map(data => create(data)));
        const createForConnect = (inputData: Partial<Prisma.RoleCreateInput> = {}) => create(inputData).then(pickForConnect);
        return {
            _factoryFor: "Role" as const,
            build,
            buildList,
            buildCreateInput: build,
            pickForConnect,
            create,
            createList,
            createForConnect,
        };
    };
    const factory = getFactoryWithTraits();
    const useTraits = (name: RoleTraitKeys<TOptions>, ...names: readonly RoleTraitKeys<TOptions>[]) => {
        return getFactoryWithTraits([name, ...names]);
    };
    return {
        ...factory,
        use: useTraits,
    };
}

/**
 * Define factory for {@link Role} model.
 *
 * @param options
 * @returns factory {@link RoleFactoryInterface}
 */
export function defineRoleFactory<TOptions extends RoleFactoryDefineOptions>(options?: TOptions): RoleFactoryInterface<TOptions> {
    return defineRoleFactoryInternal(options ?? {});
}

type PermissionsScalarOrEnumFields = {
    action: PermissionActions;
};

type PermissionsFactoryDefineInput = {
    id?: string;
    action?: PermissionActions;
    createdAt?: Date;
    updatedAt?: Date;
    isDeleted?: SoftDelete;
    roles?: Prisma.RoleCreateNestedManyWithoutPermissionsInput;
};

type PermissionsFactoryDefineOptions = {
    defaultData?: Resolver<PermissionsFactoryDefineInput, BuildDataOptions>;
    traits?: {
        [traitName: string | symbol]: {
            data: Resolver<Partial<PermissionsFactoryDefineInput>, BuildDataOptions>;
        };
    };
};

type PermissionsTraitKeys<TOptions extends PermissionsFactoryDefineOptions> = keyof TOptions["traits"];

export interface PermissionsFactoryInterfaceWithoutTraits {
    readonly _factoryFor: "Permissions";
    build(inputData?: Partial<Prisma.PermissionsCreateInput>): PromiseLike<Prisma.PermissionsCreateInput>;
    buildCreateInput(inputData?: Partial<Prisma.PermissionsCreateInput>): PromiseLike<Prisma.PermissionsCreateInput>;
    buildList(inputData: number | readonly Partial<Prisma.PermissionsCreateInput>[]): PromiseLike<Prisma.PermissionsCreateInput[]>;
    pickForConnect(inputData: Permissions): Pick<Permissions, "id">;
    create(inputData?: Partial<Prisma.PermissionsCreateInput>): PromiseLike<Permissions>;
    createList(inputData: number | readonly Partial<Prisma.PermissionsCreateInput>[]): PromiseLike<Permissions[]>;
    createForConnect(inputData?: Partial<Prisma.PermissionsCreateInput>): PromiseLike<Pick<Permissions, "id">>;
}

export interface PermissionsFactoryInterface<TOptions extends PermissionsFactoryDefineOptions = PermissionsFactoryDefineOptions> extends PermissionsFactoryInterfaceWithoutTraits {
    use(name: PermissionsTraitKeys<TOptions>, ...names: readonly PermissionsTraitKeys<TOptions>[]): PermissionsFactoryInterfaceWithoutTraits;
}

function autoGeneratePermissionsScalarsOrEnums({ seq }: {
    readonly seq: number;
}): PermissionsScalarOrEnumFields {
    return {
        action: "Create"
    };
}

function definePermissionsFactoryInternal<TOptions extends PermissionsFactoryDefineOptions>({ defaultData: defaultDataResolver, traits: traitsDefs = {} }: TOptions): PermissionsFactoryInterface<TOptions> {
    const getFactoryWithTraits = (traitKeys: readonly PermissionsTraitKeys<TOptions>[] = []) => {
        const seqKey = {};
        const getSeq = () => getSequenceCounter(seqKey);
        const screen = createScreener("Permissions", modelFieldDefinitions);
        const build = async (inputData: Partial<Prisma.PermissionsCreateInput> = {}) => {
            const seq = getSeq();
            const requiredScalarData = autoGeneratePermissionsScalarsOrEnums({ seq });
            const resolveValue = normalizeResolver<PermissionsFactoryDefineInput, BuildDataOptions>(defaultDataResolver ?? {});
            const defaultData = await traitKeys.reduce(async (queue, traitKey) => {
                const acc = await queue;
                const resolveTraitValue = normalizeResolver<Partial<PermissionsFactoryDefineInput>, BuildDataOptions>(traitsDefs[traitKey]?.data ?? {});
                const traitData = await resolveTraitValue({ seq });
                return {
                    ...acc,
                    ...traitData,
                };
            }, resolveValue({ seq }));
            const defaultAssociations = {};
            const data: Prisma.PermissionsCreateInput = { ...requiredScalarData, ...defaultData, ...defaultAssociations, ...inputData };
            return data;
        };
        const buildList = (inputData: number | readonly Partial<Prisma.PermissionsCreateInput>[]) => Promise.all(normalizeList(inputData).map(data => build(data)));
        const pickForConnect = (inputData: Permissions) => ({
            id: inputData.id
        });
        const create = async (inputData: Partial<Prisma.PermissionsCreateInput> = {}) => {
            const data = await build(inputData).then(screen);
            return await getClient<PrismaClient>().permissions.create({ data });
        };
        const createList = (inputData: number | readonly Partial<Prisma.PermissionsCreateInput>[]) => Promise.all(normalizeList(inputData).map(data => create(data)));
        const createForConnect = (inputData: Partial<Prisma.PermissionsCreateInput> = {}) => create(inputData).then(pickForConnect);
        return {
            _factoryFor: "Permissions" as const,
            build,
            buildList,
            buildCreateInput: build,
            pickForConnect,
            create,
            createList,
            createForConnect,
        };
    };
    const factory = getFactoryWithTraits();
    const useTraits = (name: PermissionsTraitKeys<TOptions>, ...names: readonly PermissionsTraitKeys<TOptions>[]) => {
        return getFactoryWithTraits([name, ...names]);
    };
    return {
        ...factory,
        use: useTraits,
    };
}

/**
 * Define factory for {@link Permissions} model.
 *
 * @param options
 * @returns factory {@link PermissionsFactoryInterface}
 */
export function definePermissionsFactory<TOptions extends PermissionsFactoryDefineOptions>(options?: TOptions): PermissionsFactoryInterface<TOptions> {
    return definePermissionsFactoryInternal(options ?? {});
}

type ZoneAccessRequestScalarOrEnumFields = {
    status: RequestStatus;
};

type ZoneAccessRequestZoneFactory = {
    _factoryFor: "Zone";
    build: () => PromiseLike<Prisma.ZoneCreateNestedOneWithoutZoneAccessRequestInput["create"]>;
};

type ZoneAccessRequestUserFactory = {
    _factoryFor: "User";
    build: () => PromiseLike<Prisma.UserCreateNestedOneWithoutZoneAccessRequestHistoryInput["create"]>;
};

type ZoneAccessRequestmodifiedByFactory = {
    _factoryFor: "User";
    build: () => PromiseLike<Prisma.UserCreateNestedOneWithoutZoneAccessRequestReviewedInput["create"]>;
};

type ZoneAccessRequestmessageFactory = {
    _factoryFor: "TextContent";
    build: () => PromiseLike<Prisma.TextContentCreateNestedOneWithoutZoneAccessRequestInput["create"]>;
};

type ZoneAccessRequestFactoryDefineInput = {
    id?: string;
    createdAt?: Date;
    status?: RequestStatus;
    Zone: ZoneAccessRequestZoneFactory | Prisma.ZoneCreateNestedOneWithoutZoneAccessRequestInput;
    User: ZoneAccessRequestUserFactory | Prisma.UserCreateNestedOneWithoutZoneAccessRequestHistoryInput;
    modifiedBy: ZoneAccessRequestmodifiedByFactory | Prisma.UserCreateNestedOneWithoutZoneAccessRequestReviewedInput;
    message?: ZoneAccessRequestmessageFactory | Prisma.TextContentCreateNestedOneWithoutZoneAccessRequestInput;
};

type ZoneAccessRequestFactoryDefineOptions = {
    defaultData: Resolver<ZoneAccessRequestFactoryDefineInput, BuildDataOptions>;
    traits?: {
        [traitName: string | symbol]: {
            data: Resolver<Partial<ZoneAccessRequestFactoryDefineInput>, BuildDataOptions>;
        };
    };
};

function isZoneAccessRequestZoneFactory(x: ZoneAccessRequestZoneFactory | Prisma.ZoneCreateNestedOneWithoutZoneAccessRequestInput | undefined): x is ZoneAccessRequestZoneFactory {
    return (x as any)?._factoryFor === "Zone";
}

function isZoneAccessRequestUserFactory(x: ZoneAccessRequestUserFactory | Prisma.UserCreateNestedOneWithoutZoneAccessRequestHistoryInput | undefined): x is ZoneAccessRequestUserFactory {
    return (x as any)?._factoryFor === "User";
}

function isZoneAccessRequestmodifiedByFactory(x: ZoneAccessRequestmodifiedByFactory | Prisma.UserCreateNestedOneWithoutZoneAccessRequestReviewedInput | undefined): x is ZoneAccessRequestmodifiedByFactory {
    return (x as any)?._factoryFor === "User";
}

function isZoneAccessRequestmessageFactory(x: ZoneAccessRequestmessageFactory | Prisma.TextContentCreateNestedOneWithoutZoneAccessRequestInput | undefined): x is ZoneAccessRequestmessageFactory {
    return (x as any)?._factoryFor === "TextContent";
}

type ZoneAccessRequestTraitKeys<TOptions extends ZoneAccessRequestFactoryDefineOptions> = keyof TOptions["traits"];

export interface ZoneAccessRequestFactoryInterfaceWithoutTraits {
    readonly _factoryFor: "ZoneAccessRequest";
    build(inputData?: Partial<Prisma.ZoneAccessRequestCreateInput>): PromiseLike<Prisma.ZoneAccessRequestCreateInput>;
    buildCreateInput(inputData?: Partial<Prisma.ZoneAccessRequestCreateInput>): PromiseLike<Prisma.ZoneAccessRequestCreateInput>;
    buildList(inputData: number | readonly Partial<Prisma.ZoneAccessRequestCreateInput>[]): PromiseLike<Prisma.ZoneAccessRequestCreateInput[]>;
    pickForConnect(inputData: ZoneAccessRequest): Pick<ZoneAccessRequest, "id">;
    create(inputData?: Partial<Prisma.ZoneAccessRequestCreateInput>): PromiseLike<ZoneAccessRequest>;
    createList(inputData: number | readonly Partial<Prisma.ZoneAccessRequestCreateInput>[]): PromiseLike<ZoneAccessRequest[]>;
    createForConnect(inputData?: Partial<Prisma.ZoneAccessRequestCreateInput>): PromiseLike<Pick<ZoneAccessRequest, "id">>;
}

export interface ZoneAccessRequestFactoryInterface<TOptions extends ZoneAccessRequestFactoryDefineOptions = ZoneAccessRequestFactoryDefineOptions> extends ZoneAccessRequestFactoryInterfaceWithoutTraits {
    use(name: ZoneAccessRequestTraitKeys<TOptions>, ...names: readonly ZoneAccessRequestTraitKeys<TOptions>[]): ZoneAccessRequestFactoryInterfaceWithoutTraits;
}

function autoGenerateZoneAccessRequestScalarsOrEnums({ seq }: {
    readonly seq: number;
}): ZoneAccessRequestScalarOrEnumFields {
    return {
        status: "Pending"
    };
}

function defineZoneAccessRequestFactoryInternal<TOptions extends ZoneAccessRequestFactoryDefineOptions>({ defaultData: defaultDataResolver, traits: traitsDefs = {} }: TOptions): ZoneAccessRequestFactoryInterface<TOptions> {
    const getFactoryWithTraits = (traitKeys: readonly ZoneAccessRequestTraitKeys<TOptions>[] = []) => {
        const seqKey = {};
        const getSeq = () => getSequenceCounter(seqKey);
        const screen = createScreener("ZoneAccessRequest", modelFieldDefinitions);
        const build = async (inputData: Partial<Prisma.ZoneAccessRequestCreateInput> = {}) => {
            const seq = getSeq();
            const requiredScalarData = autoGenerateZoneAccessRequestScalarsOrEnums({ seq });
            const resolveValue = normalizeResolver<ZoneAccessRequestFactoryDefineInput, BuildDataOptions>(defaultDataResolver ?? {});
            const defaultData = await traitKeys.reduce(async (queue, traitKey) => {
                const acc = await queue;
                const resolveTraitValue = normalizeResolver<Partial<ZoneAccessRequestFactoryDefineInput>, BuildDataOptions>(traitsDefs[traitKey]?.data ?? {});
                const traitData = await resolveTraitValue({ seq });
                return {
                    ...acc,
                    ...traitData,
                };
            }, resolveValue({ seq }));
            const defaultAssociations = {
                Zone: isZoneAccessRequestZoneFactory(defaultData.Zone) ? {
                    create: await defaultData.Zone.build()
                } : defaultData.Zone,
                User: isZoneAccessRequestUserFactory(defaultData.User) ? {
                    create: await defaultData.User.build()
                } : defaultData.User,
                modifiedBy: isZoneAccessRequestmodifiedByFactory(defaultData.modifiedBy) ? {
                    create: await defaultData.modifiedBy.build()
                } : defaultData.modifiedBy,
                message: isZoneAccessRequestmessageFactory(defaultData.message) ? {
                    create: await defaultData.message.build()
                } : defaultData.message
            };
            const data: Prisma.ZoneAccessRequestCreateInput = { ...requiredScalarData, ...defaultData, ...defaultAssociations, ...inputData };
            return data;
        };
        const buildList = (inputData: number | readonly Partial<Prisma.ZoneAccessRequestCreateInput>[]) => Promise.all(normalizeList(inputData).map(data => build(data)));
        const pickForConnect = (inputData: ZoneAccessRequest) => ({
            id: inputData.id
        });
        const create = async (inputData: Partial<Prisma.ZoneAccessRequestCreateInput> = {}) => {
            const data = await build(inputData).then(screen);
            return await getClient<PrismaClient>().zoneAccessRequest.create({ data });
        };
        const createList = (inputData: number | readonly Partial<Prisma.ZoneAccessRequestCreateInput>[]) => Promise.all(normalizeList(inputData).map(data => create(data)));
        const createForConnect = (inputData: Partial<Prisma.ZoneAccessRequestCreateInput> = {}) => create(inputData).then(pickForConnect);
        return {
            _factoryFor: "ZoneAccessRequest" as const,
            build,
            buildList,
            buildCreateInput: build,
            pickForConnect,
            create,
            createList,
            createForConnect,
        };
    };
    const factory = getFactoryWithTraits();
    const useTraits = (name: ZoneAccessRequestTraitKeys<TOptions>, ...names: readonly ZoneAccessRequestTraitKeys<TOptions>[]) => {
        return getFactoryWithTraits([name, ...names]);
    };
    return {
        ...factory,
        use: useTraits,
    };
}

/**
 * Define factory for {@link ZoneAccessRequest} model.
 *
 * @param options
 * @returns factory {@link ZoneAccessRequestFactoryInterface}
 */
export function defineZoneAccessRequestFactory<TOptions extends ZoneAccessRequestFactoryDefineOptions>(options: TOptions): ZoneAccessRequestFactoryInterface<TOptions> {
    return defineZoneAccessRequestFactoryInternal(options);
}

type ZoneScalarOrEnumFields = {
    name: string;
    slug: string;
};

type ZonedescriptionFactory = {
    _factoryFor: "TextContent";
    build: () => PromiseLike<Prisma.TextContentCreateNestedOneWithoutZoneInput["create"]>;
};

type ZoneLocationFactory = {
    _factoryFor: "Location";
    build: () => PromiseLike<Prisma.LocationCreateNestedOneWithoutZoneInput["create"]>;
};

type ZoneAuthorFactory = {
    _factoryFor: "User";
    build: () => PromiseLike<Prisma.UserCreateNestedOneWithoutAuthorZoneInput["create"]>;
};

type ZoneFactoryDefineInput = {
    id?: string;
    name?: string;
    slug?: string;
    createdAt?: Date;
    updatedAt?: Date;
    infoAccess?: InfoAccess;
    isDeleted?: SoftDelete;
    version?: number;
    currentStatus?: Status;
    searchVisibility?: SearchVisibility;
    description?: ZonedescriptionFactory | Prisma.TextContentCreateNestedOneWithoutZoneInput;
    sectors?: Prisma.SectorCreateNestedManyWithoutZoneInput;
    photos?: Prisma.ImageCreateNestedManyWithoutZoneInput;
    RoleByZone?: Prisma.RoleByZoneCreateNestedManyWithoutZoneInput;
    FavoritedBy?: Prisma.UserCreateNestedManyWithoutFavoriteZonesInput;
    DownloadedBy?: Prisma.UserCreateNestedManyWithoutDownloadedZonesInput;
    History?: Prisma.HistoryCreateNestedManyWithoutZoneInput;
    agreements?: Prisma.ZoneAgreementCreateNestedManyWithoutZoneInput;
    Location?: ZoneLocationFactory | Prisma.LocationCreateNestedOneWithoutZoneInput;
    statusHistory?: Prisma.ZoneStatusCreateNestedManyWithoutZoneInput;
    ZoneAccessRequest?: Prisma.ZoneAccessRequestCreateNestedManyWithoutZoneInput;
    UserZoneAgreementHistory?: Prisma.UserZoneAgreementRecordCreateNestedManyWithoutZoneInput;
    ZoneDirections?: Prisma.ZoneDirectionsCreateNestedManyWithoutZoneInput;
    Author: ZoneAuthorFactory | Prisma.UserCreateNestedOneWithoutAuthorZoneInput;
    coAuthors?: Prisma.UserCreateNestedManyWithoutCoAuthorZoneInput;
};

type ZoneFactoryDefineOptions = {
    defaultData: Resolver<ZoneFactoryDefineInput, BuildDataOptions>;
    traits?: {
        [traitName: string | symbol]: {
            data: Resolver<Partial<ZoneFactoryDefineInput>, BuildDataOptions>;
        };
    };
};

function isZonedescriptionFactory(x: ZonedescriptionFactory | Prisma.TextContentCreateNestedOneWithoutZoneInput | undefined): x is ZonedescriptionFactory {
    return (x as any)?._factoryFor === "TextContent";
}

function isZoneLocationFactory(x: ZoneLocationFactory | Prisma.LocationCreateNestedOneWithoutZoneInput | undefined): x is ZoneLocationFactory {
    return (x as any)?._factoryFor === "Location";
}

function isZoneAuthorFactory(x: ZoneAuthorFactory | Prisma.UserCreateNestedOneWithoutAuthorZoneInput | undefined): x is ZoneAuthorFactory {
    return (x as any)?._factoryFor === "User";
}

type ZoneTraitKeys<TOptions extends ZoneFactoryDefineOptions> = keyof TOptions["traits"];

export interface ZoneFactoryInterfaceWithoutTraits {
    readonly _factoryFor: "Zone";
    build(inputData?: Partial<Prisma.ZoneCreateInput>): PromiseLike<Prisma.ZoneCreateInput>;
    buildCreateInput(inputData?: Partial<Prisma.ZoneCreateInput>): PromiseLike<Prisma.ZoneCreateInput>;
    buildList(inputData: number | readonly Partial<Prisma.ZoneCreateInput>[]): PromiseLike<Prisma.ZoneCreateInput[]>;
    pickForConnect(inputData: Zone): Pick<Zone, "id">;
    create(inputData?: Partial<Prisma.ZoneCreateInput>): PromiseLike<Zone>;
    createList(inputData: number | readonly Partial<Prisma.ZoneCreateInput>[]): PromiseLike<Zone[]>;
    createForConnect(inputData?: Partial<Prisma.ZoneCreateInput>): PromiseLike<Pick<Zone, "id">>;
}

export interface ZoneFactoryInterface<TOptions extends ZoneFactoryDefineOptions = ZoneFactoryDefineOptions> extends ZoneFactoryInterfaceWithoutTraits {
    use(name: ZoneTraitKeys<TOptions>, ...names: readonly ZoneTraitKeys<TOptions>[]): ZoneFactoryInterfaceWithoutTraits;
}

function autoGenerateZoneScalarsOrEnums({ seq }: {
    readonly seq: number;
}): ZoneScalarOrEnumFields {
    return {
        name: getScalarFieldValueGenerator().String({ modelName: "Zone", fieldName: "name", isId: false, isUnique: false, seq }),
        slug: getScalarFieldValueGenerator().String({ modelName: "Zone", fieldName: "slug", isId: false, isUnique: false, seq })
    };
}

function defineZoneFactoryInternal<TOptions extends ZoneFactoryDefineOptions>({ defaultData: defaultDataResolver, traits: traitsDefs = {} }: TOptions): ZoneFactoryInterface<TOptions> {
    const getFactoryWithTraits = (traitKeys: readonly ZoneTraitKeys<TOptions>[] = []) => {
        const seqKey = {};
        const getSeq = () => getSequenceCounter(seqKey);
        const screen = createScreener("Zone", modelFieldDefinitions);
        const build = async (inputData: Partial<Prisma.ZoneCreateInput> = {}) => {
            const seq = getSeq();
            const requiredScalarData = autoGenerateZoneScalarsOrEnums({ seq });
            const resolveValue = normalizeResolver<ZoneFactoryDefineInput, BuildDataOptions>(defaultDataResolver ?? {});
            const defaultData = await traitKeys.reduce(async (queue, traitKey) => {
                const acc = await queue;
                const resolveTraitValue = normalizeResolver<Partial<ZoneFactoryDefineInput>, BuildDataOptions>(traitsDefs[traitKey]?.data ?? {});
                const traitData = await resolveTraitValue({ seq });
                return {
                    ...acc,
                    ...traitData,
                };
            }, resolveValue({ seq }));
            const defaultAssociations = {
                description: isZonedescriptionFactory(defaultData.description) ? {
                    create: await defaultData.description.build()
                } : defaultData.description,
                Location: isZoneLocationFactory(defaultData.Location) ? {
                    create: await defaultData.Location.build()
                } : defaultData.Location,
                Author: isZoneAuthorFactory(defaultData.Author) ? {
                    create: await defaultData.Author.build()
                } : defaultData.Author
            };
            const data: Prisma.ZoneCreateInput = { ...requiredScalarData, ...defaultData, ...defaultAssociations, ...inputData };
            return data;
        };
        const buildList = (inputData: number | readonly Partial<Prisma.ZoneCreateInput>[]) => Promise.all(normalizeList(inputData).map(data => build(data)));
        const pickForConnect = (inputData: Zone) => ({
            id: inputData.id
        });
        const create = async (inputData: Partial<Prisma.ZoneCreateInput> = {}) => {
            const data = await build(inputData).then(screen);
            return await getClient<PrismaClient>().zone.create({ data });
        };
        const createList = (inputData: number | readonly Partial<Prisma.ZoneCreateInput>[]) => Promise.all(normalizeList(inputData).map(data => create(data)));
        const createForConnect = (inputData: Partial<Prisma.ZoneCreateInput> = {}) => create(inputData).then(pickForConnect);
        return {
            _factoryFor: "Zone" as const,
            build,
            buildList,
            buildCreateInput: build,
            pickForConnect,
            create,
            createList,
            createForConnect,
        };
    };
    const factory = getFactoryWithTraits();
    const useTraits = (name: ZoneTraitKeys<TOptions>, ...names: readonly ZoneTraitKeys<TOptions>[]) => {
        return getFactoryWithTraits([name, ...names]);
    };
    return {
        ...factory,
        use: useTraits,
    };
}

/**
 * Define factory for {@link Zone} model.
 *
 * @param options
 * @returns factory {@link ZoneFactoryInterface}
 */
export function defineZoneFactory<TOptions extends ZoneFactoryDefineOptions>(options: TOptions): ZoneFactoryInterface<TOptions> {
    return defineZoneFactoryInternal(options);
}

type ZoneStatusScalarOrEnumFields = {
    status: Status;
};

type ZoneStatusmessageFactory = {
    _factoryFor: "TextContent";
    build: () => PromiseLike<Prisma.TextContentCreateNestedOneWithoutZoneStatusInput["create"]>;
};

type ZoneStatusmodifiedByFactory = {
    _factoryFor: "User";
    build: () => PromiseLike<Prisma.UserCreateNestedOneWithoutZoneStatusModificationsInput["create"]>;
};

type ZoneStatusFactoryDefineInput = {
    id?: string;
    status?: Status;
    createdAt?: Date;
    message?: ZoneStatusmessageFactory | Prisma.TextContentCreateNestedOneWithoutZoneStatusInput;
    Zone?: Prisma.ZoneCreateNestedManyWithoutStatusHistoryInput;
    modifiedBy: ZoneStatusmodifiedByFactory | Prisma.UserCreateNestedOneWithoutZoneStatusModificationsInput;
};

type ZoneStatusFactoryDefineOptions = {
    defaultData: Resolver<ZoneStatusFactoryDefineInput, BuildDataOptions>;
    traits?: {
        [traitName: string | symbol]: {
            data: Resolver<Partial<ZoneStatusFactoryDefineInput>, BuildDataOptions>;
        };
    };
};

function isZoneStatusmessageFactory(x: ZoneStatusmessageFactory | Prisma.TextContentCreateNestedOneWithoutZoneStatusInput | undefined): x is ZoneStatusmessageFactory {
    return (x as any)?._factoryFor === "TextContent";
}

function isZoneStatusmodifiedByFactory(x: ZoneStatusmodifiedByFactory | Prisma.UserCreateNestedOneWithoutZoneStatusModificationsInput | undefined): x is ZoneStatusmodifiedByFactory {
    return (x as any)?._factoryFor === "User";
}

type ZoneStatusTraitKeys<TOptions extends ZoneStatusFactoryDefineOptions> = keyof TOptions["traits"];

export interface ZoneStatusFactoryInterfaceWithoutTraits {
    readonly _factoryFor: "ZoneStatus";
    build(inputData?: Partial<Prisma.ZoneStatusCreateInput>): PromiseLike<Prisma.ZoneStatusCreateInput>;
    buildCreateInput(inputData?: Partial<Prisma.ZoneStatusCreateInput>): PromiseLike<Prisma.ZoneStatusCreateInput>;
    buildList(inputData: number | readonly Partial<Prisma.ZoneStatusCreateInput>[]): PromiseLike<Prisma.ZoneStatusCreateInput[]>;
    pickForConnect(inputData: ZoneStatus): Pick<ZoneStatus, "id">;
    create(inputData?: Partial<Prisma.ZoneStatusCreateInput>): PromiseLike<ZoneStatus>;
    createList(inputData: number | readonly Partial<Prisma.ZoneStatusCreateInput>[]): PromiseLike<ZoneStatus[]>;
    createForConnect(inputData?: Partial<Prisma.ZoneStatusCreateInput>): PromiseLike<Pick<ZoneStatus, "id">>;
}

export interface ZoneStatusFactoryInterface<TOptions extends ZoneStatusFactoryDefineOptions = ZoneStatusFactoryDefineOptions> extends ZoneStatusFactoryInterfaceWithoutTraits {
    use(name: ZoneStatusTraitKeys<TOptions>, ...names: readonly ZoneStatusTraitKeys<TOptions>[]): ZoneStatusFactoryInterfaceWithoutTraits;
}

function autoGenerateZoneStatusScalarsOrEnums({ seq }: {
    readonly seq: number;
}): ZoneStatusScalarOrEnumFields {
    return {
        status: "Paused"
    };
}

function defineZoneStatusFactoryInternal<TOptions extends ZoneStatusFactoryDefineOptions>({ defaultData: defaultDataResolver, traits: traitsDefs = {} }: TOptions): ZoneStatusFactoryInterface<TOptions> {
    const getFactoryWithTraits = (traitKeys: readonly ZoneStatusTraitKeys<TOptions>[] = []) => {
        const seqKey = {};
        const getSeq = () => getSequenceCounter(seqKey);
        const screen = createScreener("ZoneStatus", modelFieldDefinitions);
        const build = async (inputData: Partial<Prisma.ZoneStatusCreateInput> = {}) => {
            const seq = getSeq();
            const requiredScalarData = autoGenerateZoneStatusScalarsOrEnums({ seq });
            const resolveValue = normalizeResolver<ZoneStatusFactoryDefineInput, BuildDataOptions>(defaultDataResolver ?? {});
            const defaultData = await traitKeys.reduce(async (queue, traitKey) => {
                const acc = await queue;
                const resolveTraitValue = normalizeResolver<Partial<ZoneStatusFactoryDefineInput>, BuildDataOptions>(traitsDefs[traitKey]?.data ?? {});
                const traitData = await resolveTraitValue({ seq });
                return {
                    ...acc,
                    ...traitData,
                };
            }, resolveValue({ seq }));
            const defaultAssociations = {
                message: isZoneStatusmessageFactory(defaultData.message) ? {
                    create: await defaultData.message.build()
                } : defaultData.message,
                modifiedBy: isZoneStatusmodifiedByFactory(defaultData.modifiedBy) ? {
                    create: await defaultData.modifiedBy.build()
                } : defaultData.modifiedBy
            };
            const data: Prisma.ZoneStatusCreateInput = { ...requiredScalarData, ...defaultData, ...defaultAssociations, ...inputData };
            return data;
        };
        const buildList = (inputData: number | readonly Partial<Prisma.ZoneStatusCreateInput>[]) => Promise.all(normalizeList(inputData).map(data => build(data)));
        const pickForConnect = (inputData: ZoneStatus) => ({
            id: inputData.id
        });
        const create = async (inputData: Partial<Prisma.ZoneStatusCreateInput> = {}) => {
            const data = await build(inputData).then(screen);
            return await getClient<PrismaClient>().zoneStatus.create({ data });
        };
        const createList = (inputData: number | readonly Partial<Prisma.ZoneStatusCreateInput>[]) => Promise.all(normalizeList(inputData).map(data => create(data)));
        const createForConnect = (inputData: Partial<Prisma.ZoneStatusCreateInput> = {}) => create(inputData).then(pickForConnect);
        return {
            _factoryFor: "ZoneStatus" as const,
            build,
            buildList,
            buildCreateInput: build,
            pickForConnect,
            create,
            createList,
            createForConnect,
        };
    };
    const factory = getFactoryWithTraits();
    const useTraits = (name: ZoneStatusTraitKeys<TOptions>, ...names: readonly ZoneStatusTraitKeys<TOptions>[]) => {
        return getFactoryWithTraits([name, ...names]);
    };
    return {
        ...factory,
        use: useTraits,
    };
}

/**
 * Define factory for {@link ZoneStatus} model.
 *
 * @param options
 * @returns factory {@link ZoneStatusFactoryInterface}
 */
export function defineZoneStatusFactory<TOptions extends ZoneStatusFactoryDefineOptions>(options: TOptions): ZoneStatusFactoryInterface<TOptions> {
    return defineZoneStatusFactoryInternal(options);
}

type ZoneAgreementScalarOrEnumFields = {};

type ZoneAgreementcommentFactory = {
    _factoryFor: "TextContent";
    build: () => PromiseLike<Prisma.TextContentCreateNestedOneWithoutZoneAgreementCommentInput["create"]>;
};

type ZoneAgreementZoneFactory = {
    _factoryFor: "Zone";
    build: () => PromiseLike<Prisma.ZoneCreateNestedOneWithoutAgreementsInput["create"]>;
};

type ZoneAgreementAgreementFactory = {
    _factoryFor: "Agreement";
    build: () => PromiseLike<Prisma.AgreementCreateNestedOneWithoutZoneAgreementInput["create"]>;
};

type ZoneAgreementAuthorFactory = {
    _factoryFor: "User";
    build: () => PromiseLike<Prisma.UserCreateNestedOneWithoutAuthorZoneListAgreementsInput["create"]>;
};

type ZoneAgreementFactoryDefineInput = {
    id?: string;
    position?: number;
    level?: AgreementLevel;
    createdAt?: Date;
    updatedAt?: Date;
    isDeleted?: SoftDelete;
    version?: number;
    comment?: ZoneAgreementcommentFactory | Prisma.TextContentCreateNestedOneWithoutZoneAgreementCommentInput;
    Zone: ZoneAgreementZoneFactory | Prisma.ZoneCreateNestedOneWithoutAgreementsInput;
    Agreement: ZoneAgreementAgreementFactory | Prisma.AgreementCreateNestedOneWithoutZoneAgreementInput;
    Author: ZoneAgreementAuthorFactory | Prisma.UserCreateNestedOneWithoutAuthorZoneListAgreementsInput;
    coAuthors?: Prisma.UserCreateNestedManyWithoutCoAuthorZoneListAgreementsInput;
};

type ZoneAgreementFactoryDefineOptions = {
    defaultData: Resolver<ZoneAgreementFactoryDefineInput, BuildDataOptions>;
    traits?: {
        [traitName: string | symbol]: {
            data: Resolver<Partial<ZoneAgreementFactoryDefineInput>, BuildDataOptions>;
        };
    };
};

function isZoneAgreementcommentFactory(x: ZoneAgreementcommentFactory | Prisma.TextContentCreateNestedOneWithoutZoneAgreementCommentInput | undefined): x is ZoneAgreementcommentFactory {
    return (x as any)?._factoryFor === "TextContent";
}

function isZoneAgreementZoneFactory(x: ZoneAgreementZoneFactory | Prisma.ZoneCreateNestedOneWithoutAgreementsInput | undefined): x is ZoneAgreementZoneFactory {
    return (x as any)?._factoryFor === "Zone";
}

function isZoneAgreementAgreementFactory(x: ZoneAgreementAgreementFactory | Prisma.AgreementCreateNestedOneWithoutZoneAgreementInput | undefined): x is ZoneAgreementAgreementFactory {
    return (x as any)?._factoryFor === "Agreement";
}

function isZoneAgreementAuthorFactory(x: ZoneAgreementAuthorFactory | Prisma.UserCreateNestedOneWithoutAuthorZoneListAgreementsInput | undefined): x is ZoneAgreementAuthorFactory {
    return (x as any)?._factoryFor === "User";
}

type ZoneAgreementTraitKeys<TOptions extends ZoneAgreementFactoryDefineOptions> = keyof TOptions["traits"];

export interface ZoneAgreementFactoryInterfaceWithoutTraits {
    readonly _factoryFor: "ZoneAgreement";
    build(inputData?: Partial<Prisma.ZoneAgreementCreateInput>): PromiseLike<Prisma.ZoneAgreementCreateInput>;
    buildCreateInput(inputData?: Partial<Prisma.ZoneAgreementCreateInput>): PromiseLike<Prisma.ZoneAgreementCreateInput>;
    buildList(inputData: number | readonly Partial<Prisma.ZoneAgreementCreateInput>[]): PromiseLike<Prisma.ZoneAgreementCreateInput[]>;
    pickForConnect(inputData: ZoneAgreement): Pick<ZoneAgreement, "id">;
    create(inputData?: Partial<Prisma.ZoneAgreementCreateInput>): PromiseLike<ZoneAgreement>;
    createList(inputData: number | readonly Partial<Prisma.ZoneAgreementCreateInput>[]): PromiseLike<ZoneAgreement[]>;
    createForConnect(inputData?: Partial<Prisma.ZoneAgreementCreateInput>): PromiseLike<Pick<ZoneAgreement, "id">>;
}

export interface ZoneAgreementFactoryInterface<TOptions extends ZoneAgreementFactoryDefineOptions = ZoneAgreementFactoryDefineOptions> extends ZoneAgreementFactoryInterfaceWithoutTraits {
    use(name: ZoneAgreementTraitKeys<TOptions>, ...names: readonly ZoneAgreementTraitKeys<TOptions>[]): ZoneAgreementFactoryInterfaceWithoutTraits;
}

function autoGenerateZoneAgreementScalarsOrEnums({ seq }: {
    readonly seq: number;
}): ZoneAgreementScalarOrEnumFields {
    return {};
}

function defineZoneAgreementFactoryInternal<TOptions extends ZoneAgreementFactoryDefineOptions>({ defaultData: defaultDataResolver, traits: traitsDefs = {} }: TOptions): ZoneAgreementFactoryInterface<TOptions> {
    const getFactoryWithTraits = (traitKeys: readonly ZoneAgreementTraitKeys<TOptions>[] = []) => {
        const seqKey = {};
        const getSeq = () => getSequenceCounter(seqKey);
        const screen = createScreener("ZoneAgreement", modelFieldDefinitions);
        const build = async (inputData: Partial<Prisma.ZoneAgreementCreateInput> = {}) => {
            const seq = getSeq();
            const requiredScalarData = autoGenerateZoneAgreementScalarsOrEnums({ seq });
            const resolveValue = normalizeResolver<ZoneAgreementFactoryDefineInput, BuildDataOptions>(defaultDataResolver ?? {});
            const defaultData = await traitKeys.reduce(async (queue, traitKey) => {
                const acc = await queue;
                const resolveTraitValue = normalizeResolver<Partial<ZoneAgreementFactoryDefineInput>, BuildDataOptions>(traitsDefs[traitKey]?.data ?? {});
                const traitData = await resolveTraitValue({ seq });
                return {
                    ...acc,
                    ...traitData,
                };
            }, resolveValue({ seq }));
            const defaultAssociations = {
                comment: isZoneAgreementcommentFactory(defaultData.comment) ? {
                    create: await defaultData.comment.build()
                } : defaultData.comment,
                Zone: isZoneAgreementZoneFactory(defaultData.Zone) ? {
                    create: await defaultData.Zone.build()
                } : defaultData.Zone,
                Agreement: isZoneAgreementAgreementFactory(defaultData.Agreement) ? {
                    create: await defaultData.Agreement.build()
                } : defaultData.Agreement,
                Author: isZoneAgreementAuthorFactory(defaultData.Author) ? {
                    create: await defaultData.Author.build()
                } : defaultData.Author
            };
            const data: Prisma.ZoneAgreementCreateInput = { ...requiredScalarData, ...defaultData, ...defaultAssociations, ...inputData };
            return data;
        };
        const buildList = (inputData: number | readonly Partial<Prisma.ZoneAgreementCreateInput>[]) => Promise.all(normalizeList(inputData).map(data => build(data)));
        const pickForConnect = (inputData: ZoneAgreement) => ({
            id: inputData.id
        });
        const create = async (inputData: Partial<Prisma.ZoneAgreementCreateInput> = {}) => {
            const data = await build(inputData).then(screen);
            return await getClient<PrismaClient>().zoneAgreement.create({ data });
        };
        const createList = (inputData: number | readonly Partial<Prisma.ZoneAgreementCreateInput>[]) => Promise.all(normalizeList(inputData).map(data => create(data)));
        const createForConnect = (inputData: Partial<Prisma.ZoneAgreementCreateInput> = {}) => create(inputData).then(pickForConnect);
        return {
            _factoryFor: "ZoneAgreement" as const,
            build,
            buildList,
            buildCreateInput: build,
            pickForConnect,
            create,
            createList,
            createForConnect,
        };
    };
    const factory = getFactoryWithTraits();
    const useTraits = (name: ZoneAgreementTraitKeys<TOptions>, ...names: readonly ZoneAgreementTraitKeys<TOptions>[]) => {
        return getFactoryWithTraits([name, ...names]);
    };
    return {
        ...factory,
        use: useTraits,
    };
}

/**
 * Define factory for {@link ZoneAgreement} model.
 *
 * @param options
 * @returns factory {@link ZoneAgreementFactoryInterface}
 */
export function defineZoneAgreementFactory<TOptions extends ZoneAgreementFactoryDefineOptions>(options: TOptions): ZoneAgreementFactoryInterface<TOptions> {
    return defineZoneAgreementFactoryInternal(options);
}

type AgreementScalarOrEnumFields = {};

type AgreementtitleFactory = {
    _factoryFor: "TextContent";
    build: () => PromiseLike<Prisma.TextContentCreateNestedOneWithoutAgreementNameInput["create"]>;
};

type AgreementdescriptionFactory = {
    _factoryFor: "TextContent";
    build: () => PromiseLike<Prisma.TextContentCreateNestedOneWithoutAgreementDescriptionInput["create"]>;
};

type AgreementAuthorFactory = {
    _factoryFor: "User";
    build: () => PromiseLike<Prisma.UserCreateNestedOneWithoutAuthorAgreementsInput["create"]>;
};

type AgreementFactoryDefineInput = {
    id?: string;
    createdAt?: Date;
    updatedAt?: Date;
    isDeleted?: SoftDelete;
    version?: number;
    classic?: ClassicAgreement | null;
    icon?: string | null;
    title: AgreementtitleFactory | Prisma.TextContentCreateNestedOneWithoutAgreementNameInput;
    description: AgreementdescriptionFactory | Prisma.TextContentCreateNestedOneWithoutAgreementDescriptionInput;
    Author: AgreementAuthorFactory | Prisma.UserCreateNestedOneWithoutAuthorAgreementsInput;
    coAuthors?: Prisma.UserCreateNestedManyWithoutCoAuthorAgreementsInput;
    ZoneAgreement?: Prisma.ZoneAgreementCreateNestedManyWithoutAgreementInput;
};

type AgreementFactoryDefineOptions = {
    defaultData: Resolver<AgreementFactoryDefineInput, BuildDataOptions>;
    traits?: {
        [traitName: string | symbol]: {
            data: Resolver<Partial<AgreementFactoryDefineInput>, BuildDataOptions>;
        };
    };
};

function isAgreementtitleFactory(x: AgreementtitleFactory | Prisma.TextContentCreateNestedOneWithoutAgreementNameInput | undefined): x is AgreementtitleFactory {
    return (x as any)?._factoryFor === "TextContent";
}

function isAgreementdescriptionFactory(x: AgreementdescriptionFactory | Prisma.TextContentCreateNestedOneWithoutAgreementDescriptionInput | undefined): x is AgreementdescriptionFactory {
    return (x as any)?._factoryFor === "TextContent";
}

function isAgreementAuthorFactory(x: AgreementAuthorFactory | Prisma.UserCreateNestedOneWithoutAuthorAgreementsInput | undefined): x is AgreementAuthorFactory {
    return (x as any)?._factoryFor === "User";
}

type AgreementTraitKeys<TOptions extends AgreementFactoryDefineOptions> = keyof TOptions["traits"];

export interface AgreementFactoryInterfaceWithoutTraits {
    readonly _factoryFor: "Agreement";
    build(inputData?: Partial<Prisma.AgreementCreateInput>): PromiseLike<Prisma.AgreementCreateInput>;
    buildCreateInput(inputData?: Partial<Prisma.AgreementCreateInput>): PromiseLike<Prisma.AgreementCreateInput>;
    buildList(inputData: number | readonly Partial<Prisma.AgreementCreateInput>[]): PromiseLike<Prisma.AgreementCreateInput[]>;
    pickForConnect(inputData: Agreement): Pick<Agreement, "id">;
    create(inputData?: Partial<Prisma.AgreementCreateInput>): PromiseLike<Agreement>;
    createList(inputData: number | readonly Partial<Prisma.AgreementCreateInput>[]): PromiseLike<Agreement[]>;
    createForConnect(inputData?: Partial<Prisma.AgreementCreateInput>): PromiseLike<Pick<Agreement, "id">>;
}

export interface AgreementFactoryInterface<TOptions extends AgreementFactoryDefineOptions = AgreementFactoryDefineOptions> extends AgreementFactoryInterfaceWithoutTraits {
    use(name: AgreementTraitKeys<TOptions>, ...names: readonly AgreementTraitKeys<TOptions>[]): AgreementFactoryInterfaceWithoutTraits;
}

function autoGenerateAgreementScalarsOrEnums({ seq }: {
    readonly seq: number;
}): AgreementScalarOrEnumFields {
    return {};
}

function defineAgreementFactoryInternal<TOptions extends AgreementFactoryDefineOptions>({ defaultData: defaultDataResolver, traits: traitsDefs = {} }: TOptions): AgreementFactoryInterface<TOptions> {
    const getFactoryWithTraits = (traitKeys: readonly AgreementTraitKeys<TOptions>[] = []) => {
        const seqKey = {};
        const getSeq = () => getSequenceCounter(seqKey);
        const screen = createScreener("Agreement", modelFieldDefinitions);
        const build = async (inputData: Partial<Prisma.AgreementCreateInput> = {}) => {
            const seq = getSeq();
            const requiredScalarData = autoGenerateAgreementScalarsOrEnums({ seq });
            const resolveValue = normalizeResolver<AgreementFactoryDefineInput, BuildDataOptions>(defaultDataResolver ?? {});
            const defaultData = await traitKeys.reduce(async (queue, traitKey) => {
                const acc = await queue;
                const resolveTraitValue = normalizeResolver<Partial<AgreementFactoryDefineInput>, BuildDataOptions>(traitsDefs[traitKey]?.data ?? {});
                const traitData = await resolveTraitValue({ seq });
                return {
                    ...acc,
                    ...traitData,
                };
            }, resolveValue({ seq }));
            const defaultAssociations = {
                title: isAgreementtitleFactory(defaultData.title) ? {
                    create: await defaultData.title.build()
                } : defaultData.title,
                description: isAgreementdescriptionFactory(defaultData.description) ? {
                    create: await defaultData.description.build()
                } : defaultData.description,
                Author: isAgreementAuthorFactory(defaultData.Author) ? {
                    create: await defaultData.Author.build()
                } : defaultData.Author
            };
            const data: Prisma.AgreementCreateInput = { ...requiredScalarData, ...defaultData, ...defaultAssociations, ...inputData };
            return data;
        };
        const buildList = (inputData: number | readonly Partial<Prisma.AgreementCreateInput>[]) => Promise.all(normalizeList(inputData).map(data => build(data)));
        const pickForConnect = (inputData: Agreement) => ({
            id: inputData.id
        });
        const create = async (inputData: Partial<Prisma.AgreementCreateInput> = {}) => {
            const data = await build(inputData).then(screen);
            return await getClient<PrismaClient>().agreement.create({ data });
        };
        const createList = (inputData: number | readonly Partial<Prisma.AgreementCreateInput>[]) => Promise.all(normalizeList(inputData).map(data => create(data)));
        const createForConnect = (inputData: Partial<Prisma.AgreementCreateInput> = {}) => create(inputData).then(pickForConnect);
        return {
            _factoryFor: "Agreement" as const,
            build,
            buildList,
            buildCreateInput: build,
            pickForConnect,
            create,
            createList,
            createForConnect,
        };
    };
    const factory = getFactoryWithTraits();
    const useTraits = (name: AgreementTraitKeys<TOptions>, ...names: readonly AgreementTraitKeys<TOptions>[]) => {
        return getFactoryWithTraits([name, ...names]);
    };
    return {
        ...factory,
        use: useTraits,
    };
}

/**
 * Define factory for {@link Agreement} model.
 *
 * @param options
 * @returns factory {@link AgreementFactoryInterface}
 */
export function defineAgreementFactory<TOptions extends AgreementFactoryDefineOptions>(options: TOptions): AgreementFactoryInterface<TOptions> {
    return defineAgreementFactoryInternal(options);
}

type ZoneDirectionsScalarOrEnumFields = {
    transportationMode: TransportationMode;
};

type ZoneDirectionsnameFactory = {
    _factoryFor: "TextContent";
    build: () => PromiseLike<Prisma.TextContentCreateNestedOneWithoutZoneDirectionsNameInput["create"]>;
};

type ZoneDirectionsZoneFactory = {
    _factoryFor: "Zone";
    build: () => PromiseLike<Prisma.ZoneCreateNestedOneWithoutZoneDirectionsInput["create"]>;
};

type ZoneDirectionsdescriptionFactory = {
    _factoryFor: "TextContent";
    build: () => PromiseLike<Prisma.TextContentCreateNestedOneWithoutZoneDirectionsInput["create"]>;
};

type ZoneDirectionsAuthorFactory = {
    _factoryFor: "User";
    build: () => PromiseLike<Prisma.UserCreateNestedOneWithoutAuthorZoneDirectionsInput["create"]>;
};

type ZoneDirectionsFactoryDefineInput = {
    id?: string;
    createdAt?: Date;
    updatedAt?: Date;
    transportationMode?: TransportationMode;
    isDeleted?: SoftDelete;
    name?: ZoneDirectionsnameFactory | Prisma.TextContentCreateNestedOneWithoutZoneDirectionsNameInput;
    Zone: ZoneDirectionsZoneFactory | Prisma.ZoneCreateNestedOneWithoutZoneDirectionsInput;
    description?: ZoneDirectionsdescriptionFactory | Prisma.TextContentCreateNestedOneWithoutZoneDirectionsInput;
    Author: ZoneDirectionsAuthorFactory | Prisma.UserCreateNestedOneWithoutAuthorZoneDirectionsInput;
    coAuthors?: Prisma.UserCreateNestedManyWithoutCoAuthorZoneDirectionsInput;
};

type ZoneDirectionsFactoryDefineOptions = {
    defaultData: Resolver<ZoneDirectionsFactoryDefineInput, BuildDataOptions>;
    traits?: {
        [traitName: string | symbol]: {
            data: Resolver<Partial<ZoneDirectionsFactoryDefineInput>, BuildDataOptions>;
        };
    };
};

function isZoneDirectionsnameFactory(x: ZoneDirectionsnameFactory | Prisma.TextContentCreateNestedOneWithoutZoneDirectionsNameInput | undefined): x is ZoneDirectionsnameFactory {
    return (x as any)?._factoryFor === "TextContent";
}

function isZoneDirectionsZoneFactory(x: ZoneDirectionsZoneFactory | Prisma.ZoneCreateNestedOneWithoutZoneDirectionsInput | undefined): x is ZoneDirectionsZoneFactory {
    return (x as any)?._factoryFor === "Zone";
}

function isZoneDirectionsdescriptionFactory(x: ZoneDirectionsdescriptionFactory | Prisma.TextContentCreateNestedOneWithoutZoneDirectionsInput | undefined): x is ZoneDirectionsdescriptionFactory {
    return (x as any)?._factoryFor === "TextContent";
}

function isZoneDirectionsAuthorFactory(x: ZoneDirectionsAuthorFactory | Prisma.UserCreateNestedOneWithoutAuthorZoneDirectionsInput | undefined): x is ZoneDirectionsAuthorFactory {
    return (x as any)?._factoryFor === "User";
}

type ZoneDirectionsTraitKeys<TOptions extends ZoneDirectionsFactoryDefineOptions> = keyof TOptions["traits"];

export interface ZoneDirectionsFactoryInterfaceWithoutTraits {
    readonly _factoryFor: "ZoneDirections";
    build(inputData?: Partial<Prisma.ZoneDirectionsCreateInput>): PromiseLike<Prisma.ZoneDirectionsCreateInput>;
    buildCreateInput(inputData?: Partial<Prisma.ZoneDirectionsCreateInput>): PromiseLike<Prisma.ZoneDirectionsCreateInput>;
    buildList(inputData: number | readonly Partial<Prisma.ZoneDirectionsCreateInput>[]): PromiseLike<Prisma.ZoneDirectionsCreateInput[]>;
    pickForConnect(inputData: ZoneDirections): Pick<ZoneDirections, "id">;
    create(inputData?: Partial<Prisma.ZoneDirectionsCreateInput>): PromiseLike<ZoneDirections>;
    createList(inputData: number | readonly Partial<Prisma.ZoneDirectionsCreateInput>[]): PromiseLike<ZoneDirections[]>;
    createForConnect(inputData?: Partial<Prisma.ZoneDirectionsCreateInput>): PromiseLike<Pick<ZoneDirections, "id">>;
}

export interface ZoneDirectionsFactoryInterface<TOptions extends ZoneDirectionsFactoryDefineOptions = ZoneDirectionsFactoryDefineOptions> extends ZoneDirectionsFactoryInterfaceWithoutTraits {
    use(name: ZoneDirectionsTraitKeys<TOptions>, ...names: readonly ZoneDirectionsTraitKeys<TOptions>[]): ZoneDirectionsFactoryInterfaceWithoutTraits;
}

function autoGenerateZoneDirectionsScalarsOrEnums({ seq }: {
    readonly seq: number;
}): ZoneDirectionsScalarOrEnumFields {
    return {
        transportationMode: "Car"
    };
}

function defineZoneDirectionsFactoryInternal<TOptions extends ZoneDirectionsFactoryDefineOptions>({ defaultData: defaultDataResolver, traits: traitsDefs = {} }: TOptions): ZoneDirectionsFactoryInterface<TOptions> {
    const getFactoryWithTraits = (traitKeys: readonly ZoneDirectionsTraitKeys<TOptions>[] = []) => {
        const seqKey = {};
        const getSeq = () => getSequenceCounter(seqKey);
        const screen = createScreener("ZoneDirections", modelFieldDefinitions);
        const build = async (inputData: Partial<Prisma.ZoneDirectionsCreateInput> = {}) => {
            const seq = getSeq();
            const requiredScalarData = autoGenerateZoneDirectionsScalarsOrEnums({ seq });
            const resolveValue = normalizeResolver<ZoneDirectionsFactoryDefineInput, BuildDataOptions>(defaultDataResolver ?? {});
            const defaultData = await traitKeys.reduce(async (queue, traitKey) => {
                const acc = await queue;
                const resolveTraitValue = normalizeResolver<Partial<ZoneDirectionsFactoryDefineInput>, BuildDataOptions>(traitsDefs[traitKey]?.data ?? {});
                const traitData = await resolveTraitValue({ seq });
                return {
                    ...acc,
                    ...traitData,
                };
            }, resolveValue({ seq }));
            const defaultAssociations = {
                name: isZoneDirectionsnameFactory(defaultData.name) ? {
                    create: await defaultData.name.build()
                } : defaultData.name,
                Zone: isZoneDirectionsZoneFactory(defaultData.Zone) ? {
                    create: await defaultData.Zone.build()
                } : defaultData.Zone,
                description: isZoneDirectionsdescriptionFactory(defaultData.description) ? {
                    create: await defaultData.description.build()
                } : defaultData.description,
                Author: isZoneDirectionsAuthorFactory(defaultData.Author) ? {
                    create: await defaultData.Author.build()
                } : defaultData.Author
            };
            const data: Prisma.ZoneDirectionsCreateInput = { ...requiredScalarData, ...defaultData, ...defaultAssociations, ...inputData };
            return data;
        };
        const buildList = (inputData: number | readonly Partial<Prisma.ZoneDirectionsCreateInput>[]) => Promise.all(normalizeList(inputData).map(data => build(data)));
        const pickForConnect = (inputData: ZoneDirections) => ({
            id: inputData.id
        });
        const create = async (inputData: Partial<Prisma.ZoneDirectionsCreateInput> = {}) => {
            const data = await build(inputData).then(screen);
            return await getClient<PrismaClient>().zoneDirections.create({ data });
        };
        const createList = (inputData: number | readonly Partial<Prisma.ZoneDirectionsCreateInput>[]) => Promise.all(normalizeList(inputData).map(data => create(data)));
        const createForConnect = (inputData: Partial<Prisma.ZoneDirectionsCreateInput> = {}) => create(inputData).then(pickForConnect);
        return {
            _factoryFor: "ZoneDirections" as const,
            build,
            buildList,
            buildCreateInput: build,
            pickForConnect,
            create,
            createList,
            createForConnect,
        };
    };
    const factory = getFactoryWithTraits();
    const useTraits = (name: ZoneDirectionsTraitKeys<TOptions>, ...names: readonly ZoneDirectionsTraitKeys<TOptions>[]) => {
        return getFactoryWithTraits([name, ...names]);
    };
    return {
        ...factory,
        use: useTraits,
    };
}

/**
 * Define factory for {@link ZoneDirections} model.
 *
 * @param options
 * @returns factory {@link ZoneDirectionsFactoryInterface}
 */
export function defineZoneDirectionsFactory<TOptions extends ZoneDirectionsFactoryDefineOptions>(options: TOptions): ZoneDirectionsFactoryInterface<TOptions> {
    return defineZoneDirectionsFactoryInternal(options);
}

type SectorScalarOrEnumFields = {
    name: string;
    slug: string;
};

type SectorZoneFactory = {
    _factoryFor: "Zone";
    build: () => PromiseLike<Prisma.ZoneCreateNestedOneWithoutSectorsInput["create"]>;
};

type SectorAuthorFactory = {
    _factoryFor: "User";
    build: () => PromiseLike<Prisma.UserCreateNestedOneWithoutAuthorSectorInput["create"]>;
};

type SectorLocationFactory = {
    _factoryFor: "Location";
    build: () => PromiseLike<Prisma.LocationCreateNestedOneWithoutSectorInput["create"]>;
};

type SectorFactoryDefineInput = {
    id?: string;
    name?: string;
    slug?: string;
    createdAt?: Date;
    updatedAt?: Date;
    position?: number;
    singleWall?: boolean;
    isDeleted?: SoftDelete;
    version?: number;
    sectorKind?: SectorKind;
    Zone: SectorZoneFactory | Prisma.ZoneCreateNestedOneWithoutSectorsInput;
    walls?: Prisma.WallCreateNestedManyWithoutSectorInput;
    Author: SectorAuthorFactory | Prisma.UserCreateNestedOneWithoutAuthorSectorInput;
    coAuthors?: Prisma.UserCreateNestedManyWithoutCoAuthorSectorInput;
    Location?: SectorLocationFactory | Prisma.LocationCreateNestedOneWithoutSectorInput;
};

type SectorFactoryDefineOptions = {
    defaultData: Resolver<SectorFactoryDefineInput, BuildDataOptions>;
    traits?: {
        [traitName: string | symbol]: {
            data: Resolver<Partial<SectorFactoryDefineInput>, BuildDataOptions>;
        };
    };
};

function isSectorZoneFactory(x: SectorZoneFactory | Prisma.ZoneCreateNestedOneWithoutSectorsInput | undefined): x is SectorZoneFactory {
    return (x as any)?._factoryFor === "Zone";
}

function isSectorAuthorFactory(x: SectorAuthorFactory | Prisma.UserCreateNestedOneWithoutAuthorSectorInput | undefined): x is SectorAuthorFactory {
    return (x as any)?._factoryFor === "User";
}

function isSectorLocationFactory(x: SectorLocationFactory | Prisma.LocationCreateNestedOneWithoutSectorInput | undefined): x is SectorLocationFactory {
    return (x as any)?._factoryFor === "Location";
}

type SectorTraitKeys<TOptions extends SectorFactoryDefineOptions> = keyof TOptions["traits"];

export interface SectorFactoryInterfaceWithoutTraits {
    readonly _factoryFor: "Sector";
    build(inputData?: Partial<Prisma.SectorCreateInput>): PromiseLike<Prisma.SectorCreateInput>;
    buildCreateInput(inputData?: Partial<Prisma.SectorCreateInput>): PromiseLike<Prisma.SectorCreateInput>;
    buildList(inputData: number | readonly Partial<Prisma.SectorCreateInput>[]): PromiseLike<Prisma.SectorCreateInput[]>;
    pickForConnect(inputData: Sector): Pick<Sector, "id">;
    create(inputData?: Partial<Prisma.SectorCreateInput>): PromiseLike<Sector>;
    createList(inputData: number | readonly Partial<Prisma.SectorCreateInput>[]): PromiseLike<Sector[]>;
    createForConnect(inputData?: Partial<Prisma.SectorCreateInput>): PromiseLike<Pick<Sector, "id">>;
}

export interface SectorFactoryInterface<TOptions extends SectorFactoryDefineOptions = SectorFactoryDefineOptions> extends SectorFactoryInterfaceWithoutTraits {
    use(name: SectorTraitKeys<TOptions>, ...names: readonly SectorTraitKeys<TOptions>[]): SectorFactoryInterfaceWithoutTraits;
}

function autoGenerateSectorScalarsOrEnums({ seq }: {
    readonly seq: number;
}): SectorScalarOrEnumFields {
    return {
        name: getScalarFieldValueGenerator().String({ modelName: "Sector", fieldName: "name", isId: false, isUnique: false, seq }),
        slug: getScalarFieldValueGenerator().String({ modelName: "Sector", fieldName: "slug", isId: false, isUnique: false, seq })
    };
}

function defineSectorFactoryInternal<TOptions extends SectorFactoryDefineOptions>({ defaultData: defaultDataResolver, traits: traitsDefs = {} }: TOptions): SectorFactoryInterface<TOptions> {
    const getFactoryWithTraits = (traitKeys: readonly SectorTraitKeys<TOptions>[] = []) => {
        const seqKey = {};
        const getSeq = () => getSequenceCounter(seqKey);
        const screen = createScreener("Sector", modelFieldDefinitions);
        const build = async (inputData: Partial<Prisma.SectorCreateInput> = {}) => {
            const seq = getSeq();
            const requiredScalarData = autoGenerateSectorScalarsOrEnums({ seq });
            const resolveValue = normalizeResolver<SectorFactoryDefineInput, BuildDataOptions>(defaultDataResolver ?? {});
            const defaultData = await traitKeys.reduce(async (queue, traitKey) => {
                const acc = await queue;
                const resolveTraitValue = normalizeResolver<Partial<SectorFactoryDefineInput>, BuildDataOptions>(traitsDefs[traitKey]?.data ?? {});
                const traitData = await resolveTraitValue({ seq });
                return {
                    ...acc,
                    ...traitData,
                };
            }, resolveValue({ seq }));
            const defaultAssociations = {
                Zone: isSectorZoneFactory(defaultData.Zone) ? {
                    create: await defaultData.Zone.build()
                } : defaultData.Zone,
                Author: isSectorAuthorFactory(defaultData.Author) ? {
                    create: await defaultData.Author.build()
                } : defaultData.Author,
                Location: isSectorLocationFactory(defaultData.Location) ? {
                    create: await defaultData.Location.build()
                } : defaultData.Location
            };
            const data: Prisma.SectorCreateInput = { ...requiredScalarData, ...defaultData, ...defaultAssociations, ...inputData };
            return data;
        };
        const buildList = (inputData: number | readonly Partial<Prisma.SectorCreateInput>[]) => Promise.all(normalizeList(inputData).map(data => build(data)));
        const pickForConnect = (inputData: Sector) => ({
            id: inputData.id
        });
        const create = async (inputData: Partial<Prisma.SectorCreateInput> = {}) => {
            const data = await build(inputData).then(screen);
            return await getClient<PrismaClient>().sector.create({ data });
        };
        const createList = (inputData: number | readonly Partial<Prisma.SectorCreateInput>[]) => Promise.all(normalizeList(inputData).map(data => create(data)));
        const createForConnect = (inputData: Partial<Prisma.SectorCreateInput> = {}) => create(inputData).then(pickForConnect);
        return {
            _factoryFor: "Sector" as const,
            build,
            buildList,
            buildCreateInput: build,
            pickForConnect,
            create,
            createList,
            createForConnect,
        };
    };
    const factory = getFactoryWithTraits();
    const useTraits = (name: SectorTraitKeys<TOptions>, ...names: readonly SectorTraitKeys<TOptions>[]) => {
        return getFactoryWithTraits([name, ...names]);
    };
    return {
        ...factory,
        use: useTraits,
    };
}

/**
 * Define factory for {@link Sector} model.
 *
 * @param options
 * @returns factory {@link SectorFactoryInterface}
 */
export function defineSectorFactory<TOptions extends SectorFactoryDefineOptions>(options: TOptions): SectorFactoryInterface<TOptions> {
    return defineSectorFactoryInternal(options);
}

type WallScalarOrEnumFields = {
    name: string;
    slug: string;
};

type WallSectorFactory = {
    _factoryFor: "Sector";
    build: () => PromiseLike<Prisma.SectorCreateNestedOneWithoutWallsInput["create"]>;
};

type WallAuthorFactory = {
    _factoryFor: "User";
    build: () => PromiseLike<Prisma.UserCreateNestedOneWithoutAuthorWallInput["create"]>;
};

type WallFactoryDefineInput = {
    id?: string;
    createdAt?: Date;
    updatedAt?: Date;
    name?: string;
    slug?: string;
    position?: number;
    isDeleted?: SoftDelete;
    version?: number;
    Sector: WallSectorFactory | Prisma.SectorCreateNestedOneWithoutWallsInput;
    topos?: Prisma.TopoCreateNestedManyWithoutWallInput;
    routes?: Prisma.RouteCreateNestedManyWithoutWallInput;
    Author: WallAuthorFactory | Prisma.UserCreateNestedOneWithoutAuthorWallInput;
    coAuthors?: Prisma.UserCreateNestedManyWithoutCoAuthorWallInput;
    MultiPitch?: Prisma.MultiPitchCreateNestedManyWithoutWallInput;
};

type WallFactoryDefineOptions = {
    defaultData: Resolver<WallFactoryDefineInput, BuildDataOptions>;
    traits?: {
        [traitName: string | symbol]: {
            data: Resolver<Partial<WallFactoryDefineInput>, BuildDataOptions>;
        };
    };
};

function isWallSectorFactory(x: WallSectorFactory | Prisma.SectorCreateNestedOneWithoutWallsInput | undefined): x is WallSectorFactory {
    return (x as any)?._factoryFor === "Sector";
}

function isWallAuthorFactory(x: WallAuthorFactory | Prisma.UserCreateNestedOneWithoutAuthorWallInput | undefined): x is WallAuthorFactory {
    return (x as any)?._factoryFor === "User";
}

type WallTraitKeys<TOptions extends WallFactoryDefineOptions> = keyof TOptions["traits"];

export interface WallFactoryInterfaceWithoutTraits {
    readonly _factoryFor: "Wall";
    build(inputData?: Partial<Prisma.WallCreateInput>): PromiseLike<Prisma.WallCreateInput>;
    buildCreateInput(inputData?: Partial<Prisma.WallCreateInput>): PromiseLike<Prisma.WallCreateInput>;
    buildList(inputData: number | readonly Partial<Prisma.WallCreateInput>[]): PromiseLike<Prisma.WallCreateInput[]>;
    pickForConnect(inputData: Wall): Pick<Wall, "id">;
    create(inputData?: Partial<Prisma.WallCreateInput>): PromiseLike<Wall>;
    createList(inputData: number | readonly Partial<Prisma.WallCreateInput>[]): PromiseLike<Wall[]>;
    createForConnect(inputData?: Partial<Prisma.WallCreateInput>): PromiseLike<Pick<Wall, "id">>;
}

export interface WallFactoryInterface<TOptions extends WallFactoryDefineOptions = WallFactoryDefineOptions> extends WallFactoryInterfaceWithoutTraits {
    use(name: WallTraitKeys<TOptions>, ...names: readonly WallTraitKeys<TOptions>[]): WallFactoryInterfaceWithoutTraits;
}

function autoGenerateWallScalarsOrEnums({ seq }: {
    readonly seq: number;
}): WallScalarOrEnumFields {
    return {
        name: getScalarFieldValueGenerator().String({ modelName: "Wall", fieldName: "name", isId: false, isUnique: false, seq }),
        slug: getScalarFieldValueGenerator().String({ modelName: "Wall", fieldName: "slug", isId: false, isUnique: false, seq })
    };
}

function defineWallFactoryInternal<TOptions extends WallFactoryDefineOptions>({ defaultData: defaultDataResolver, traits: traitsDefs = {} }: TOptions): WallFactoryInterface<TOptions> {
    const getFactoryWithTraits = (traitKeys: readonly WallTraitKeys<TOptions>[] = []) => {
        const seqKey = {};
        const getSeq = () => getSequenceCounter(seqKey);
        const screen = createScreener("Wall", modelFieldDefinitions);
        const build = async (inputData: Partial<Prisma.WallCreateInput> = {}) => {
            const seq = getSeq();
            const requiredScalarData = autoGenerateWallScalarsOrEnums({ seq });
            const resolveValue = normalizeResolver<WallFactoryDefineInput, BuildDataOptions>(defaultDataResolver ?? {});
            const defaultData = await traitKeys.reduce(async (queue, traitKey) => {
                const acc = await queue;
                const resolveTraitValue = normalizeResolver<Partial<WallFactoryDefineInput>, BuildDataOptions>(traitsDefs[traitKey]?.data ?? {});
                const traitData = await resolveTraitValue({ seq });
                return {
                    ...acc,
                    ...traitData,
                };
            }, resolveValue({ seq }));
            const defaultAssociations = {
                Sector: isWallSectorFactory(defaultData.Sector) ? {
                    create: await defaultData.Sector.build()
                } : defaultData.Sector,
                Author: isWallAuthorFactory(defaultData.Author) ? {
                    create: await defaultData.Author.build()
                } : defaultData.Author
            };
            const data: Prisma.WallCreateInput = { ...requiredScalarData, ...defaultData, ...defaultAssociations, ...inputData };
            return data;
        };
        const buildList = (inputData: number | readonly Partial<Prisma.WallCreateInput>[]) => Promise.all(normalizeList(inputData).map(data => build(data)));
        const pickForConnect = (inputData: Wall) => ({
            id: inputData.id
        });
        const create = async (inputData: Partial<Prisma.WallCreateInput> = {}) => {
            const data = await build(inputData).then(screen);
            return await getClient<PrismaClient>().wall.create({ data });
        };
        const createList = (inputData: number | readonly Partial<Prisma.WallCreateInput>[]) => Promise.all(normalizeList(inputData).map(data => create(data)));
        const createForConnect = (inputData: Partial<Prisma.WallCreateInput> = {}) => create(inputData).then(pickForConnect);
        return {
            _factoryFor: "Wall" as const,
            build,
            buildList,
            buildCreateInput: build,
            pickForConnect,
            create,
            createList,
            createForConnect,
        };
    };
    const factory = getFactoryWithTraits();
    const useTraits = (name: WallTraitKeys<TOptions>, ...names: readonly WallTraitKeys<TOptions>[]) => {
        return getFactoryWithTraits([name, ...names]);
    };
    return {
        ...factory,
        use: useTraits,
    };
}

/**
 * Define factory for {@link Wall} model.
 *
 * @param options
 * @returns factory {@link WallFactoryInterface}
 */
export function defineWallFactory<TOptions extends WallFactoryDefineOptions>(options: TOptions): WallFactoryInterface<TOptions> {
    return defineWallFactoryInternal(options);
}

type TopoScalarOrEnumFields = {
    slug: string;
};

type TopoWallFactory = {
    _factoryFor: "Wall";
    build: () => PromiseLike<Prisma.WallCreateNestedOneWithoutToposInput["create"]>;
};

type TopoimageFactory = {
    _factoryFor: "Image";
    build: () => PromiseLike<Prisma.ImageCreateNestedOneWithoutTopoInput["create"]>;
};

type TopoAuthorFactory = {
    _factoryFor: "User";
    build: () => PromiseLike<Prisma.UserCreateNestedOneWithoutAuthorTopoInput["create"]>;
};

type TopoFactoryDefineInput = {
    id?: string;
    createdAt?: Date;
    updatedAt?: Date;
    slug?: string;
    position?: number;
    main?: boolean;
    name?: string | null;
    canvas?: string | null;
    isDeleted?: SoftDelete;
    version?: number;
    routeStrokeWidth?: (Prisma.Decimal | Prisma.DecimalJsLike | string);
    Wall: TopoWallFactory | Prisma.WallCreateNestedOneWithoutToposInput;
    RoutePath?: Prisma.RoutePathCreateNestedManyWithoutTopoInput;
    image: TopoimageFactory | Prisma.ImageCreateNestedOneWithoutTopoInput;
    Author: TopoAuthorFactory | Prisma.UserCreateNestedOneWithoutAuthorTopoInput;
    coAuthors?: Prisma.UserCreateNestedManyWithoutCoAuthorTopoInput;
};

type TopoFactoryDefineOptions = {
    defaultData: Resolver<TopoFactoryDefineInput, BuildDataOptions>;
    traits?: {
        [traitName: string | symbol]: {
            data: Resolver<Partial<TopoFactoryDefineInput>, BuildDataOptions>;
        };
    };
};

function isTopoWallFactory(x: TopoWallFactory | Prisma.WallCreateNestedOneWithoutToposInput | undefined): x is TopoWallFactory {
    return (x as any)?._factoryFor === "Wall";
}

function isTopoimageFactory(x: TopoimageFactory | Prisma.ImageCreateNestedOneWithoutTopoInput | undefined): x is TopoimageFactory {
    return (x as any)?._factoryFor === "Image";
}

function isTopoAuthorFactory(x: TopoAuthorFactory | Prisma.UserCreateNestedOneWithoutAuthorTopoInput | undefined): x is TopoAuthorFactory {
    return (x as any)?._factoryFor === "User";
}

type TopoTraitKeys<TOptions extends TopoFactoryDefineOptions> = keyof TOptions["traits"];

export interface TopoFactoryInterfaceWithoutTraits {
    readonly _factoryFor: "Topo";
    build(inputData?: Partial<Prisma.TopoCreateInput>): PromiseLike<Prisma.TopoCreateInput>;
    buildCreateInput(inputData?: Partial<Prisma.TopoCreateInput>): PromiseLike<Prisma.TopoCreateInput>;
    buildList(inputData: number | readonly Partial<Prisma.TopoCreateInput>[]): PromiseLike<Prisma.TopoCreateInput[]>;
    pickForConnect(inputData: Topo): Pick<Topo, "id">;
    create(inputData?: Partial<Prisma.TopoCreateInput>): PromiseLike<Topo>;
    createList(inputData: number | readonly Partial<Prisma.TopoCreateInput>[]): PromiseLike<Topo[]>;
    createForConnect(inputData?: Partial<Prisma.TopoCreateInput>): PromiseLike<Pick<Topo, "id">>;
}

export interface TopoFactoryInterface<TOptions extends TopoFactoryDefineOptions = TopoFactoryDefineOptions> extends TopoFactoryInterfaceWithoutTraits {
    use(name: TopoTraitKeys<TOptions>, ...names: readonly TopoTraitKeys<TOptions>[]): TopoFactoryInterfaceWithoutTraits;
}

function autoGenerateTopoScalarsOrEnums({ seq }: {
    readonly seq: number;
}): TopoScalarOrEnumFields {
    return {
        slug: getScalarFieldValueGenerator().String({ modelName: "Topo", fieldName: "slug", isId: false, isUnique: false, seq })
    };
}

function defineTopoFactoryInternal<TOptions extends TopoFactoryDefineOptions>({ defaultData: defaultDataResolver, traits: traitsDefs = {} }: TOptions): TopoFactoryInterface<TOptions> {
    const getFactoryWithTraits = (traitKeys: readonly TopoTraitKeys<TOptions>[] = []) => {
        const seqKey = {};
        const getSeq = () => getSequenceCounter(seqKey);
        const screen = createScreener("Topo", modelFieldDefinitions);
        const build = async (inputData: Partial<Prisma.TopoCreateInput> = {}) => {
            const seq = getSeq();
            const requiredScalarData = autoGenerateTopoScalarsOrEnums({ seq });
            const resolveValue = normalizeResolver<TopoFactoryDefineInput, BuildDataOptions>(defaultDataResolver ?? {});
            const defaultData = await traitKeys.reduce(async (queue, traitKey) => {
                const acc = await queue;
                const resolveTraitValue = normalizeResolver<Partial<TopoFactoryDefineInput>, BuildDataOptions>(traitsDefs[traitKey]?.data ?? {});
                const traitData = await resolveTraitValue({ seq });
                return {
                    ...acc,
                    ...traitData,
                };
            }, resolveValue({ seq }));
            const defaultAssociations = {
                Wall: isTopoWallFactory(defaultData.Wall) ? {
                    create: await defaultData.Wall.build()
                } : defaultData.Wall,
                image: isTopoimageFactory(defaultData.image) ? {
                    create: await defaultData.image.build()
                } : defaultData.image,
                Author: isTopoAuthorFactory(defaultData.Author) ? {
                    create: await defaultData.Author.build()
                } : defaultData.Author
            };
            const data: Prisma.TopoCreateInput = { ...requiredScalarData, ...defaultData, ...defaultAssociations, ...inputData };
            return data;
        };
        const buildList = (inputData: number | readonly Partial<Prisma.TopoCreateInput>[]) => Promise.all(normalizeList(inputData).map(data => build(data)));
        const pickForConnect = (inputData: Topo) => ({
            id: inputData.id
        });
        const create = async (inputData: Partial<Prisma.TopoCreateInput> = {}) => {
            const data = await build(inputData).then(screen);
            return await getClient<PrismaClient>().topo.create({ data });
        };
        const createList = (inputData: number | readonly Partial<Prisma.TopoCreateInput>[]) => Promise.all(normalizeList(inputData).map(data => create(data)));
        const createForConnect = (inputData: Partial<Prisma.TopoCreateInput> = {}) => create(inputData).then(pickForConnect);
        return {
            _factoryFor: "Topo" as const,
            build,
            buildList,
            buildCreateInput: build,
            pickForConnect,
            create,
            createList,
            createForConnect,
        };
    };
    const factory = getFactoryWithTraits();
    const useTraits = (name: TopoTraitKeys<TOptions>, ...names: readonly TopoTraitKeys<TOptions>[]) => {
        return getFactoryWithTraits([name, ...names]);
    };
    return {
        ...factory,
        use: useTraits,
    };
}

/**
 * Define factory for {@link Topo} model.
 *
 * @param options
 * @returns factory {@link TopoFactoryInterface}
 */
export function defineTopoFactory<TOptions extends TopoFactoryDefineOptions>(options: TOptions): TopoFactoryInterface<TOptions> {
    return defineTopoFactoryInternal(options);
}

type RouteScalarOrEnumFields = {
    name: string;
    slug: string;
    kind: RouteKind;
};

type RouteWallFactory = {
    _factoryFor: "Wall";
    build: () => PromiseLike<Prisma.WallCreateNestedOneWithoutRoutesInput["create"]>;
};

type RoutedescriptionFactory = {
    _factoryFor: "TextContent";
    build: () => PromiseLike<Prisma.TextContentCreateNestedOneWithoutRouteInput["create"]>;
};

type RouteRouteLengthFactory = {
    _factoryFor: "RouteLength";
    build: () => PromiseLike<Prisma.RouteLengthCreateNestedOneWithoutRouteInput["create"]>;
};

type RouteRouteGradeFactory = {
    _factoryFor: "RouteGrade";
    build: () => PromiseLike<Prisma.RouteGradeCreateNestedOneWithoutRouteInput["create"]>;
};

type RouteAuthorFactory = {
    _factoryFor: "User";
    build: () => PromiseLike<Prisma.UserCreateNestedOneWithoutAuthorRouteInput["create"]>;
};

type RouteExtendedRouteFactory = {
    _factoryFor: "Route";
    build: () => PromiseLike<Prisma.RouteCreateNestedOneWithoutExtensionInput["create"]>;
};

type RouteVariantRouteFactory = {
    _factoryFor: "Route";
    build: () => PromiseLike<Prisma.RouteCreateNestedOneWithoutVariantInput["create"]>;
};

type RoutePitchFactory = {
    _factoryFor: "Pitch";
    build: () => PromiseLike<Prisma.PitchCreateNestedOneWithoutRouteInput["create"]>;
};

type RouteFactoryDefineInput = {
    id?: string;
    createdAt?: Date;
    updatedAt?: Date;
    name?: string;
    slug?: string;
    unknownName?: boolean;
    position?: number;
    leftRouteId?: string | null;
    rightRouteId?: string | null;
    classic?: boolean;
    kind?: RouteKind;
    isDeleted?: SoftDelete;
    version?: number;
    isVariant?: boolean | null;
    Wall: RouteWallFactory | Prisma.WallCreateNestedOneWithoutRoutesInput;
    description?: RoutedescriptionFactory | Prisma.TextContentCreateNestedOneWithoutRouteInput;
    RouteLength?: RouteRouteLengthFactory | Prisma.RouteLengthCreateNestedOneWithoutRouteInput;
    RoutePath?: Prisma.RoutePathCreateNestedManyWithoutRouteInput;
    RouteGrade?: RouteRouteGradeFactory | Prisma.RouteGradeCreateNestedOneWithoutRouteInput;
    Author: RouteAuthorFactory | Prisma.UserCreateNestedOneWithoutAuthorRouteInput;
    coAuthors?: Prisma.UserCreateNestedManyWithoutCoAuthorRouteInput;
    ExtendedRoute?: RouteExtendedRouteFactory | Prisma.RouteCreateNestedOneWithoutExtensionInput;
    Extension?: Prisma.RouteCreateNestedManyWithoutExtendedRouteInput;
    VariantRoute?: RouteVariantRouteFactory | Prisma.RouteCreateNestedOneWithoutVariantInput;
    Variant?: Prisma.RouteCreateNestedManyWithoutVariantRouteInput;
    Pitch?: RoutePitchFactory | Prisma.PitchCreateNestedOneWithoutRouteInput;
    RouteEvaluation?: Prisma.RouteEvaluationCreateNestedManyWithoutRouteInput;
    RouteGradeEvaluation?: Prisma.RouteGradeEvaluationCreateNestedManyWithoutRouteInput;
};

type RouteFactoryDefineOptions = {
    defaultData: Resolver<RouteFactoryDefineInput, BuildDataOptions>;
    traits?: {
        [traitName: string | symbol]: {
            data: Resolver<Partial<RouteFactoryDefineInput>, BuildDataOptions>;
        };
    };
};

function isRouteWallFactory(x: RouteWallFactory | Prisma.WallCreateNestedOneWithoutRoutesInput | undefined): x is RouteWallFactory {
    return (x as any)?._factoryFor === "Wall";
}

function isRoutedescriptionFactory(x: RoutedescriptionFactory | Prisma.TextContentCreateNestedOneWithoutRouteInput | undefined): x is RoutedescriptionFactory {
    return (x as any)?._factoryFor === "TextContent";
}

function isRouteRouteLengthFactory(x: RouteRouteLengthFactory | Prisma.RouteLengthCreateNestedOneWithoutRouteInput | undefined): x is RouteRouteLengthFactory {
    return (x as any)?._factoryFor === "RouteLength";
}

function isRouteRouteGradeFactory(x: RouteRouteGradeFactory | Prisma.RouteGradeCreateNestedOneWithoutRouteInput | undefined): x is RouteRouteGradeFactory {
    return (x as any)?._factoryFor === "RouteGrade";
}

function isRouteAuthorFactory(x: RouteAuthorFactory | Prisma.UserCreateNestedOneWithoutAuthorRouteInput | undefined): x is RouteAuthorFactory {
    return (x as any)?._factoryFor === "User";
}

function isRouteExtendedRouteFactory(x: RouteExtendedRouteFactory | Prisma.RouteCreateNestedOneWithoutExtensionInput | undefined): x is RouteExtendedRouteFactory {
    return (x as any)?._factoryFor === "Route";
}

function isRouteVariantRouteFactory(x: RouteVariantRouteFactory | Prisma.RouteCreateNestedOneWithoutVariantInput | undefined): x is RouteVariantRouteFactory {
    return (x as any)?._factoryFor === "Route";
}

function isRoutePitchFactory(x: RoutePitchFactory | Prisma.PitchCreateNestedOneWithoutRouteInput | undefined): x is RoutePitchFactory {
    return (x as any)?._factoryFor === "Pitch";
}

type RouteTraitKeys<TOptions extends RouteFactoryDefineOptions> = keyof TOptions["traits"];

export interface RouteFactoryInterfaceWithoutTraits {
    readonly _factoryFor: "Route";
    build(inputData?: Partial<Prisma.RouteCreateInput>): PromiseLike<Prisma.RouteCreateInput>;
    buildCreateInput(inputData?: Partial<Prisma.RouteCreateInput>): PromiseLike<Prisma.RouteCreateInput>;
    buildList(inputData: number | readonly Partial<Prisma.RouteCreateInput>[]): PromiseLike<Prisma.RouteCreateInput[]>;
    pickForConnect(inputData: Route): Pick<Route, "id">;
    create(inputData?: Partial<Prisma.RouteCreateInput>): PromiseLike<Route>;
    createList(inputData: number | readonly Partial<Prisma.RouteCreateInput>[]): PromiseLike<Route[]>;
    createForConnect(inputData?: Partial<Prisma.RouteCreateInput>): PromiseLike<Pick<Route, "id">>;
}

export interface RouteFactoryInterface<TOptions extends RouteFactoryDefineOptions = RouteFactoryDefineOptions> extends RouteFactoryInterfaceWithoutTraits {
    use(name: RouteTraitKeys<TOptions>, ...names: readonly RouteTraitKeys<TOptions>[]): RouteFactoryInterfaceWithoutTraits;
}

function autoGenerateRouteScalarsOrEnums({ seq }: {
    readonly seq: number;
}): RouteScalarOrEnumFields {
    return {
        name: getScalarFieldValueGenerator().String({ modelName: "Route", fieldName: "name", isId: false, isUnique: false, seq }),
        slug: getScalarFieldValueGenerator().String({ modelName: "Route", fieldName: "slug", isId: false, isUnique: false, seq }),
        kind: "Sport"
    };
}

function defineRouteFactoryInternal<TOptions extends RouteFactoryDefineOptions>({ defaultData: defaultDataResolver, traits: traitsDefs = {} }: TOptions): RouteFactoryInterface<TOptions> {
    const getFactoryWithTraits = (traitKeys: readonly RouteTraitKeys<TOptions>[] = []) => {
        const seqKey = {};
        const getSeq = () => getSequenceCounter(seqKey);
        const screen = createScreener("Route", modelFieldDefinitions);
        const build = async (inputData: Partial<Prisma.RouteCreateInput> = {}) => {
            const seq = getSeq();
            const requiredScalarData = autoGenerateRouteScalarsOrEnums({ seq });
            const resolveValue = normalizeResolver<RouteFactoryDefineInput, BuildDataOptions>(defaultDataResolver ?? {});
            const defaultData = await traitKeys.reduce(async (queue, traitKey) => {
                const acc = await queue;
                const resolveTraitValue = normalizeResolver<Partial<RouteFactoryDefineInput>, BuildDataOptions>(traitsDefs[traitKey]?.data ?? {});
                const traitData = await resolveTraitValue({ seq });
                return {
                    ...acc,
                    ...traitData,
                };
            }, resolveValue({ seq }));
            const defaultAssociations = {
                Wall: isRouteWallFactory(defaultData.Wall) ? {
                    create: await defaultData.Wall.build()
                } : defaultData.Wall,
                description: isRoutedescriptionFactory(defaultData.description) ? {
                    create: await defaultData.description.build()
                } : defaultData.description,
                RouteLength: isRouteRouteLengthFactory(defaultData.RouteLength) ? {
                    create: await defaultData.RouteLength.build()
                } : defaultData.RouteLength,
                RouteGrade: isRouteRouteGradeFactory(defaultData.RouteGrade) ? {
                    create: await defaultData.RouteGrade.build()
                } : defaultData.RouteGrade,
                Author: isRouteAuthorFactory(defaultData.Author) ? {
                    create: await defaultData.Author.build()
                } : defaultData.Author,
                ExtendedRoute: isRouteExtendedRouteFactory(defaultData.ExtendedRoute) ? {
                    create: await defaultData.ExtendedRoute.build()
                } : defaultData.ExtendedRoute,
                VariantRoute: isRouteVariantRouteFactory(defaultData.VariantRoute) ? {
                    create: await defaultData.VariantRoute.build()
                } : defaultData.VariantRoute,
                Pitch: isRoutePitchFactory(defaultData.Pitch) ? {
                    create: await defaultData.Pitch.build()
                } : defaultData.Pitch
            };
            const data: Prisma.RouteCreateInput = { ...requiredScalarData, ...defaultData, ...defaultAssociations, ...inputData };
            return data;
        };
        const buildList = (inputData: number | readonly Partial<Prisma.RouteCreateInput>[]) => Promise.all(normalizeList(inputData).map(data => build(data)));
        const pickForConnect = (inputData: Route) => ({
            id: inputData.id
        });
        const create = async (inputData: Partial<Prisma.RouteCreateInput> = {}) => {
            const data = await build(inputData).then(screen);
            return await getClient<PrismaClient>().route.create({ data });
        };
        const createList = (inputData: number | readonly Partial<Prisma.RouteCreateInput>[]) => Promise.all(normalizeList(inputData).map(data => create(data)));
        const createForConnect = (inputData: Partial<Prisma.RouteCreateInput> = {}) => create(inputData).then(pickForConnect);
        return {
            _factoryFor: "Route" as const,
            build,
            buildList,
            buildCreateInput: build,
            pickForConnect,
            create,
            createList,
            createForConnect,
        };
    };
    const factory = getFactoryWithTraits();
    const useTraits = (name: RouteTraitKeys<TOptions>, ...names: readonly RouteTraitKeys<TOptions>[]) => {
        return getFactoryWithTraits([name, ...names]);
    };
    return {
        ...factory,
        use: useTraits,
    };
}

/**
 * Define factory for {@link Route} model.
 *
 * @param options
 * @returns factory {@link RouteFactoryInterface}
 */
export function defineRouteFactory<TOptions extends RouteFactoryDefineOptions>(options: TOptions): RouteFactoryInterface<TOptions> {
    return defineRouteFactoryInternal(options);
}

type RouteLengthScalarOrEnumFields = {
    length: (Prisma.Decimal | Prisma.DecimalJsLike | string);
    unit: Unit;
};

type RouteLengthRouteFactory = {
    _factoryFor: "Route";
    build: () => PromiseLike<Prisma.RouteCreateNestedOneWithoutRouteLengthInput["create"]>;
};

type RouteLengthFactoryDefineInput = {
    id?: string;
    createdAt?: Date;
    updatedAt?: Date;
    length?: (Prisma.Decimal | Prisma.DecimalJsLike | string);
    unit?: Unit;
    Route: RouteLengthRouteFactory | Prisma.RouteCreateNestedOneWithoutRouteLengthInput;
};

type RouteLengthFactoryDefineOptions = {
    defaultData: Resolver<RouteLengthFactoryDefineInput, BuildDataOptions>;
    traits?: {
        [traitName: string | symbol]: {
            data: Resolver<Partial<RouteLengthFactoryDefineInput>, BuildDataOptions>;
        };
    };
};

function isRouteLengthRouteFactory(x: RouteLengthRouteFactory | Prisma.RouteCreateNestedOneWithoutRouteLengthInput | undefined): x is RouteLengthRouteFactory {
    return (x as any)?._factoryFor === "Route";
}

type RouteLengthTraitKeys<TOptions extends RouteLengthFactoryDefineOptions> = keyof TOptions["traits"];

export interface RouteLengthFactoryInterfaceWithoutTraits {
    readonly _factoryFor: "RouteLength";
    build(inputData?: Partial<Prisma.RouteLengthCreateInput>): PromiseLike<Prisma.RouteLengthCreateInput>;
    buildCreateInput(inputData?: Partial<Prisma.RouteLengthCreateInput>): PromiseLike<Prisma.RouteLengthCreateInput>;
    buildList(inputData: number | readonly Partial<Prisma.RouteLengthCreateInput>[]): PromiseLike<Prisma.RouteLengthCreateInput[]>;
    pickForConnect(inputData: RouteLength): Pick<RouteLength, "id">;
    create(inputData?: Partial<Prisma.RouteLengthCreateInput>): PromiseLike<RouteLength>;
    createList(inputData: number | readonly Partial<Prisma.RouteLengthCreateInput>[]): PromiseLike<RouteLength[]>;
    createForConnect(inputData?: Partial<Prisma.RouteLengthCreateInput>): PromiseLike<Pick<RouteLength, "id">>;
}

export interface RouteLengthFactoryInterface<TOptions extends RouteLengthFactoryDefineOptions = RouteLengthFactoryDefineOptions> extends RouteLengthFactoryInterfaceWithoutTraits {
    use(name: RouteLengthTraitKeys<TOptions>, ...names: readonly RouteLengthTraitKeys<TOptions>[]): RouteLengthFactoryInterfaceWithoutTraits;
}

function autoGenerateRouteLengthScalarsOrEnums({ seq }: {
    readonly seq: number;
}): RouteLengthScalarOrEnumFields {
    return {
        length: getScalarFieldValueGenerator().Decimal({ modelName: "RouteLength", fieldName: "length", isId: false, isUnique: false, seq }),
        unit: "Metric"
    };
}

function defineRouteLengthFactoryInternal<TOptions extends RouteLengthFactoryDefineOptions>({ defaultData: defaultDataResolver, traits: traitsDefs = {} }: TOptions): RouteLengthFactoryInterface<TOptions> {
    const getFactoryWithTraits = (traitKeys: readonly RouteLengthTraitKeys<TOptions>[] = []) => {
        const seqKey = {};
        const getSeq = () => getSequenceCounter(seqKey);
        const screen = createScreener("RouteLength", modelFieldDefinitions);
        const build = async (inputData: Partial<Prisma.RouteLengthCreateInput> = {}) => {
            const seq = getSeq();
            const requiredScalarData = autoGenerateRouteLengthScalarsOrEnums({ seq });
            const resolveValue = normalizeResolver<RouteLengthFactoryDefineInput, BuildDataOptions>(defaultDataResolver ?? {});
            const defaultData = await traitKeys.reduce(async (queue, traitKey) => {
                const acc = await queue;
                const resolveTraitValue = normalizeResolver<Partial<RouteLengthFactoryDefineInput>, BuildDataOptions>(traitsDefs[traitKey]?.data ?? {});
                const traitData = await resolveTraitValue({ seq });
                return {
                    ...acc,
                    ...traitData,
                };
            }, resolveValue({ seq }));
            const defaultAssociations = {
                Route: isRouteLengthRouteFactory(defaultData.Route) ? {
                    create: await defaultData.Route.build()
                } : defaultData.Route
            };
            const data: Prisma.RouteLengthCreateInput = { ...requiredScalarData, ...defaultData, ...defaultAssociations, ...inputData };
            return data;
        };
        const buildList = (inputData: number | readonly Partial<Prisma.RouteLengthCreateInput>[]) => Promise.all(normalizeList(inputData).map(data => build(data)));
        const pickForConnect = (inputData: RouteLength) => ({
            id: inputData.id
        });
        const create = async (inputData: Partial<Prisma.RouteLengthCreateInput> = {}) => {
            const data = await build(inputData).then(screen);
            return await getClient<PrismaClient>().routeLength.create({ data });
        };
        const createList = (inputData: number | readonly Partial<Prisma.RouteLengthCreateInput>[]) => Promise.all(normalizeList(inputData).map(data => create(data)));
        const createForConnect = (inputData: Partial<Prisma.RouteLengthCreateInput> = {}) => create(inputData).then(pickForConnect);
        return {
            _factoryFor: "RouteLength" as const,
            build,
            buildList,
            buildCreateInput: build,
            pickForConnect,
            create,
            createList,
            createForConnect,
        };
    };
    const factory = getFactoryWithTraits();
    const useTraits = (name: RouteLengthTraitKeys<TOptions>, ...names: readonly RouteLengthTraitKeys<TOptions>[]) => {
        return getFactoryWithTraits([name, ...names]);
    };
    return {
        ...factory,
        use: useTraits,
    };
}

/**
 * Define factory for {@link RouteLength} model.
 *
 * @param options
 * @returns factory {@link RouteLengthFactoryInterface}
 */
export function defineRouteLengthFactory<TOptions extends RouteLengthFactoryDefineOptions>(options: TOptions): RouteLengthFactoryInterface<TOptions> {
    return defineRouteLengthFactoryInternal(options);
}

type MultiPitchScalarOrEnumFields = {
    name: string;
    slug: string;
};

type MultiPitchWallFactory = {
    _factoryFor: "Wall";
    build: () => PromiseLike<Prisma.WallCreateNestedOneWithoutMultiPitchInput["create"]>;
};

type MultiPitchAuthorFactory = {
    _factoryFor: "User";
    build: () => PromiseLike<Prisma.UserCreateNestedOneWithoutAuthorMultiPitchInput["create"]>;
};

type MultiPitchFactoryDefineInput = {
    id?: string;
    createdAt?: Date;
    updatedAt?: Date;
    position?: number;
    name?: string;
    slug?: string;
    unknownName?: boolean;
    description?: string | null;
    isDeleted?: SoftDelete;
    version?: number;
    Pitches?: Prisma.PitchCreateNestedManyWithoutMultiPitchInput;
    Wall: MultiPitchWallFactory | Prisma.WallCreateNestedOneWithoutMultiPitchInput;
    Author: MultiPitchAuthorFactory | Prisma.UserCreateNestedOneWithoutAuthorMultiPitchInput;
    coAuthors?: Prisma.UserCreateNestedManyWithoutCoAuthorMultiPitchInput;
};

type MultiPitchFactoryDefineOptions = {
    defaultData: Resolver<MultiPitchFactoryDefineInput, BuildDataOptions>;
    traits?: {
        [traitName: string | symbol]: {
            data: Resolver<Partial<MultiPitchFactoryDefineInput>, BuildDataOptions>;
        };
    };
};

function isMultiPitchWallFactory(x: MultiPitchWallFactory | Prisma.WallCreateNestedOneWithoutMultiPitchInput | undefined): x is MultiPitchWallFactory {
    return (x as any)?._factoryFor === "Wall";
}

function isMultiPitchAuthorFactory(x: MultiPitchAuthorFactory | Prisma.UserCreateNestedOneWithoutAuthorMultiPitchInput | undefined): x is MultiPitchAuthorFactory {
    return (x as any)?._factoryFor === "User";
}

type MultiPitchTraitKeys<TOptions extends MultiPitchFactoryDefineOptions> = keyof TOptions["traits"];

export interface MultiPitchFactoryInterfaceWithoutTraits {
    readonly _factoryFor: "MultiPitch";
    build(inputData?: Partial<Prisma.MultiPitchCreateInput>): PromiseLike<Prisma.MultiPitchCreateInput>;
    buildCreateInput(inputData?: Partial<Prisma.MultiPitchCreateInput>): PromiseLike<Prisma.MultiPitchCreateInput>;
    buildList(inputData: number | readonly Partial<Prisma.MultiPitchCreateInput>[]): PromiseLike<Prisma.MultiPitchCreateInput[]>;
    pickForConnect(inputData: MultiPitch): Pick<MultiPitch, "id">;
    create(inputData?: Partial<Prisma.MultiPitchCreateInput>): PromiseLike<MultiPitch>;
    createList(inputData: number | readonly Partial<Prisma.MultiPitchCreateInput>[]): PromiseLike<MultiPitch[]>;
    createForConnect(inputData?: Partial<Prisma.MultiPitchCreateInput>): PromiseLike<Pick<MultiPitch, "id">>;
}

export interface MultiPitchFactoryInterface<TOptions extends MultiPitchFactoryDefineOptions = MultiPitchFactoryDefineOptions> extends MultiPitchFactoryInterfaceWithoutTraits {
    use(name: MultiPitchTraitKeys<TOptions>, ...names: readonly MultiPitchTraitKeys<TOptions>[]): MultiPitchFactoryInterfaceWithoutTraits;
}

function autoGenerateMultiPitchScalarsOrEnums({ seq }: {
    readonly seq: number;
}): MultiPitchScalarOrEnumFields {
    return {
        name: getScalarFieldValueGenerator().String({ modelName: "MultiPitch", fieldName: "name", isId: false, isUnique: false, seq }),
        slug: getScalarFieldValueGenerator().String({ modelName: "MultiPitch", fieldName: "slug", isId: false, isUnique: false, seq })
    };
}

function defineMultiPitchFactoryInternal<TOptions extends MultiPitchFactoryDefineOptions>({ defaultData: defaultDataResolver, traits: traitsDefs = {} }: TOptions): MultiPitchFactoryInterface<TOptions> {
    const getFactoryWithTraits = (traitKeys: readonly MultiPitchTraitKeys<TOptions>[] = []) => {
        const seqKey = {};
        const getSeq = () => getSequenceCounter(seqKey);
        const screen = createScreener("MultiPitch", modelFieldDefinitions);
        const build = async (inputData: Partial<Prisma.MultiPitchCreateInput> = {}) => {
            const seq = getSeq();
            const requiredScalarData = autoGenerateMultiPitchScalarsOrEnums({ seq });
            const resolveValue = normalizeResolver<MultiPitchFactoryDefineInput, BuildDataOptions>(defaultDataResolver ?? {});
            const defaultData = await traitKeys.reduce(async (queue, traitKey) => {
                const acc = await queue;
                const resolveTraitValue = normalizeResolver<Partial<MultiPitchFactoryDefineInput>, BuildDataOptions>(traitsDefs[traitKey]?.data ?? {});
                const traitData = await resolveTraitValue({ seq });
                return {
                    ...acc,
                    ...traitData,
                };
            }, resolveValue({ seq }));
            const defaultAssociations = {
                Wall: isMultiPitchWallFactory(defaultData.Wall) ? {
                    create: await defaultData.Wall.build()
                } : defaultData.Wall,
                Author: isMultiPitchAuthorFactory(defaultData.Author) ? {
                    create: await defaultData.Author.build()
                } : defaultData.Author
            };
            const data: Prisma.MultiPitchCreateInput = { ...requiredScalarData, ...defaultData, ...defaultAssociations, ...inputData };
            return data;
        };
        const buildList = (inputData: number | readonly Partial<Prisma.MultiPitchCreateInput>[]) => Promise.all(normalizeList(inputData).map(data => build(data)));
        const pickForConnect = (inputData: MultiPitch) => ({
            id: inputData.id
        });
        const create = async (inputData: Partial<Prisma.MultiPitchCreateInput> = {}) => {
            const data = await build(inputData).then(screen);
            return await getClient<PrismaClient>().multiPitch.create({ data });
        };
        const createList = (inputData: number | readonly Partial<Prisma.MultiPitchCreateInput>[]) => Promise.all(normalizeList(inputData).map(data => create(data)));
        const createForConnect = (inputData: Partial<Prisma.MultiPitchCreateInput> = {}) => create(inputData).then(pickForConnect);
        return {
            _factoryFor: "MultiPitch" as const,
            build,
            buildList,
            buildCreateInput: build,
            pickForConnect,
            create,
            createList,
            createForConnect,
        };
    };
    const factory = getFactoryWithTraits();
    const useTraits = (name: MultiPitchTraitKeys<TOptions>, ...names: readonly MultiPitchTraitKeys<TOptions>[]) => {
        return getFactoryWithTraits([name, ...names]);
    };
    return {
        ...factory,
        use: useTraits,
    };
}

/**
 * Define factory for {@link MultiPitch} model.
 *
 * @param options
 * @returns factory {@link MultiPitchFactoryInterface}
 */
export function defineMultiPitchFactory<TOptions extends MultiPitchFactoryDefineOptions>(options: TOptions): MultiPitchFactoryInterface<TOptions> {
    return defineMultiPitchFactoryInternal(options);
}

type PitchScalarOrEnumFields = {
    number: (Prisma.Decimal | Prisma.DecimalJsLike | string);
};

type PitchRouteFactory = {
    _factoryFor: "Route";
    build: () => PromiseLike<Prisma.RouteCreateNestedOneWithoutPitchInput["create"]>;
};

type PitchMultiPitchFactory = {
    _factoryFor: "MultiPitch";
    build: () => PromiseLike<Prisma.MultiPitchCreateNestedOneWithoutPitchesInput["create"]>;
};

type PitchVariantPitchFactory = {
    _factoryFor: "Pitch";
    build: () => PromiseLike<Prisma.PitchCreateNestedOneWithoutVariantInput["create"]>;
};

type PitchFactoryDefineInput = {
    id?: string;
    createdAt?: Date;
    updatedAt?: Date;
    number?: (Prisma.Decimal | Prisma.DecimalJsLike | string);
    isDeleted?: SoftDelete;
    version?: number;
    pitchType?: PitchType;
    Route: PitchRouteFactory | Prisma.RouteCreateNestedOneWithoutPitchInput;
    MultiPitch: PitchMultiPitchFactory | Prisma.MultiPitchCreateNestedOneWithoutPitchesInput;
    VariantPitch?: PitchVariantPitchFactory | Prisma.PitchCreateNestedOneWithoutVariantInput;
    Variant?: Prisma.PitchCreateNestedManyWithoutVariantPitchInput;
};

type PitchFactoryDefineOptions = {
    defaultData: Resolver<PitchFactoryDefineInput, BuildDataOptions>;
    traits?: {
        [traitName: string | symbol]: {
            data: Resolver<Partial<PitchFactoryDefineInput>, BuildDataOptions>;
        };
    };
};

function isPitchRouteFactory(x: PitchRouteFactory | Prisma.RouteCreateNestedOneWithoutPitchInput | undefined): x is PitchRouteFactory {
    return (x as any)?._factoryFor === "Route";
}

function isPitchMultiPitchFactory(x: PitchMultiPitchFactory | Prisma.MultiPitchCreateNestedOneWithoutPitchesInput | undefined): x is PitchMultiPitchFactory {
    return (x as any)?._factoryFor === "MultiPitch";
}

function isPitchVariantPitchFactory(x: PitchVariantPitchFactory | Prisma.PitchCreateNestedOneWithoutVariantInput | undefined): x is PitchVariantPitchFactory {
    return (x as any)?._factoryFor === "Pitch";
}

type PitchTraitKeys<TOptions extends PitchFactoryDefineOptions> = keyof TOptions["traits"];

export interface PitchFactoryInterfaceWithoutTraits {
    readonly _factoryFor: "Pitch";
    build(inputData?: Partial<Prisma.PitchCreateInput>): PromiseLike<Prisma.PitchCreateInput>;
    buildCreateInput(inputData?: Partial<Prisma.PitchCreateInput>): PromiseLike<Prisma.PitchCreateInput>;
    buildList(inputData: number | readonly Partial<Prisma.PitchCreateInput>[]): PromiseLike<Prisma.PitchCreateInput[]>;
    pickForConnect(inputData: Pitch): Pick<Pitch, "id">;
    create(inputData?: Partial<Prisma.PitchCreateInput>): PromiseLike<Pitch>;
    createList(inputData: number | readonly Partial<Prisma.PitchCreateInput>[]): PromiseLike<Pitch[]>;
    createForConnect(inputData?: Partial<Prisma.PitchCreateInput>): PromiseLike<Pick<Pitch, "id">>;
}

export interface PitchFactoryInterface<TOptions extends PitchFactoryDefineOptions = PitchFactoryDefineOptions> extends PitchFactoryInterfaceWithoutTraits {
    use(name: PitchTraitKeys<TOptions>, ...names: readonly PitchTraitKeys<TOptions>[]): PitchFactoryInterfaceWithoutTraits;
}

function autoGeneratePitchScalarsOrEnums({ seq }: {
    readonly seq: number;
}): PitchScalarOrEnumFields {
    return {
        number: getScalarFieldValueGenerator().Decimal({ modelName: "Pitch", fieldName: "number", isId: false, isUnique: false, seq })
    };
}

function definePitchFactoryInternal<TOptions extends PitchFactoryDefineOptions>({ defaultData: defaultDataResolver, traits: traitsDefs = {} }: TOptions): PitchFactoryInterface<TOptions> {
    const getFactoryWithTraits = (traitKeys: readonly PitchTraitKeys<TOptions>[] = []) => {
        const seqKey = {};
        const getSeq = () => getSequenceCounter(seqKey);
        const screen = createScreener("Pitch", modelFieldDefinitions);
        const build = async (inputData: Partial<Prisma.PitchCreateInput> = {}) => {
            const seq = getSeq();
            const requiredScalarData = autoGeneratePitchScalarsOrEnums({ seq });
            const resolveValue = normalizeResolver<PitchFactoryDefineInput, BuildDataOptions>(defaultDataResolver ?? {});
            const defaultData = await traitKeys.reduce(async (queue, traitKey) => {
                const acc = await queue;
                const resolveTraitValue = normalizeResolver<Partial<PitchFactoryDefineInput>, BuildDataOptions>(traitsDefs[traitKey]?.data ?? {});
                const traitData = await resolveTraitValue({ seq });
                return {
                    ...acc,
                    ...traitData,
                };
            }, resolveValue({ seq }));
            const defaultAssociations = {
                Route: isPitchRouteFactory(defaultData.Route) ? {
                    create: await defaultData.Route.build()
                } : defaultData.Route,
                MultiPitch: isPitchMultiPitchFactory(defaultData.MultiPitch) ? {
                    create: await defaultData.MultiPitch.build()
                } : defaultData.MultiPitch,
                VariantPitch: isPitchVariantPitchFactory(defaultData.VariantPitch) ? {
                    create: await defaultData.VariantPitch.build()
                } : defaultData.VariantPitch
            };
            const data: Prisma.PitchCreateInput = { ...requiredScalarData, ...defaultData, ...defaultAssociations, ...inputData };
            return data;
        };
        const buildList = (inputData: number | readonly Partial<Prisma.PitchCreateInput>[]) => Promise.all(normalizeList(inputData).map(data => build(data)));
        const pickForConnect = (inputData: Pitch) => ({
            id: inputData.id
        });
        const create = async (inputData: Partial<Prisma.PitchCreateInput> = {}) => {
            const data = await build(inputData).then(screen);
            return await getClient<PrismaClient>().pitch.create({ data });
        };
        const createList = (inputData: number | readonly Partial<Prisma.PitchCreateInput>[]) => Promise.all(normalizeList(inputData).map(data => create(data)));
        const createForConnect = (inputData: Partial<Prisma.PitchCreateInput> = {}) => create(inputData).then(pickForConnect);
        return {
            _factoryFor: "Pitch" as const,
            build,
            buildList,
            buildCreateInput: build,
            pickForConnect,
            create,
            createList,
            createForConnect,
        };
    };
    const factory = getFactoryWithTraits();
    const useTraits = (name: PitchTraitKeys<TOptions>, ...names: readonly PitchTraitKeys<TOptions>[]) => {
        return getFactoryWithTraits([name, ...names]);
    };
    return {
        ...factory,
        use: useTraits,
    };
}

/**
 * Define factory for {@link Pitch} model.
 *
 * @param options
 * @returns factory {@link PitchFactoryInterface}
 */
export function definePitchFactory<TOptions extends PitchFactoryDefineOptions>(options: TOptions): PitchFactoryInterface<TOptions> {
    return definePitchFactoryInternal(options);
}

type RouteGradeScalarOrEnumFields = {};

type RouteGraderouteFactory = {
    _factoryFor: "Route";
    build: () => PromiseLike<Prisma.RouteCreateNestedOneWithoutRouteGradeInput["create"]>;
};

type RouteGradeFactoryDefineInput = {
    id?: string;
    createdAt?: Date;
    updatedAt?: Date;
    grade?: number | null;
    project?: boolean;
    slashGrade?: boolean;
    isDeleted?: SoftDelete;
    version?: number;
    originalGradeSystem?: GradeSystems;
    originalGrade?: string | null;
    route: RouteGraderouteFactory | Prisma.RouteCreateNestedOneWithoutRouteGradeInput;
};

type RouteGradeFactoryDefineOptions = {
    defaultData: Resolver<RouteGradeFactoryDefineInput, BuildDataOptions>;
    traits?: {
        [traitName: string | symbol]: {
            data: Resolver<Partial<RouteGradeFactoryDefineInput>, BuildDataOptions>;
        };
    };
};

function isRouteGraderouteFactory(x: RouteGraderouteFactory | Prisma.RouteCreateNestedOneWithoutRouteGradeInput | undefined): x is RouteGraderouteFactory {
    return (x as any)?._factoryFor === "Route";
}

type RouteGradeTraitKeys<TOptions extends RouteGradeFactoryDefineOptions> = keyof TOptions["traits"];

export interface RouteGradeFactoryInterfaceWithoutTraits {
    readonly _factoryFor: "RouteGrade";
    build(inputData?: Partial<Prisma.RouteGradeCreateInput>): PromiseLike<Prisma.RouteGradeCreateInput>;
    buildCreateInput(inputData?: Partial<Prisma.RouteGradeCreateInput>): PromiseLike<Prisma.RouteGradeCreateInput>;
    buildList(inputData: number | readonly Partial<Prisma.RouteGradeCreateInput>[]): PromiseLike<Prisma.RouteGradeCreateInput[]>;
    pickForConnect(inputData: RouteGrade): Pick<RouteGrade, "id">;
    create(inputData?: Partial<Prisma.RouteGradeCreateInput>): PromiseLike<RouteGrade>;
    createList(inputData: number | readonly Partial<Prisma.RouteGradeCreateInput>[]): PromiseLike<RouteGrade[]>;
    createForConnect(inputData?: Partial<Prisma.RouteGradeCreateInput>): PromiseLike<Pick<RouteGrade, "id">>;
}

export interface RouteGradeFactoryInterface<TOptions extends RouteGradeFactoryDefineOptions = RouteGradeFactoryDefineOptions> extends RouteGradeFactoryInterfaceWithoutTraits {
    use(name: RouteGradeTraitKeys<TOptions>, ...names: readonly RouteGradeTraitKeys<TOptions>[]): RouteGradeFactoryInterfaceWithoutTraits;
}

function autoGenerateRouteGradeScalarsOrEnums({ seq }: {
    readonly seq: number;
}): RouteGradeScalarOrEnumFields {
    return {};
}

function defineRouteGradeFactoryInternal<TOptions extends RouteGradeFactoryDefineOptions>({ defaultData: defaultDataResolver, traits: traitsDefs = {} }: TOptions): RouteGradeFactoryInterface<TOptions> {
    const getFactoryWithTraits = (traitKeys: readonly RouteGradeTraitKeys<TOptions>[] = []) => {
        const seqKey = {};
        const getSeq = () => getSequenceCounter(seqKey);
        const screen = createScreener("RouteGrade", modelFieldDefinitions);
        const build = async (inputData: Partial<Prisma.RouteGradeCreateInput> = {}) => {
            const seq = getSeq();
            const requiredScalarData = autoGenerateRouteGradeScalarsOrEnums({ seq });
            const resolveValue = normalizeResolver<RouteGradeFactoryDefineInput, BuildDataOptions>(defaultDataResolver ?? {});
            const defaultData = await traitKeys.reduce(async (queue, traitKey) => {
                const acc = await queue;
                const resolveTraitValue = normalizeResolver<Partial<RouteGradeFactoryDefineInput>, BuildDataOptions>(traitsDefs[traitKey]?.data ?? {});
                const traitData = await resolveTraitValue({ seq });
                return {
                    ...acc,
                    ...traitData,
                };
            }, resolveValue({ seq }));
            const defaultAssociations = {
                route: isRouteGraderouteFactory(defaultData.route) ? {
                    create: await defaultData.route.build()
                } : defaultData.route
            };
            const data: Prisma.RouteGradeCreateInput = { ...requiredScalarData, ...defaultData, ...defaultAssociations, ...inputData };
            return data;
        };
        const buildList = (inputData: number | readonly Partial<Prisma.RouteGradeCreateInput>[]) => Promise.all(normalizeList(inputData).map(data => build(data)));
        const pickForConnect = (inputData: RouteGrade) => ({
            id: inputData.id
        });
        const create = async (inputData: Partial<Prisma.RouteGradeCreateInput> = {}) => {
            const data = await build(inputData).then(screen);
            return await getClient<PrismaClient>().routeGrade.create({ data });
        };
        const createList = (inputData: number | readonly Partial<Prisma.RouteGradeCreateInput>[]) => Promise.all(normalizeList(inputData).map(data => create(data)));
        const createForConnect = (inputData: Partial<Prisma.RouteGradeCreateInput> = {}) => create(inputData).then(pickForConnect);
        return {
            _factoryFor: "RouteGrade" as const,
            build,
            buildList,
            buildCreateInput: build,
            pickForConnect,
            create,
            createList,
            createForConnect,
        };
    };
    const factory = getFactoryWithTraits();
    const useTraits = (name: RouteGradeTraitKeys<TOptions>, ...names: readonly RouteGradeTraitKeys<TOptions>[]) => {
        return getFactoryWithTraits([name, ...names]);
    };
    return {
        ...factory,
        use: useTraits,
    };
}

/**
 * Define factory for {@link RouteGrade} model.
 *
 * @param options
 * @returns factory {@link RouteGradeFactoryInterface}
 */
export function defineRouteGradeFactory<TOptions extends RouteGradeFactoryDefineOptions>(options: TOptions): RouteGradeFactoryInterface<TOptions> {
    return defineRouteGradeFactoryInternal(options);
}

type RoutePathScalarOrEnumFields = {
    path: string;
};

type RoutePathTopoFactory = {
    _factoryFor: "Topo";
    build: () => PromiseLike<Prisma.TopoCreateNestedOneWithoutRoutePathInput["create"]>;
};

type RoutePathRouteFactory = {
    _factoryFor: "Route";
    build: () => PromiseLike<Prisma.RouteCreateNestedOneWithoutRoutePathInput["create"]>;
};

type RoutePathAuthorFactory = {
    _factoryFor: "User";
    build: () => PromiseLike<Prisma.UserCreateNestedOneWithoutAuthorRoutePathInput["create"]>;
};

type RoutePathFactoryDefineInput = {
    id?: string;
    createdAt?: Date;
    updatedAt?: Date;
    path?: string;
    labelPoint?: string | null;
    pitchLabelPoint?: string | null;
    hideStart?: boolean;
    isDeleted?: SoftDelete;
    version?: number;
    Topo: RoutePathTopoFactory | Prisma.TopoCreateNestedOneWithoutRoutePathInput;
    Route: RoutePathRouteFactory | Prisma.RouteCreateNestedOneWithoutRoutePathInput;
    Author: RoutePathAuthorFactory | Prisma.UserCreateNestedOneWithoutAuthorRoutePathInput;
    coAuthors?: Prisma.UserCreateNestedManyWithoutCoAuthorRoutePathInput;
};

type RoutePathFactoryDefineOptions = {
    defaultData: Resolver<RoutePathFactoryDefineInput, BuildDataOptions>;
    traits?: {
        [traitName: string | symbol]: {
            data: Resolver<Partial<RoutePathFactoryDefineInput>, BuildDataOptions>;
        };
    };
};

function isRoutePathTopoFactory(x: RoutePathTopoFactory | Prisma.TopoCreateNestedOneWithoutRoutePathInput | undefined): x is RoutePathTopoFactory {
    return (x as any)?._factoryFor === "Topo";
}

function isRoutePathRouteFactory(x: RoutePathRouteFactory | Prisma.RouteCreateNestedOneWithoutRoutePathInput | undefined): x is RoutePathRouteFactory {
    return (x as any)?._factoryFor === "Route";
}

function isRoutePathAuthorFactory(x: RoutePathAuthorFactory | Prisma.UserCreateNestedOneWithoutAuthorRoutePathInput | undefined): x is RoutePathAuthorFactory {
    return (x as any)?._factoryFor === "User";
}

type RoutePathTraitKeys<TOptions extends RoutePathFactoryDefineOptions> = keyof TOptions["traits"];

export interface RoutePathFactoryInterfaceWithoutTraits {
    readonly _factoryFor: "RoutePath";
    build(inputData?: Partial<Prisma.RoutePathCreateInput>): PromiseLike<Prisma.RoutePathCreateInput>;
    buildCreateInput(inputData?: Partial<Prisma.RoutePathCreateInput>): PromiseLike<Prisma.RoutePathCreateInput>;
    buildList(inputData: number | readonly Partial<Prisma.RoutePathCreateInput>[]): PromiseLike<Prisma.RoutePathCreateInput[]>;
    pickForConnect(inputData: RoutePath): Pick<RoutePath, "id">;
    create(inputData?: Partial<Prisma.RoutePathCreateInput>): PromiseLike<RoutePath>;
    createList(inputData: number | readonly Partial<Prisma.RoutePathCreateInput>[]): PromiseLike<RoutePath[]>;
    createForConnect(inputData?: Partial<Prisma.RoutePathCreateInput>): PromiseLike<Pick<RoutePath, "id">>;
}

export interface RoutePathFactoryInterface<TOptions extends RoutePathFactoryDefineOptions = RoutePathFactoryDefineOptions> extends RoutePathFactoryInterfaceWithoutTraits {
    use(name: RoutePathTraitKeys<TOptions>, ...names: readonly RoutePathTraitKeys<TOptions>[]): RoutePathFactoryInterfaceWithoutTraits;
}

function autoGenerateRoutePathScalarsOrEnums({ seq }: {
    readonly seq: number;
}): RoutePathScalarOrEnumFields {
    return {
        path: getScalarFieldValueGenerator().String({ modelName: "RoutePath", fieldName: "path", isId: false, isUnique: false, seq })
    };
}

function defineRoutePathFactoryInternal<TOptions extends RoutePathFactoryDefineOptions>({ defaultData: defaultDataResolver, traits: traitsDefs = {} }: TOptions): RoutePathFactoryInterface<TOptions> {
    const getFactoryWithTraits = (traitKeys: readonly RoutePathTraitKeys<TOptions>[] = []) => {
        const seqKey = {};
        const getSeq = () => getSequenceCounter(seqKey);
        const screen = createScreener("RoutePath", modelFieldDefinitions);
        const build = async (inputData: Partial<Prisma.RoutePathCreateInput> = {}) => {
            const seq = getSeq();
            const requiredScalarData = autoGenerateRoutePathScalarsOrEnums({ seq });
            const resolveValue = normalizeResolver<RoutePathFactoryDefineInput, BuildDataOptions>(defaultDataResolver ?? {});
            const defaultData = await traitKeys.reduce(async (queue, traitKey) => {
                const acc = await queue;
                const resolveTraitValue = normalizeResolver<Partial<RoutePathFactoryDefineInput>, BuildDataOptions>(traitsDefs[traitKey]?.data ?? {});
                const traitData = await resolveTraitValue({ seq });
                return {
                    ...acc,
                    ...traitData,
                };
            }, resolveValue({ seq }));
            const defaultAssociations = {
                Topo: isRoutePathTopoFactory(defaultData.Topo) ? {
                    create: await defaultData.Topo.build()
                } : defaultData.Topo,
                Route: isRoutePathRouteFactory(defaultData.Route) ? {
                    create: await defaultData.Route.build()
                } : defaultData.Route,
                Author: isRoutePathAuthorFactory(defaultData.Author) ? {
                    create: await defaultData.Author.build()
                } : defaultData.Author
            };
            const data: Prisma.RoutePathCreateInput = { ...requiredScalarData, ...defaultData, ...defaultAssociations, ...inputData };
            return data;
        };
        const buildList = (inputData: number | readonly Partial<Prisma.RoutePathCreateInput>[]) => Promise.all(normalizeList(inputData).map(data => build(data)));
        const pickForConnect = (inputData: RoutePath) => ({
            id: inputData.id
        });
        const create = async (inputData: Partial<Prisma.RoutePathCreateInput> = {}) => {
            const data = await build(inputData).then(screen);
            return await getClient<PrismaClient>().routePath.create({ data });
        };
        const createList = (inputData: number | readonly Partial<Prisma.RoutePathCreateInput>[]) => Promise.all(normalizeList(inputData).map(data => create(data)));
        const createForConnect = (inputData: Partial<Prisma.RoutePathCreateInput> = {}) => create(inputData).then(pickForConnect);
        return {
            _factoryFor: "RoutePath" as const,
            build,
            buildList,
            buildCreateInput: build,
            pickForConnect,
            create,
            createList,
            createForConnect,
        };
    };
    const factory = getFactoryWithTraits();
    const useTraits = (name: RoutePathTraitKeys<TOptions>, ...names: readonly RoutePathTraitKeys<TOptions>[]) => {
        return getFactoryWithTraits([name, ...names]);
    };
    return {
        ...factory,
        use: useTraits,
    };
}

/**
 * Define factory for {@link RoutePath} model.
 *
 * @param options
 * @returns factory {@link RoutePathFactoryInterface}
 */
export function defineRoutePathFactory<TOptions extends RoutePathFactoryDefineOptions>(options: TOptions): RoutePathFactoryInterface<TOptions> {
    return defineRoutePathFactoryInternal(options);
}

type RouteEvaluationScalarOrEnumFields = {
    evaluation: (Prisma.Decimal | Prisma.DecimalJsLike | string);
};

type RouteEvaluationRouteFactory = {
    _factoryFor: "Route";
    build: () => PromiseLike<Prisma.RouteCreateNestedOneWithoutRouteEvaluationInput["create"]>;
};

type RouteEvaluationUserFactory = {
    _factoryFor: "User";
    build: () => PromiseLike<Prisma.UserCreateNestedOneWithoutRouteEvaluationInput["create"]>;
};

type RouteEvaluationFactoryDefineInput = {
    id?: string;
    createdAt?: Date;
    updatedAt?: Date;
    evaluation?: (Prisma.Decimal | Prisma.DecimalJsLike | string);
    isDeleted?: SoftDelete;
    Route: RouteEvaluationRouteFactory | Prisma.RouteCreateNestedOneWithoutRouteEvaluationInput;
    User: RouteEvaluationUserFactory | Prisma.UserCreateNestedOneWithoutRouteEvaluationInput;
};

type RouteEvaluationFactoryDefineOptions = {
    defaultData: Resolver<RouteEvaluationFactoryDefineInput, BuildDataOptions>;
    traits?: {
        [traitName: string | symbol]: {
            data: Resolver<Partial<RouteEvaluationFactoryDefineInput>, BuildDataOptions>;
        };
    };
};

function isRouteEvaluationRouteFactory(x: RouteEvaluationRouteFactory | Prisma.RouteCreateNestedOneWithoutRouteEvaluationInput | undefined): x is RouteEvaluationRouteFactory {
    return (x as any)?._factoryFor === "Route";
}

function isRouteEvaluationUserFactory(x: RouteEvaluationUserFactory | Prisma.UserCreateNestedOneWithoutRouteEvaluationInput | undefined): x is RouteEvaluationUserFactory {
    return (x as any)?._factoryFor === "User";
}

type RouteEvaluationTraitKeys<TOptions extends RouteEvaluationFactoryDefineOptions> = keyof TOptions["traits"];

export interface RouteEvaluationFactoryInterfaceWithoutTraits {
    readonly _factoryFor: "RouteEvaluation";
    build(inputData?: Partial<Prisma.RouteEvaluationCreateInput>): PromiseLike<Prisma.RouteEvaluationCreateInput>;
    buildCreateInput(inputData?: Partial<Prisma.RouteEvaluationCreateInput>): PromiseLike<Prisma.RouteEvaluationCreateInput>;
    buildList(inputData: number | readonly Partial<Prisma.RouteEvaluationCreateInput>[]): PromiseLike<Prisma.RouteEvaluationCreateInput[]>;
    pickForConnect(inputData: RouteEvaluation): Pick<RouteEvaluation, "id">;
    create(inputData?: Partial<Prisma.RouteEvaluationCreateInput>): PromiseLike<RouteEvaluation>;
    createList(inputData: number | readonly Partial<Prisma.RouteEvaluationCreateInput>[]): PromiseLike<RouteEvaluation[]>;
    createForConnect(inputData?: Partial<Prisma.RouteEvaluationCreateInput>): PromiseLike<Pick<RouteEvaluation, "id">>;
}

export interface RouteEvaluationFactoryInterface<TOptions extends RouteEvaluationFactoryDefineOptions = RouteEvaluationFactoryDefineOptions> extends RouteEvaluationFactoryInterfaceWithoutTraits {
    use(name: RouteEvaluationTraitKeys<TOptions>, ...names: readonly RouteEvaluationTraitKeys<TOptions>[]): RouteEvaluationFactoryInterfaceWithoutTraits;
}

function autoGenerateRouteEvaluationScalarsOrEnums({ seq }: {
    readonly seq: number;
}): RouteEvaluationScalarOrEnumFields {
    return {
        evaluation: getScalarFieldValueGenerator().Decimal({ modelName: "RouteEvaluation", fieldName: "evaluation", isId: false, isUnique: false, seq })
    };
}

function defineRouteEvaluationFactoryInternal<TOptions extends RouteEvaluationFactoryDefineOptions>({ defaultData: defaultDataResolver, traits: traitsDefs = {} }: TOptions): RouteEvaluationFactoryInterface<TOptions> {
    const getFactoryWithTraits = (traitKeys: readonly RouteEvaluationTraitKeys<TOptions>[] = []) => {
        const seqKey = {};
        const getSeq = () => getSequenceCounter(seqKey);
        const screen = createScreener("RouteEvaluation", modelFieldDefinitions);
        const build = async (inputData: Partial<Prisma.RouteEvaluationCreateInput> = {}) => {
            const seq = getSeq();
            const requiredScalarData = autoGenerateRouteEvaluationScalarsOrEnums({ seq });
            const resolveValue = normalizeResolver<RouteEvaluationFactoryDefineInput, BuildDataOptions>(defaultDataResolver ?? {});
            const defaultData = await traitKeys.reduce(async (queue, traitKey) => {
                const acc = await queue;
                const resolveTraitValue = normalizeResolver<Partial<RouteEvaluationFactoryDefineInput>, BuildDataOptions>(traitsDefs[traitKey]?.data ?? {});
                const traitData = await resolveTraitValue({ seq });
                return {
                    ...acc,
                    ...traitData,
                };
            }, resolveValue({ seq }));
            const defaultAssociations = {
                Route: isRouteEvaluationRouteFactory(defaultData.Route) ? {
                    create: await defaultData.Route.build()
                } : defaultData.Route,
                User: isRouteEvaluationUserFactory(defaultData.User) ? {
                    create: await defaultData.User.build()
                } : defaultData.User
            };
            const data: Prisma.RouteEvaluationCreateInput = { ...requiredScalarData, ...defaultData, ...defaultAssociations, ...inputData };
            return data;
        };
        const buildList = (inputData: number | readonly Partial<Prisma.RouteEvaluationCreateInput>[]) => Promise.all(normalizeList(inputData).map(data => build(data)));
        const pickForConnect = (inputData: RouteEvaluation) => ({
            id: inputData.id
        });
        const create = async (inputData: Partial<Prisma.RouteEvaluationCreateInput> = {}) => {
            const data = await build(inputData).then(screen);
            return await getClient<PrismaClient>().routeEvaluation.create({ data });
        };
        const createList = (inputData: number | readonly Partial<Prisma.RouteEvaluationCreateInput>[]) => Promise.all(normalizeList(inputData).map(data => create(data)));
        const createForConnect = (inputData: Partial<Prisma.RouteEvaluationCreateInput> = {}) => create(inputData).then(pickForConnect);
        return {
            _factoryFor: "RouteEvaluation" as const,
            build,
            buildList,
            buildCreateInput: build,
            pickForConnect,
            create,
            createList,
            createForConnect,
        };
    };
    const factory = getFactoryWithTraits();
    const useTraits = (name: RouteEvaluationTraitKeys<TOptions>, ...names: readonly RouteEvaluationTraitKeys<TOptions>[]) => {
        return getFactoryWithTraits([name, ...names]);
    };
    return {
        ...factory,
        use: useTraits,
    };
}

/**
 * Define factory for {@link RouteEvaluation} model.
 *
 * @param options
 * @returns factory {@link RouteEvaluationFactoryInterface}
 */
export function defineRouteEvaluationFactory<TOptions extends RouteEvaluationFactoryDefineOptions>(options: TOptions): RouteEvaluationFactoryInterface<TOptions> {
    return defineRouteEvaluationFactoryInternal(options);
}

type RouteGradeEvaluationScalarOrEnumFields = {
    evaluation: number;
    originalGradeSystem: GradeSystems;
    originalGrade: string;
};

type RouteGradeEvaluationRouteFactory = {
    _factoryFor: "Route";
    build: () => PromiseLike<Prisma.RouteCreateNestedOneWithoutRouteGradeEvaluationInput["create"]>;
};

type RouteGradeEvaluationUserFactory = {
    _factoryFor: "User";
    build: () => PromiseLike<Prisma.UserCreateNestedOneWithoutRouteGradeEvaluationInput["create"]>;
};

type RouteGradeEvaluationFactoryDefineInput = {
    id?: string;
    createdAt?: Date;
    updatedAt?: Date;
    evaluation?: number;
    originalGradeSystem?: GradeSystems;
    originalGrade?: string;
    isDeleted?: SoftDelete;
    Route: RouteGradeEvaluationRouteFactory | Prisma.RouteCreateNestedOneWithoutRouteGradeEvaluationInput;
    User: RouteGradeEvaluationUserFactory | Prisma.UserCreateNestedOneWithoutRouteGradeEvaluationInput;
};

type RouteGradeEvaluationFactoryDefineOptions = {
    defaultData: Resolver<RouteGradeEvaluationFactoryDefineInput, BuildDataOptions>;
    traits?: {
        [traitName: string | symbol]: {
            data: Resolver<Partial<RouteGradeEvaluationFactoryDefineInput>, BuildDataOptions>;
        };
    };
};

function isRouteGradeEvaluationRouteFactory(x: RouteGradeEvaluationRouteFactory | Prisma.RouteCreateNestedOneWithoutRouteGradeEvaluationInput | undefined): x is RouteGradeEvaluationRouteFactory {
    return (x as any)?._factoryFor === "Route";
}

function isRouteGradeEvaluationUserFactory(x: RouteGradeEvaluationUserFactory | Prisma.UserCreateNestedOneWithoutRouteGradeEvaluationInput | undefined): x is RouteGradeEvaluationUserFactory {
    return (x as any)?._factoryFor === "User";
}

type RouteGradeEvaluationTraitKeys<TOptions extends RouteGradeEvaluationFactoryDefineOptions> = keyof TOptions["traits"];

export interface RouteGradeEvaluationFactoryInterfaceWithoutTraits {
    readonly _factoryFor: "RouteGradeEvaluation";
    build(inputData?: Partial<Prisma.RouteGradeEvaluationCreateInput>): PromiseLike<Prisma.RouteGradeEvaluationCreateInput>;
    buildCreateInput(inputData?: Partial<Prisma.RouteGradeEvaluationCreateInput>): PromiseLike<Prisma.RouteGradeEvaluationCreateInput>;
    buildList(inputData: number | readonly Partial<Prisma.RouteGradeEvaluationCreateInput>[]): PromiseLike<Prisma.RouteGradeEvaluationCreateInput[]>;
    pickForConnect(inputData: RouteGradeEvaluation): Pick<RouteGradeEvaluation, "id">;
    create(inputData?: Partial<Prisma.RouteGradeEvaluationCreateInput>): PromiseLike<RouteGradeEvaluation>;
    createList(inputData: number | readonly Partial<Prisma.RouteGradeEvaluationCreateInput>[]): PromiseLike<RouteGradeEvaluation[]>;
    createForConnect(inputData?: Partial<Prisma.RouteGradeEvaluationCreateInput>): PromiseLike<Pick<RouteGradeEvaluation, "id">>;
}

export interface RouteGradeEvaluationFactoryInterface<TOptions extends RouteGradeEvaluationFactoryDefineOptions = RouteGradeEvaluationFactoryDefineOptions> extends RouteGradeEvaluationFactoryInterfaceWithoutTraits {
    use(name: RouteGradeEvaluationTraitKeys<TOptions>, ...names: readonly RouteGradeEvaluationTraitKeys<TOptions>[]): RouteGradeEvaluationFactoryInterfaceWithoutTraits;
}

function autoGenerateRouteGradeEvaluationScalarsOrEnums({ seq }: {
    readonly seq: number;
}): RouteGradeEvaluationScalarOrEnumFields {
    return {
        evaluation: getScalarFieldValueGenerator().Int({ modelName: "RouteGradeEvaluation", fieldName: "evaluation", isId: false, isUnique: false, seq }),
        originalGradeSystem: "French",
        originalGrade: getScalarFieldValueGenerator().String({ modelName: "RouteGradeEvaluation", fieldName: "originalGrade", isId: false, isUnique: false, seq })
    };
}

function defineRouteGradeEvaluationFactoryInternal<TOptions extends RouteGradeEvaluationFactoryDefineOptions>({ defaultData: defaultDataResolver, traits: traitsDefs = {} }: TOptions): RouteGradeEvaluationFactoryInterface<TOptions> {
    const getFactoryWithTraits = (traitKeys: readonly RouteGradeEvaluationTraitKeys<TOptions>[] = []) => {
        const seqKey = {};
        const getSeq = () => getSequenceCounter(seqKey);
        const screen = createScreener("RouteGradeEvaluation", modelFieldDefinitions);
        const build = async (inputData: Partial<Prisma.RouteGradeEvaluationCreateInput> = {}) => {
            const seq = getSeq();
            const requiredScalarData = autoGenerateRouteGradeEvaluationScalarsOrEnums({ seq });
            const resolveValue = normalizeResolver<RouteGradeEvaluationFactoryDefineInput, BuildDataOptions>(defaultDataResolver ?? {});
            const defaultData = await traitKeys.reduce(async (queue, traitKey) => {
                const acc = await queue;
                const resolveTraitValue = normalizeResolver<Partial<RouteGradeEvaluationFactoryDefineInput>, BuildDataOptions>(traitsDefs[traitKey]?.data ?? {});
                const traitData = await resolveTraitValue({ seq });
                return {
                    ...acc,
                    ...traitData,
                };
            }, resolveValue({ seq }));
            const defaultAssociations = {
                Route: isRouteGradeEvaluationRouteFactory(defaultData.Route) ? {
                    create: await defaultData.Route.build()
                } : defaultData.Route,
                User: isRouteGradeEvaluationUserFactory(defaultData.User) ? {
                    create: await defaultData.User.build()
                } : defaultData.User
            };
            const data: Prisma.RouteGradeEvaluationCreateInput = { ...requiredScalarData, ...defaultData, ...defaultAssociations, ...inputData };
            return data;
        };
        const buildList = (inputData: number | readonly Partial<Prisma.RouteGradeEvaluationCreateInput>[]) => Promise.all(normalizeList(inputData).map(data => build(data)));
        const pickForConnect = (inputData: RouteGradeEvaluation) => ({
            id: inputData.id
        });
        const create = async (inputData: Partial<Prisma.RouteGradeEvaluationCreateInput> = {}) => {
            const data = await build(inputData).then(screen);
            return await getClient<PrismaClient>().routeGradeEvaluation.create({ data });
        };
        const createList = (inputData: number | readonly Partial<Prisma.RouteGradeEvaluationCreateInput>[]) => Promise.all(normalizeList(inputData).map(data => create(data)));
        const createForConnect = (inputData: Partial<Prisma.RouteGradeEvaluationCreateInput> = {}) => create(inputData).then(pickForConnect);
        return {
            _factoryFor: "RouteGradeEvaluation" as const,
            build,
            buildList,
            buildCreateInput: build,
            pickForConnect,
            create,
            createList,
            createForConnect,
        };
    };
    const factory = getFactoryWithTraits();
    const useTraits = (name: RouteGradeEvaluationTraitKeys<TOptions>, ...names: readonly RouteGradeEvaluationTraitKeys<TOptions>[]) => {
        return getFactoryWithTraits([name, ...names]);
    };
    return {
        ...factory,
        use: useTraits,
    };
}

/**
 * Define factory for {@link RouteGradeEvaluation} model.
 *
 * @param options
 * @returns factory {@link RouteGradeEvaluationFactoryInterface}
 */
export function defineRouteGradeEvaluationFactory<TOptions extends RouteGradeEvaluationFactoryDefineOptions>(options: TOptions): RouteGradeEvaluationFactoryInterface<TOptions> {
    return defineRouteGradeEvaluationFactoryInternal(options);
}

type ImageScalarOrEnumFields = {
    height: number;
    width: number;
    url: string;
    storageService: StorageService;
};

type ImageZoneFactory = {
    _factoryFor: "Zone";
    build: () => PromiseLike<Prisma.ZoneCreateNestedOneWithoutPhotosInput["create"]>;
};

type ImageFactoryDefineInput = {
    id?: string;
    createdAt?: Date;
    updatedAt?: Date;
    height?: number;
    width?: number;
    url?: string;
    storageService?: StorageService;
    bytes?: number | null;
    publicId?: string | null;
    version?: number | null;
    assetId?: string | null;
    format?: string | null;
    isDeleted?: SoftDelete;
    Topo?: Prisma.TopoCreateNestedManyWithoutImageInput;
    User?: Prisma.UserCreateNestedManyWithoutProfilePhotoInput;
    Zone?: ImageZoneFactory | Prisma.ZoneCreateNestedOneWithoutPhotosInput;
};

type ImageFactoryDefineOptions = {
    defaultData?: Resolver<ImageFactoryDefineInput, BuildDataOptions>;
    traits?: {
        [traitName: string | symbol]: {
            data: Resolver<Partial<ImageFactoryDefineInput>, BuildDataOptions>;
        };
    };
};

function isImageZoneFactory(x: ImageZoneFactory | Prisma.ZoneCreateNestedOneWithoutPhotosInput | undefined): x is ImageZoneFactory {
    return (x as any)?._factoryFor === "Zone";
}

type ImageTraitKeys<TOptions extends ImageFactoryDefineOptions> = keyof TOptions["traits"];

export interface ImageFactoryInterfaceWithoutTraits {
    readonly _factoryFor: "Image";
    build(inputData?: Partial<Prisma.ImageCreateInput>): PromiseLike<Prisma.ImageCreateInput>;
    buildCreateInput(inputData?: Partial<Prisma.ImageCreateInput>): PromiseLike<Prisma.ImageCreateInput>;
    buildList(inputData: number | readonly Partial<Prisma.ImageCreateInput>[]): PromiseLike<Prisma.ImageCreateInput[]>;
    pickForConnect(inputData: Image): Pick<Image, "id">;
    create(inputData?: Partial<Prisma.ImageCreateInput>): PromiseLike<Image>;
    createList(inputData: number | readonly Partial<Prisma.ImageCreateInput>[]): PromiseLike<Image[]>;
    createForConnect(inputData?: Partial<Prisma.ImageCreateInput>): PromiseLike<Pick<Image, "id">>;
}

export interface ImageFactoryInterface<TOptions extends ImageFactoryDefineOptions = ImageFactoryDefineOptions> extends ImageFactoryInterfaceWithoutTraits {
    use(name: ImageTraitKeys<TOptions>, ...names: readonly ImageTraitKeys<TOptions>[]): ImageFactoryInterfaceWithoutTraits;
}

function autoGenerateImageScalarsOrEnums({ seq }: {
    readonly seq: number;
}): ImageScalarOrEnumFields {
    return {
        height: getScalarFieldValueGenerator().Int({ modelName: "Image", fieldName: "height", isId: false, isUnique: false, seq }),
        width: getScalarFieldValueGenerator().Int({ modelName: "Image", fieldName: "width", isId: false, isUnique: false, seq }),
        url: getScalarFieldValueGenerator().String({ modelName: "Image", fieldName: "url", isId: false, isUnique: false, seq }),
        storageService: "Cloudinary"
    };
}

function defineImageFactoryInternal<TOptions extends ImageFactoryDefineOptions>({ defaultData: defaultDataResolver, traits: traitsDefs = {} }: TOptions): ImageFactoryInterface<TOptions> {
    const getFactoryWithTraits = (traitKeys: readonly ImageTraitKeys<TOptions>[] = []) => {
        const seqKey = {};
        const getSeq = () => getSequenceCounter(seqKey);
        const screen = createScreener("Image", modelFieldDefinitions);
        const build = async (inputData: Partial<Prisma.ImageCreateInput> = {}) => {
            const seq = getSeq();
            const requiredScalarData = autoGenerateImageScalarsOrEnums({ seq });
            const resolveValue = normalizeResolver<ImageFactoryDefineInput, BuildDataOptions>(defaultDataResolver ?? {});
            const defaultData = await traitKeys.reduce(async (queue, traitKey) => {
                const acc = await queue;
                const resolveTraitValue = normalizeResolver<Partial<ImageFactoryDefineInput>, BuildDataOptions>(traitsDefs[traitKey]?.data ?? {});
                const traitData = await resolveTraitValue({ seq });
                return {
                    ...acc,
                    ...traitData,
                };
            }, resolveValue({ seq }));
            const defaultAssociations = {
                Zone: isImageZoneFactory(defaultData.Zone) ? {
                    create: await defaultData.Zone.build()
                } : defaultData.Zone
            };
            const data: Prisma.ImageCreateInput = { ...requiredScalarData, ...defaultData, ...defaultAssociations, ...inputData };
            return data;
        };
        const buildList = (inputData: number | readonly Partial<Prisma.ImageCreateInput>[]) => Promise.all(normalizeList(inputData).map(data => build(data)));
        const pickForConnect = (inputData: Image) => ({
            id: inputData.id
        });
        const create = async (inputData: Partial<Prisma.ImageCreateInput> = {}) => {
            const data = await build(inputData).then(screen);
            return await getClient<PrismaClient>().image.create({ data });
        };
        const createList = (inputData: number | readonly Partial<Prisma.ImageCreateInput>[]) => Promise.all(normalizeList(inputData).map(data => create(data)));
        const createForConnect = (inputData: Partial<Prisma.ImageCreateInput> = {}) => create(inputData).then(pickForConnect);
        return {
            _factoryFor: "Image" as const,
            build,
            buildList,
            buildCreateInput: build,
            pickForConnect,
            create,
            createList,
            createForConnect,
        };
    };
    const factory = getFactoryWithTraits();
    const useTraits = (name: ImageTraitKeys<TOptions>, ...names: readonly ImageTraitKeys<TOptions>[]) => {
        return getFactoryWithTraits([name, ...names]);
    };
    return {
        ...factory,
        use: useTraits,
    };
}

/**
 * Define factory for {@link Image} model.
 *
 * @param options
 * @returns factory {@link ImageFactoryInterface}
 */
export function defineImageFactory<TOptions extends ImageFactoryDefineOptions>(options?: TOptions): ImageFactoryInterface<TOptions> {
    return defineImageFactoryInternal(options ?? {});
}

type TextContentScalarOrEnumFields = {
    originalText: string;
};

type TextContentoriginalLangFactory = {
    _factoryFor: "Language";
    build: () => PromiseLike<Prisma.LanguageCreateNestedOneWithoutTextContentInput["create"]>;
};

type TextContentFactoryDefineInput = {
    id?: string;
    createdAt?: Date;
    updatedAt?: Date;
    originalText?: string;
    isDeleted?: SoftDelete;
    originalLang: TextContentoriginalLangFactory | Prisma.LanguageCreateNestedOneWithoutTextContentInput;
    Translation?: Prisma.TranslationCreateNestedManyWithoutTextContentInput;
    AgreementName?: Prisma.AgreementCreateNestedManyWithoutTitleInput;
    AgreementDescription?: Prisma.AgreementCreateNestedManyWithoutDescriptionInput;
    ZoneAgreementComment?: Prisma.ZoneAgreementCreateNestedManyWithoutCommentInput;
    ZoneStatus?: Prisma.ZoneStatusCreateNestedManyWithoutMessageInput;
    ZoneAccessRequest?: Prisma.ZoneAccessRequestCreateNestedManyWithoutMessageInput;
    ZoneDirections?: Prisma.ZoneDirectionsCreateNestedManyWithoutDescriptionInput;
    ZoneDirectionsName?: Prisma.ZoneDirectionsCreateNestedManyWithoutNameInput;
    Zone?: Prisma.ZoneCreateNestedManyWithoutDescriptionInput;
    Route?: Prisma.RouteCreateNestedManyWithoutDescriptionInput;
};

type TextContentFactoryDefineOptions = {
    defaultData: Resolver<TextContentFactoryDefineInput, BuildDataOptions>;
    traits?: {
        [traitName: string | symbol]: {
            data: Resolver<Partial<TextContentFactoryDefineInput>, BuildDataOptions>;
        };
    };
};

function isTextContentoriginalLangFactory(x: TextContentoriginalLangFactory | Prisma.LanguageCreateNestedOneWithoutTextContentInput | undefined): x is TextContentoriginalLangFactory {
    return (x as any)?._factoryFor === "Language";
}

type TextContentTraitKeys<TOptions extends TextContentFactoryDefineOptions> = keyof TOptions["traits"];

export interface TextContentFactoryInterfaceWithoutTraits {
    readonly _factoryFor: "TextContent";
    build(inputData?: Partial<Prisma.TextContentCreateInput>): PromiseLike<Prisma.TextContentCreateInput>;
    buildCreateInput(inputData?: Partial<Prisma.TextContentCreateInput>): PromiseLike<Prisma.TextContentCreateInput>;
    buildList(inputData: number | readonly Partial<Prisma.TextContentCreateInput>[]): PromiseLike<Prisma.TextContentCreateInput[]>;
    pickForConnect(inputData: TextContent): Pick<TextContent, "id">;
    create(inputData?: Partial<Prisma.TextContentCreateInput>): PromiseLike<TextContent>;
    createList(inputData: number | readonly Partial<Prisma.TextContentCreateInput>[]): PromiseLike<TextContent[]>;
    createForConnect(inputData?: Partial<Prisma.TextContentCreateInput>): PromiseLike<Pick<TextContent, "id">>;
}

export interface TextContentFactoryInterface<TOptions extends TextContentFactoryDefineOptions = TextContentFactoryDefineOptions> extends TextContentFactoryInterfaceWithoutTraits {
    use(name: TextContentTraitKeys<TOptions>, ...names: readonly TextContentTraitKeys<TOptions>[]): TextContentFactoryInterfaceWithoutTraits;
}

function autoGenerateTextContentScalarsOrEnums({ seq }: {
    readonly seq: number;
}): TextContentScalarOrEnumFields {
    return {
        originalText: getScalarFieldValueGenerator().String({ modelName: "TextContent", fieldName: "originalText", isId: false, isUnique: false, seq })
    };
}

function defineTextContentFactoryInternal<TOptions extends TextContentFactoryDefineOptions>({ defaultData: defaultDataResolver, traits: traitsDefs = {} }: TOptions): TextContentFactoryInterface<TOptions> {
    const getFactoryWithTraits = (traitKeys: readonly TextContentTraitKeys<TOptions>[] = []) => {
        const seqKey = {};
        const getSeq = () => getSequenceCounter(seqKey);
        const screen = createScreener("TextContent", modelFieldDefinitions);
        const build = async (inputData: Partial<Prisma.TextContentCreateInput> = {}) => {
            const seq = getSeq();
            const requiredScalarData = autoGenerateTextContentScalarsOrEnums({ seq });
            const resolveValue = normalizeResolver<TextContentFactoryDefineInput, BuildDataOptions>(defaultDataResolver ?? {});
            const defaultData = await traitKeys.reduce(async (queue, traitKey) => {
                const acc = await queue;
                const resolveTraitValue = normalizeResolver<Partial<TextContentFactoryDefineInput>, BuildDataOptions>(traitsDefs[traitKey]?.data ?? {});
                const traitData = await resolveTraitValue({ seq });
                return {
                    ...acc,
                    ...traitData,
                };
            }, resolveValue({ seq }));
            const defaultAssociations = {
                originalLang: isTextContentoriginalLangFactory(defaultData.originalLang) ? {
                    create: await defaultData.originalLang.build()
                } : defaultData.originalLang
            };
            const data: Prisma.TextContentCreateInput = { ...requiredScalarData, ...defaultData, ...defaultAssociations, ...inputData };
            return data;
        };
        const buildList = (inputData: number | readonly Partial<Prisma.TextContentCreateInput>[]) => Promise.all(normalizeList(inputData).map(data => build(data)));
        const pickForConnect = (inputData: TextContent) => ({
            id: inputData.id
        });
        const create = async (inputData: Partial<Prisma.TextContentCreateInput> = {}) => {
            const data = await build(inputData).then(screen);
            return await getClient<PrismaClient>().textContent.create({ data });
        };
        const createList = (inputData: number | readonly Partial<Prisma.TextContentCreateInput>[]) => Promise.all(normalizeList(inputData).map(data => create(data)));
        const createForConnect = (inputData: Partial<Prisma.TextContentCreateInput> = {}) => create(inputData).then(pickForConnect);
        return {
            _factoryFor: "TextContent" as const,
            build,
            buildList,
            buildCreateInput: build,
            pickForConnect,
            create,
            createList,
            createForConnect,
        };
    };
    const factory = getFactoryWithTraits();
    const useTraits = (name: TextContentTraitKeys<TOptions>, ...names: readonly TextContentTraitKeys<TOptions>[]) => {
        return getFactoryWithTraits([name, ...names]);
    };
    return {
        ...factory,
        use: useTraits,
    };
}

/**
 * Define factory for {@link TextContent} model.
 *
 * @param options
 * @returns factory {@link TextContentFactoryInterface}
 */
export function defineTextContentFactory<TOptions extends TextContentFactoryDefineOptions>(options: TOptions): TextContentFactoryInterface<TOptions> {
    return defineTextContentFactoryInternal(options);
}

type TranslationScalarOrEnumFields = {
    translation: string;
};

type TranslationtextContentFactory = {
    _factoryFor: "TextContent";
    build: () => PromiseLike<Prisma.TextContentCreateNestedOneWithoutTranslationInput["create"]>;
};

type TranslationlanguageFactory = {
    _factoryFor: "Language";
    build: () => PromiseLike<Prisma.LanguageCreateNestedOneWithoutTranslationInput["create"]>;
};

type TranslationFactoryDefineInput = {
    id?: string;
    createdAt?: Date;
    updatedAt?: Date;
    translation?: string;
    isDeleted?: SoftDelete;
    textContent: TranslationtextContentFactory | Prisma.TextContentCreateNestedOneWithoutTranslationInput;
    language: TranslationlanguageFactory | Prisma.LanguageCreateNestedOneWithoutTranslationInput;
};

type TranslationFactoryDefineOptions = {
    defaultData: Resolver<TranslationFactoryDefineInput, BuildDataOptions>;
    traits?: {
        [traitName: string | symbol]: {
            data: Resolver<Partial<TranslationFactoryDefineInput>, BuildDataOptions>;
        };
    };
};

function isTranslationtextContentFactory(x: TranslationtextContentFactory | Prisma.TextContentCreateNestedOneWithoutTranslationInput | undefined): x is TranslationtextContentFactory {
    return (x as any)?._factoryFor === "TextContent";
}

function isTranslationlanguageFactory(x: TranslationlanguageFactory | Prisma.LanguageCreateNestedOneWithoutTranslationInput | undefined): x is TranslationlanguageFactory {
    return (x as any)?._factoryFor === "Language";
}

type TranslationTraitKeys<TOptions extends TranslationFactoryDefineOptions> = keyof TOptions["traits"];

export interface TranslationFactoryInterfaceWithoutTraits {
    readonly _factoryFor: "Translation";
    build(inputData?: Partial<Prisma.TranslationCreateInput>): PromiseLike<Prisma.TranslationCreateInput>;
    buildCreateInput(inputData?: Partial<Prisma.TranslationCreateInput>): PromiseLike<Prisma.TranslationCreateInput>;
    buildList(inputData: number | readonly Partial<Prisma.TranslationCreateInput>[]): PromiseLike<Prisma.TranslationCreateInput[]>;
    pickForConnect(inputData: Translation): Pick<Translation, "id">;
    create(inputData?: Partial<Prisma.TranslationCreateInput>): PromiseLike<Translation>;
    createList(inputData: number | readonly Partial<Prisma.TranslationCreateInput>[]): PromiseLike<Translation[]>;
    createForConnect(inputData?: Partial<Prisma.TranslationCreateInput>): PromiseLike<Pick<Translation, "id">>;
}

export interface TranslationFactoryInterface<TOptions extends TranslationFactoryDefineOptions = TranslationFactoryDefineOptions> extends TranslationFactoryInterfaceWithoutTraits {
    use(name: TranslationTraitKeys<TOptions>, ...names: readonly TranslationTraitKeys<TOptions>[]): TranslationFactoryInterfaceWithoutTraits;
}

function autoGenerateTranslationScalarsOrEnums({ seq }: {
    readonly seq: number;
}): TranslationScalarOrEnumFields {
    return {
        translation: getScalarFieldValueGenerator().String({ modelName: "Translation", fieldName: "translation", isId: false, isUnique: false, seq })
    };
}

function defineTranslationFactoryInternal<TOptions extends TranslationFactoryDefineOptions>({ defaultData: defaultDataResolver, traits: traitsDefs = {} }: TOptions): TranslationFactoryInterface<TOptions> {
    const getFactoryWithTraits = (traitKeys: readonly TranslationTraitKeys<TOptions>[] = []) => {
        const seqKey = {};
        const getSeq = () => getSequenceCounter(seqKey);
        const screen = createScreener("Translation", modelFieldDefinitions);
        const build = async (inputData: Partial<Prisma.TranslationCreateInput> = {}) => {
            const seq = getSeq();
            const requiredScalarData = autoGenerateTranslationScalarsOrEnums({ seq });
            const resolveValue = normalizeResolver<TranslationFactoryDefineInput, BuildDataOptions>(defaultDataResolver ?? {});
            const defaultData = await traitKeys.reduce(async (queue, traitKey) => {
                const acc = await queue;
                const resolveTraitValue = normalizeResolver<Partial<TranslationFactoryDefineInput>, BuildDataOptions>(traitsDefs[traitKey]?.data ?? {});
                const traitData = await resolveTraitValue({ seq });
                return {
                    ...acc,
                    ...traitData,
                };
            }, resolveValue({ seq }));
            const defaultAssociations = {
                textContent: isTranslationtextContentFactory(defaultData.textContent) ? {
                    create: await defaultData.textContent.build()
                } : defaultData.textContent,
                language: isTranslationlanguageFactory(defaultData.language) ? {
                    create: await defaultData.language.build()
                } : defaultData.language
            };
            const data: Prisma.TranslationCreateInput = { ...requiredScalarData, ...defaultData, ...defaultAssociations, ...inputData };
            return data;
        };
        const buildList = (inputData: number | readonly Partial<Prisma.TranslationCreateInput>[]) => Promise.all(normalizeList(inputData).map(data => build(data)));
        const pickForConnect = (inputData: Translation) => ({
            id: inputData.id
        });
        const create = async (inputData: Partial<Prisma.TranslationCreateInput> = {}) => {
            const data = await build(inputData).then(screen);
            return await getClient<PrismaClient>().translation.create({ data });
        };
        const createList = (inputData: number | readonly Partial<Prisma.TranslationCreateInput>[]) => Promise.all(normalizeList(inputData).map(data => create(data)));
        const createForConnect = (inputData: Partial<Prisma.TranslationCreateInput> = {}) => create(inputData).then(pickForConnect);
        return {
            _factoryFor: "Translation" as const,
            build,
            buildList,
            buildCreateInput: build,
            pickForConnect,
            create,
            createList,
            createForConnect,
        };
    };
    const factory = getFactoryWithTraits();
    const useTraits = (name: TranslationTraitKeys<TOptions>, ...names: readonly TranslationTraitKeys<TOptions>[]) => {
        return getFactoryWithTraits([name, ...names]);
    };
    return {
        ...factory,
        use: useTraits,
    };
}

/**
 * Define factory for {@link Translation} model.
 *
 * @param options
 * @returns factory {@link TranslationFactoryInterface}
 */
export function defineTranslationFactory<TOptions extends TranslationFactoryDefineOptions>(options: TOptions): TranslationFactoryInterface<TOptions> {
    return defineTranslationFactoryInternal(options);
}

type LanguageScalarOrEnumFields = {
    languageId: string;
    languageName: string;
};

type LanguageFactoryDefineInput = {
    languageId?: string;
    languageName?: string;
    createdAt?: Date;
    updatedAt?: Date;
    isDeleted?: SoftDelete;
    TextContent?: Prisma.TextContentCreateNestedManyWithoutOriginalLangInput;
    Translation?: Prisma.TranslationCreateNestedManyWithoutLanguageInput;
};

type LanguageFactoryDefineOptions = {
    defaultData?: Resolver<LanguageFactoryDefineInput, BuildDataOptions>;
    traits?: {
        [traitName: string | symbol]: {
            data: Resolver<Partial<LanguageFactoryDefineInput>, BuildDataOptions>;
        };
    };
};

type LanguageTraitKeys<TOptions extends LanguageFactoryDefineOptions> = keyof TOptions["traits"];

export interface LanguageFactoryInterfaceWithoutTraits {
    readonly _factoryFor: "Language";
    build(inputData?: Partial<Prisma.LanguageCreateInput>): PromiseLike<Prisma.LanguageCreateInput>;
    buildCreateInput(inputData?: Partial<Prisma.LanguageCreateInput>): PromiseLike<Prisma.LanguageCreateInput>;
    buildList(inputData: number | readonly Partial<Prisma.LanguageCreateInput>[]): PromiseLike<Prisma.LanguageCreateInput[]>;
    pickForConnect(inputData: Language): Pick<Language, "languageId">;
    create(inputData?: Partial<Prisma.LanguageCreateInput>): PromiseLike<Language>;
    createList(inputData: number | readonly Partial<Prisma.LanguageCreateInput>[]): PromiseLike<Language[]>;
    createForConnect(inputData?: Partial<Prisma.LanguageCreateInput>): PromiseLike<Pick<Language, "languageId">>;
}

export interface LanguageFactoryInterface<TOptions extends LanguageFactoryDefineOptions = LanguageFactoryDefineOptions> extends LanguageFactoryInterfaceWithoutTraits {
    use(name: LanguageTraitKeys<TOptions>, ...names: readonly LanguageTraitKeys<TOptions>[]): LanguageFactoryInterfaceWithoutTraits;
}

function autoGenerateLanguageScalarsOrEnums({ seq }: {
    readonly seq: number;
}): LanguageScalarOrEnumFields {
    return {
        languageId: getScalarFieldValueGenerator().String({ modelName: "Language", fieldName: "languageId", isId: true, isUnique: false, seq }),
        languageName: getScalarFieldValueGenerator().String({ modelName: "Language", fieldName: "languageName", isId: false, isUnique: false, seq })
    };
}

function defineLanguageFactoryInternal<TOptions extends LanguageFactoryDefineOptions>({ defaultData: defaultDataResolver, traits: traitsDefs = {} }: TOptions): LanguageFactoryInterface<TOptions> {
    const getFactoryWithTraits = (traitKeys: readonly LanguageTraitKeys<TOptions>[] = []) => {
        const seqKey = {};
        const getSeq = () => getSequenceCounter(seqKey);
        const screen = createScreener("Language", modelFieldDefinitions);
        const build = async (inputData: Partial<Prisma.LanguageCreateInput> = {}) => {
            const seq = getSeq();
            const requiredScalarData = autoGenerateLanguageScalarsOrEnums({ seq });
            const resolveValue = normalizeResolver<LanguageFactoryDefineInput, BuildDataOptions>(defaultDataResolver ?? {});
            const defaultData = await traitKeys.reduce(async (queue, traitKey) => {
                const acc = await queue;
                const resolveTraitValue = normalizeResolver<Partial<LanguageFactoryDefineInput>, BuildDataOptions>(traitsDefs[traitKey]?.data ?? {});
                const traitData = await resolveTraitValue({ seq });
                return {
                    ...acc,
                    ...traitData,
                };
            }, resolveValue({ seq }));
            const defaultAssociations = {};
            const data: Prisma.LanguageCreateInput = { ...requiredScalarData, ...defaultData, ...defaultAssociations, ...inputData };
            return data;
        };
        const buildList = (inputData: number | readonly Partial<Prisma.LanguageCreateInput>[]) => Promise.all(normalizeList(inputData).map(data => build(data)));
        const pickForConnect = (inputData: Language) => ({
            languageId: inputData.languageId
        });
        const create = async (inputData: Partial<Prisma.LanguageCreateInput> = {}) => {
            const data = await build(inputData).then(screen);
            return await getClient<PrismaClient>().language.create({ data });
        };
        const createList = (inputData: number | readonly Partial<Prisma.LanguageCreateInput>[]) => Promise.all(normalizeList(inputData).map(data => create(data)));
        const createForConnect = (inputData: Partial<Prisma.LanguageCreateInput> = {}) => create(inputData).then(pickForConnect);
        return {
            _factoryFor: "Language" as const,
            build,
            buildList,
            buildCreateInput: build,
            pickForConnect,
            create,
            createList,
            createForConnect,
        };
    };
    const factory = getFactoryWithTraits();
    const useTraits = (name: LanguageTraitKeys<TOptions>, ...names: readonly LanguageTraitKeys<TOptions>[]) => {
        return getFactoryWithTraits([name, ...names]);
    };
    return {
        ...factory,
        use: useTraits,
    };
}

/**
 * Define factory for {@link Language} model.
 *
 * @param options
 * @returns factory {@link LanguageFactoryInterface}
 */
export function defineLanguageFactory<TOptions extends LanguageFactoryDefineOptions>(options?: TOptions): LanguageFactoryInterface<TOptions> {
    return defineLanguageFactoryInternal(options ?? {});
}

type LocationScalarOrEnumFields = {
    latitude: (Prisma.Decimal | Prisma.DecimalJsLike | string);
    longitude: (Prisma.Decimal | Prisma.DecimalJsLike | string);
};

type LocationFactoryDefineInput = {
    id?: string;
    latitude?: (Prisma.Decimal | Prisma.DecimalJsLike | string);
    longitude?: (Prisma.Decimal | Prisma.DecimalJsLike | string);
    createdAt?: Date;
    updatedAt?: Date;
    isDeleted?: SoftDelete;
    note?: string | null;
    radius?: (Prisma.Decimal | Prisma.DecimalJsLike | string) | null;
    Zone?: Prisma.ZoneCreateNestedManyWithoutLocationInput;
    Sector?: Prisma.SectorCreateNestedManyWithoutLocationInput;
};

type LocationFactoryDefineOptions = {
    defaultData?: Resolver<LocationFactoryDefineInput, BuildDataOptions>;
    traits?: {
        [traitName: string | symbol]: {
            data: Resolver<Partial<LocationFactoryDefineInput>, BuildDataOptions>;
        };
    };
};

type LocationTraitKeys<TOptions extends LocationFactoryDefineOptions> = keyof TOptions["traits"];

export interface LocationFactoryInterfaceWithoutTraits {
    readonly _factoryFor: "Location";
    build(inputData?: Partial<Prisma.LocationCreateInput>): PromiseLike<Prisma.LocationCreateInput>;
    buildCreateInput(inputData?: Partial<Prisma.LocationCreateInput>): PromiseLike<Prisma.LocationCreateInput>;
    buildList(inputData: number | readonly Partial<Prisma.LocationCreateInput>[]): PromiseLike<Prisma.LocationCreateInput[]>;
    pickForConnect(inputData: Location): Pick<Location, "id">;
    create(inputData?: Partial<Prisma.LocationCreateInput>): PromiseLike<Location>;
    createList(inputData: number | readonly Partial<Prisma.LocationCreateInput>[]): PromiseLike<Location[]>;
    createForConnect(inputData?: Partial<Prisma.LocationCreateInput>): PromiseLike<Pick<Location, "id">>;
}

export interface LocationFactoryInterface<TOptions extends LocationFactoryDefineOptions = LocationFactoryDefineOptions> extends LocationFactoryInterfaceWithoutTraits {
    use(name: LocationTraitKeys<TOptions>, ...names: readonly LocationTraitKeys<TOptions>[]): LocationFactoryInterfaceWithoutTraits;
}

function autoGenerateLocationScalarsOrEnums({ seq }: {
    readonly seq: number;
}): LocationScalarOrEnumFields {
    return {
        latitude: getScalarFieldValueGenerator().Decimal({ modelName: "Location", fieldName: "latitude", isId: false, isUnique: false, seq }),
        longitude: getScalarFieldValueGenerator().Decimal({ modelName: "Location", fieldName: "longitude", isId: false, isUnique: false, seq })
    };
}

function defineLocationFactoryInternal<TOptions extends LocationFactoryDefineOptions>({ defaultData: defaultDataResolver, traits: traitsDefs = {} }: TOptions): LocationFactoryInterface<TOptions> {
    const getFactoryWithTraits = (traitKeys: readonly LocationTraitKeys<TOptions>[] = []) => {
        const seqKey = {};
        const getSeq = () => getSequenceCounter(seqKey);
        const screen = createScreener("Location", modelFieldDefinitions);
        const build = async (inputData: Partial<Prisma.LocationCreateInput> = {}) => {
            const seq = getSeq();
            const requiredScalarData = autoGenerateLocationScalarsOrEnums({ seq });
            const resolveValue = normalizeResolver<LocationFactoryDefineInput, BuildDataOptions>(defaultDataResolver ?? {});
            const defaultData = await traitKeys.reduce(async (queue, traitKey) => {
                const acc = await queue;
                const resolveTraitValue = normalizeResolver<Partial<LocationFactoryDefineInput>, BuildDataOptions>(traitsDefs[traitKey]?.data ?? {});
                const traitData = await resolveTraitValue({ seq });
                return {
                    ...acc,
                    ...traitData,
                };
            }, resolveValue({ seq }));
            const defaultAssociations = {};
            const data: Prisma.LocationCreateInput = { ...requiredScalarData, ...defaultData, ...defaultAssociations, ...inputData };
            return data;
        };
        const buildList = (inputData: number | readonly Partial<Prisma.LocationCreateInput>[]) => Promise.all(normalizeList(inputData).map(data => build(data)));
        const pickForConnect = (inputData: Location) => ({
            id: inputData.id
        });
        const create = async (inputData: Partial<Prisma.LocationCreateInput> = {}) => {
            const data = await build(inputData).then(screen);
            return await getClient<PrismaClient>().location.create({ data });
        };
        const createList = (inputData: number | readonly Partial<Prisma.LocationCreateInput>[]) => Promise.all(normalizeList(inputData).map(data => create(data)));
        const createForConnect = (inputData: Partial<Prisma.LocationCreateInput> = {}) => create(inputData).then(pickForConnect);
        return {
            _factoryFor: "Location" as const,
            build,
            buildList,
            buildCreateInput: build,
            pickForConnect,
            create,
            createList,
            createForConnect,
        };
    };
    const factory = getFactoryWithTraits();
    const useTraits = (name: LocationTraitKeys<TOptions>, ...names: readonly LocationTraitKeys<TOptions>[]) => {
        return getFactoryWithTraits([name, ...names]);
    };
    return {
        ...factory,
        use: useTraits,
    };
}

/**
 * Define factory for {@link Location} model.
 *
 * @param options
 * @returns factory {@link LocationFactoryInterface}
 */
export function defineLocationFactory<TOptions extends LocationFactoryDefineOptions>(options?: TOptions): LocationFactoryInterface<TOptions> {
    return defineLocationFactoryInternal(options ?? {});
}

type NotificationReceiverScalarOrEnumFields = {};

type NotificationReceiverObjectFactory = {
    _factoryFor: "NotificationObject";
    build: () => PromiseLike<Prisma.NotificationObjectCreateNestedOneWithoutNotificationReceiverInput["create"]>;
};

type NotificationReceiverReceiverFactory = {
    _factoryFor: "User";
    build: () => PromiseLike<Prisma.UserCreateNestedOneWithoutNotificationReceivedInput["create"]>;
};

type NotificationReceiverFactoryDefineInput = {
    id?: string;
    isRead?: boolean;
    Object: NotificationReceiverObjectFactory | Prisma.NotificationObjectCreateNestedOneWithoutNotificationReceiverInput;
    Receiver: NotificationReceiverReceiverFactory | Prisma.UserCreateNestedOneWithoutNotificationReceivedInput;
};

type NotificationReceiverFactoryDefineOptions = {
    defaultData: Resolver<NotificationReceiverFactoryDefineInput, BuildDataOptions>;
    traits?: {
        [traitName: string | symbol]: {
            data: Resolver<Partial<NotificationReceiverFactoryDefineInput>, BuildDataOptions>;
        };
    };
};

function isNotificationReceiverObjectFactory(x: NotificationReceiverObjectFactory | Prisma.NotificationObjectCreateNestedOneWithoutNotificationReceiverInput | undefined): x is NotificationReceiverObjectFactory {
    return (x as any)?._factoryFor === "NotificationObject";
}

function isNotificationReceiverReceiverFactory(x: NotificationReceiverReceiverFactory | Prisma.UserCreateNestedOneWithoutNotificationReceivedInput | undefined): x is NotificationReceiverReceiverFactory {
    return (x as any)?._factoryFor === "User";
}

type NotificationReceiverTraitKeys<TOptions extends NotificationReceiverFactoryDefineOptions> = keyof TOptions["traits"];

export interface NotificationReceiverFactoryInterfaceWithoutTraits {
    readonly _factoryFor: "NotificationReceiver";
    build(inputData?: Partial<Prisma.NotificationReceiverCreateInput>): PromiseLike<Prisma.NotificationReceiverCreateInput>;
    buildCreateInput(inputData?: Partial<Prisma.NotificationReceiverCreateInput>): PromiseLike<Prisma.NotificationReceiverCreateInput>;
    buildList(inputData: number | readonly Partial<Prisma.NotificationReceiverCreateInput>[]): PromiseLike<Prisma.NotificationReceiverCreateInput[]>;
    pickForConnect(inputData: NotificationReceiver): Pick<NotificationReceiver, "id">;
    create(inputData?: Partial<Prisma.NotificationReceiverCreateInput>): PromiseLike<NotificationReceiver>;
    createList(inputData: number | readonly Partial<Prisma.NotificationReceiverCreateInput>[]): PromiseLike<NotificationReceiver[]>;
    createForConnect(inputData?: Partial<Prisma.NotificationReceiverCreateInput>): PromiseLike<Pick<NotificationReceiver, "id">>;
}

export interface NotificationReceiverFactoryInterface<TOptions extends NotificationReceiverFactoryDefineOptions = NotificationReceiverFactoryDefineOptions> extends NotificationReceiverFactoryInterfaceWithoutTraits {
    use(name: NotificationReceiverTraitKeys<TOptions>, ...names: readonly NotificationReceiverTraitKeys<TOptions>[]): NotificationReceiverFactoryInterfaceWithoutTraits;
}

function autoGenerateNotificationReceiverScalarsOrEnums({ seq }: {
    readonly seq: number;
}): NotificationReceiverScalarOrEnumFields {
    return {};
}

function defineNotificationReceiverFactoryInternal<TOptions extends NotificationReceiverFactoryDefineOptions>({ defaultData: defaultDataResolver, traits: traitsDefs = {} }: TOptions): NotificationReceiverFactoryInterface<TOptions> {
    const getFactoryWithTraits = (traitKeys: readonly NotificationReceiverTraitKeys<TOptions>[] = []) => {
        const seqKey = {};
        const getSeq = () => getSequenceCounter(seqKey);
        const screen = createScreener("NotificationReceiver", modelFieldDefinitions);
        const build = async (inputData: Partial<Prisma.NotificationReceiverCreateInput> = {}) => {
            const seq = getSeq();
            const requiredScalarData = autoGenerateNotificationReceiverScalarsOrEnums({ seq });
            const resolveValue = normalizeResolver<NotificationReceiverFactoryDefineInput, BuildDataOptions>(defaultDataResolver ?? {});
            const defaultData = await traitKeys.reduce(async (queue, traitKey) => {
                const acc = await queue;
                const resolveTraitValue = normalizeResolver<Partial<NotificationReceiverFactoryDefineInput>, BuildDataOptions>(traitsDefs[traitKey]?.data ?? {});
                const traitData = await resolveTraitValue({ seq });
                return {
                    ...acc,
                    ...traitData,
                };
            }, resolveValue({ seq }));
            const defaultAssociations = {
                Object: isNotificationReceiverObjectFactory(defaultData.Object) ? {
                    create: await defaultData.Object.build()
                } : defaultData.Object,
                Receiver: isNotificationReceiverReceiverFactory(defaultData.Receiver) ? {
                    create: await defaultData.Receiver.build()
                } : defaultData.Receiver
            };
            const data: Prisma.NotificationReceiverCreateInput = { ...requiredScalarData, ...defaultData, ...defaultAssociations, ...inputData };
            return data;
        };
        const buildList = (inputData: number | readonly Partial<Prisma.NotificationReceiverCreateInput>[]) => Promise.all(normalizeList(inputData).map(data => build(data)));
        const pickForConnect = (inputData: NotificationReceiver) => ({
            id: inputData.id
        });
        const create = async (inputData: Partial<Prisma.NotificationReceiverCreateInput> = {}) => {
            const data = await build(inputData).then(screen);
            return await getClient<PrismaClient>().notificationReceiver.create({ data });
        };
        const createList = (inputData: number | readonly Partial<Prisma.NotificationReceiverCreateInput>[]) => Promise.all(normalizeList(inputData).map(data => create(data)));
        const createForConnect = (inputData: Partial<Prisma.NotificationReceiverCreateInput> = {}) => create(inputData).then(pickForConnect);
        return {
            _factoryFor: "NotificationReceiver" as const,
            build,
            buildList,
            buildCreateInput: build,
            pickForConnect,
            create,
            createList,
            createForConnect,
        };
    };
    const factory = getFactoryWithTraits();
    const useTraits = (name: NotificationReceiverTraitKeys<TOptions>, ...names: readonly NotificationReceiverTraitKeys<TOptions>[]) => {
        return getFactoryWithTraits([name, ...names]);
    };
    return {
        ...factory,
        use: useTraits,
    };
}

/**
 * Define factory for {@link NotificationReceiver} model.
 *
 * @param options
 * @returns factory {@link NotificationReceiverFactoryInterface}
 */
export function defineNotificationReceiverFactory<TOptions extends NotificationReceiverFactoryDefineOptions>(options: TOptions): NotificationReceiverFactoryInterface<TOptions> {
    return defineNotificationReceiverFactoryInternal(options);
}

type NotificationObjectScalarOrEnumFields = {
    entityId: string;
    Entity: Entity;
    entityTypeId: EntityTypeId;
    messageSent: string;
};

type NotificationObjectFactoryDefineInput = {
    id?: string;
    entityId?: string;
    Entity?: Entity;
    entityTypeId?: EntityTypeId;
    createdAt?: Date;
    messageSent?: string;
    NotificationReceiver?: Prisma.NotificationReceiverCreateNestedManyWithoutObjectInput;
    NotificationSender?: Prisma.NotificationSenderCreateNestedManyWithoutObjectInput;
};

type NotificationObjectFactoryDefineOptions = {
    defaultData?: Resolver<NotificationObjectFactoryDefineInput, BuildDataOptions>;
    traits?: {
        [traitName: string | symbol]: {
            data: Resolver<Partial<NotificationObjectFactoryDefineInput>, BuildDataOptions>;
        };
    };
};

type NotificationObjectTraitKeys<TOptions extends NotificationObjectFactoryDefineOptions> = keyof TOptions["traits"];

export interface NotificationObjectFactoryInterfaceWithoutTraits {
    readonly _factoryFor: "NotificationObject";
    build(inputData?: Partial<Prisma.NotificationObjectCreateInput>): PromiseLike<Prisma.NotificationObjectCreateInput>;
    buildCreateInput(inputData?: Partial<Prisma.NotificationObjectCreateInput>): PromiseLike<Prisma.NotificationObjectCreateInput>;
    buildList(inputData: number | readonly Partial<Prisma.NotificationObjectCreateInput>[]): PromiseLike<Prisma.NotificationObjectCreateInput[]>;
    pickForConnect(inputData: NotificationObject): Pick<NotificationObject, "id">;
    create(inputData?: Partial<Prisma.NotificationObjectCreateInput>): PromiseLike<NotificationObject>;
    createList(inputData: number | readonly Partial<Prisma.NotificationObjectCreateInput>[]): PromiseLike<NotificationObject[]>;
    createForConnect(inputData?: Partial<Prisma.NotificationObjectCreateInput>): PromiseLike<Pick<NotificationObject, "id">>;
}

export interface NotificationObjectFactoryInterface<TOptions extends NotificationObjectFactoryDefineOptions = NotificationObjectFactoryDefineOptions> extends NotificationObjectFactoryInterfaceWithoutTraits {
    use(name: NotificationObjectTraitKeys<TOptions>, ...names: readonly NotificationObjectTraitKeys<TOptions>[]): NotificationObjectFactoryInterfaceWithoutTraits;
}

function autoGenerateNotificationObjectScalarsOrEnums({ seq }: {
    readonly seq: number;
}): NotificationObjectScalarOrEnumFields {
    return {
        entityId: getScalarFieldValueGenerator().String({ modelName: "NotificationObject", fieldName: "entityId", isId: false, isUnique: false, seq }),
        Entity: "Zone",
        entityTypeId: "RequestZoneReview",
        messageSent: getScalarFieldValueGenerator().String({ modelName: "NotificationObject", fieldName: "messageSent", isId: false, isUnique: false, seq })
    };
}

function defineNotificationObjectFactoryInternal<TOptions extends NotificationObjectFactoryDefineOptions>({ defaultData: defaultDataResolver, traits: traitsDefs = {} }: TOptions): NotificationObjectFactoryInterface<TOptions> {
    const getFactoryWithTraits = (traitKeys: readonly NotificationObjectTraitKeys<TOptions>[] = []) => {
        const seqKey = {};
        const getSeq = () => getSequenceCounter(seqKey);
        const screen = createScreener("NotificationObject", modelFieldDefinitions);
        const build = async (inputData: Partial<Prisma.NotificationObjectCreateInput> = {}) => {
            const seq = getSeq();
            const requiredScalarData = autoGenerateNotificationObjectScalarsOrEnums({ seq });
            const resolveValue = normalizeResolver<NotificationObjectFactoryDefineInput, BuildDataOptions>(defaultDataResolver ?? {});
            const defaultData = await traitKeys.reduce(async (queue, traitKey) => {
                const acc = await queue;
                const resolveTraitValue = normalizeResolver<Partial<NotificationObjectFactoryDefineInput>, BuildDataOptions>(traitsDefs[traitKey]?.data ?? {});
                const traitData = await resolveTraitValue({ seq });
                return {
                    ...acc,
                    ...traitData,
                };
            }, resolveValue({ seq }));
            const defaultAssociations = {};
            const data: Prisma.NotificationObjectCreateInput = { ...requiredScalarData, ...defaultData, ...defaultAssociations, ...inputData };
            return data;
        };
        const buildList = (inputData: number | readonly Partial<Prisma.NotificationObjectCreateInput>[]) => Promise.all(normalizeList(inputData).map(data => build(data)));
        const pickForConnect = (inputData: NotificationObject) => ({
            id: inputData.id
        });
        const create = async (inputData: Partial<Prisma.NotificationObjectCreateInput> = {}) => {
            const data = await build(inputData).then(screen);
            return await getClient<PrismaClient>().notificationObject.create({ data });
        };
        const createList = (inputData: number | readonly Partial<Prisma.NotificationObjectCreateInput>[]) => Promise.all(normalizeList(inputData).map(data => create(data)));
        const createForConnect = (inputData: Partial<Prisma.NotificationObjectCreateInput> = {}) => create(inputData).then(pickForConnect);
        return {
            _factoryFor: "NotificationObject" as const,
            build,
            buildList,
            buildCreateInput: build,
            pickForConnect,
            create,
            createList,
            createForConnect,
        };
    };
    const factory = getFactoryWithTraits();
    const useTraits = (name: NotificationObjectTraitKeys<TOptions>, ...names: readonly NotificationObjectTraitKeys<TOptions>[]) => {
        return getFactoryWithTraits([name, ...names]);
    };
    return {
        ...factory,
        use: useTraits,
    };
}

/**
 * Define factory for {@link NotificationObject} model.
 *
 * @param options
 * @returns factory {@link NotificationObjectFactoryInterface}
 */
export function defineNotificationObjectFactory<TOptions extends NotificationObjectFactoryDefineOptions>(options?: TOptions): NotificationObjectFactoryInterface<TOptions> {
    return defineNotificationObjectFactoryInternal(options ?? {});
}

type NotificationSenderScalarOrEnumFields = {};

type NotificationSenderObjectFactory = {
    _factoryFor: "NotificationObject";
    build: () => PromiseLike<Prisma.NotificationObjectCreateNestedOneWithoutNotificationSenderInput["create"]>;
};

type NotificationSenderSenderFactory = {
    _factoryFor: "User";
    build: () => PromiseLike<Prisma.UserCreateNestedOneWithoutNotificationSentInput["create"]>;
};

type NotificationSenderFactoryDefineInput = {
    id?: string;
    Object: NotificationSenderObjectFactory | Prisma.NotificationObjectCreateNestedOneWithoutNotificationSenderInput;
    Sender: NotificationSenderSenderFactory | Prisma.UserCreateNestedOneWithoutNotificationSentInput;
};

type NotificationSenderFactoryDefineOptions = {
    defaultData: Resolver<NotificationSenderFactoryDefineInput, BuildDataOptions>;
    traits?: {
        [traitName: string | symbol]: {
            data: Resolver<Partial<NotificationSenderFactoryDefineInput>, BuildDataOptions>;
        };
    };
};

function isNotificationSenderObjectFactory(x: NotificationSenderObjectFactory | Prisma.NotificationObjectCreateNestedOneWithoutNotificationSenderInput | undefined): x is NotificationSenderObjectFactory {
    return (x as any)?._factoryFor === "NotificationObject";
}

function isNotificationSenderSenderFactory(x: NotificationSenderSenderFactory | Prisma.UserCreateNestedOneWithoutNotificationSentInput | undefined): x is NotificationSenderSenderFactory {
    return (x as any)?._factoryFor === "User";
}

type NotificationSenderTraitKeys<TOptions extends NotificationSenderFactoryDefineOptions> = keyof TOptions["traits"];

export interface NotificationSenderFactoryInterfaceWithoutTraits {
    readonly _factoryFor: "NotificationSender";
    build(inputData?: Partial<Prisma.NotificationSenderCreateInput>): PromiseLike<Prisma.NotificationSenderCreateInput>;
    buildCreateInput(inputData?: Partial<Prisma.NotificationSenderCreateInput>): PromiseLike<Prisma.NotificationSenderCreateInput>;
    buildList(inputData: number | readonly Partial<Prisma.NotificationSenderCreateInput>[]): PromiseLike<Prisma.NotificationSenderCreateInput[]>;
    pickForConnect(inputData: NotificationSender): Pick<NotificationSender, "id">;
    create(inputData?: Partial<Prisma.NotificationSenderCreateInput>): PromiseLike<NotificationSender>;
    createList(inputData: number | readonly Partial<Prisma.NotificationSenderCreateInput>[]): PromiseLike<NotificationSender[]>;
    createForConnect(inputData?: Partial<Prisma.NotificationSenderCreateInput>): PromiseLike<Pick<NotificationSender, "id">>;
}

export interface NotificationSenderFactoryInterface<TOptions extends NotificationSenderFactoryDefineOptions = NotificationSenderFactoryDefineOptions> extends NotificationSenderFactoryInterfaceWithoutTraits {
    use(name: NotificationSenderTraitKeys<TOptions>, ...names: readonly NotificationSenderTraitKeys<TOptions>[]): NotificationSenderFactoryInterfaceWithoutTraits;
}

function autoGenerateNotificationSenderScalarsOrEnums({ seq }: {
    readonly seq: number;
}): NotificationSenderScalarOrEnumFields {
    return {};
}

function defineNotificationSenderFactoryInternal<TOptions extends NotificationSenderFactoryDefineOptions>({ defaultData: defaultDataResolver, traits: traitsDefs = {} }: TOptions): NotificationSenderFactoryInterface<TOptions> {
    const getFactoryWithTraits = (traitKeys: readonly NotificationSenderTraitKeys<TOptions>[] = []) => {
        const seqKey = {};
        const getSeq = () => getSequenceCounter(seqKey);
        const screen = createScreener("NotificationSender", modelFieldDefinitions);
        const build = async (inputData: Partial<Prisma.NotificationSenderCreateInput> = {}) => {
            const seq = getSeq();
            const requiredScalarData = autoGenerateNotificationSenderScalarsOrEnums({ seq });
            const resolveValue = normalizeResolver<NotificationSenderFactoryDefineInput, BuildDataOptions>(defaultDataResolver ?? {});
            const defaultData = await traitKeys.reduce(async (queue, traitKey) => {
                const acc = await queue;
                const resolveTraitValue = normalizeResolver<Partial<NotificationSenderFactoryDefineInput>, BuildDataOptions>(traitsDefs[traitKey]?.data ?? {});
                const traitData = await resolveTraitValue({ seq });
                return {
                    ...acc,
                    ...traitData,
                };
            }, resolveValue({ seq }));
            const defaultAssociations = {
                Object: isNotificationSenderObjectFactory(defaultData.Object) ? {
                    create: await defaultData.Object.build()
                } : defaultData.Object,
                Sender: isNotificationSenderSenderFactory(defaultData.Sender) ? {
                    create: await defaultData.Sender.build()
                } : defaultData.Sender
            };
            const data: Prisma.NotificationSenderCreateInput = { ...requiredScalarData, ...defaultData, ...defaultAssociations, ...inputData };
            return data;
        };
        const buildList = (inputData: number | readonly Partial<Prisma.NotificationSenderCreateInput>[]) => Promise.all(normalizeList(inputData).map(data => build(data)));
        const pickForConnect = (inputData: NotificationSender) => ({
            id: inputData.id
        });
        const create = async (inputData: Partial<Prisma.NotificationSenderCreateInput> = {}) => {
            const data = await build(inputData).then(screen);
            return await getClient<PrismaClient>().notificationSender.create({ data });
        };
        const createList = (inputData: number | readonly Partial<Prisma.NotificationSenderCreateInput>[]) => Promise.all(normalizeList(inputData).map(data => create(data)));
        const createForConnect = (inputData: Partial<Prisma.NotificationSenderCreateInput> = {}) => create(inputData).then(pickForConnect);
        return {
            _factoryFor: "NotificationSender" as const,
            build,
            buildList,
            buildCreateInput: build,
            pickForConnect,
            create,
            createList,
            createForConnect,
        };
    };
    const factory = getFactoryWithTraits();
    const useTraits = (name: NotificationSenderTraitKeys<TOptions>, ...names: readonly NotificationSenderTraitKeys<TOptions>[]) => {
        return getFactoryWithTraits([name, ...names]);
    };
    return {
        ...factory,
        use: useTraits,
    };
}

/**
 * Define factory for {@link NotificationSender} model.
 *
 * @param options
 * @returns factory {@link NotificationSenderFactoryInterface}
 */
export function defineNotificationSenderFactory<TOptions extends NotificationSenderFactoryDefineOptions>(options: TOptions): NotificationSenderFactoryInterface<TOptions> {
    return defineNotificationSenderFactoryInternal(options);
}
