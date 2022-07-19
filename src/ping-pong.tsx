/**
 * Keep Alive imitation
 * https://codesandbox.io/examples/package/@mswjs/data
 * @author Denis Kurochkin (mr_dramm) <blackbrain2009@gmail.com>
 * @copyright Denis Kurochkin 2022
 */

import { fetchWrapper } from "tools/fetchWrapper";

export default () => setInterval(()=>fetchWrapper("/api/keepalive"), 30000)