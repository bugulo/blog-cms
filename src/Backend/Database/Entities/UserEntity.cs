using System.Text.Json.Serialization;

namespace Backend.Database.Entities;

public record UserEntity
{
    public Guid Id { get; set; }

    public string Username { get; set; } = default!;

    [JsonIgnore]
    public string Password { get; set; } = default!;
}
