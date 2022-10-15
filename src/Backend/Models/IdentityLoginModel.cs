using System.ComponentModel.DataAnnotations;

public record IdentityLoginModel
{
    [Required]
    [StringLength(100, MinimumLength = 3)]
    public string Username { get; set; } = default!;

    [Required]
    [StringLength(100, MinimumLength = 3)]
    public string Password { get; set; } = default!;
}