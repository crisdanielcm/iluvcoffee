import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Coffee } from './entities/coffee.entity';

@Injectable()
export class CoffeesService {
    private coffes: Coffee[] = [
        {
            id: 1,
            name: 'Shipwreck Roast',
            brand: 'Buddy Brew',
            flavors: ['chocolate', 'vainilla']
        }
    ];

    findAll() {
        return this.coffes;
    }

    findOne(id: number) {
        const coffee = this.coffes.find(item => item.id === +id);
        console.log(coffee);
        if (!coffee) {
            throw new HttpException(`Coffee #${id} not found`, HttpStatus.NOT_FOUND);
        }
        return coffee;
    }

    create(createCoffeeDto: any) {
        this.coffes.push(createCoffeeDto);
        return createCoffeeDto;
    }

    update(id: number, updateCoffeeDto: any) {
        const existingCoffee = this.findOne(id);
        if (existingCoffee) {
            // update the existing entity
        }
    }

    remove(id: number) {
        const coffeeIndex = this.coffes.findIndex( item => item.id === +id);
        if (coffeeIndex >= 0) {
            this.coffes.splice(coffeeIndex, 1);
        }
    }
}
