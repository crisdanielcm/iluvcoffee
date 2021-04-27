import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, Query, Res } from '@nestjs/common';
import { CoffeesService } from './coffees.service';
import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto';

@Controller('coffees')
export class CoffeesController {

    constructor(private readonly coffeesService: CoffeesService) {}
    
    @Get('flavors')
    // getAll(@Res() response) --> Manejo de respuesta equivalente a la de express
    getAll(@Res() response) {
        response.status(200).send('This action returns all coffees');
    }

    @Get()
    findAll() {
        return this.coffeesService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: number) {
        console.log(typeof id);
        return this.coffeesService.findOne(id)
    }

    @Post()
    //@HttpCode(HttpStatus.GONE) --> Para un codigo de error estatico.
    create(@Body() createCoffeeDto: CreateCoffeeDto) {
        console.log(createCoffeeDto instanceof CreateCoffeeDto);
        return this.coffeesService.create(createCoffeeDto);
    }

    @Patch(':id')
    update(@Param('id') id: number, @Body() updateCoffeeDto: UpdateCoffeeDto) {
        return this.coffeesService.update(id, updateCoffeeDto);
    }

    @Delete()
    delete(@Param('id') id: number) {
        return this.coffeesService.remove(id);
    }

    @Get('paginationCoffees/pagination')
    getPaginatedResults (@Query() paginationQuery) {
        let { limit, offset } = paginationQuery;
        return `This action return all coffees, Limit: ${ limit }, offset: ${ offset }`;
    }
}
