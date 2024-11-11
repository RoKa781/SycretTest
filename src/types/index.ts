export type CertificateData = {
  ID: string;
  TABLENAME: string;
  PRIMARYKEY: string;
  NAME: string;
  DESCRIPTION?: string;
  PRICE: number;
  SUMMA: number;
  DISCOUNT?: number;
  IMAGEURL?: string;
};

export type OrderData = {
  certificateInfo: CertificateData;
  name: string;
  phone: string;
  email: string;
  PaymentTypeId: number;
  UseDelivery: number;
  IsGift: number;
  MsgText: string;
  PName: string;
  PPhone: string;
};
