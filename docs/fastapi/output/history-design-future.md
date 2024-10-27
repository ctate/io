# History, Design and Future

Some time ago, a **FastAPI** user asked:

> What’s the history of this project? It seems to have come from nowhere to awesome in a few weeks [...]

Here's a little bit of that history.

## Alternatives

I have been creating APIs with complex requirements for several years (Machine Learning, distributed systems, asynchronous jobs, NoSQL databases, etc.), leading several teams of developers. As part of that, I needed to investigate, test, and use many alternatives.

The history of **FastAPI** is largely the history of its predecessors. 

**FastAPI** wouldn't exist if not for the previous work of others. There have been many tools created before that have helped inspire its creation. I avoided creating a new framework for several years, initially trying to solve all the features covered by **FastAPI** using various frameworks, plug-ins, and tools. Eventually, it became clear that creating something that provided all these features, taking the best ideas from previous tools, and combining them effectively was necessary, utilizing language features that weren't available before (Python 3.6+ type hints).

## Investigation

Using previous alternatives allowed me to learn from them, take ideas, and combine them effectively. It was clear that **FastAPI** should be based on standard Python type hints and existing standards. Before starting to code **FastAPI**, I spent several months studying the specs for OpenAPI, JSON Schema, OAuth2, etc., understanding their relationships, overlaps, and differences.

## Design

I spent time designing the developer "API" I wanted as a user of **FastAPI**. I tested several ideas in popular Python editors: PyCharm, VS Code, and Jedi-based editors. According to the Python Developer Survey, which covers about 80% of users, **FastAPI** was specifically tested with the editors used by most Python developers. This ensures that its benefits should work for virtually all editors, allowing for reduced code duplication, completion everywhere, type and error checks, and an overall improved development experience.

## Requirements

After testing several alternatives, I decided to use **Pydantic** for its advantages. I contributed to it to ensure full compliance with JSON Schema, support for different constraint declaration methods, and improved editor support (type checks, autocompletion). During development, I also contributed to **Starlette**, another key requirement.

## Development

By the time I started creating **FastAPI**, most pieces were already in place: the design was defined, the requirements and tools were ready, and the knowledge about the standards and specifications was clear and fresh.

## Future

**FastAPI** is proving useful for many people and is being chosen over previous alternatives for various use cases. Many developers and teams, including mine, already depend on **FastAPI** for their projects. However, there are still many improvements and features to come. **FastAPI** has a promising future ahead, and your help is greatly appreciated.