using System.ComponentModel.DataAnnotations;

public record PostCreateModel
{
    [Required]
    [StringLength(100, MinimumLength = 3)]
    public string Title { get; set; } = default!;

    [Required]
    [StringLength(100, MinimumLength = 3)]
    public string Content { get; set; } = default!;
}