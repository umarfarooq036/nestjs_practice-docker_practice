import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';

export interface User {
    id: number;
    name: string;
    email: string;
}

@Injectable()
export class UserService {
    private users: User[] = [
        { id: 1, name: 'Umar Farooq', email: 'umar.farooq@example.com' },
        { id: 2, name: 'John Doe', email: 'john.doe@example.com' },
        { id: 3, name: 'Jane Smith', email: 'jane.smith@example.com' },
    ];


    getAllUser() {
        return this.users;

    }
    getUserById(id: Number) {

        const user = this.users.find(user => user.id === id);
        return user ? user : { success: false, message: 'User not found' };
    }

    createUser(userData: Omit<User, 'id'>) {

        // I want to first check whether the email already exists or not.
        const emailExists = this.users.some(user => user.email === userData.email);
        if (emailExists) {
            throw new ConflictException('Email already exists');
        }



        const newUser = {
            id: Date.now(),
            ...userData
        };

        this.users.push(newUser);
        return newUser;

    }

    updateUser(id: number, upateData: Partial<Omit<User, 'id'>>) {
        const userIndex = this.users.findIndex(user => user.id === id);
        if (userIndex === -1) {
            throw new Error('User not found');
        }
        this.users[userIndex] = { ...this.users[userIndex], ...upateData };
        return this.users[userIndex];
    }
}
