// src/utils/models.ts
export interface Film {
    id: number;
    title: string;
    director: string;
    budget: number;
    duration: number;
    releaseDate: string;
    genre: string;
    box_office: number;
  }
  
  export interface Scene {
    id: number;
    description: string;
    minutes: number;
    location: string;
    setting: string;
    film_id: number;
  }
  
  export interface Character {
    id: number;
    description: string;
    cost: number;
    nameActor: string;
    rol: string;
    importance: string;
    sceneDescription: string;
  }
  