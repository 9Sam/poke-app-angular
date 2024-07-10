export interface UserI {
   id?: string;
   name: string;
   profilePicture?: string;
   favoriteHobby: string;
   pokemons: number[];
   birthday: Date;
   document?: string;
   dui?: string;
}

export interface SystemUserI extends UserI {
   isLoggedIn: boolean;
}