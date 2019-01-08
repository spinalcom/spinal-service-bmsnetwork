"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
/*
 * Copyright 2018 SpinalCom - www.spinalcom.com
 *
 * This file is part of SpinalCore.
 *
 * Please read all of the following terms and conditions
 * of the Free Software license Agreement ("Agreement")
 * carefully.
 *
 * This Agreement is a legally binding contract between
 * the Licensee (as defined below) and SpinalCom that
 * sets forth the terms and conditions that govern your
 * use of the Program. By installing and/or using the
 * Program, you agree to abide by all the terms and
 * conditions stated or referenced herein.
 *
 * If you do not agree to abide by these terms and
 * conditions, do not demonstrate your acceptance and do
 * not install or use the Program.
 * You should have received a copy of the license along
 * with this file. If not, see
 * <http://resources.spinalcom.com/licenses.pdf>.
 */
const spinal_env_viewer_graph_service_1 = require("spinal-env-viewer-graph-service");
const InputDataModel_1 = require("./InputDataModel/InputDataModel");
exports.InputDataEndpoint = InputDataModel_1.InputDataEndpoint;
exports.InputDataEndpointType = InputDataModel_1.InputDataEndpointType;
exports.InputDataEndpointDataType = InputDataModel_1.InputDataEndpointDataType;
const spinal_model_bmsnetwork_1 = require("spinal-model-bmsnetwork");
class NetworkService {
    constructor() {
    }
    init(forgeFile, configService) {
        return __awaiter(this, void 0, void 0, function* () {
            yield spinal_env_viewer_graph_service_1.SpinalGraphService.setGraphFromForgeFile(forgeFile);
            this.context = spinal_env_viewer_graph_service_1.SpinalGraphService.getContext(configService.contextName);
            if (this.context === undefined) {
                this.context =
                    yield spinal_env_viewer_graph_service_1.SpinalGraphService.addContext(configService.contextName, configService.contextType);
            }
            this.contextId = this.context.getId().get();
            const childrenContext = yield spinal_env_viewer_graph_service_1.SpinalGraphService.getChildrenInContext(this.contextId, this.contextId);
            let childFoundId = '';
            for (const childContext of childrenContext) {
                if (childContext.networkName.get() === configService.networkType) {
                    childFoundId = childContext.id.get();
                    break;
                }
            }
            if (childFoundId === '') {
                childFoundId = yield this.createNewBmsNetwork(this.contextId, configService.networkType, configService.networkName).then(res => res.id.get());
            }
            this.networkId = childFoundId;
            return { contextId: this.contextId, networkId: childFoundId };
        });
    }
    createNewBmsNetwork(parentId, typeName, networkName) {
        return __awaiter(this, void 0, void 0, function* () {
            const res = new spinal_model_bmsnetwork_1.SpinalBmsNetwork(networkName, typeName);
            const tmpInfo = {
                networkName,
                typeName,
                type: 'BmsNetwork',
                name: typeName,
                idNetwork: res.id.get(),
            };
            const childId = spinal_env_viewer_graph_service_1.SpinalGraphService.createNode(tmpInfo, res);
            yield spinal_env_viewer_graph_service_1.SpinalGraphService.addChildInContext(parentId, childId, this.contextId, spinal_model_bmsnetwork_1.SpinalBmsDevice.relationName, spinal_env_viewer_graph_service_1.SPINAL_RELATION_TYPE);
            return spinal_env_viewer_graph_service_1.SpinalGraphService.getInfo(childId);
        });
    }
    createNewBmsDevice(parentId, obj) {
        return __awaiter(this, void 0, void 0, function* () {
            const res = new spinal_model_bmsnetwork_1.SpinalBmsDevice(obj.name, obj.type, obj.path, obj.id);
            const tmpInfo = { type: 'BmsDevice', name: obj.name, idNetwork: obj.id };
            const childId = spinal_env_viewer_graph_service_1.SpinalGraphService.createNode(tmpInfo, res);
            yield spinal_env_viewer_graph_service_1.SpinalGraphService.addChildInContext(parentId, childId, this.contextId, spinal_model_bmsnetwork_1.SpinalBmsDevice.relationName, spinal_env_viewer_graph_service_1.SPINAL_RELATION_TYPE);
            return spinal_env_viewer_graph_service_1.SpinalGraphService.getInfo(childId);
        });
    }
    createNewBmsEndpointGroup(parentId, obj) {
        return __awaiter(this, void 0, void 0, function* () {
            const res = new spinal_model_bmsnetwork_1.SpinalBmsEndpointGroup(obj.name, obj.type, obj.path, obj.id);
            const tmpInfo = { type: spinal_model_bmsnetwork_1.SpinalBmsEndpointGroup.nodeTypeName, name: obj.name, idNetwork: obj.id };
            const childId = spinal_env_viewer_graph_service_1.SpinalGraphService.createNode(tmpInfo, res);
            yield spinal_env_viewer_graph_service_1.SpinalGraphService.addChildInContext(parentId, childId, this.contextId, spinal_model_bmsnetwork_1.SpinalBmsEndpointGroup.relationName, spinal_env_viewer_graph_service_1.SPINAL_RELATION_TYPE);
            return spinal_env_viewer_graph_service_1.SpinalGraphService.getInfo(childId);
        });
    }
    createNewBmsEndpoint(parentId, obj) {
        return __awaiter(this, void 0, void 0, function* () {
            const res = new spinal_model_bmsnetwork_1.SpinalBmsEndpoint(obj.name, obj.path, obj.currentValue, obj.unit, InputDataModel_1.InputDataEndpointDataType[obj.dataType], InputDataModel_1.InputDataEndpointType[obj.type], obj.id);
            const tmpInfo = { type: spinal_model_bmsnetwork_1.SpinalBmsEndpoint.nodeTypeName, name: obj.name, idNetwork: obj.id };
            const childId = spinal_env_viewer_graph_service_1.SpinalGraphService.createNode(tmpInfo, res);
            yield spinal_env_viewer_graph_service_1.SpinalGraphService.addChildInContext(parentId, childId, this.contextId, spinal_model_bmsnetwork_1.SpinalBmsEndpoint.relationName, spinal_env_viewer_graph_service_1.SPINAL_RELATION_TYPE);
            return spinal_env_viewer_graph_service_1.SpinalGraphService.getInfo(childId);
        });
    }
    updateData(obj) {
        return __awaiter(this, void 0, void 0, function* () {
            const contextChildren = yield spinal_env_viewer_graph_service_1.SpinalGraphService.getChildrenInContext(this.networkId, this.contextId);
            for (const child of contextChildren) {
                if (typeof child.idNetwork !== 'undefined' && child.idNetwork.get() === obj.id) {
                    return this.updateModel(child, obj);
                }
            }
            return this.createNewBmsDevice(this.networkId, obj).then((child) => {
                return this.updateModel(child, obj);
            });
        });
    }
    updateModel(node, reference) {
        return __awaiter(this, void 0, void 0, function* () {
            const contextChildren = yield spinal_env_viewer_graph_service_1.SpinalGraphService.getChildrenInContext(node.id.get(), this.contextId);
            const notPresent = [];
            const promises = [];
            for (const refChild of reference.children) {
                let childFound = false;
                for (const child of contextChildren) {
                    if (child.idNetwork.get() === refChild.id) {
                        switch (child.type.get()) {
                            case spinal_model_bmsnetwork_1.SpinalBmsDevice.nodeTypeName:
                                promises.push(this.updateModel(child, refChild));
                                childFound = true;
                                break;
                            case spinal_model_bmsnetwork_1.SpinalBmsEndpointGroup.nodeTypeName:
                                promises.push(this.updateModel(child, refChild));
                                childFound = true;
                                break;
                            case spinal_model_bmsnetwork_1.SpinalBmsEndpoint.nodeTypeName:
                                promises.push(this.updateEndpoint(child, refChild));
                                childFound = true;
                                break;
                            default:
                                break;
                        }
                    }
                }
                if (!childFound) {
                    notPresent.push(refChild);
                }
            }
            let prom;
            for (const item of notPresent) {
                switch (item.nodeTypeName) {
                    case spinal_model_bmsnetwork_1.SpinalBmsDevice.nodeTypeName:
                        prom = this.createNewBmsDevice(node.id.get(), item).then((child) => {
                            return this.updateModel(child, item);
                        });
                        promises.push(prom);
                        break;
                    case spinal_model_bmsnetwork_1.SpinalBmsEndpointGroup.nodeTypeName:
                        prom = this.createNewBmsEndpointGroup(node.id.get(), item).then((child) => {
                            return this.updateModel(child, item);
                        });
                        promises.push(prom);
                        break;
                    case spinal_model_bmsnetwork_1.SpinalBmsEndpoint.nodeTypeName:
                        prom = this.createNewBmsEndpoint(node.id.get(), item).then((child) => {
                            return this.updateEndpoint(child, item);
                        });
                        promises.push(prom);
                        break;
                    default:
                        break;
                }
            }
            yield Promise.all(promises);
        });
    }
    updateEndpoint(node, reference) {
        return __awaiter(this, void 0, void 0, function* () {
            const element = yield node.element.load();
            element.currentValue.set(reference.currentValue);
            // update TimeSeries here
        });
    }
}
exports.NetworkService = NetworkService;
exports.default = NetworkService;
//# sourceMappingURL=NetworkService.js.map