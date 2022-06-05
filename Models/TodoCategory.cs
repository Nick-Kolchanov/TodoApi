using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace TodoApi.Models
{
    public class TodoCategory
    {
        public long Id { get; set; }
        public string Name { get; set; }
        
        public IEnumerable<TodoItem> Items { get; set; }
    }
}