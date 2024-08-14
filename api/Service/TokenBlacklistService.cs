public class TokenBlacklistService : ITokenBlacklistService
{
    private readonly HashSet<string> _blacklistedTokens = new HashSet<string>();

    public void AddToken(string token)
    {
        _blacklistedTokens.Add(token);
    }

    public bool IsTokenBlacklisted(string token)
    {
        return _blacklistedTokens.Contains(token);
    }
}