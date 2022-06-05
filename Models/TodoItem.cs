using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace TodoApi.Models
{
    public class TodoItem
    {
        public long Id { get; set; }
        public string Name { get; set; }
        public bool IsComplete { get; set; }
        public long TodoCategoryId { get; set; }

        public TodoCategory Category { get; set; }
    }
}