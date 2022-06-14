type Headers = Record<string, string>;

export default function parseHeaders(headers: string): Headers {
  let parsed: Headers = {};

  if (!headers) {
    return parsed;
  }

  headers.split('\r\n').forEach(line => {
    let [key, val] = line.split(':');
    key = key.trim().toLowerCase();
    val = val.trim();

    parsed[key] = parsed[key] ? parsed[key] + ',' + val : val;
  });

  return parsed;
}
