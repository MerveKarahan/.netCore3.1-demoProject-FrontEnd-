import { Card } from "./card";
import { Rental } from "./rental";

export interface Payment{
    rental:Rental,
    creditCardModel:Card
}