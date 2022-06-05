using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using TodoApi.Models;

namespace TodoApi.Controllers
{
    public class TodoCategoriesController : ApiController
    {
        private TodoContext db = new TodoContext();

        // GET: api/TodoCategories
        public IQueryable<TodoCategory> GetTodoCategories()
        {
            return db.TodoCategories;
        }

        // GET: api/TodoCategories/5
        [ResponseType(typeof(TodoCategory))]
        public IHttpActionResult GetTodoCategory(long id)
        {
            TodoCategory todoCategory = db.TodoCategories.Find(id);
            if (todoCategory == null)
            {
                return NotFound();
            }

            return Ok(todoCategory);
        }

        // PUT: api/TodoCategories/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutTodoCategory(long id, TodoCategory todoCategory)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != todoCategory.Id)
            {
                return BadRequest();
            }

            db.Entry(todoCategory).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TodoCategoryExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST: api/TodoCategories
        [ResponseType(typeof(TodoCategory))]
        public IHttpActionResult PostTodoCategory(TodoCategory todoCategory)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.TodoCategories.Add(todoCategory);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = todoCategory.Id }, todoCategory);
        }

        // DELETE: api/TodoCategories/5
        [ResponseType(typeof(TodoCategory))]
        public IHttpActionResult DeleteTodoCategory(long id)
        {
            TodoCategory todoCategory = db.TodoCategories.Find(id);
            if (todoCategory == null)
            {
                return NotFound();
            }

            db.TodoCategories.Remove(todoCategory);
            db.SaveChanges();

            return Ok(todoCategory);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool TodoCategoryExists(long id)
        {
            return db.TodoCategories.Count(e => e.Id == id) > 0;
        }
    }
}