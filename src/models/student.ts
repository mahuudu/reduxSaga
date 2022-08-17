export interface Student{
    _id: string;
    name: string;
    age: number;
    gender : 'male' | 'female';
    mark: number;
    city : string;
    // createAt?: number;
    // updatedAt?: number;
}