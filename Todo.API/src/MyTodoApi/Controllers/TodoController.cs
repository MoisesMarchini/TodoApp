using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using MyTodoApi.Context;
using MyTodoApi.Models;

namespace MyTodoApi
{

    [ApiController]
    [Route("api/[controller]")]
    public class TodoController : Controller
    {
        private readonly ToDoContext _context;

        public TodoController(ToDoContext context)
        {
            _context = context;
        }


        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            try
            {
                IQueryable<Todo> query = _context.Todos
                    .AsNoTracking();

                query = query.OrderBy(e => e.Id);

                return Ok(await query.ToArrayAsync());
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError,
                    $"Erro ao tentar buscar tarefas. Erro: {ex.Message}");
            }
        }

        [HttpGet("byUser/")]
        public async Task<IActionResult> GetAllByUser(string userName)
        {
            try
            {
                IQueryable<Todo> query = _context.Todos
                    .AsNoTracking();

                query = query.OrderBy(e => e.Id)
                             .Where(p => p.User == userName);

                return Ok(await query.ToArrayAsync());
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError,
                    $"Erro ao tentar buscar tarefas. Erro: {ex.Message}");
            }
        }


        [HttpPost]
        public async Task<IActionResult> Create(Todo todo)
        {
            try
            {
                // todo.User = User.Identity.Name;
                _context.Add(todo);
                await _context.SaveChangesAsync();
                return Ok(todo);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError,
                    $"Erro ao tentar adicionar tarefa. Erro: {ex.Message}");
            }
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, Todo todo)
        {
            try
            {
                var oldTodo = await _context.Todos.FirstOrDefaultAsync(p => p.Id == id);

                oldTodo = todo;

                await _context.SaveChangesAsync();

                return Ok(todo);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError,
                    $"Erro ao tentar atualizar tarefa. Erro: {ex.Message}");
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteById(int id)
        {
            try
            {
                var todo = await _context.Todos.FirstOrDefaultAsync(p => p.Id == id);

                _context.Remove(todo);
                await _context.SaveChangesAsync();

                return Ok("Tarefa deletada");
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError,
                    $"Erro ao tentar atualizar tarefa. Erro: {ex.Message}");
            }
        }
        [HttpDelete]
        public async Task<IActionResult> DeleteAllFromUsername(string userName)
        {
            try
            {
                var todo = _context.Todos.Where(p => p.User == userName);

                _context.RemoveRange(todo);
                await _context.SaveChangesAsync();

                return Ok("Tarefa deletada");
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError,
                    $"Erro ao tentar atualizar tarefa. Erro: {ex.Message}");
            }
        }
    }
}
