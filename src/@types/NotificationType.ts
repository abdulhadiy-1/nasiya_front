export interface NotificationType {
  notifications: Array<{
    id: string;
    name: string;
    address: string;
    sellerId: string;
    note: string | null;
    star: boolean;
    createdAt: string;
    updatedAt: string;
    Notification: [
      {
        id: string;
        message: string;
        isSended: boolean;
        sellerId: string;
        debtorId: string;
        createdAt: string;
        updatedAt: string;
      }
    ];
    Phone: [
      {
        id: string;
        phoneNumber: string;
        debtorId: string;
        createdAt: string;
        updatedAt: string;
      }
    ];
  }>;
  debtor: null
}

export interface SingleNotificationType {
  notifications: Array<{
    id: string;
    message: string;
    isSended: boolean;
    sellerId: string;
    debtorId: string;
    createdAt: string;
    updatedAt: string;
  }>;
  debtor: { name: string };
}
