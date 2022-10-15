namespace Backend.Database.Entities;

public record PostEntity
{
    public Guid Id { get; set; }

    public string Title { get; set; } = default!;
    public string Content { get; set; } = default!;

    public DateTime CreatedAt { get; set; }

    public UserEntity Author { get; set; } = default!;
    public Guid AuthorId { get; set; }
}
