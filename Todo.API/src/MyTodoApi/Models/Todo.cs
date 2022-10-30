namespace MyTodoApi.Models
{
    public class Todo
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public bool Done { get; set; }
        public string User { get; set; }
    }
}