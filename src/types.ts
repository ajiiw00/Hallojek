export type UserRole = 'customer' | 'rider' | 'seller' | 'admin';
export type Language = 'id' | 'zh' | 'en' | 'th' | 'vi';
export type RideStatus = 'requested' | 'accepted' | 'ongoing' | 'completed' | 'cancelled';
export type FoodOrderStatus = 'pending' | 'preparing' | 'delivering' | 'completed' | 'cancelled';
export type TransactionType = 'topup' | 'payment' | 'refund';

export interface UserProfile {
  uid: string;
  displayName: string;
  email: string;
  phoneNumber?: string;
  role: UserRole;
  balance: number;
  preferredLanguage: Language;
  createdAt: string;
}

export interface DriverProfile {
  uid: string;
  vehicleType: 'motorcycle' | 'car';
  vehiclePlate: string;
  status: 'online' | 'offline' | 'busy';
  rating?: number;
  currentLocation?: {
    lat: number;
    lng: number;
  };
}

export interface Ride {
  id: string;
  clientId: string;
  driverId?: string;
  pickupLocation: {
    address: string;
    lat: number;
    lng: number;
  };
  destination: {
    address: string;
    lat: number;
    lng: number;
  };
  status: RideStatus;
  fare: number;
  paymentMethod: 'cash' | 'hallopay';
  createdAt: string;
}

export interface FoodOrder {
  id: string;
  clientId: string;
  restaurantId: string;
  items: {
    name: string;
    quantity: number;
    price: number;
  }[];
  totalAmount: number;
  status: FoodOrderStatus;
  deliveryAddress: string;
  createdAt: string;
}

export interface Transaction {
  id: string;
  userId: string;
  type: TransactionType;
  amount: number;
  description?: string;
  createdAt: string;
}

export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

export interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string;
    email?: string | null;
    emailVerified?: boolean;
    isAnonymous?: boolean;
    tenantId?: string | null;
    providerInfo: {
      providerId: string;
      displayName: string | null;
      email: string | null;
      photoUrl: string | null;
    }[];
  }
}
