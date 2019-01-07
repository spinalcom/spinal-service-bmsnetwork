import { InputDataEndpoint } from './InputDataEndpoint';
export interface InputDataEndpointGroup {
    id: string;
    name: string;
    type: string;
    path: string;
    children: (InputDataEndpoint)[];
}
