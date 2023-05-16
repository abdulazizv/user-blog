import jwt from "jsonwebtoken";
import config from "config";

class JwtService {
  constructor(
    public readonly accessKey: string,
    public readonly refreshKey: string,
    public readonly accessTime: number,
    public readonly refreshTime: number,
  ) {}

  async verifyAccess(token: string): Promise<any> {
    return jwt.verify(token, this.accessKey, {});
  }

  async verifyRefresh(token: string): Promise<any> {
    return jwt.verify(token, this.refreshKey, {});
  }

  generateTokens(payload: any): {
    accessToken: string;
    refreshToken: string;
  } {
    const accessToken = jwt.sign(payload, this.accessKey, {
      expiresIn: this.accessTime,
    });
    const refreshToken = jwt.sign(payload, this.refreshKey, {
      expiresIn: this.refreshTime,
    });
    return {
      accessToken,
      refreshToken,
    };
  }
}

export default new JwtService(
  config.get("access_key"),
  config.get("refresh_key"),
  config.get("access_time"),
  config.get("refresh_time")
);
