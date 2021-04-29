export class Location {
  constructor(public latitude: number, public longitude: number, public address: string ) {}
}

export class LocationDB {
  constructor(public userId: string, public latitude: number, public longitude: number, public address: string, public _id: string ) {}
}