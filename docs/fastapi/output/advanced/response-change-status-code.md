# Response - Change Status Code

You can set a default Response Status Code. However, there are cases where you need to return a different status code than the default.

## Use Case

For instance, you may want to return an HTTP status code of "OK" (200) by default. If the data doesn't exist, you want to create it and return an HTTP status code of "CREATED" (201). You still want to filter and convert the data returned with a response model.

In such cases, you can use a Response parameter.

## Use a Response Parameter

Declare a parameter of type Response in your path operation function, similar to how you would for cookies and headers. You can then set the status_code in that temporal response object.

```Python
{!../../docs_src/response_change_status_code/tutorial001.py!}
```

You can return any object you need, such as a dict or a database model. If you declared a response_model, it will still be used to filter and convert the returned object.

FastAPI will use that temporal response to extract the status code (as well as cookies and headers) and include them in the final response, which contains the value you returned, filtered by any response_model.

You can also declare the Response parameter in dependencies and set the status code there. Note that the last one to be set will take precedence.