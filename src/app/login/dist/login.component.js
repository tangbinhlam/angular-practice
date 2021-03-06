"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.LoginComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var LoginComponent = /** @class */ (function () {
    function LoginComponent(fb, afAuth, router) {
        this.fb = fb;
        this.afAuth = afAuth;
        this.router = router;
        this.action = 'login';
    }
    LoginComponent.prototype.ngOnInit = function () {
        this.registerForm = this.fb.group({
            firstName: [''],
            lastName: [''],
            email: ['', [forms_1.Validators.email, forms_1.Validators.required]],
            password: ['', forms_1.Validators.required]
        });
    };
    LoginComponent.prototype.onSubmit = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, firstName, lastName, email, password, resp, error_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this.registerForm.value, firstName = _a.firstName, lastName = _a.lastName, email = _a.email, password = _a.password;
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 7, , 8]);
                        resp = void 0;
                        if (!this.isLogin) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.afAuth.signInWithEmailAndPassword(email, password)];
                    case 2:
                        resp = _b.sent();
                        return [3 /*break*/, 6];
                    case 3: return [4 /*yield*/, this.afAuth.createUserWithEmailAndPassword(email, password)];
                    case 4:
                        resp = _b.sent();
                        return [4 /*yield*/, resp.user.updateProfile({
                                displayName: firstName + " " + lastName
                            })];
                    case 5:
                        _b.sent();
                        _b.label = 6;
                    case 6:
                        this.registerForm.reset();
                        this.router.navigate(["/profile/" + resp.user.uid]);
                        return [3 /*break*/, 8];
                    case 7:
                        error_1 = _b.sent();
                        console.log(error_1);
                        return [3 /*break*/, 8];
                    case 8: return [2 /*return*/];
                }
            });
        });
    };
    Object.defineProperty(LoginComponent.prototype, "isLogin", {
        get: function () {
            return this.action === 'login';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(LoginComponent.prototype, "isSignup", {
        get: function () {
            return this.action === 'signup';
        },
        enumerable: false,
        configurable: true
    });
    LoginComponent = __decorate([
        core_1.Component({
            selector: 'app-login',
            templateUrl: './login.component.html',
            styleUrls: ['./login.component.scss']
        })
    ], LoginComponent);
    return LoginComponent;
}());
exports.LoginComponent = LoginComponent;
