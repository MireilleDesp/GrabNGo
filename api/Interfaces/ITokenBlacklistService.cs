public interface ITokenBlacklistService
{
    void AddToken(string token);
    bool IsTokenBlacklisted(string token);
}