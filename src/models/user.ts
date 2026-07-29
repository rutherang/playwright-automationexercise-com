export type LoginInformation = {
  username?: string;
  password?: string;
};

export type UserInformation = {
  name?: string;
  email?: string;
  birthMonth?: string;
  birthday?: string;
  birthYear?: string;
};

export type AddressInformation = {
  FirstName?: string;
  LastName?: string;
  Company?: string;
  Address?: string;
  Address2?: string;
  Country?: string;
  State?: string;
  City?: string;
  Zipcode?: string;
  MobileNumber?: string;
};

export type ExtendedUserInformation = {
  signupForOurNewsLetter: boolean;
  receiveSpecialOffersFromOurPartners: boolean;
};

export type NewRegisteredUserInformation = LoginInformation & UserInformation & AddressInformation & ExtendedUserInformation;
