/* tslint:disable */
import {
  QuizInstance
} from '../index';

declare var Object: any;
export interface QuizInterface {
  "title": string;
  "questions"?: Array<any>;
  "hash": string;
  "id"?: number;
  "createdAt"?: Date;
  "updatedAt"?: Date;
  "publisherId"?: number;
  quizInstances?: QuizInstance[];
  quizCreator?: any;
}

export class Quiz implements QuizInterface {
  "title": string;
  "questions": Array<any>;
  "hash": string;
  "id": number;
  "createdAt": Date;
  "updatedAt": Date;
  "publisherId": number;
  quizInstances: QuizInstance[];
  quizCreator: any;
  constructor(data?: QuizInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `Quiz`.
   */
  public static getModelName() {
    return "Quiz";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of Quiz for dynamic purposes.
  **/
  public static factory(data: QuizInterface): Quiz{
    return new Quiz(data);
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
      name: 'Quiz',
      plural: 'n',
      properties: {
        "title": {
          name: 'title',
          type: 'string'
        },
        "questions": {
          name: 'questions',
          type: 'Array&lt;any&gt;'
        },
        "hash": {
          name: 'hash',
          type: 'string'
        },
        "id": {
          name: 'id',
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
        "publisherId": {
          name: 'publisherId',
          type: 'number'
        },
      },
      relations: {
        quizInstances: {
          name: 'quizInstances',
          type: 'QuizInstance[]',
          model: 'QuizInstance'
        },
        quizCreator: {
          name: 'quizCreator',
          type: 'any',
          model: ''
        },
      }
    }
  }
}
