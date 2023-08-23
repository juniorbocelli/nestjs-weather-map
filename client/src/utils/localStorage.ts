class StoragedValues {
  private static instance: StoragedValues;

  private localStorageInstance: Storage;

  private defaultToken: string;

  private constructor() {
    this.localStorageInstance = localStorage;
    this.defaultToken = "not_auth";
  };

  public static getInstance(): StoragedValues {
    if (!StoragedValues.instance) {
      StoragedValues.instance = new StoragedValues();
    };

    return StoragedValues.instance;
  };

  /**
   * Set values
   */

  public setToken(s: string): void {
    this.localStorageInstance.setItem('@auth', s);
  };


  /**
   * Get values
   */

  public getToken(): string {
    if (!localStorage.getItem('@auth'))
      this.setToken(this.getDefaultToken());

    return localStorage.getItem('@auth') || this.getDefaultToken();
  };


  /**
   * Default values
   */
  public getDefaultToken(): string {
    return this.defaultToken;
  };


  /**
   * Clear values
   */
  public clearToken() {
    this.localStorageInstance.removeItem('@auth');
  };
};

export default StoragedValues.getInstance();
