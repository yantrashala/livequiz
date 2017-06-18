/* tslint:disable */
import {
  Quiz
} from '../index';

declare var Object: any;
export interface QuizInstanceInterface {
  "title": string;
  "status": string;
  "users": Array<any>;
  "id"?: number;
  "quizId"?: number;
  "createdAt"?: Date;
  "updatedAt"?: Date;
  quiz?: Quiz;
  quizTakers?: any[];
}

export class QuizInstance implements QuizInstanceInterface {
  "title": string;
  "status": string;
  "users": Array<any>;
  "id": number;
  "quizId": number;
  "createdAt": Date;
  "updatedAt": Date;
  quiz: Quiz;
  quizTakers: any[];
  constructor(data?: QuizInstanceInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `QuizInstance`.
   */
  public static getModelName() {
    return "QuizInstance";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of QuizInstance for dynamic purposes.
  **/
  public static factory(data: QuizInstanceInterface): QuizInstance{
    return new QuizInstance(data);
  }
  /**
  * @method getModelDefinition
  * @author Julien Ledun
  * @license MIT
  * This method returns an object that represents some of the model
  * definitions.
  **/
  public static getModelDefinition() {
    return {
      name: 'QuizInstance',
      plural: 'n',
      properties: {
        "title": {
          name: 'title',
          type: 'string'
        },
        "status": {
          name: 'status',
          type: 'string',
          default: 'new'
        },
        "users": {
          name: 'users',
          type: 'Array&lt;any&gt;',
          default: <any>[]
        },
        "id": {
          name: 'id',
          type: 'number'
        },
        "quizId": {
          name: 'quizId',
          type: 'number'
        },
        "createdAt": {
          name: 'createdAt',
          type: 'Date'
        },
        "updatedAt": {
          name: 'updatedAt',
          type: 'Date'
        },
      },
      relations: {
        quiz: {
          name: 'quiz',
          type: 'Quiz',
          model: 'Quiz'
        },
        quizTakers: {
          name: 'quizTakers',
          type: 'any[]',
          model: ''
        },
      }
    }
  }
}
