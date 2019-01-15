import {Injectable} from '@angular/core';

/**
 * LanguageSettingService service class
 * Stores the current language in local storage
 */
@Injectable()
export class LanguageSettingService {

  /** The key for language */
  private languageKey: string;
  private directionKey: string;
  private startDirectionKey: string;

  constructor() {
    this.languageKey = 'CURRENT_LANGUAGE';
    this.directionKey = 'CURRENT_DIRECTION';
    this.startDirectionKey = 'START_DIRECTION';
  }


  /**
   * Store language in local storage
   * @param { string } language - The language
   * @return { void }
   */
  public setLanguage(language: string) {
    localStorage.setItem(this.languageKey, language);
  }

  /**
   * Retrieve language from local storage
   * @param { none }
   * @return { String } - The language
   */
  public getLanguage() {
    const language: string = localStorage.getItem(this.languageKey);
    if (!language) {
      this.setLanguage('ar');
      return 'ar';
    }
    return language;
  }

  /**
   * Remove language from local storage
   * @param { none }
   * @return { void }
   */
  public removeLanguage() {
    localStorage.removeItem(this.languageKey);
  }

  /**
   * Store direction in local storage
   * @param { string } direction - The direction
   * @return { void }
   */
  public setDirection(direction: string) {
    localStorage.setItem(this.directionKey, direction);
  }

  /**
   * Retrieve direction from local storage
   * @param { none }
   * @return { String } - The direction
   */
  public getDirection() {
    const direction: string = localStorage.getItem(this.directionKey);
    if (!direction) {
      this.setLanguage('ar');
      return 'ar';
    }
    return direction;
  }

  /**
   * Remove direction from local storage
   * @param { none }
   * @return { void }
   */
  public removeDirection() {
    localStorage.removeItem(this.languageKey);
  }


  /**
   * Store start direction in local storage
   * @param { string } start direction - The direction
   * @return { void }
   */
  public setStartDirection(startDirection: string) {
    localStorage.setItem(this.startDirectionKey, startDirection);
  }

  /**
   * Retrieve start direction from local storage
   * @param { none }
   * @return { String } - The start direction
   */
  public getStartDirection() {
    const direction: string = localStorage.getItem(this.startDirectionKey);
    if (!direction) {
      this.setLanguage('ar');
      return 'ar';
    }
    return direction;
  }

  /**
   * Remove start direction from local storage
   * @param { none }
   * @return { void }
   */
  public removeStartDirection() {
    localStorage.removeItem(this.languageKey);
  }


}
