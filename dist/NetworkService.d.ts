import { InputDataDevice, InputDataEndpoint, InputDataEndpointGroup, InputDataEndpointDataType } from './InputDataModel/InputDataModel';
import { ConfigService } from './Utils/ConfigService';
declare class NetworkService {
    private context;
    private contextId;
    private networkId;
    constructor();
    init(forgeFile: spinal.Model, configService: ConfigService): Promise<{
        contextId: string;
        networkId: string;
    }>;
    createNewBmsNetwork(parentId: string, typeName: string): Promise<any>;
    createNewBmsDevice(parentId: string, obj: InputDataDevice): Promise<any>;
    createNewBmsEndpointGroup(parentId: string, obj: InputDataEndpointGroup): Promise<any>;
    createNewBmsEndpoint(parentId: string, obj: InputDataEndpoint): Promise<any>;
    updateData(obj: InputDataDevice): Promise<void>;
    private updateModel;
    private updateEndpoint;
}
export default NetworkService;
export { NetworkService };
export { InputDataDevice };
export { InputDataEndpoint };
export { InputDataEndpointGroup };
export { InputDataEndpointDataType };
export { ConfigService };
