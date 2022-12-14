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

                query = query.OrderBy(e => e.Done)
                             .ThenBy(e => e.Id);

                return Ok(await query.ToArrayAsync());
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError,
                    $"Erro ao tentar buscar tarefas. Erro: {ex.Message}");
            }
        }

        [HttpGet("fromUser/")]
        public async Task<IActionResult> GetAllFromUser(string userName)
        {
            try
            {
                IQueryable<Todo> query = _context.Todos
                    .AsNoTracking();

                query = query.Where(p => p.User == userName)
                             .OrderBy(e => e.Done)
                             .ThenBy(e => e.Id);

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
            var okResponse = new { Resposta = "Tarefa adicionada com sucesso" };
            var badRequestResponse = new { Resposta = "Erro ao adicionar tarefa" };
            try
            {
                // todo.User = User.Identity.Name;
                _context.Add(todo);
                return (await _context.SaveChangesAsync()) > 0 ?
                    Ok(okResponse) :
                    BadRequest(badRequestResponse);
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
            var okResponse = new { Resposta = "Tarefa atualizada com sucesso" };
            var badRequestNullResponse = new { Resposta = "Tarefa n??o encontrada" };
            var badRequestResponse = new { Resposta = "Erro ao atualizar tarefa" };
            try
            {

                if (todo == null)
                {
                    return BadRequest(badRequestNullResponse);
                }

                todo.Id = id;

                _context.Todos.Update(todo);

                return (await _context.SaveChangesAsync()) > 0 ?
                    Ok(okResponse) :
                    BadRequest(badRequestResponse);
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
            var okResponse = new { Resposta = "Tarefa removida com sucesso" };
            var badRequestResponse = new { Resposta = "Erro ao deletar tarefa" };
            var badRequestNullResponse = new { Resposta = "Tarefa n??o encontrada" };
            try
            {
                Todo todo = await _context.Todos.FirstOrDefaultAsync(p => p.Id == id);

                if (todo == null)
                {
                    return BadRequest(badRequestNullResponse);
                }

                _context.Remove(todo);

                return (await _context.SaveChangesAsync()) > 0 ?
                    Ok(okResponse) :
                    BadRequest(badRequestResponse);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError,
                    $"Erro ao tentar atualizar tarefa. Erro: {ex.Message}");
            }
        }
        [HttpDelete("fromUser/")]
        public async Task<IActionResult> DeleteAllFromUsername(string userName)
        {
            var okResponse = new { Resposta = "Tarefas removidas com sucesso" };
            var badRequestResponse = new { Resposta = "Erro ao deletar tarefa" };
            var badRequestNullResponse = new { Resposta = "Tarefas n??o encontradas" };
            try
            {
                var todo = _context.Todos.Where(p => p.User == userName);

                if (todo == null)
                {
                    return BadRequest(badRequestNullResponse);
                }

                _context.RemoveRange(todo);

                return (await _context.SaveChangesAsync()) > 0 ?
                    Ok(okResponse) :
                    BadRequest(badRequestResponse);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError,
                    $"Erro ao tentar atualizar tarefa. Erro: {ex.Message}");
            }
        }
    }
}
