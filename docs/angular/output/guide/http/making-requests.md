# Making HTTP requests

`HttpClient` provides methods for various HTTP verbs to load data and apply mutations on the server. Each method returns an RxJS `Observable`, which emits results upon server response. Observables can be subscribed to multiple times, triggering new backend requests for each subscription. Options can be adjusted through an options object.

## Fetching JSON data

Use the `HttpClient.get()` method to fetch data with a GET request. It takes the endpoint URL and an optional options object.

Example:
```typescript
http.get<Config>('/api/config').subscribe(config => {
  // process the configuration.
});
```
The generic type argument specifies the expected data type. If omitted, the type defaults to `any`. For unknown shapes, use `unknown` instead.

**CRITICAL:** The generic type is a type assertion; `HttpClient` does not verify the actual return data.

## Fetching other types of data

`HttpClient` defaults to JSON responses. Use the `responseType` option for non-JSON APIs.

| **`responseType` value** | **Returned response type** |
| - | - |
| `'json'` (default) | JSON data |
| `'text'` | string data |
| `'arraybuffer'` | ArrayBuffer containing raw bytes |
| `'blob'` | Blob instance |

Example for downloading a `.jpeg` image:
```typescript
http.get('/images/dog.jpg', {responseType: 'arraybuffer'}).subscribe(buffer => {
  console.log('The image is ' + buffer.byteLength + ' bytes large');
});
```

**IMPORTANT:** `responseType` must be a literal type.

## Mutating server state

Use the `HttpClient.post()` method for POST requests with a request body.

Example:
```typescript
http.post<Config>('/api/config', newConfig).subscribe(config => {
  console.log('Updated config:', config);
});
```

| **`body` type** | **Serialized as** |
| - | - |
| string | Plain text |
| number, boolean, array, or plain object | JSON |
| ArrayBuffer | raw data |
| Blob | raw data with content type |
| FormData | multipart/form-data |
| HttpParams or URLSearchParams | application/x-www-form-urlencoded |

**IMPORTANT:** Remember to `.subscribe()` to mutation request Observables.

## Setting URL parameters

Use the `params` option to specify request parameters.

Example:
```typescript
http.get('/api/config', {
  params: {filter: 'all'},
}).subscribe(config => {
  // ...
});
```

Alternatively, use `HttpParams` for more control. `HttpParams` is immutable; mutation methods return a new instance.

Example:
```typescript
const baseParams = new HttpParams().set('filter', 'all');
http.get('/api/config', {
  params: baseParams.set('details', 'enabled'),
}).subscribe(config => {
  // ...
});
```

## Setting request headers

Use the `headers` option to specify request headers.

Example:
```typescript
http.get('/api/config', {
  headers: {
    'X-Debug-Level': 'verbose',
  }
}).subscribe(config => {
  // ...
});
```

Alternatively, use `HttpHeaders`, which is also immutable.

Example:
```typescript
const baseHeaders = new HttpHeaders().set('X-Debug-Level', 'minimal');
http.get<Config>('/api/config', {
  headers: baseHeaders.set('X-Debug-Level', 'verbose'),
}).subscribe(config => {
  // ...
});
```

## Interacting with the server response events

To access the entire response, set the `observe` option to `'response'`.

Example:
```typescript
http.get<Config>('/api/config', {observe: 'response'}).subscribe(res => {
  console.log('Response status:', res.status);
  console.log('Body:', res.body);
});
```

**IMPORTANT:** `observe` must be a literal type.

## Receiving raw progress events

Enable progress events with the `reportProgress` option and set `observe` to `'events'`.

Example:
```typescript
http.post('/api/upload', myData, {
  reportProgress: true,
  observe: 'events',
}).subscribe(event => {
  switch (event.type) {
    case HttpEventType.UploadProgress:
      console.log('Uploaded ' + event.loaded + ' out of ' + event.total + ' bytes');
      break;
    case HttpEventType.Response:
      console.log('Finished uploading!');
      break;
  }
});
```

## Handling request failure

HTTP requests can fail due to network errors or backend processing errors. `HttpClient` captures these in an `HttpErrorResponse`.

Use the `catchError` operator for error handling. RxJS provides retry operators for transient errors.

## Http `Observable`s

`HttpClient` produces "cold" Observables; requests are dispatched only upon subscription. Unsubscribing aborts in-progress requests.

**TIP:** Use the `async` pipe or `toSignal` operation to ensure proper disposal of subscriptions.

## Best practices

Create reusable, injectable services for data access logic. Example `UserService`:

```typescript
@Injectable({providedIn: 'root'})
export class UserService {
  constructor(private http: HttpClient) {}

  getUser(id: string): Observable<User> {
    return this.http.get<User>(`/api/user/${id}`);
  }
}
```

In a component, use the `async` pipe to render UI after data loading:

```typescript
import { AsyncPipe } from '@angular/common';
@Component({
  standalone: true,
  imports: [AsyncPipe],
  template: `
    @if (user$ | async; as user) {
      <p>Name: {{ user.name }}</p>
      <p>Biography: {{ user.biography }}</p>
    }
  `,
})
export class UserProfileComponent {
  @Input() userId!: string;
  user$!: Observable<User>;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.user$ = this.userService.getUser(this.userId);
  }
}
```